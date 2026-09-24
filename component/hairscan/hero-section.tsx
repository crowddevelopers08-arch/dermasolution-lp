"use client"

import { useState } from "react"
import { Button } from "@/component/ui/button"
import { Label } from "@/component/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/component/ui/dialog"
import { Phone, Scan, Sparkles } from "lucide-react"
import type { FormData } from "./form-modal"
import Image from "next/image"
import Link from "next/link"
import { cloudinaryImages } from "@/lib/cloudinary-images"


interface HeroSectionProps {
  onStartScan: (data: FormData) => void
}

export function HeroSection({ onStartScan }: HeroSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [problem, setProblem] = useState<FormData["problem"]>("")
  const [error, setError] = useState("")

  const validate = () => {
    if (!problem) {
      setError("Please select a concern")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    onStartScan({
      name: "",
      phone: "",
      problem,
    })
    setShowForm(false)
  }

  return (
    <section className="hairscan-theme relative flex max-sm:py-5 md:py-15 flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Animated background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,144,69,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(201,144,69,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,144,69,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(201,144,69,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-[55%] bg-[linear-gradient(180deg,rgba(201,144,69,0.1),transparent)]" />
        <div className="absolute left-0 top-1/3 h-40 w-full" /> 

        {/* Radial glow */}
        <div className="absolute left-1/2 top-[42%] h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute left-1/2 top-24 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[90px]" />

        {/* Floating orbs */}
        <div className="animate-float absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-primary/14" />
        <div className="animate-float-delayed absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-primary/14 " />
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-8 max-sm:mb-4 relative">
          <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
          <div className="relative rounded-2xl border border-primary/20 bg-white/90 px-6 py-3 backdrop-blur-sm shadow-[0_0_30px_rgba(201,144,69,0.12)]">
            <Link href="/hair-scan" aria-label="Dr. Sindhu's Derma Solutions — home" className="shrink-0">
                      <Image
                        src={cloudinaryImages.logo}
                        alt="Dr. Sindhu's Derma Solutions — Medical & Aesthetic Dermatology"
                        width={901}
                        height={277}
                        priority
                        className="h-14 w-auto sm:h-25"
                      />
                    </Link>
          </div>
        </div>


        {/* Main heading */}
        <h1 className="mb-6 max-sm:mb-2 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Not sure why your hair is <span className="text-primary">falling or thinning?</span>
        </h1>

        {/* Subheading */}
        <p className="mb-10 max-sm:mb-4 max-w-4xl text-pretty text-lg text-muted-foreground md:text-xl">
          Find out what may be contributing to your hair fall with an <strong>online scalp analysis by Dr. Sindhu Priya.</strong>{" "}
          Simply share your scalp images online, get your scalp analysed, and receive a <strong>detailed PDF report</strong> explaining the findings and possible root causes.
        </p>

        {/* CTA Buttons */}
        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="group relative flex items-center gap-3 bg-primary max-sm:px-4 px-8 py-7 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(201,144,69,0.5)]"
          >
            <Scan className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="min-[352px]:hidden">Start Scan</span>
            <span className="hidden min-[352px]:inline">Start Your Online Scalp Analysis</span>
            <div className="absolute inset-0 -z-10 animate-pulse rounded-lg bg-primary/30 blur-xl" />
          </Button>

          <Button
            type="button"
            size="lg"
            variant="outline"
            className="group flex items-center gap-3 border-primary/40 bg-background/70 px-8 py-7 text-lg font-semibold text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_30px_rgba(201,144,69,0.2)]"
          >
            <Phone className="h-5 w-5 transition-transform group-hover:scale-110" />
            +91 6363136080
          </Button>
        </div>

        {/* Trust indicators
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Privacy First</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>98% Accuracy</span>
          </div>
        </div> */}
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="hairscan-theme border-primary/20 bg-card/95 backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-foreground">
              Start Your Hair Analysis
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              Select your concern to continue to camera scan
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="hero-problem" className="text-foreground">
                Select Your Concern
              </Label>
              <Select
                value={problem}
                onValueChange={(value: FormData["problem"]) => setProblem(value)}
              >
                <SelectTrigger id="hero-problem" className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary">
                  <SelectValue placeholder="Choose a hair concern" />
                </SelectTrigger>
                <SelectContent className="hairscan-theme border-border bg-card">
                  <SelectItem value="hair-fall">Hair Fall</SelectItem>
                  <SelectItem value="crown-thinning">Crown Thinning</SelectItem>
                  <SelectItem value="dandruff-scalp-concerns">Dandruff & Scalp Concerns</SelectItem>
                  <SelectItem value="patchy-hair-loss">Patchy Hair Loss</SelectItem>
                  <SelectItem value="weak-low-density-hair">Weak or Low-Density Hair</SelectItem>
                </SelectContent>
              </Select>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button
              type="submit"
              className="mt-2 w-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(201,144,69,0.4)]"
            >
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
