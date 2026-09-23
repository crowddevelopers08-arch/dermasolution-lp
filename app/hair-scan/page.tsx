"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { HeroSection } from "@/component/hairscan/hero-section"
import { InfoSection } from "@/component/hairscan/info-section"
import type { FormData } from "@/component/hairscan/form-modal"
import { CameraModal } from "@/component/hairscan/camera-modal"
import { ScanLoader } from "@/component/hairscan/scan-loader"

const ResultsView = dynamic(
  () => import("@/component/hairscan/results-view").then((m) => m.ResultsView),
  { ssr: false }
)

type AppState = "landing" | "camera" | "scanning" | "results"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    problem: "",
  })
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const handleStartScanFromHero = (data: FormData) => {
    setFormData(data)
    setAppState("camera")
  }

  const handleStartScan = () => {
    setAppState("camera")
  }

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData)
    setAppState("scanning")
  }

  const handleScanComplete = () => {
    setAppState("results")
  }

  const handleBackToHome = () => {
    setAppState("landing")
    setFormData({ name: "", phone: "", problem: "" })
    setCapturedImage(null)
  }

  if (appState === "results") {
    return <ResultsView formData={formData} capturedImage={capturedImage} onBack={handleBackToHome} />
  }

  return (
    <main className="hairscan-theme min-h-screen bg-background">
      <HeroSection onStartScan={handleStartScanFromHero} />
      <InfoSection onStartScan={handleStartScan} />

      <CameraModal
        open={appState === "camera"}
        onOpenChange={(open) => !open && setAppState("landing")}
        onCapture={handleCapture}
      />

      <ScanLoader
        open={appState === "scanning"}
        onOpenChange={() => {}}
        capturedImage={capturedImage}
        onComplete={handleScanComplete}
      />
    </main>
  )
}
