import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { BookButton } from "@/component/consultation-form";
import { cloudinaryImages } from "@/lib/cloudinary-images";

/**
 * "Book a consultation" banner — headline, short copy, CTA and contact details
 * on the left; a gold panel with soft rings and the doctor cut-out on the right.
 *
 * Design notes:
 * - Palette comes from the Derma Solutions logo: gold #C99045 (hover #B5802F),
 *   charcoal #1F1F1F, warm grey text, cream #FBF8F3.
 * - The h2 picks up the global heading font (Gilda Display); everything else
 *   uses PT Serif.
 * - The doctor image is a Cloudinary transparent PNG. From xl up it
 *   stands on the panel and pops out of the top edge; below xl it moves into
 *   its own card underneath.
 * - All copy is in `content` so it is easy to replace.
 */

const content = {
  heading: "Have a Skin or Hair Concern?",
  lead: "You don't need to figure out the treatment on your own.",
  text: "Tell us what you're looking to improve, and our team can help you take the next step.",
  button: "BOOK A CONSULTATION",
  location: "Banashankari, Bangalore",
  phone: "+91 6363136080",
  phoneHref: "tel:+916363136080",
  image: cloudinaryImages.doctorCutout,
  imageAlt: "Doctor ready to help with your consultation",
};

const GOLD = "#C99045";

export default function AppointmentBanner() {
  return (
    <section
      id="book-appointment"
      aria-label="Book a consultation"
      className="relative overflow-hidden px-4 pb-10 pt-10 sm:px-6 xl:px-6 xl:pt-[100px]"
    >
      <div className="relative mx-auto min-h-[298px] w-full max-w-[1684px] overflow-visible rounded-[26px] border border-[#C99045]/60 bg-[#FBF8F3]">
        {/* gold panel + rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[25px]">
          <div
            className="absolute inset-y-0 right-0 w-[36%]"
            style={{ background: GOLD }}
          />
          <div className="absolute right-[25.5%] top-1/2 size-[430px] -translate-y-1/2 rounded-full border-[58px] border-[#C99045]/35 sm:size-[500px] xl:size-[565px]" />
          <div className="absolute right-[26.5%] top-1/2 size-[335px] -translate-y-1/2 rounded-full border-[55px] border-white/55 sm:size-[405px] xl:size-[450px]" />
        </div>

        {/* copy */}
        <div className="relative z-10 flex min-h-[296px] w-full flex-col items-start justify-center px-7 py-9 sm:px-10 xl:max-w-[62%] xl:px-10">
          <h2 className="max-w-[840px] text-[28px] leading-tight tracking-[-0.01em] text-[#1F1F1F] sm:text-[34px] xl:text-[40px]">
            {content.heading}
          </h2>
          <p className="mt-5 max-w-[820px] text-[17px] font-bold leading-relaxed text-[#1F1F1F] sm:text-[18px] xl:mt-6">
            {content.lead}
          </p>
          <p className="mt-2 max-w-[820px] text-[16px] leading-relaxed text-[#5A5650] sm:text-[18px]">
            {content.text}
          </p>

          <BookButton
            className="mt-8 inline-flex h-[50px] items-center rounded-full bg-[#C99045] px-7 text-[15px] font-bold tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-[#B5802F] sm:mt-10 sm:text-[16px]"
          >
            {content.button}
          </BookButton>

          {/* contact */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-[#3F3B36] sm:text-[16px]">
            <span className="inline-flex items-center gap-2">
              <MapPin
                aria-hidden
                className="h-[18px] w-[18px] shrink-0"
                strokeWidth={1.8}
                style={{ color: GOLD }}
              />
              {content.location}
            </span>
            <a
              href={content.phoneHref}
              className="inline-flex items-center gap-2 font-bold transition hover:text-[#B5802F]"
            >
              <Phone
                aria-hidden
                className="h-[18px] w-[18px] shrink-0"
                strokeWidth={1.8}
                style={{ color: GOLD }}
              />
              {content.phone}
            </a>
          </div>
        </div>

        {/* doctor — xl and up: stands on the panel */}
        <div className="pointer-events-none absolute -top-[100px] right-[3.5%] z-20 hidden h-[451px] w-[390px] overflow-hidden rounded-t-[180px] xl:block 2xl:right-[6%]">
          <Image
            src={content.image}
            alt={content.imageAlt}
            width={564}
            height={653}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      {/* doctor — below xl: own card */}
      <div
        className="relative mx-auto mt-5 block max-w-[420px] overflow-hidden rounded-[24px] pt-5 max-sm:pt-0 xl:hidden"
        style={{ background: GOLD }}
      >
        <Image
          src={content.image}
          alt={content.imageAlt}
          width={564}
          height={653}
          className="mx-auto h-[390px] w-full object-cover object-top"
        />
      </div>
    </section>
  );
}
