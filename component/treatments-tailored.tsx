import Image from "next/image"
import { cloudinaryImages } from "@/lib/cloudinary-images"

/**
 * "Treatments Tailored to You" — intro on the left, five treatment
 * categories listed on the right. Hovering a row (lg+) reveals a photo in
 * the reserved gutter at the right of that row; rows are not clickable.
 *
 * Design notes:
 * - Same two-column pattern as the Privacy Policy page: a sticky intro on
 *   the left (desktop), a list on the right.
 * - Each row is numbered, with its treatments run together and separated by
 *   "•", matching how the content was given.
 * - Hover images use the supplied Cloudinary assets for each category.
 *   The gutter is reserved at lg+ regardless of hover, so nothing shifts.
 * - Headings are <h2>/<h3>, so they pick up the global heading font
 *   (Gilda Display); everything else uses PT Serif.
 * - All copy is in `content` / `categories` so it is easy to replace.
 */

const content = {
  heading: "Treatments Tailored to You",
  lead: "There isn't one treatment that works for everyone.",
  text: "At Derma Solutions, your skin or hair concern is assessed before recommending a treatment plan suited to your needs, goals and skin type.",
}

const categories = [
  {
    title: "Skin & Rejuvenation",
    items: [
      "Peels",
      "Q-Switch",
      "Skin rejuvenation",
      "Diamond Dermal Infusion",
      "Pigmentation treatments",
    ],
    image: cloudinaryImages.skinBanner,
  },
  {
    title: "Hair & Scalp",
    items: [
      "Hair loss treatments",
      "Trichology",
      "Hair-related treatments",
      "Laser hair reduction",
    ],
    image: cloudinaryImages.hairBanner,
  },
  {
    title: "Laser Treatments",
    items: [
      "Laser hair removal",
      "Tattoo removal",
      "Birthmark removal",
      "Redness treatment",
    ],
    image: cloudinaryImages.laserBanner,
  },
  {
    title: "Anti-Ageing & Aesthetics",
    items: [
      "Anti-ageing treatments",
      "Skin tightening",
      "Body treatments",
      "Cellulite treatments",
    ],
    image: cloudinaryImages.antiBanner,
  },
  {
    title: "Specialised Dermatology",
    items: [
      "Dermatosurgery",
      "Pediatric Dermatology",
      "Nail fungus treatments",
    ],
    image: cloudinaryImages.specialised,
  },
]

/** Keep the optional image fallback available if a category has no URL. */
const hasAsset = (src: string) => Boolean(src)

const num = (i: number) => String(i + 1).padStart(2, "0")

export default function TreatmentsTailored() {
  return (
    <section className="w-full bg-[#FBF8F3] px-4 py-6 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1458px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
        {/* ── left: intro ─────────────────────────────────────── */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-[32px] leading-[1.15] tracking-[-0.01em] text-[#1F1F1F] sm:text-[44px] lg:text-[48px]">
            {content.heading}
          </h2>
          <span
            aria-hidden
            className="mt-5 block h-[3px] w-14 rounded-full bg-[#C99045]"
          />
          <p className="mt-6 text-[19px] leading-[30px] text-[#C99045] sm:text-[21px]">
            {content.lead}
          </p>
          <p className="mt-4 text-[16px] leading-[30px] text-[#5A5650] sm:text-[18px]">
            {content.text}
          </p>
        </div>

        {/* ── right: categories ────────────────────────────────── */}
        <ul className="divide-y divide-[#E8E0D2] border-t border-[#E8E0D2] lg:max-w-[920px]">
          {categories.map((category, i) => (
            <li key={category.title}>
              <div className="group relative flex items-start gap-5 py-7 sm:gap-8 sm:py-8 lg:pr-[248px]">
                <span className="text-[16px] leading-[1.4] text-[#C99045] sm:text-[18px]">
                  {num(i)}
                </span>
                <span className="flex-1">
                  <h3 className="text-[22px] leading-[1.3] text-[#1F1F1F] transition-colors duration-300 group-hover:text-[#C99045] sm:text-[26px]">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[26px] text-[#5A5650] sm:text-[17px]">
                    {category.items.join(" • ")}
                  </p>
                </span>

                {/* hover photo — medium size, fades in within the reserved gutter */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 hidden h-[136px] w-[220px] -translate-y-1/2 rotate-3 translate-x-2 overflow-hidden rounded-2xl opacity-0 shadow-[0_12px_28px_rgba(31,31,31,0.18)] transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 lg:block"
                  style={
                    !hasAsset(category.image)
                      ? {
                          background:
                            i % 2 === 0
                              ? "linear-gradient(135deg, #2A2724 0%, #4B3B29 100%)"
                              : "linear-gradient(135deg, #E6C58F 0%, #C99045 100%)",
                        }
                      : undefined
                  }
                >
                  {hasAsset(category.image) && (
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="220px"
                      className="object-cover"
                    />
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
