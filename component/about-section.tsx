import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { BookButton } from "@/component/consultation-form";
import { cloudinaryImages } from "@/lib/cloudinary-images";

/**
 * "About Us" section — photo card with a floating quote card on the left;
 * badge, heading, intro, highlighted quote, feature row and a button + avatars
 * row on the right; a doctor cut-out standing in the bottom-right corner.
 *
 * Design notes:
 * - Images use the supplied Cloudinary assets (see `content` below).
 * - The cut-out (transparent PNG, 564x653) only shows from 1700px wide: below
 *   that there is no free space beside the text column and it would cover the
 *   button row.
 * - Measurements follow a 1897px-wide reference: 1458px container, photo card
 *   694x708, 52px gap, ~712px text column.
 * - Headings are <h2>/<h3>, so they pick up the global heading font
 *   (Gilda Display); everything else uses PT Serif.
 * - All copy is in `content` so it is easy to replace. `floating`, `feature`
 *   and `results` are optional — when `null` those blocks are not rendered.
 *
 * Mobile order vs desktop: on phones/tablets the visual order is
 * badge -> heading -> intro -> PHOTO -> quote/feature/button (photo sits
 * between the intro and the rest). On desktop (lg+) it's the original
 * side-by-side layout, untouched. This is done with `display: contents`:
 * the "top" (badge/heading/intro) and "bottom" (quote/feature/.../avatars)
 * blocks are plain grid siblings of the photo on mobile (so `order-*` can
 * interleave them with the photo), and re-group into one normal flex column
 * at lg — which reconstructs the exact original desktop text column.
 */

const content = {
  badge: "Dermatologist | Trichology & Aesthetic Care",
  heading: "Meet Dr Sindhu Priya",
  intro:
    "Dr Sindhu Priya is a board-certified medical professional with qualifications in Clinical Dermatology and specialised training in Trichology and Hair Transplantation.",
  quote:
    "Her areas of expertise include clinical dermatology, cosmetology, trichology, dermatosurgery and anti-ageing.",
  button: "CONSULT DR SINDHU",
  // Optional blocks — fill these in to show them again; leave `null` to hide.
  floating: null as { text: string; link: string } | null, // white quote card on the photo
  feature: null as { title: string; text: string } | null, // icon + title row
  results: {
    title: "Successful Treatments",
    text: "Quality care with proven results",
  } as { title: string; text: string } | null, // avatars + title
  photo: cloudinaryImages.doctorPhoto,
  avatars: [
    {
      src: cloudinaryImages.avatar1,
      tint: "linear-gradient(135deg,#D9B77E,#A8712F)",
    },
    {
      src: cloudinaryImages.avatar2,
      tint: "linear-gradient(135deg,#CFCAC2,#8A8680)",
    },
    {
      src: cloudinaryImages.avatar3,
      tint: "linear-gradient(135deg,#E6C58F,#C99045)",
    },
  ],
  cutout: cloudinaryImages.doctorCutout,
};

/** Keep the optional image fallback available if a URL is missing. */
const hasAsset = (src: string) => Boolean(src);

