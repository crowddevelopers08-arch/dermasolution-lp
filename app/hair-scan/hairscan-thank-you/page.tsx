import type { Metadata } from "next"
import Link from "next/link"
import { Check, MapPin, Phone } from "lucide-react"
import CopyrightBar from "@/component/copyright-bar"
import Navbar from "@/component/hairscan/navbar"

/**
 * Thank-you page — /hair-scan/hairscan-thank-you
 *
 * Visitors land here straight after booking a consultation from the
 * hair scan results (see component/hairscan/results-view.tsx). Not indexed by search engines.
 */

export const metadata: Metadata = {
  title: "Thank You | Dr. Sindhu’s Derma Solutions",
  robots: { index: false, follow: false },
}

const content = {
  heading: "Thank You!",
  text: "We have received your hair scan details. Our specialist will get in touch with you shortly to book your consultation.",
  phoneLabel: "Need us sooner? Call us",
  phone: "+91 6363136080",
  phoneHref: "tel:+916363136080",
  location: "Banashankari, Bangalore",
  home: "Back to Home",
}

export default function HairscanThankYouPage() {
  return (
    <>
      <Navbar />

      <main className="flex w-full flex-1 items-center justify-center bg-[#FBF8F3] px-4 py-16 sm:px-8 sm:py-8">
        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center rounded-[28px] border border-[#E8E0D2] bg-white px-6 py-12 text-center shadow-[0_12px_40px_rgba(31,31,31,0.06)] sm:px-12 sm:py-6">
          <span
            aria-hidden
            className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C99045]/15"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C99045] text-white">
              <Check className="h-7 w-7" strokeWidth={2.4} />
            </span>
          </span>

          <h1 className="mt-8 text-[36px] leading-[1.15] tracking-[-0.01em] text-[#1F1F1F] sm:text-[48px]">
            {content.heading}
          </h1>
          <span
            aria-hidden
            className="mt-5 block h-[3px] w-14 rounded-full bg-[#C99045]"
          />
          <p className="mt-6 max-w-[460px] text-[16px] leading-[30px] text-[#5A5650] sm:text-[18px]">
            {content.text}
          </p>

          <div className="mt-8 flex flex-col items-center gap-2 text-[15px] text-[#3F3B36] sm:text-[16px]">
            <span>{content.phoneLabel}</span>
            <a
              href={content.phoneHref}
              className="inline-flex items-center gap-2 font-bold transition-colors hover:text-[#B5802F]"
            >
              <Phone
                aria-hidden
                className="h-[18px] w-[18px] text-[#C99045]"
                strokeWidth={1.8}
              />
              {content.phone}
            </a>
            <span className="inline-flex items-center gap-2 text-[#5A5650]">
              <MapPin
                aria-hidden
                className="h-[18px] w-[18px] text-[#C99045]"
                strokeWidth={1.8}
              />
              {content.location}
            </span>
          </div>

          <Link
            href="/hair-scan"
            className="mt-10 inline-flex h-[52px] items-center rounded-full bg-[#C99045] px-9 text-[15px] font-bold tracking-wide text-white transition hover:bg-[#B5802F] sm:text-[16px]"
          >
            {content.home}
          </Link>
        </div>
      </main>

      <CopyrightBar />
    </>
  )
}
