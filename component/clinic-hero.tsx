"use client"

import { useEffect, useRef, useState } from "react"
import { getImageProps } from "next/image"
import { MapPin } from "lucide-react"
import { BookButton } from "@/component/consultation-form"

/**
 * Skin, Hair & Aesthetic Care hero — Bangalore clinic.
 *
 * Design notes:
 * - Colour palette is taken from the Derma Solutions logo: warm gold (#C99045)
 *   and charcoal grey (#717171), on a dark charcoal overlay with cream text.
 * - The treatments rotate automatically, one by one. The active treatment is
 *   highlighted in gold and the background crossfades to that treatment's
 *   image. Clicking a pill jumps to it. Auto-rotation is skipped for visitors
 *   who prefer reduced motion.
 * - Each slide has two background images (see `slides` below): a wide banner
 *   for screens 768px and up, and a portrait one for phones. Next serves the
 *   right one via <picture>, so a phone never downloads the banner. The
 *   slide's `tint` gradient sits behind the image as a fallback.
 * - The images slowly zoom in and back out (`hero-zoom` @keyframes in
 *   app/globals.css, 14s loop). Turned off for reduced-motion visitors.
 * - Fonts are set globally in app/layout.tsx + app/globals.css: headings use
 *   "Gilda Display", everything else "PT Serif".
 * - No stats or phone number are fabricated — add real ones when you have them.
 */

const ROTATE_MS = 4500

const slides = [
  {
    label: "Acne",
    desktop: "/acne-banner.png",
    mobile: "/acne-mble.png",
    tint: "linear-gradient(135deg, #2A2724 0%, #4B3B29 100%)",
  },
  {
    label: "Pigmentation",
    desktop: "/pig-banner.png",
    mobile: "/pig-mbl.png",
    tint: "linear-gradient(135deg, #272727 0%, #5A4429 100%)",
  },
  {
    label: "Hair Loss",
    desktop: "/hair-loss.png",
    mobile: "/hair-loss-mbl.png",
    tint: "linear-gradient(135deg, #252525 0%, #3F3A34 100%)",
  },
  {
    label: "Laser Treatments",
    desktop: "/laser-banner.webp",
    mobile: "/laser-mbl.png",
    tint: "linear-gradient(135deg, #2B2622 0%, #6A4C25 100%)",
  },
  {
    label: "Skin Rejuvenation",
    desktop: "/skin-banner.png",
    mobile: "/skin-mble.png",
    tint: "linear-gradient(135deg, #2A2825 0%, #55452F 100%)",
  },
  {
    label: "Anti-Ageing",
    desktop: "/anti-banner.png",
    mobile: "/anti-mble.png",
    tint: "linear-gradient(135deg, #262626 0%, #4E3F2C 100%)",
  },
]

/** Full-bleed <picture>: banner from 768px up, portrait image below. */
function SlideImage({
  desktop,
  mobile,
  priority,
}: {
  desktop: string
  mobile: string
  priority: boolean
}) {
  const common = { alt: "", fill: true, sizes: "100vw", priority }
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: desktop })
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({ ...common, src: mobile })

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSet} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={mobileSet} sizes="100vw" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...img} alt="" className="hero-zoom object-cover" />
    </picture>
  )
}

export default function ClinicHero() {
  const [active, setActive] = useState(0)

  // Advance one treatment at a time. Depending on `active` restarts the timer
  // whenever a pill is clicked, so a manual pick isn't immediately overridden.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      ROTATE_MS
    )
    return () => clearTimeout(id)
  }, [active])

  // Phones: the pills sit in ONE scrolling row. Keep the active pill centred as
  // it changes. (From sm up the pills wrap and nothing overflows, so this exits.)
  const listRef = useRef<HTMLUListElement>(null)
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => {
    const list = listRef.current
    const pill = pillRefs.current[active]
    if (!list || !pill || list.scrollWidth <= list.clientWidth) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    list.scrollTo({
      left: pill.offsetLeft - (list.clientWidth - pill.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    })
  }, [active])

  return (
    <section className="relative isolate flex min-h-[440px] w-full items-center justify-center overflow-hidden bg-[#1F1F1F] px-6 py-8 sm:min-h-[670px] sm:py-24">
      {/* rotating backgrounds — crossfade */}
      {slides.map((slide, i) => (
        <div
          key={slide.label}
          aria-hidden
          className="absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, background: slide.tint }}
        >
          <SlideImage
            desktop={slide.desktop}
            mobile={slide.mobile}
            priority={i === 0}
          />
        </div>
      ))}

      {/* legibility overlay */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,30,30,0.66) 0%, rgba(36,36,36,0.58) 45%, rgba(22,22,22,0.84) 100%)",
        }}
      />

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-[720px] flex-col items-center text-center">
        <h1 className="text-[38px] leading-[1.15] tracking-[-0.01em] text-[#F7F3EC] sm:text-[52px] lg:text-[60px]">
          Skin, Hair &amp; Aesthetic Care in Bangalore
        </h1>

        <p className="mt-5 text-[18px] text-[#E6C58F] sm:text-[21px]">
          Personalised treatments, guided by a dermatologist.
        </p>

        <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-[#C9C4BB] sm:text-[16px]">
          From acne, pigmentation and hair loss to laser treatments, skin
          rejuvenation and anti-ageing, get the right treatment for your
          concern.
        </p>

        {/* treatment pills — auto-rotating, click to jump.
            Phones: one row that scrolls sideways (edges fade out); sm+: wraps, centred. */}
        <ul
          ref={listRef}
          className="relative mt-7 flex w-[calc(100%+3rem)] flex-nowrap items-center gap-2.5 overflow-x-auto px-6 [mask-image:linear-gradient(to_right,transparent,#000_28px,#000_calc(100%-28px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:[mask-image:none]"
        >
          {slides.map((slide, i) => (
            <li key={slide.label} className="shrink-0">
              <button
                type="button"
                ref={(el) => {
                  pillRefs.current[i] = el
                }}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] transition-colors duration-500 ${
                  i === active
                    ? "border-[#C99045] bg-[#C99045] font-medium text-[#1F1F1F]"
                    : "border-white/25 text-[#E9E5DE] hover:border-[#C99045]/70"
                }`}
              >
                {slide.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <BookButton
          className="mt-10 rounded-full bg-[#C99045] px-9 py-4 text-[15px] font-semibold tracking-wide text-white transition hover:bg-[#B5802F] sm:text-[16px]"
        >
          Book a Consultation
        </BookButton>

        {/* location */}
        <div className="mt-6 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 text-[14px] text-[#DDD8CF]">
            <MapPin className="h-4 w-4 text-[#C99045]" strokeWidth={1.8} />
            Banashankari, Bangalore
          </div>
         </div>
      </div>
    </section>
  )
}
