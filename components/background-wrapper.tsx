"use client"

import dynamic from "next/dynamic"

// Import the minimal background without SSR to avoid hydration issues
const MinimalBackground = dynamic(() => import("@/components/minimal-background"), {
  ssr: false,
})

export default function BackgroundWrapper() {
  return <MinimalBackground />
}
