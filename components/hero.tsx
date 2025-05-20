"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, Download } from "lucide-react"
import TypewriterEffect from "./typewriter-effect"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const ticking = useRef(false)

  // Optimized scroll handler with requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking.current = false
      })
      ticking.current = true
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById("projects")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const downloadResume = useCallback(() => {
    // Create a link element
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "samarth-mangukia-resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  return (
    <div className="hero">
      <div className="container">
        <div
          className="hero-content mx-auto text-center"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Samarth Mangukia</h1>
            <div className="h-10 mb-4 flex justify-center">
              <TypewriterEffect
                texts={["Full-Stack Developer", "Cloud & DevOps Engineer", "Data Scientist", "Master's Student"]}
              />
            </div>
            <p className="hero-text">
              Master&apos;s student at Dalhousie University specializing in Full-Stack Development, Cloud Technologies, and
              Data Science
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn" onClick={scrollToAbout}>
                Discover My Work
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                className="btn"
                style={{
                  background: "var(--bg)",
                  // border: "1px solid var(--primary)",
                  color: "var(--text-1)",
                  boxShadow: "var(--shadow-sm)",
                }}
                onClick={downloadResume}
              >
                Download Resume
                <Download className="h-5 w-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <button
          className="inline-flex items-center justify-center rounded-full h-12 w-12 bg-white dark:!bg-gray-800 hover:bg-gray-100 dark:hover:!bg-gray-700 shadow-sm text-primary dark:!text-white"
          onClick={scrollToAbout}
          style={{ backgroundColor: "var(--bg-light)", color: "var(--primary)" }}
          data-dark-style="background-color: var(--surface-dark); color: white;"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </motion.div>
    </div>
  )
}
