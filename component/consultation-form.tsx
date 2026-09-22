"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, X } from "lucide-react"
import { concernGroups } from "@/lib/concerns"

/**
 * "Book a consultation" form popup.
 *
 * - <ConsultationProvider> (mounted once in app/layout.tsx) renders the popup.
 * - <BookButton> / <BookLink> are drop-in replacements for <button> / <a> that
 *   open it, so any button on any page can use it.
 * - Fields: name, phone number, concern (a dropdown — options in lib/concerns.ts).
 *   On submit the details are POSTed to
 *   /api/consultation (app/api/consultation/route.ts); when that succeeds the
 *   visitor is sent straight to /thank-you.
 * - Uses the native <dialog> element, so Esc, focus trapping and the backdrop
 *   come for free.
 */

type ConsultationContextValue = { open: () => void }

const ConsultationContext = createContext<ConsultationContextValue>({
  open: () => {},
})

export const useConsultation = () => useContext(ConsultationContext)

/** "+91 63631 36080", "063631-36080" … -> digits with an optional leading + */
const cleanPhone = (value: string) => value.replace(/[\s\-().]/g, "")
const PHONE_RE = /^\+?\d{10,13}$/

type Errors = Partial<Record<"name" | "phone" | "concern", string>>

const inputClass =
  "mt-2 w-full rounded-xl border bg-[#FBF8F3] px-4 py-3 text-[16px] text-[#1F1F1F] placeholder:text-[#9A968F] outline-none transition focus:border-[#C99045] focus:bg-white focus:ring-4 focus:ring-[#C99045]/20"

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [formError, setFormError] = useState("")

  const open = useCallback(() => {
    setErrors({})
    setFormError("")
    setSending(false)
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = "hidden"
    }
  }, [])

  const close = useCallback(() => dialogRef.current?.close(), [])

  // never leave the page scroll-locked
  useEffect(() => () => void (document.body.style.overflow = ""), [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const name = String(data.get("name") ?? "").trim()
    const phone = cleanPhone(String(data.get("phone") ?? ""))
    const concern = String(data.get("concern") ?? "").trim()

    const next: Errors = {}
    if (name.length < 2) next.name = "Please enter your name."
    if (!PHONE_RE.test(phone)) next.phone = "Please enter a valid phone number."
    if (!concern) next.concern = "Please select your concern."
    setErrors(next)
    setFormError("")
    if (Object.keys(next).length > 0) return

    setSending(true)
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          concern,
          website: String(data.get("website") ?? ""), // honeypot
        }),
      })
      if (!res.ok) throw new Error("request failed")

      form.reset()
      close()
      router.push("/thank-you")
    } catch {
      setSending(false)
      setFormError(
        "Sorry, something went wrong. Please try again or call us directly."
      )
    }
  }

  const value = useMemo(() => ({ open }), [open])

  return (
    <ConsultationContext.Provider value={value}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="consultation-title"
        onClose={() => {
          document.body.style.overflow = ""
        }}
        onClick={(event) => {
          // a click on the dimmed backdrop targets the <dialog> itself
          if (event.target === event.currentTarget) close()
        }}
        className="m-auto w-[calc(100%-32px)] max-w-[480px] rounded-[24px] bg-transparent p-0 backdrop:bg-[#1F1F1F]/60 backdrop:backdrop-blur-[2px]"
      >
        <div className="relative rounded-[24px] bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-9">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#5A5650] transition-colors hover:bg-[#FBF8F3] hover:text-[#1F1F1F]"
          >
            <X aria-hidden className="h-5 w-5" strokeWidth={1.8} />
          </button>

          <h2
            id="consultation-title"
            className="pr-8 text-[28px] leading-[1.15] text-[#1F1F1F] sm:text-[32px]"
          >
            Book a Consultation
          </h2>
          <span
            aria-hidden
            className="mt-4 block h-[3px] w-12 rounded-full bg-[#C99045]"
          />
          <p className="mt-4 text-[15px] leading-[26px] text-[#5A5650] sm:text-[16px]">
            Share your details and tell us your concern. Our team will get in
            touch with you.
          </p>

          <form
            onSubmit={onSubmit}
            onInput={(event) => {
              // clear a field's error as soon as the visitor edits that field
              const field = (event.target as HTMLInputElement).name as keyof Errors
              setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
            }}
            noValidate
            className="mt-6 space-y-5"
          >
            {/* honeypot: real visitors never see or fill this */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div>
              <label
                htmlFor="consult-name"
                className="text-[14px] font-bold text-[#1F1F1F]"
              >
                Name
              </label>
              <input
                id="consult-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "consult-name-error" : undefined}
                className={`${inputClass} ${errors.name ? "border-red-500" : "border-[#E8E0D2]"}`}
              />
              {errors.name && (
                <p id="consult-name-error" className="mt-1.5 text-[13px] text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="consult-phone"
                className="text-[14px] font-bold text-[#1F1F1F]"
              >
                Phone number
              </label>
              <input
                id="consult-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="e.g. 98765 43210"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "consult-phone-error" : undefined}
                className={`${inputClass} ${errors.phone ? "border-red-500" : "border-[#E8E0D2]"}`}
              />
              {errors.phone && (
                <p id="consult-phone-error" className="mt-1.5 text-[13px] text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="consult-concern"
                className="text-[14px] font-bold text-[#1F1F1F]"
              >
                Concern
              </label>
              <div className="relative">
                <select
                  id="consult-concern"
                  name="concern"
                  required
                  defaultValue=""
                  aria-invalid={!!errors.concern}
                  aria-describedby={errors.concern ? "consult-concern-error" : undefined}
                  className={`${inputClass} cursor-pointer appearance-none pr-11 invalid:text-[#9A968F] ${errors.concern ? "border-red-500" : "border-[#E8E0D2]"}`}
                >
                  <option value="" disabled>
                    Select your concern
                  </option>
                  {concernGroups.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((option) => (
                        <option key={option} value={option} className="text-[#1F1F1F]">
                          {option}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-1/2 mt-1 h-5 w-5 -translate-y-1/2 text-[#C99045]"
                  strokeWidth={2}
                />
              </div>
              {errors.concern && (
                <p id="consult-concern-error" className="mt-1.5 text-[13px] text-red-600">
                  {errors.concern}
                </p>
              )}
            </div>

            {formError && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#C99045] text-[16px] font-bold tracking-wide text-white transition hover:bg-[#B5802F] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Sending…" : "Submit"}
            </button>
          </form>
        </div>
      </dialog>
    </ConsultationContext.Provider>
  )
}

/** Drop-in <button> that opens the consultation form. */
export function BookButton({
  children,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open } = useConsultation()
  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        onClick?.(event)
        open()
      }}
    >
      {children}
    </button>
  )
}

/** Drop-in <a> that opens the consultation form instead of navigating. */
export function BookLink({
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { open } = useConsultation()
  return (
    <a
      href="#book-consultation"
      {...props}
      onClick={(event) => {
        onClick?.(event)
        event.preventDefault()
        open()
      }}
    >
      {children}
    </a>
  )
}
