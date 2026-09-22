import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/component/navbar"
import CopyrightBar from "@/component/copyright-bar"

/**
 * Privacy Policy page — /privacy-policy
 *
 * - Same navbar as the home page; slim gold copyright bar (CopyrightBar) as the footer.
 * - Wide layout (1458px container, like the other sections): title, intro and a
 *   sticky "On this page" list on the left; the policy text on the right.
 * - All copy is in `sections` below; each section is a heading plus paragraphs
 *   and/or a bullet list, so it is easy to edit.
 * - The wording is a sensible starting point for a clinic website and should be
 *   reviewed (and adjusted to how the site really collects data) before launch.
 */

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Sindhu’s Derma Solutions",
  description:
    "How Dr. Sindhu’s Derma Solutions collects, uses and protects your personal information.",
}

const clinic = {
  name: "Dr. Sindhu’s Derma Solutions",
  address:
    "First Floor, No .05, 21st Main Rd, near Bda Complex, opposite FIRST COFFEE shop, Siddanna Layout, Banashankari Stage II, Banashankari, Bengaluru, Karnataka 560070",
  phone: "+91 6363136080",
  phoneHref: "tel:+916363136080",
}

const UPDATED = "21 September 2026"

const intro = `${clinic.name} (“we”, “us”, “our”) respects your privacy. This policy explains what personal information we collect when you visit our website, contact us or book a consultation, how we use it, and the choices you have.`

