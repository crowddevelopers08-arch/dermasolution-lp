import Image from "next/image"
import Link from "next/link"
import { BookButton } from "@/component/consultation-form"
import { cloudinaryImages } from "@/lib/cloudinary-images"

/**
 * Top navbar — logo on the left, "Book a Consultation" button (open-book
 * icon + text) on the right.
 *
 * The logo is a transparent WebP in grey + gold, so the bar is kept light
 * (warm off-white) to keep it readable. The button uses the gold from the logo.
 * Below 368px wide the button says "Book Now"; from 368px up it says
 * "Book a Consultation".
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
        <Link href="/hair-scan" aria-label="Dr. Sindhu's Derma Solutions — home" className="shrink-0">
          <Image
            src={cloudinaryImages.logo}
            alt="Dr. Sindhu's Derma Solutions — Medical & Aesthetic Dermatology"
            width={901}
            height={277}
            priority
            className="h-14 w-auto sm:h-25"
          />
        </Link>

        {/* CTA label changes at 368px */}
        <BookButton
          aria-label="Book a Consultation"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#C99045] px-3 text-[12px] font-semibold text-white transition hover:bg-[#B5802F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C99045] min-[368px]:h-auto min-[368px]:py-2.5 sm:gap-2.5 sm:px-7 sm:py-3 sm:text-[15px]"
        >
          {BookIcon}
          <span className="min-[368px]:hidden">Book Now</span>
          <span className="hidden min-[368px]:inline">Book a Consultation</span>
        </BookButton>
      </nav>
    </header>
  )
}
