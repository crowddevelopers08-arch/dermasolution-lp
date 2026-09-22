import Image from "next/image"
import Link from "next/link"
import { BookButton } from "@/component/consultation-form"

/**
 * Top navbar — logo on the left, "Book Now" button (open-book icon + text)
 * on the right.
 *
 * The logo is a transparent WebP in grey + gold, so the bar is kept light
 * (warm off-white) to keep it readable. The button uses the gold from the logo.
 */

const BookIcon = (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3.5 5.5c1.8-1 4.6-1 6.5 0v13c-1.9-1-4.7-1-6.5 0Z" />
    <path d="M20.5 5.5c-1.8-1-4.6-1-6.5 0v13c1.9-1 4.7-1 6.5 0Z" />
  </svg>
)

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E0D2] bg-[#FBF8F3]/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-[1458px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-8"
      >
        {/* logo */}
        <Link href="/" aria-label="Dr. Sindhu's Derma Solutions — home" className="shrink-0">
          <Image
            src="/Derma+Solutions+Logo.webp"
            alt="Dr. Sindhu's Derma Solutions — Medical & Aesthetic Dermatology"
            width={901}
            height={277}
            priority
            className="h-10 w-auto sm:h-14"
          />
        </Link>

        {/* CTA */}
        <BookButton
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C99045] px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white transition hover:bg-[#B5802F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C99045] sm:gap-2.5 sm:px-7 sm:py-3 sm:text-[15px]"
        >
          {BookIcon}
          Book Now
        </BookButton>
      </nav>
    </header>
  )
}
