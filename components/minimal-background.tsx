"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

export default function MinimalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    updateCanvasDimensions()

    // Draw subtle background pattern
    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fill with background color based on theme
      const bgColor = theme === "light" ? "#ffffff" : "#0f172a"
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle grid pattern
      const gridColor = theme === "light" ? "#e9ecef" : "#1e293b"
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 0.5 // Make lines thinner

      const gridSize = 40

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Add subtle gradient overlay
      const gradientColors =
        theme === "light"
          ? ["rgba(248, 249, 250, 0.8)", "rgba(233, 236, 239, 0.8)"]
          : ["rgba(15, 23, 42, 0.8)", "rgba(30, 41, 59, 0.8)"]

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, gradientColors[0])
      gradient.addColorStop(1, gradientColors[1])
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add radial gradients for the hero section effect
      const primaryColor = theme === "light" ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)"
      const accentColor = theme === "light" ? "rgba(244, 63, 94, 0.1)" : "rgba(244, 63, 94, 0.05)"

      // Primary color gradient
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.5,
      )
      gradient1.addColorStop(0, primaryColor)
      gradient1.addColorStop(1, "transparent")

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Accent color gradient
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.7,
        0,
        canvas.width * 0.8,
        canvas.height * 0.7,
        canvas.width * 0.5,
      )
      gradient2.addColorStop(0, accentColor)
      gradient2.addColorStop(1, "transparent")

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    drawPattern()

    // Handle resize
    const handleResize = () => {
      updateCanvasDimensions()
      drawPattern()
    }

    window.addEventListener("resize", handleResize)

    // Redraw when theme changes
    drawPattern()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" aria-hidden="true" />
}