const NAVY = "text-[#1F1F1F]";
const GREEN = "#C99045";

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 max-sm:pb-10 pb-16 pt-12 sm:px-8 2xl:pt-[71px]">
      {/* doctor cut-out — bottom-right corner, only when there is room beside the column */}
      {hasAsset(content.cutout) && (
        <Image
          src={content.cutout}
          alt=""
          aria-hidden
          width={564}
          height={653}
          className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-[231px] w-auto min-[1700px]:block"
        />
      )}

      <div className="relative z-10 mx-auto grid max-w-[1458px] grid-cols-1 gap-6 lg:grid-cols-[694fr_712fr] lg:gap-[52px]">
        {/* ── photo card — mobile: order-2 (after intro); desktop: normal (column 1) ── */}
        <div
          className="relative order-2 h-[460px] overflow-hidden rounded-[24px] sm:h-[600px] lg:order-none lg:h-[clamp(590px,calc(100vh-120px),708px)]"
          style={{
            background: "linear-gradient(135deg,#EFE6D6 0%,#D8C3A2 100%)",
          }}
        >
          {hasAsset(content.photo) && (
            <Image
              src={content.photo}
              alt="Dr Sindhu Priya"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          )}

          {/* floating quote card */}
          {content.floating && (
            <div className="absolute bottom-4 left-4 flex h-[300px] w-[calc(100%-32px)] max-w-[344px] flex-col justify-end overflow-hidden rounded-[24px] bg-white px-[35px] pb-7 sm:bottom-[23px] sm:left-[23px]">
              {/* watermark quote mark */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-[32px] top-[8px] select-none font-serif text-[210px] font-bold leading-none text-[#F3ECDF]"
              >
                “
              </span>

              <p className={`relative text-[21px] font-bold leading-8 ${NAVY}`}>
                {content.floating.text}
              </p>
              <a
                href="#"
                className={`relative mt-[18px] w-fit text-[21px] font-bold leading-8 underline underline-offset-[5px] ${NAVY}`}
              >
                {content.floating.link}
              </a>
            </div>
          )}
        </div>

        {/* ── text column ──────────────────────────────────────────
            Mobile: "contents" — badge/heading/intro and quote/.../avatars
            become direct siblings of the photo, so order-* can interleave
            them with it. Desktop (lg+): becomes one normal flex column
            again, exactly reconstructing the original layout. */}
        <div className="contents lg:flex lg:flex-col lg:justify-center lg:py-[29px]">
          {/* badge + heading + intro — mobile: order-1 (before the photo) */}
          <div className="order-1 lg:order-none">
            {/* badge */}
            <span className="inline-flex min-h-[39px] max-w-full items-center rounded-full border border-[#E8E0D2] bg-white px-5 py-1">
              <span className={`text-[14px] font-bold ${NAVY}`}>
                {content.badge}
              </span>
            </span>

            {/* heading */}
            <h2
              className={`mt-[14px] text-[32px] leading-[1.15] tracking-[-0.01em] sm:text-[44px] lg:text-[52px] lg:leading-[60px] ${NAVY}`}
            >
              {content.heading}
            </h2>

            {/* intro */}
            <p className="relative mt-[15px] text-[16px] leading-[30px] text-[#5A5650] sm:text-[18px]">
              {content.intro}
              {/* tiny accent dot */}
              <span
                aria-hidden
                className="absolute left-[303px] top-[6px] hidden h-2 w-2 lg:block"
              >
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-60"
                  style={{ background: GREEN }}
                />
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ background: GREEN }}
                />
              </span>
            </p>
          </div>

          {/* quote + feature + divider + button/avatars — mobile: order-3 (after the photo) */}
          <div className="order-3 lg:order-none">
          {/* highlighted quote */}
          <blockquote
            className="mt-3 rounded-l-[6px] border-l-4 bg-[linear-gradient(90deg,#F6F1E8_0%,rgba(246,241,232,0)_100%)] py-[23px] pl-6 pr-8 sm:pl-[34px]"
            style={{ borderColor: GREEN }}
          >
            <p className="text-[16px] leading-[30px] text-[#3F3B36] sm:text-[18px]">
              {content.quote}
            </p>
          </blockquote>

          {/* feature */}
          {content.feature && (
            <div className="mt-[38px] flex items-center gap-[21px]">
              <Sparkles
                aria-hidden
                className="h-[42px] w-[42px] shrink-0"
                strokeWidth={1.4}
                style={{ color: GREEN }}
              />
              <div>
                <h3 className={`text-[20px] leading-7 sm:text-[22px] ${NAVY}`}>
                  {content.feature.title}
                </h3>
                <p className="mt-1.5 text-[16px] leading-7 text-[#6B675F] sm:text-[18px]">
                  {content.feature.text}
                </p>
              </div>
            </div>
          )}

          {/* divider */}
          <span
            aria-hidden
            className="max-sm:mt-[25px] mt-[51px] block h-px w-full bg-[#E8E0D2]"
          />

          {/* button + avatars */}
          <div className="mt-[49px] max-sm:mt-[23px] flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-6">
            <BookButton
              className="group inline-flex h-[54px] shrink-0 items-center gap-3 rounded-full px-6 text-[15px] font-bold text-white transition-colors duration-300 hover:bg-[#B5802F] 2xl:h-[57px] 2xl:gap-[14px] 2xl:px-[27px] 2xl:text-[16px]"
              style={{ background: GREEN }}
            >
              {content.button}
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </BookButton>

            {content.results && (
              <div className="flex min-w-0 items-center gap-3 2xl:gap-[14px]">
                <div className="flex shrink-0">
                  {content.avatars.map((a, i) => (
                    <span
                      key={a.src}
                      className={`relative block h-12 w-12 overflow-hidden rounded-full border-[3px] border-white 2xl:h-14 2xl:w-14 ${
                        i > 0 ? "-ml-3 2xl:-ml-[15px]" : ""
                      }`}
                      style={{ background: a.tint, zIndex: i + 1 }}
                    >
                      {hasAsset(a.src) && (
                        <Image
                          src={a.src}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </span>
                  ))}
                </div>
                <div className="min-w-0">
                  <h3
                    className={`text-[19px] leading-7 2xl:text-[22px] ${NAVY}`}
                  >
                    {content.results.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-6 text-[#6B675F] 2xl:mt-1.5 2xl:text-[16px] 2xl:leading-7">
                    {content.results.text}
                  </p>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
