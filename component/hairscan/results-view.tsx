"use client"

import { useState } from "react"
import { Button } from "@/component/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card" // eslint-disable-line @typescript-eslint/no-unused-vars
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/component/ui/dialog"
import { Input } from "@/component/ui/input"
import { Label } from "@/component/ui/label"
import { FileText, ArrowLeft, CalendarCheck, CheckCircle2, Loader2, Phone } from "lucide-react"
import type { FormData } from "./form-modal"

interface ResultsViewProps {
  formData: FormData
  capturedImage: string | null
  onBack: () => void
}

const resultsData = {
  "hair-fall": {
    title: "Hair Fall Report",
    description:
      "Based on our analysis, we have identified specific issues. Book a consultation with our specialist to learn about the solutions.",
    recommendations: [
      "PRP - Controls hair fall and strengthens roots",
      "GFC - Improves regrowth and thickness",
      "Mesotherapy - Nourishes scalp",
      "OLT - Supports root strength",
      "Combination treatment may be recommended",
    ],
    docTitle: "Hair Fall Report",
    docDescription: "Detailed report with stage-wise plan and treatment recommendations for hair fall.",
    pdf: "/Hair-Fall-Report.pdf",
  },
  "hair-thinning": {
    title: "Hair Thinning Report",
    description:
      "Overall hair volume and density is reducing, often caused by weak follicles, stress, or nutritional gaps.",
    recommendations: [
      "PRP - Strengthens thinning strands",
      "GFC - Improves thickness and volume",
      "Mesotherapy - Nourishes scalp and roots",
      "OLT - Supports overall hair health",
    ],
    docTitle: "Hair Thinning Report",
    docDescription: "Stage-wise plan to restore volume and strengthen thinning hair.",
    pdf: "/Lower-Hair-Density-Report.pdf",
  },
  "receding-hairline": {
    title: "Receding Hairline Report",
    description:
      "Hairline recession or thinning in the front area is noticed. This is often caused by genetics, stress, or hormonal changes.",
    recommendations: [
      "PRP - Slows hairline recession",
      "GFC - Improves hair thickness",
      "Mesotherapy - Nourishes follicles",
      "Hair Transplant - Rebuilds hairline",
    ],
    docTitle: "Receding Hairline Report",
    docDescription: "Focused plan to control recession and restore frontal hairline density.",
    pdf: "/Frontal-Hair-Loss-Report.pdf",
  },
  "crown-thinning": {
    title: "Crown Thinning Report",
    description:
      "Hair density is reducing at the crown area, often an early sign of pattern baldness.",
    recommendations: [
      "PRP - Activates weak follicles",
      "GFC - Improves crown density",
      "Mesotherapy - Strengthens scalp",
      "Hair Transplant - For advanced stages",
    ],
    docTitle: "Crown Thinning Report",
    docDescription: "Stage-based restoration plan for crown thinning and pattern hair loss.",
    pdf: "/Crown-Thinning-Report.pdf",
  },
  "dandruff-scalp-concerns": {
    title: "Dandruff & Scalp Concerns Report",
    description:
      "Flaky scalp, itching, or irritation is affecting your hair health and growth.",
    recommendations: [
      "Anti-Dandruff Therapy - Clears scalp",
      "OLT - Improves scalp health",
      "Mesotherapy - Nourishes roots",
      "Healthy scalp = Better hair growth",
    ],
    docTitle: "Dandruff & Scalp Concerns Report",
    docDescription: "Scalp-focused report with therapy suggestions and stage-wise care guidance.",
    pdf: "/Dandruff-Scalp-Issues-Report.pdf",
  },
  "patchy-hair-loss": {
    title: "Patchy Hair Loss Report",
    description:
      "Isolated bald or thinning patches are visible, which can be caused by autoimmune, stress, or scalp conditions.",
    recommendations: [
      "PRP - Stimulates regrowth in patches",
      "GFC - Supports follicle recovery",
      "Mesotherapy - Nourishes affected areas",
      "Specialist consultation recommended to identify the cause",
    ],
    docTitle: "Patchy Hair Loss Report",
    docDescription: "Targeted assessment and treatment path for patchy hair loss.",
    pdf: "/Hair-Fall-Report.pdf",
  },
  "weak-low-density-hair": {
    title: "Weak / Low-Density Hair Report",
    description:
      "Hair appears thin, flat, and lacks volume due to weak or inactive follicles.",
    recommendations: [
      "GFC - Boosts density",
      "PRP - Strengthens follicles",
      "Mesotherapy - Improves nourishment",
      "Hair Transplant - For advanced thinning",
    ],
    docTitle: "Weak / Low-Density Hair Report",
    docDescription: "Comprehensive density restoration report with treatment path by stage.",
    pdf: "/Lower-Hair-Density-Report.pdf",
  },
  "excessive-shedding": {
    title: "Excessive Shedding Report",
    description:
      "Hair fall beyond the normal daily range is noticed, often linked to stress, deficiency, or scalp imbalance.",
    recommendations: [
      "PRP - Controls excess shedding",
      "OLT - Restores scalp balance",
      "Mesotherapy - Nourishes roots",
      "Combination treatment may be recommended",
    ],
    docTitle: "Excessive Shedding Report",
    docDescription: "Stage-wise plan to control shedding and support regrowth.",
    pdf: "/Hair-Fall-Report.pdf",
  },
}