const sections: {
  heading: string
  paragraphs?: string[]
  list?: string[]
  after?: string
}[] = [
  {
    heading: "Information we collect",
    paragraphs: ["We may collect the following information:"],
    list: [
      "Contact details you give us, such as your name, phone number and email address, when you make an enquiry or ask for an appointment.",
      "Information about your skin, hair or aesthetic concern that you choose to share when you contact us or during your consultation.",
      "Records of our communication with you, such as calls, messages and appointment details.",
      "Basic technical information about your visit to our website, such as browser type, device and pages viewed.",
    ],
  },
  {
    heading: "How we use your information",
    paragraphs: ["We use your information to:"],
    list: [
      "Respond to your enquiries and arrange or manage your appointments.",
      "Provide, and follow up on, your consultation and care.",
      "Improve our website and services.",
      "Meet our legal and professional obligations.",
    ],
    after: "We do not sell your personal information.",
  },
  {
    heading: "Medical confidentiality",
    paragraphs: [
      "Health information you share with us in a clinical setting is treated as confidential. It is used only for your care and is shared only as described in this policy or as required by law.",
    ],
  },
  {
    heading: "Sharing your information",
    paragraphs: ["We share your information only:"],
    list: [
      "With our clinic team members who need it to help you.",
      "With trusted service providers who help us run the clinic and website (for example, hosting, communication or appointment tools), and who are expected to protect it.",
      "When you have given us your consent.",
      "When the law, a court or a government authority requires us to.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "Our website may use cookies and similar technologies to make the site work properly and to understand how it is used. You can control or delete cookies through your browser settings; some parts of the site may not work as intended if you turn them off.",
    ],
  },
  {
    heading: "How we protect your information",
    paragraphs: [
      "We take reasonable steps to keep your information safe from loss, misuse and unauthorised access. However, no method of transmission over the internet or of electronic storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "How long we keep your information",
    paragraphs: [
      "We keep your information only for as long as it is needed for the purposes described above, or for as long as the law or professional standards require.",
    ],
  },
  {
    heading: "Your choices and rights",
    paragraphs: [
      "Subject to applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may ask us to:",
    ],
    list: [
      "Tell you what personal information we hold about you.",
      "Correct or update information that is inaccurate or incomplete.",
      "Erase your information, where we are not required to keep it.",
      "Withdraw consent you have given us for a particular use of your information.",
    ],
    after: "To make a request, please contact us using the details below.",
  },
  {
    heading: "Links to other websites",
    paragraphs: [
      "Our website may link to other websites or social media pages, such as Instagram. We are not responsible for the privacy practices or content of those sites, so please read their policies.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "Our website is not directed at children. If you are under 18, please contact us only with the involvement of a parent or guardian.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. The “Last updated” date at the top of this page shows when it was last changed.",
    ],
  },
]

const bodyText =
  "text-[16px] leading-[30px] text-[#5A5650] sm:text-[18px]"

/** all headings, incl. the fixed "Contact us", for the numbered list + anchors */
const contents = [...sections.map((s) => s.heading), "Contact us"]
const anchor = (i: number) => `section-${i + 1}`
const num = (i: number) => String(i + 1).padStart(2, "0")

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="w-full bg-[#FBF8F3]">
        <div className="mx-auto grid max-w-[1458px] grid-cols-1 gap-10 px-4 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-16 lg:pb-28 xl:gap-24">
          {/* ── left: title, intro, contents ─────────────────────── */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[15px] text-[#5A5650] transition-colors hover:text-[#C99045] sm:text-[16px]"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.8} />
              Back to home
            </Link>

            <h1 className="mt-8 text-[36px] leading-[1.15] tracking-[-0.01em] text-[#1F1F1F] sm:text-[48px] lg:text-[56px]">
              Privacy Policy
            </h1>
            <span
              aria-hidden
              className="mt-5 block h-[3px] w-14 rounded-full bg-[#C99045]"
            />
            <p className="mt-5 text-[15px] text-[#6B675F] sm:text-[16px]">
              Last updated: {UPDATED}
            </p>

            <p className={`mt-8 ${bodyText}`}>{intro}</p>

            <nav aria-label="On this page" className="mt-10 hidden lg:block">
              <p className="text-[13px] uppercase tracking-[0.14em] text-[#6B675F]">
                On this page
              </p>
              <ol className="mt-4 space-y-2.5 border-l border-[#E8E0D2]">
                {contents.map((heading, i) => (
                  <li key={heading}>
                    <a
                      href={`#${anchor(i)}`}
                      className="-ml-px flex gap-3 border-l border-transparent pl-4 text-[15px] leading-6 text-[#5A5650] transition-colors hover:border-[#C99045] hover:text-[#C99045]"
                    >
                      <span className="text-[#C99045]">{num(i)}</span>
                      {heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* ── right: the policy ────────────────────────────────── */}
          <div className="divide-y divide-[#E8E0D2] lg:max-w-[920px]">
            {sections.map((section, i) => (
              <section
                key={section.heading}
                id={anchor(i)}
                className="scroll-mt-28 py-8 first:pt-0 sm:py-10 sm:first:pt-0"
              >
                <h2 className="text-[24px] leading-[1.25] text-[#1F1F1F] sm:text-[28px]">
                  <span className="mr-3 text-[#C99045]">{num(i)}</span>
                  {section.heading}
                </h2>

                {section.paragraphs?.map((text) => (
                  <p key={text} className={`mt-4 ${bodyText}`}>
                    {text}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-4 space-y-2.5">
                    {section.list.map((item) => (
                      <li key={item} className={`flex gap-3 ${bodyText}`}>
                        <span
                          aria-hidden
                          className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C99045]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.after && (
                  <p className={`mt-4 ${bodyText}`}>{section.after}</p>
                )}
              </section>
            ))}

            {/* contact */}
            <section
              id={anchor(sections.length)}
              className="scroll-mt-28 py-8 sm:py-10"
            >
              <h2 className="text-[24px] leading-[1.25] text-[#1F1F1F] sm:text-[28px]">
                <span className="mr-3 text-[#C99045]">{num(sections.length)}</span>
                Contact us
              </h2>
              <p className={`mt-4 ${bodyText}`}>
                If you have any questions about this policy or how we handle your
                information, please get in touch:
              </p>
              <address className="mt-5 rounded-2xl border border-[#E8E0D2] bg-white p-6 text-[16px] not-italic leading-[30px] text-[#3F3B36] sm:p-7 sm:text-[18px]">
                <strong className="block text-[#1F1F1F]">{clinic.name}</strong>
                <span className="block">{clinic.address}</span>
                <a
                  href={clinic.phoneHref}
                  className="mt-2 inline-block font-bold transition-colors hover:text-[#B5802F]"
                >
                  {clinic.phone}
                </a>
              </address>
            </section>
          </div>
        </div>
      </main>

      <CopyrightBar />
    </>
  )
}
