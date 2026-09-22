import Image from "next/image"
import Link from "next/link"
import { cloudinaryImages } from "@/lib/cloudinary-images"

/**
 * Site footer — white logo on the left; clinic name, address, phone, Instagram
 * icon and copyright on the right, on a near-black background.
 *
 * Design notes:
 * - Measurements follow a 1900px-wide reference: 60px side padding, two equal
 *   columns with a 16px gap, text column starting at x=958.
 * - The coloured Cloudinary logo is turned solid
 *   white with a CSS filter (brightness(0) invert(1)), so no second file is needed.
 * - The clinic name is an <h2>, so it picks up the global heading font
 *   (Gilda Display); everything else uses PT Serif.
 * - All copy is in `content` so it is easy to replace.
 */

const content = {
  name: "Dr. Sindhu’s Derma Solutions",
  address:
    "First Floor, No .05, 21st Main Rd, near Bda Complex, opposite FIRST COFFEE shop, Siddanna Layout, Banashankari Stage II, Banashankari, Bengaluru, Karnataka 560070",
  phone: "+91 6363136080",
  phoneHref: "tel:+916363136080",
  instagram: "https://www.instagram.com/dermasolutions_bangalore?igsh=MXc3d2FlZmQwbXc0cA%3D%3D",
  copyright: "Copyright © 2025 DrSindhu’sDermaSolutions - All Rights Reserved.",
  privacy: "Privacy Policy",
  privacyHref: "/privacy-policy",
}

const InstagramIcon = (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className="h-[25px] w-[25px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.4" />
    <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" />
  </svg>
)

export default function SiteFooter() {
  return (
    <footer id="footer-content" className="w-full bg-[#131313] px-6 pb-16 pt-8 text-white sm:px-10 lg:px-[60px] lg:pb-[50px] lg:pt-[50px]">
      <div className="mx-auto grid max-w-[1900px] grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-4">
        {/* logo */}
        <Link
          href="/"
          data-stagger="0"
          data-reveal-direction="left"
          aria-label="Dr. Sindhu’s Derma Solutions — home"
          className="block w-fit max-w-full lg:mt-[18px]"
        >
          <Image
            src={cloudinaryImages.logo}
            alt="Dr. Sindhu’s Derma Solutions — Medical & Aesthetic Dermatology"
            width={901}
            height={277}
            className="h-auto w-[300px] max-w-full [filter:brightness(0)_invert(1)] sm:w-[400px] lg:w-[510px]"
          />
        </Link>

        {/* details */}
        <div>
          <h2 data-stagger="1" data-reveal-direction="right" className="text-[26px] leading-10 text-white sm:text-[33px]">
            {content.name}
          </h2>

          <p data-stagger="2" data-reveal-direction="left" className="mt-3 max-w-[882px] text-[17px] leading-[31px] text-[#F2F2F2] sm:text-[20.4px] lg:mt-[22px]">
            {content.address}
          </p>

          <a
            href={content.phoneHref}
            data-stagger="3"
            data-reveal-direction="right"
            className="mt-3 inline-block text-[17px] leading-[31px] text-[#F2F2F2] transition-colors hover:text-[#C99045] sm:text-[20.4px]"
          >
            {content.phone}
          </a>

          <div className="mt-4 lg:mt-[26px]">
            <a
              href={content.instagram}
              data-stagger="4"
              data-reveal-direction="left"
              aria-label="Instagram"
              className="inline-block text-white transition-colors hover:text-[#C99045]"
            >
              {InstagramIcon}
            </a>
          </div>

          {/* copyright + privacy link: one row from md up; the text scales down so it always fits */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] leading-[31px] text-[#F2F2F2] sm:text-[16px] md:flex-nowrap md:text-[18px] lg:mt-[17px] lg:text-[clamp(12px,1.1vw,20.4px)]">
            <p data-stagger="5" data-reveal-direction="right" className="md:whitespace-nowrap">{content.copyright}</p>
            <span aria-hidden className="hidden h-5 w-px shrink-0 bg-white/30 md:block" />
            <Link
              href={content.privacyHref}
              data-stagger="6"
              data-reveal-direction="left"
              className="underline underline-offset-4 transition-colors hover:text-[#C99045] md:whitespace-nowrap"
            >
              {content.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
