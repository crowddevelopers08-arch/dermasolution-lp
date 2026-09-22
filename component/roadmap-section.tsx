"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

/**
 * Roadmap — a winding road with four coloured icon badges on it, each with a
 * coloured title and a short caption.
 *
 * Design notes:
 * - Desktop (lg+): everything is laid out on a 1280x720 canvas (16:9) and
 *   positioned in percentages, so it scales with the container. Sizes use
 *   container-query units (`cqw`, 1cqw = 1% of the container width).
 * - The road is ONE SVG path (dark stroke) with a dashed white stroke on top.
 *   It is drawn far past both edges of the canvas, so it bleeds to the screen
 *   edges at any width (the section clips it with `overflow-hidden`).
 * - Below lg the canvas would be too small to read, so a simple vertical road
 *   is shown instead.
 * - The heading is an <h2>, so it picks up the global heading font
 *   (Gilda Display); everything else uses PT Serif. Gilda has a single weight,
 *   so the "bold" look is made with a text stroke.
 * - All copy is in `content` / `steps` so it is easy to replace.
 *
 * Animation (starts once, when the section scrolls into view):
 *   1. The road "draws" itself left -> right along its path. This is a mask:
 *      a thick white stroke over the road that grows via stroke-dashoffset
 *      (`pathLength=1` makes 0..1 = start..end). Linear timing, so a badge's
 *      `at` delay = DRAW_S x (distance along the road / total distance).
 *   2. Each badge pops in as the road reaches it, then its caption fades up.
 *   3. Afterwards the white centre dashes drift slowly along the road.
 *   Visitors who prefer reduced motion get the finished static layout.
 */

const content = {
  titleBold: "",
  titleLight: "Why Derma Solutions?",
}

const ROAD = "#2E2A27"

/* ── white glyphs (24x24) ─────────────────────────────────────────────── */

const TeamSearchIcon = (
  <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full" fill="#fff">
    {/* people */}
    <circle cx="12" cy="6" r="2.7" />
    <path d="M6.6 14.2v-1.3a4.1 4.1 0 014.1-4.1h2.6a4.1 4.1 0 014.1 4.1v1.3z" />
    <circle cx="5.4" cy="8" r="2" />
    <circle cx="18.6" cy="8" r="2" />
    <path d="M1.2 13.6v-1.1A3.2 3.2 0 014.4 9.3h.2a5.4 5.4 0 00-1.7 3.9v.4z" />
    <path d="M22.8 13.6v-1.1a3.2 3.2 0 00-3.2-3.2h-.2a5.4 5.4 0 011.7 3.9v.4z" />
    {/* magnifier */}
    <circle
      cx="12.2"
      cy="17.4"
      r="3.6"
      fill="none"
      stroke="#fff"
      strokeWidth="1.7"
    />
    <path
      d="M14.9 20l2.7 2.6"
      fill="none"
      stroke="#fff"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
)

const BriefcaseIcon = (
  <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
    <path
      d="M8.6 6.2V4.6A1.6 1.6 0 0110.2 3h3.6a1.6 1.6 0 011.6 1.6v1.6"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <rect x="2.5" y="6.2" width="19" height="13.6" rx="2.4" fill="#fff" />
    <path d="M2.5 12.4h19" stroke="#717171" strokeWidth="1.1" />
    <rect x="10.2" y="10.8" width="3.6" height="3.2" rx="0.8" fill="#717171" />
  </svg>
)

const GroupIcon = (
  <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full" fill="#fff">
    <circle cx="12" cy="6.2" r="2.7" />
    <circle cx="5.2" cy="8.2" r="2.1" />
    <circle cx="18.8" cy="8.2" r="2.1" />
    <path d="M6.8 17.6v-1.9a4.6 4.6 0 014.6-4.6h1.2a4.6 4.6 0 014.6 4.6v1.9z" />
    <path d="M1 16.6v-1.4a3.6 3.6 0 013.6-3.6h.5a6 6 0 00-1.9 4.4v.6z" />
    <path d="M23 16.6v-1.4a3.6 3.6 0 00-3.6-3.6h-.5a6 6 0 011.9 4.4v.6z" />
    <path d="M1 18.6h22v1.4a1 1 0 01-1 1H2a1 1 0 01-1-1z" />
  </svg>
)

