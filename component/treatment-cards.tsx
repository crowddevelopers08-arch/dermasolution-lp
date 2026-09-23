import { ArrowUpRight } from "lucide-react"
import { BookLink } from "@/component/consultation-form"

/**
 * "What Are You Looking to Treat?" — centred heading, then four concern cards.
 * Each card: number + title at the top-left, the concerns listed underneath, and
 * a circular arrow button in a rounded notch at the bottom-right corner.
 * Clicking a card opens the "Book a Consultation" form.
 *
 * Design notes:
 * - Solid colours from the logo palette, alternating: cards 1 and 3 are dark
 *   charcoal, cards 2 and 4 are gold. See `themes` below to change them.
 * - Cards stretch to the same height (their lists have different lengths).
 * - The notch is faked with page-coloured shapes on top of the card:
 *     1. a square with a rounded top-left corner  -> the notch itself
 *     2. a quarter-circle "inverse corner" above it -> rounds the card's right edge into the notch
 *     3. a quarter-circle "inverse corner" left of it -> rounds the card's bottom edge into the notch
 *   Colour `#FFFFFF` in those shapes MUST match the section background.
 * - Headings are <h2>/<h3>, so they pick up the global heading font
 *   (Gilda Display); everything else uses PT Serif.
 */

/** classes for each colour scheme (dark = charcoal card, gold = gold card) */
const themes = {
  dark: {
    card: "bg-[#737373]",
    number: "text-[#E6C58F]",
    title: "text-white",
    divider: "bg-white/25",
    item: "text-white/90",
    bullet: "bg-[#C99045]",
  },
  gold: {
    card: "bg-[#C99045]",
    number: "text-[#1F1F1F]/70",
    title: "text-[#1F1F1F]",
    divider: "bg-[#1F1F1F]/25",
    item: "text-[#1F1F1F]",
    bullet: "bg-[#1F1F1F]",
  },
}

const cards: {
  id: string
  title: string
  theme: keyof typeof themes
  items: string[]
}[] = [
  {
    id: "01",
    title: "Skin Concerns",
    theme: "dark",
    items: [
      "Acne",
      "Pigmentation",
      "Uneven skin tone",
      "Dullness",
      "Skin texture",
      "Redness",
    ],
  },
  {
    id: "02",
    title: "Hair Concerns",
    theme: "gold",
    items: ["Hair fall", "Hair thinning", "Scalp concerns", "Hair reduction"],
  },
  {
    id: "03",
    title: "Aesthetic Concerns",
    theme: "dark",
    items: [
      "Ageing",
      "Fine lines",
      "Skin laxity",
      "Unwanted hair",
      "Tattoos",
      "Birthmarks",
    ],
  },
  {
    id: "04",
    title: "Other Concerns",
    theme: "gold",
    items: [
      "Nail fungus",
      "Cellulite",
      "Body tightening",
      "Bridal skin preparation",
    ],
  },
]

export default function TreatmentCards() {
  return (
    <section className="w-full bg-white px-4 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-20">
      {/* heading*/}
      <div className="mx-auto mb-10 flex max-w-[1100px] flex-col items-center text-center sm:mb-14">
        <h2 data-reveal-direction="top" className="text-balance text-[32px] leading-[1.15] tracking-[-0.01em] text-[#1F1F1F] sm:text-[44px] lg:text-[52px]">
          Concerns that We Address at Derma Solutions
        </h2>
        <span aria-hidden className="mt-5 h-[3px] w-14 rounded-full bg-[#C99045]" />
      </div>

      <ul className="mx-auto grid max-w-[1832px] grid-cols-1 gap-[38px] sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => {
          const t = themes[card.theme]
          return (
            <li key={card.id} data-stagger={i} data-reveal-direction={i % 2 === 0 ? "left" : "right"} className="flex">
              <BookLink
                aria-label={card.title}
                className={`group relative flex w-full flex-col rounded-[32px] p-8 pb-[46px] transition-transform duration-300 hover:-translate-y-1 sm:p-[50px] sm:pb-[46px] lg:p-[36px] lg:pb-[46px] xl:p-[44px] xl:pb-[46px] 2xl:p-[50px] 2xl:pb-[46px] ${t.card}`}
              >
                {/* number */}
                <span
                  className={`block text-[16px] leading-none tracking-[0.04em] ${t.number}`}
                >
                  {card.id}
                </span>

                {/* title — top left */}
                <h3 className={`mt-4 text-[28px] leading-[34px] lg:text-[clamp(20px,1.5vw,28px)] 2xl:text-[28px] ${t.title}`}>
                  {card.title}
                </h3>

                {/* divider */}
                <span
                  aria-hidden
                  className={`mt-5 block h-px w-full ${t.divider}`}
                />

                {/* concerns */}
                <ul className="mt-5 space-y-1">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-3 text-[16px] leading-[28px] ${t.item}`}
                    >
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${t.bullet}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* notch: page-coloured square with rounded inner corner */}
                <span
                  aria-hidden
                  className="absolute bottom-0 right-0 h-[76px] w-[76px] rounded-tl-[32px] bg-[#FFFFFF]"
                />
                {/* inverse corner — card's right edge curving into the notch */}
                <span
                  aria-hidden
                  className="absolute bottom-[76px] right-0 h-8 w-8 bg-[radial-gradient(circle_at_0_0,transparent_31.5px,#FFFFFF_32px)]"
                />
                {/* inverse corner — card's bottom edge curving into the notch */}
                <span
                  aria-hidden
                  className="absolute bottom-0 right-[76px] h-6 w-6 bg-[radial-gradient(circle_at_0_0,transparent_23.5px,#FFFFFF_24px)]"
                />

                {/* arrow button */}
                <span
                  aria-hidden
                  className="absolute bottom-0 right-0 flex h-16 w-16 items-center justify-center rounded-full bg-[#737373] text-white transition-colors duration-300 group-hover:bg-[#C99045]"
                >
                  <ArrowUpRight
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-px group-hover:-translate-y-px"
                    strokeWidth={1.8}
                  />
                </span>
              </BookLink>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
