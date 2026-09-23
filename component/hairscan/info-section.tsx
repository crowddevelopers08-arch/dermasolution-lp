"use client"

import { Smartphone, Upload, ScanSearch, FileText, Zap, Award, Wind, Activity, TrendingDown, Crown, Droplet, CircleDot, Sparkles, AlertTriangle } from "lucide-react"

interface InfoSectionProps {
  onStartScan: () => void
}

export function InfoSection({ onStartScan }: InfoSectionProps) {
  return (
    <div className="hairscan-theme" style={{ background: "#FBF8F3", color: "#414042" }}>
      <style>{`
        .report-overview { max-width: 820px; margin: 0 auto; padding: 12px 0; }
        .report-heading { margin-bottom: 32px; text-align: center; }
        .report-eyebrow { margin: 0 0 12px; font-size: 11px; font-weight: 700; line-height: 1.6; letter-spacing: 0.16em; text-transform: uppercase; color: #8a602b; }
        .report-heading h2 { margin: 0; font-size: clamp(1.7rem, 4vw, 2.8rem); font-weight: 800; line-height: 1.2; letter-spacing: -0.02em; text-wrap: balance; }
        .report-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 32px; border-top: 1px solid #e8e0d2; }
        .report-item { display: grid; grid-template-columns: 24px minmax(0, 1fr); align-items: start; gap: 20px; padding: 26px 8px; border-bottom: 1px solid #e8e0d2; }
        .report-item-icon { display: inline-flex; color: #8a602b; padding-top: 3px; }
        .report-item h3 { margin: 0 0 8px; color: #414042; font-size: 1.15rem; font-weight: 700; line-height: 1.4; }
        .report-item p { margin: 0; color: #68645f; font-size: 0.95rem; line-height: 1.75; }
        @media (max-width: 640px) {
          .report-list { grid-template-columns: 1fr; }
          .report-heading { margin-bottom: 24px; }
          .report-item { gap: 14px; padding: 22px 0; }
        }
        .info-section { padding: 40px 16px; }
        .info-steps-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
        .info-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 60px; align-items: center; }
        .info-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .info-cta-card { padding: 36px 32px; }
        .info-cta-btns { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
        .info-cta-btn { width: auto; }
        .info-intro { display: flex; flex-direction: column; align-items: center; gap: clamp(20px, 3vw, 28px); max-width: 900px; margin: 0 auto; text-align: center; position: relative; }
        .info-side-images { display: grid; width: 100%; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin: 8px auto 0; max-width: 790px; }
        .info-side-image { display: block; width: 100%; height: 230px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(201,144,69,0.25); box-shadow: 0 6px 24px rgba(65,64,66,0.10); }

        @media (max-width: 1024px) {
          .info-steps-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .info-grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .info-section { padding: 28px 16px; }
          .info-steps-grid { grid-template-columns: 1fr; }
          .info-grid-2 { grid-template-columns: 1fr; gap: 36px; }
          .info-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .info-cta-card { padding: 24px 16px; }
          .info-side-images { max-width: 580px; }
          .info-side-image { height: 180px; }
        }
        @media (max-width: 480px) {
          .info-section { padding: 20px 12px; }
          .info-grid-4 { grid-template-columns: 1fr 1fr; gap: 12px; }
          .info-cta-btns { flex-direction: column; align-items: stretch; }
          .info-cta-btn { justify-content: center; }
          .info-side-images { grid-template-columns: 1fr; gap: 12px; max-width: 380px; }
          .info-side-image { height: 180px; }
        }
      `}</style>

      {/* ══ TOP DIVIDER ══ */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C9904555, transparent)" }} />

      {/* ═══════════════════════════════════════════
          SECTION 1 — INTRO
      ═══════════════════════════════════════════ */}
      <section className="info-section" style={{ position: "relative", overflow: "hidden" }}>
        {/* bg glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,144,69,0.08), transparent)", pointerEvents: "none" }} />

        <div className="info-intro">
          {/* badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid rgba(201,144,69,0.35)", borderRadius: "999px",
            background: "rgba(201,144,69,0.08)", padding: "6px 18px",
            fontSize: "13px", fontWeight: 600, color: "#8A602B",
            boxShadow: "0 0 20px rgba(201,144,69,0.1)"
          }}>
            <Award style={{ width: 14, height: 14 }} />
            Trusted by  50k+ Clients Across
          </div>

          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.2, margin: 0, letterSpacing: "-0.02em", textWrap: "balance" }}>
            Hair fall has a reason.{" "}
            <span className="text-primary">
              Find it before you treat it.
            </span>
          </h2>

          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#68645F", maxWidth: "680px", margin: "0 auto" }}>
            Hair fall, thinning, patchy hair or a receding hairline can have different contributing factors.{" "}
            With our <strong style={{ color: "#8A602B" }}>online scalp analysis</strong>, your scalp images are reviewed to understand visible hair and scalp patterns and identify possible factors behind your concern.
          </p>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#8A602B", maxWidth: "680px", margin: 0, textWrap: "balance" }}>
            <strong>Analyse online. Understand your scalp. Get your report.</strong>
          </p>
          <div className="info-side-images">
            <img
              src="https://res.cloudinary.com/m5fcfwt7/image/upload/v1790170625/before4.jpg"
              alt="Hair scan left view"
              className="info-side-image"
            />
            <img
              src="https://res.cloudinary.com/m5fcfwt7/image/upload/v1790170626/before5.avif"
              alt="Hair scan right view"
              className="info-side-image"
            />
          </div>
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,144,69,0.2), transparent)" }} />

      {/* ═══════════════════════════════════════════
          SECTION 2 — 3 FEATURE CARDS
      ═══════════════════════════════════════════ */}
      <section className="info-section" style={{ position: "relative" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A602B", marginBottom: "10px" }}>How it works</p>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>How the Online Scalp Analysis Works</h2>
          </div>

          <div className="info-steps-grid">
            {[
              { icon: <Smartphone style={{ width: 28, height: 28, color: "#8A602B" }} />, step: "01", title: "Share Your Details", desc: "Answer a few simple questions about your hair fall, scalp and concerns." },
              { icon: <Upload style={{ width: 28, height: 28, color: "#8A602B" }} />, step: "02", title: "Upload Your Scalp Images", desc: "Follow the simple instructions and upload clear images of your scalp from the required angles." },
              { icon: <ScanSearch style={{ width: 28, height: 28, color: "#8A602B" }} />, step: "03", title: "Get Your Scalp Analysed", desc: "Your submitted information and scalp images are analysed to understand visible patterns related to your hair and scalp concerns." },
              { icon: <FileText style={{ width: 28, height: 28, color: "#8A602B" }} />, step: "04", title: "Receive Your PDF Report", desc: <>Get your detailed <strong>online scalp analysis report</strong> digitally, so you can review the findings anytime.</> },
            ].map((item, i) => (
              <div key={i} style={{
                background: "linear-gradient(145deg, #FFFFFF, #F5EFE5)",
                border: "1px solid rgba(201,144,69,0.22)",
                borderRadius: "20px", padding: "36px 32px",
                position: "relative", overflow: "hidden",
                boxShadow: "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,144,69,0.08)"
              }}>
                {/* top gold line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #8A602B, transparent)" }} />

                {/* step watermark */}
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: "56px", fontWeight: 900, color: "rgba(201,144,69,0.07)", lineHeight: 1, userSelect: "none" }}>{item.step}</div>

                {/* icon box */}
                <div style={{
                  width: 56, height: 56, borderRadius: "14px",
                  border: "1px solid rgba(201,144,69,0.3)",
                  background: "rgba(201,144,69,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "22px", boxShadow: "0 0 18px rgba(201,144,69,0.12)"
                }}>
                  {item.icon}
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "12px", color: "#414042" }}>{item.title}</h3>
                <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "#68645F" }}>{item.desc}</p>

                {/* bottom accent */}
                <div style={{ marginTop: "24px", height: "1px", background: "linear-gradient(90deg, rgba(201,144,69,0.4), transparent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,144,69,0.2), transparent)" }} />

      {/* ═══════════════════════════════════════════
          SECTION 3 — WHAT YOU GET (2-col)
      ═══════════════════════════════════════════ */}
      <section className="info-section" style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 60% at 80% 50%, rgba(201,144,69,0.05), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div className="report-overview">
            <div className="report-heading">
              <p className="report-eyebrow">What will your report tell you?</p>
              <h2>What Your <span className="text-primary">Report Covers</span></h2>
            </div>

            <div className="report-list">
              {[
                { icon: <ScanSearch size={22} />, title: "Understand Your Hair Fall", desc: "Get a clearer picture of the visible patterns associated with your hair fall or thinning." },
                { icon: <Zap size={22} />, title: "Possible Root Causes", desc: "Understand the potential factors that may be contributing to your hair concern." },
                { icon: <Award size={22} />, title: "Scalp & Hair Assessment", desc: "See the key observations from your submitted scalp images." },
                { icon: <FileText size={22} />, title: "Personalised Next Steps", desc: "Understand what you can discuss with a hair specialist based on your report." },
              ].map((item) => (
                <article key={item.title} className="report-item">
                  <span className="report-item-icon" aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,144,69,0.2), transparent)" }} />

      {/* ═══════════════════════════════════════════
          SECTION 4 — CONCERNS
      ═══════════════════════════════════════════ */}
      <section className="info-section" style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,144,69,0.05), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>

          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8A602B", marginBottom: "10px" }}>Concern Section</p>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              Hair & Scalp Concerns You Can{" "}
              <span className="text-primary">
                Analyse Online
              </span>
            </h2>
          </div>

          <div className="info-grid-4">
            {[
              { icon: <Wind style={{ width: 32, height: 32, color: "#8A602B" }} />, title: "Hair Fall" },
              { icon: <Activity style={{ width: 32, height: 32, color: "#8A602B" }} />, title: "Hair Thinning" },
              { icon: <TrendingDown style={{ width: 32, height: 32, color: "#8A602B" }} />, title: "Receding Hairline" },
              { icon: <Crown style={{ width: 32, height: 32, color: "#8A602B" }} />, title: "Crown Thinning" },
              { icon: <Droplet style={{ width: 32, height: 32, color: "#8A602B" }} />, title: "Dandruff & Scalp Concerns" },
              { icon: <CircleDot style={{ width: 32, height: 32, color: "#8A602B" }} />, title: "Patchy Hair Loss" },
              { icon: <Sparkles style={{ width: 32, height: 32, color: "#8A602B" }} />, title: "Weak or Low-Density Hair" },
              { icon: <AlertTriangle style={{ width: 32, height: 32, color: "#8A602B" }} />, title: "Excessive Shedding" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "linear-gradient(160deg, #FFFFFF, #FBF8F3)",
                border: "1px solid rgba(201,144,69,0.22)",
                borderRadius: "20px", padding: "32px 24px",
                textAlign: "center", position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #8A602B, transparent)" }} />

                <div style={{
                  width: 64, height: 64, borderRadius: "50%", margin: "0 auto 18px",
                  border: "1px solid rgba(201,144,69,0.3)",
                  background: "rgba(201,144,69,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 24px rgba(201,144,69,0.15)"
                }}>
                  {item.icon}
                </div>

                <p style={{ fontSize: "1rem", fontWeight: 700, color: "#414042" }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,144,69,0.2), transparent)" }} />

      {/* ═══════════════════════════════════════════
          SECTION 5 — CTA
      ═══════════════════════════════════════════ */}
      <section className="info-section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,144,69,0.08), transparent)", pointerEvents: "none" }} />

        {/* big outer card */}
        <div className="info-cta-card" style={{
          maxWidth: "860px", margin: "0 auto", position: "relative",
          background: "linear-gradient(145deg, #FFFFFF, #F5EFE5)",
          border: "1px solid rgba(201,144,69,0.3)",
          borderRadius: "28px",
          textAlign: "center",
          boxShadow: "0 8px 60px rgba(65,64,66,0.10), inset 0 1px 0 rgba(201,144,69,0.1)"
        }}>
          {/* top accent */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "2px", background: "linear-gradient(90deg, transparent, #8A602B, transparent)", borderRadius: "2px" }} />

          {/* gold dot divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "28px" }}>
            <div style={{ height: "1px", width: 48, background: "linear-gradient(90deg, transparent, rgba(201,144,69,0.5))" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8A602B", boxShadow: "0 0 8px rgba(201,144,69,0.8)" }} />
            <div style={{ height: "1px", width: 48, background: "linear-gradient(270deg, transparent, rgba(201,144,69,0.5))" }} />
          </div>

          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Stop guessing.{" "}
            <span className="text-primary">
              Start understanding your hair.
            </span>
          </h2>
          <p style={{ color: "#68645F", marginBottom: "36px", fontSize: "1rem", maxWidth: "640px", margin: "0 auto 36px" }}>
            Upload your scalp images online and get a <strong style={{ color: "#8A602B" }}>detailed scalp analysis report directly online.</strong>
          </p>

          <div className="info-cta-btns">
            <button
              onClick={onStartScan}
              className="info-cta-btn"
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "#C99045", color: "#241B12",
                border: "none", borderRadius: "12px",
                padding: "14px 32px", fontSize: "1rem", fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 0 30px rgba(201,144,69,0.35)",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 50px rgba(201,144,69,0.55)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(201,144,69,0.35)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)" }}
            >
              <Upload style={{ width: 20, height: 20 }} />
              <span className="min-[481px]:hidden whitespace-nowrap">Start Scan</span>
              <span className="hidden min-[481px]:inline whitespace-nowrap">Start My Online Scalp Analysis</span>
            </button>
          </div>

          <p style={{ marginTop: "20px", fontSize: "0.82rem", color: "#68645F", fontStyle: "italic", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}>
            Online scalp analysis provides an assessment based on the information and images submitted. It does not replace an in-person medical consultation where required.
          </p>
        </div>
      </section>

      {/* ══ BOTTOM DIVIDER ══ */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #C9904555, transparent)" }} />
    </div>
  )
}