const ChartIcon = (
  <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
    <path
      d="M3.5 2.8v17.7h17.7"
      fill="none"
      stroke="#fff"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g fill="#fff">
      <rect x="7" y="13.6" width="3" height="4.6" rx="0.6" />
      <rect x="11.6" y="10.6" width="3" height="7.6" rx="0.6" />
      <rect x="16.2" y="7.6" width="3" height="10.6" rx="0.6" />
    </g>
    <path
      d="M7.2 9.6l4-3.4 2.8 2.2 5-4.6M15.6 3.8h3.8v3.8"
      fill="none"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ── steps ────────────────────────────────────────────────────────────── */
/* (x, y) = centre of the badge on the 1280x720 canvas.
   `caption` = centre x and the y of its top edge (from: "top") or bottom
   edge (from: "bottom") — so captions above the road grow upwards.        */

const steps: {
  title: string
  text: string
  color: string
  icon: ReactNode
  badge: { x: number; y: number }
  caption: { x: number; y: number; from: "top" | "bottom" }
  /** seconds after the start when the road reaches this badge */
  at: number
}[] = [
  {
    title: "Dermatologist-Led",
    text: "Your treatment plan is guided by a qualified dermatologist.",
    color: "#C99045",
    icon: TeamSearchIcon,
    badge: { x: 216, y: 472 },
    caption: { x: 218, y: 545, from: "top" },
    at: 0.35,
  },
  {
    title: "Personalised Approach",
    text: "Treatments are selected based on your individual concern — not a one-size-fits-all approach.",
    color: "#717171",
    icon: BriefcaseIcon,
    badge: { x: 549, y: 472 },
    caption: { x: 544, y: 545, from: "top" },
    at: 0.88,
  },
  {
    title: "Advanced Treatments",
    text: "A range of modern dermatological, laser and aesthetic treatments available under one roof.",
    color: "#A8712F",
    icon: GroupIcon,
    badge: { x: 741, y: 247 },
    caption: { x: 744, y: 66, from: "top" },
    at: 2.34,
  },
  {
    title: "Comprehensive Care",
    text: "Address skin, hair, scalp, and aesthetic concerns in one clinic.",
    color: "#8C7B6B",
    icon: ChartIcon,
    badge: { x: 1073, y: 247 },
    caption: { x: 1071, y: 66, from: "top" },
    at: 2.87,
  },
]

const pctX = (x: number) => `${(x / 1280) * 100}%`
const pctY = (y: number) => `${(y / 720) * 100}%`

/** "bold" for Gilda Display (single weight) */
const BOLD = "[-webkit-text-stroke:0.045em_currentColor]"

/** road: the whole path (bleeds far past both edges) … */
const ROAD_FULL =
  "M-3000 472H745A45 45 0 00790 427V405A45 45 0 00745 360H545A45 45 0 01500 315V292A45 45 0 01545 247H4300"
/** … and the part inside the 1280x720 canvas, which is the part that animates */
const ROAD_CANVAS =
  "M0 472H745A45 45 0 00790 427V405A45 45 0 00745 360H545A45 45 0 01500 315V292A45 45 0 01545 247H1280"

/** seconds the road takes to draw across the canvas */
const DRAW_S = 3.2
/** seconds between badges on the mobile road */
const MOBILE_GAP_S = 0.75

export default function RoadmapSection() {
  const ref = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      setStarted(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /** fade + rise into place after `delay` seconds */
  const rise = (delay: number, distance = 14) => ({
    opacity: started ? 1 : 0,
    transform: started ? "translateY(0)" : `translateY(${distance}px)`,
    transition: reduced
      ? "none"
      : `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  })

  /** springy pop-in after `delay` seconds */
  const pop = (delay: number) => ({
    opacity: started ? 1 : 0,
    transform: started ? "scale(1)" : "scale(0.4)",
    transition: reduced
      ? "none"
      : `opacity 0.3s ease ${delay}s, transform 0.55s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
  })

  /** stroke draw-in for a path with pathLength=1 */
  const draw = (seconds: number, delay = 0) => ({
    strokeDashoffset: started ? 0 : 1,
    transition: reduced
      ? "none"
      : `stroke-dashoffset ${seconds}s linear ${delay}s`,
  })

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#FBF8F3]"
    >
      {/* ── desktop: 16:9 canvas ─────────────────────────────────── */}
      <div className="@container relative mx-auto hidden aspect-[16/9] w-full max-w-[1440px] lg:block">
        {/* road */}
        <svg
          viewBox="0 0 1280 720"
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          <defs>
            <mask
              id="roadmap-reveal"
              maskUnits="userSpaceOnUse"
              x="-4000"
              y="-200"
              width="9600"
              height="1200"
            >
              {/* road left of the canvas: fades in */}
              <rect
                x="-3000"
                y="440"
                width="3000"
                height="64"
                fill="#fff"
                style={{
                  opacity: started ? 1 : 0,
                  transition: reduced ? "none" : "opacity 0.5s ease",
                }}
              />
              {/* road inside the canvas: draws along its path */}
              <path
                d={ROAD_CANVAS}
                pathLength={1}
                stroke="#fff"
                strokeWidth="64"
                strokeDasharray="1 2"
                style={draw(DRAW_S)}
              />
              {/* road right of the canvas: continues once the draw finishes */}
              <path
                d="M1280 247H4300"
                pathLength={1}
                stroke="#fff"
                strokeWidth="64"
                strokeDasharray="1 2"
                style={draw(0.6, DRAW_S)}
              />
            </mask>
          </defs>

          <g mask="url(#roadmap-reveal)">
            <path d={ROAD_FULL} stroke={ROAD} strokeWidth="40" />
            <path
              d={ROAD_FULL}
              stroke="#fff"
              strokeWidth="3.2"
              strokeDasharray="20 13"
            >
              {started && !reduced && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-33"
                  dur="1.4s"
                  begin={`${DRAW_S}s`}
                  repeatCount="indefinite"
                />
              )}
            </path>
          </g>
        </svg>

        {/* heading */}
        <h2
          className="absolute text-[3.25cqw] leading-[1.2] text-[#1F1F1F]"
          style={{ left: pctX(99), top: pctY(71), ...rise(0.1) }}
        >
          <span className={`block ${BOLD}`}>{content.titleBold}</span>
          <span className="block">{content.titleLight}</span>
        </h2>

        {steps.map((step, i) => (
          <div key={i}>
            {/* badge */}
            <span
              className="absolute flex aspect-square w-[7.5%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.6cqw] border-[0.3cqw] border-white shadow-[0_0.3cqw_0.9cqw_rgba(0,0,0,0.22)]"
              style={{
                left: pctX(step.badge.x),
                top: pctY(step.badge.y),
                background: step.color,
                ...pop(step.at),
              }}
            >
              <span className="block h-[46%] w-[46%]">{step.icon}</span>
            </span>

            {/* caption */}
            <div
              className="absolute w-[20%] -translate-x-1/2 text-center"
              style={{
                left: pctX(step.caption.x),
                ...(step.caption.from === "top"
                  ? { top: pctY(step.caption.y) }
                  : { bottom: pctY(720 - step.caption.y) }),
                ...rise(step.at + 0.3, step.caption.y < 300 ? -12 : 12),
              }}
            >
              <h3
                className={`text-[max(13px,1.5cqw)] leading-[1.35] ${BOLD}`}
                style={{ color: step.color }}
              >
                {step.title}
              </h3>
              <p className="mt-[0.6cqw] text-[max(11px,1.1cqw)] leading-[1.7] text-[#5A5650]">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── mobile / tablet: vertical road ───────────────────────── */}
      <div className="px-6 py-14 sm:px-10 lg:hidden">
        <h2
          className="text-[32px] leading-[1.2] text-[#1F1F1F] sm:text-[44px]"
          style={rise(0)}
        >
          <span className={`block ${BOLD}`}>{content.titleBold}</span>
          <span className="block">{content.titleLight}</span>
        </h2>

        <ol className="relative mt-12 space-y-14">
          {/* road — grows downwards */}
          <span
            aria-hidden
            className="absolute bottom-[-24px] left-[40px] top-[-24px] w-10 origin-top -translate-x-1/2"
            style={{
              background: ROAD,
              transform: started ? "scaleY(1)" : "scaleY(0)",
              transition: reduced
                ? "none"
                : `transform ${MOBILE_GAP_S * steps.length}s linear`,
            }}
          >
            <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-[3px] border-dashed border-white" />
          </span>

          {steps.map((step, i) => (
            <li key={i} className="relative flex items-start gap-6">
              <span
                className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-[18px] border-[4px] border-white shadow-[0_4px_12px_rgba(0,0,0,0.22)]"
                style={{
                  background: step.color,
                  ...pop(0.2 + i * MOBILE_GAP_S),
                }}
              >
                <span className="block h-9 w-9">{step.icon}</span>
              </span>
              <div className="pt-1" style={rise(0.5 + i * MOBILE_GAP_S)}>
                <h3
                  className={`text-[20px] leading-[1.35] ${BOLD}`}
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.7] text-[#5A5650]">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
