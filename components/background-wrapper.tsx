"use client"

import dynamic from "next/dynamic"

const MinimalBackground = dynamic(() => import("@/components/minimal-background"), {
  ssr: false,
})

export default function BackgroundWrapper() {
  return <MinimalBackground />
}