function downloadReport(pdfPath: string) {
  const link = document.createElement("a")
  link.href = pdfPath
  link.download = pdfPath.split("/").pop() || "Hair-Scan-Report.pdf"
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function ResultsView({ formData, capturedImage, onBack }: ResultsViewProps) {
  const [pdfFormOpen, setPdfFormOpen] = useState(false)
  const [pdfGenerating, setPdfGenerating] = useState(false)
  const [pdfForm, setPdfForm] = useState({ name: formData.name || "", phone: formData.phone || "", location: "" })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [clinicVisit, setClinicVisit] = useState<"" | "yes" | "no">("")

  const problem = (formData.problem || "hair-fall") as keyof typeof resultsData
  const data = resultsData[problem]

  if (!data) return null

  const handleDownload = () => {
    setPdfForm({ name: formData.name || "", phone: formData.phone || "", location: "" })
    setSubmitError(null)
    setClinicVisit("")
    setPdfFormOpen(true)
  }

  const handlePdfFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!pdfForm.name.trim() || !pdfForm.phone.trim() || !pdfForm.location.trim()) return
    setPdfGenerating(true)
    try {
      const saveRes = await fetch("/api/save-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pdfForm.name,
          phone: pdfForm.phone,
          location: pdfForm.location,
          problem,
          imageData: capturedImage ?? "",
          pageUrl: window.location.href,
        }),
      })
      if (!saveRes.ok) {
        const payload = await saveRes.json().catch(() => ({ error: "Failed to save scan" }))
        throw new Error(payload?.error || "Failed to save scan")
      }

      setPdfFormOpen(false)
      downloadReport(data.pdf)
      // Give the browser a moment to start the download before navigating away.
      setTimeout(() => window.location.assign("/hair-scan/hairscan-thank-you"), 1000)
    } catch (err) {
      console.error("Submit failed:", err)
      const msg = err instanceof Error ? err.message : "Something went wrong"
      if (msg.includes("already been used")) {
        setSubmitError("This mobile number has already submitted a lead. Please use a different number.")
      } else {
        setSubmitError("Something went wrong. Please try again.")
      }
    } finally {
      setPdfGenerating(false)
    }
  }

  return (
    <div className="hairscan-theme" style={{ minHeight: "100vh", background: "#FBF8F3", color: "#414042", padding: "0" }}>

      {/* ── Top glow ── */}
      <style>{`
        .pdf-card-inner { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .pdf-dl-btn { display: flex; flex-shrink: 0; }
        .mobile-dl-btn { display: none; }
        @media (max-width: 480px) {
          .pdf-card-inner { flex-direction: column; align-items: stretch; }
          .pdf-dl-btn { display: none; }
          .mobile-dl-btn { display: flex; }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,144,69,0.07), transparent)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", padding: "32px 16px 60px" }}>

        {/* ── Back button ── */}
        <button
          onClick={onBack}
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "#68645F", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", marginBottom: "32px", padding: "0" }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} />
          Back to Home
        </button>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
            border: "1px solid rgba(201,144,69,0.4)",
            background: "rgba(201,144,69,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 30px rgba(201,144,69,0.2)"
          }}>
            <CheckCircle2 style={{ width: 30, height: 30, color: "#8A602B" }} />
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.02em" }}>{data.title}</h1>
          {formData.name && (
            <p style={{ color: "#68645F", fontSize: "0.95rem" }}>Personalized for <span style={{ color: "#8A602B", fontWeight: 600 }}>{formData.name}</span></p>
          )}
          <div style={{ margin: "20px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <div style={{ height: "1px", width: 40, background: "linear-gradient(90deg, transparent, rgba(201,144,69,0.5))" }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#8A602B", boxShadow: "0 0 6px rgba(201,144,69,0.8)" }} />
            <div style={{ height: "1px", width: 40, background: "linear-gradient(270deg, transparent, rgba(201,144,69,0.5))" }} />
          </div>
        </div>

        {/* ── Mobile-only Download Button ── */}
        <button
          onClick={handleDownload}
          disabled={pdfGenerating}
          className="mobile-dl-btn"
          style={{
            alignItems: "center", justifyContent: "center", gap: "8px",
            width: "100%", marginBottom: "20px",
            background: "#C99045", color: "#241B12",
            border: "none", borderRadius: "12px",
            padding: "14px", fontSize: "1rem", fontWeight: 700,
            cursor: pdfGenerating ? "not-allowed" : "pointer",
            opacity: pdfGenerating ? 0.7 : 1,
            boxShadow: "0 0 24px rgba(201,144,69,0.3)"
          }}
        >
          {pdfGenerating
            ? <Loader2 style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} />
            : <CalendarCheck style={{ width: 18, height: 18 }} />}
          {pdfGenerating ? "Booking…" : "Book Your Consultation"}
        </button>

        {/* ── Analysis Summary ── */}
        <div style={{
          background: "linear-gradient(145deg, #FFFFFF, #F5EFE5)",
          border: "1px solid rgba(201,144,69,0.2)",
          borderRadius: "18px", padding: "28px",
          marginBottom: "20px", position: "relative", overflow: "hidden",
          boxShadow: "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,144,69,0.07)"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #8A602B, transparent)" }} />
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8A602B", marginBottom: "10px" }}>your Scan Report is Ready
</p>
          <p style={{ lineHeight: 1.8, color: "#68645F", fontSize: "0.95rem" }}>{data.description}</p>
        </div>

        {/* ── PDF Download card ── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(201,144,69,0.12), rgba(201,144,69,0.04))",
          border: "1px solid rgba(201,144,69,0.35)",
          borderRadius: "18px", padding: "24px 28px",
          marginBottom: "20px", position: "relative", overflow: "hidden",
          boxShadow: "0 4px 30px rgba(201,144,69,0.08)"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #8A602B, transparent)" }} />
          <div className="pdf-card-inner">
            <div style={{
              width: 52, height: 52, borderRadius: "14px", flexShrink: 0,
              border: "1px solid rgba(201,144,69,0.4)",
              background: "rgba(201,144,69,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 18px rgba(201,144,69,0.15)"
            }}>
              <FileText style={{ width: 24, height: 24, color: "#8A602B" }} />
            </div>
            <div style={{ flex: 1, minWidth: "160px" }}>
              <p style={{ fontWeight: 700, fontSize: "0.97rem", color: "#414042", marginBottom: "4px" }}>{data.docTitle}</p>
              <p style={{ fontSize: "0.82rem", color: "#68645F", lineHeight: 1.5 }}>{data.docDescription}</p>
            </div>
            <button
              onClick={handleDownload}
              disabled={pdfGenerating}
              className="pdf-dl-btn"
              style={{
                alignItems: "center", gap: "8px",
                background: "#C99045", color: "#241B12",
                border: "none", borderRadius: "10px",
                padding: "11px 22px", fontSize: "0.9rem", fontWeight: 700,
                cursor: pdfGenerating ? "not-allowed" : "pointer",
                opacity: pdfGenerating ? 0.7 : 1,
                boxShadow: "0 0 20px rgba(201,144,69,0.3)",
                transition: "all 0.2s"
              }}
            >
              {pdfGenerating
                ? <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
                : <CalendarCheck style={{ width: 16, height: 16 }} />}
              {pdfGenerating ? "Booking…" : "Book Your Consultation"}
            </button>
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{
          background: "linear-gradient(145deg, #FFFFFF, #F5EFE5)",
          border: "1px solid rgba(201,144,69,0.15)",
          borderRadius: "18px", padding: "28px",
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
        }}>
          <p style={{ color: "#68645F", fontSize: "0.9rem", marginBottom: "16px" }}>
            Want to speak with a specialist about your results?
          </p>
          <a
            href="tel:+916363136080"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#C99045", color: "#241B12",
              borderRadius: "10px", padding: "12px 28px",
              fontSize: "1rem", fontWeight: 700, textDecoration: "none",
              boxShadow: "0 0 24px rgba(201,144,69,0.3)",
              transition: "all 0.2s"
            }}
          >
            <Phone style={{ width: 18, height: 18 }} />
            Call Now
          </a>
        </div>
      </div>

      {/* ── PDF Form Dialog ── */}
      <Dialog open={pdfFormOpen} onOpenChange={(open) => !pdfGenerating && setPdfFormOpen(open)}>
        <DialogContent data-pdf-dialog className="hairscan-theme border-primary/20 bg-card/95 backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-foreground">Book Your Consultation</DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              {pdfGenerating ? "Booking your consultation, please wait…" : "Enter your details to book a consultation with our specialist"}
            </DialogDescription>
          </DialogHeader>

          {pdfGenerating ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Submitting your consultation request…</p>
            </div>
          ) : (
            <form onSubmit={handlePdfFormSubmit} className="mt-4 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="pdf-name" className="text-foreground">Name</Label>
                <Input
                  id="pdf-name"
                  placeholder="Enter your name"
                  value={pdfForm.name}
                  onChange={(e) => setPdfForm({ ...pdfForm, name: e.target.value })}
                  className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="pdf-phone" className="text-foreground">Phone Number</Label>
                <Input
                  id="pdf-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={pdfForm.phone}
                  onChange={(e) => { setSubmitError(null); setPdfForm({ ...pdfForm, phone: e.target.value }) }}
                  className={submitError ? "border-destructive bg-background/50 focus:border-destructive focus:ring-destructive" : "border-border/50 bg-background/50 focus:border-primary focus:ring-primary"}
                />
                {submitError && (
                  <p className="text-xs font-medium text-destructive">{submitError}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="pdf-location" className="text-foreground">Location</Label>
                <Input
                  id="pdf-location"
                  placeholder="Enter your location"
                  value={pdfForm.location}
                  onChange={(e) => setPdfForm({ ...pdfForm, location: e.target.value })}
                  className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Are you willing to visit Derma Hair Clinic?</Label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setClinicVisit("yes")}
                    style={{
                      flex: 1, padding: "10px", borderRadius: "8px", fontWeight: 700, fontSize: "0.9rem",
                      border: clinicVisit === "yes" ? "2px solid #8A602B" : "2px solid rgba(201,144,69,0.25)",
                      background: clinicVisit === "yes" ? "rgba(201,144,69,0.18)" : "rgba(201,144,69,0.05)",
                      color: clinicVisit === "yes" ? "#8A602B" : "#68645F",
                      cursor: "pointer", transition: "all 0.15s"
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => { setClinicVisit("no"); setPdfFormOpen(false) }}
                    style={{
                      flex: 1, padding: "10px", borderRadius: "8px", fontWeight: 700, fontSize: "0.9rem",
                      border: clinicVisit === "no" ? "2px solid #ef4444" : "2px solid rgba(239,68,68,0.25)",
                      background: clinicVisit === "no" ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.04)",
                      color: clinicVisit === "no" ? "#ef4444" : "#68645F",
                      cursor: "pointer", transition: "all 0.15s"
                    }}
                  >
                    No
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!pdfForm.name.trim() || !pdfForm.phone.trim() || !pdfForm.location.trim() || clinicVisit !== "yes"}
                className="mt-2 w-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(201,144,69,0.4)] disabled:opacity-50"
              >
                <CalendarCheck className="mr-2 h-4 w-4" />
                Book Your Consultation
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

