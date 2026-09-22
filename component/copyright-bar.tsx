import Link from "next/link"

/**
 * Slim copyright bar — used as the footer on the Thank You and Privacy Policy
 * pages. Copyright + credit on the left, "Privacy Policy" link on the right,
 * on a full-width gold bar.
 *
 * Design notes:
 * - Gold (#C99045) is the logo colour; text is white.
 * - Same 1458px container as the navbar and sections, so edges line up.
 * - Below sm the two items stack and centre.
 * - All copy is in `content` so it is easy to replace.
 */

const content = {
  name: "Dr. Sindhu’s Derma Solutions",
  credit: "Powered By GrowMedico Developers",
  privacy: "Privacy Policy",
  privacyHref: "/privacy-policy",
}

export default function CopyrightBar() {
  return (
    <footer className="w-full bg-[#C99045] text-white">
      <div className="mx-auto flex max-w-[1458px] flex-col items-center justify-between gap-1 px-4 py-4 text-center text-[15px] font-medium leading-7 sm:flex-row sm:gap-6 sm:px-8 sm:text-left sm:text-[17px]">
        <p>
          © {new Date().getFullYear()} {content.name}. All rights reserved
          <span aria-hidden className="mx-2">
            |
          </span>
          {content.credit}
        </p>

        <Link
          href={content.privacyHref}
          className="shrink-0 underline-offset-4 transition-opacity hover:underline hover:opacity-90"
        >
          {content.privacy}
        </Link>
      </div>
    </footer>
  )
}
