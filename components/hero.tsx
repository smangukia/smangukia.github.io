"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react"
import TypewriterEffect from "./typewriter-effect"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const ticking = useRef(false)

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
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const scrollToProjects = useCallback(() => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const openResume = useCallback(() => {

    const googleDriveUrl = "https://drive.google.com/file/d/1PBq4khXNoZiCXDID2KeBRLDEg9ntYdll/view?usp=sharing"

    window.open(googleDriveUrl, "_blank", "noopener,noreferrer")
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
                texts={["Code. Cloud. Data", "Build. Deploy. Scale" , "Full-Stack Magic", "Cloud Power"]}
              />
            </div>
            <p className="hero-text">
              Master&apos;s student at Dalhousie University specializing in Full-Stack Development, Cloud Technologies, and Data Science
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn" onClick={scrollToProjects}>
                Discover My Work
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                className="btn"
                style={{
                  background: "var(--bg)",
                  color: "var(--text-1)",
                  boxShadow: "var(--shadow-sm)",
                }}
                onClick={openResume}
              >
                View Resume
                <ExternalLink className="h-5 w-5 ml-2" />
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
          className="inline-flex items-center justify-center rounded-full h-12 w-12 shadow-sm transition-colors"
          onClick={scrollToAbout}
          style={{
            backgroundColor: "var(--surface)",
            color: "var(--text-1)",
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLElement
            target.style.opacity = "0.8"
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLElement
            target.style.opacity = "1"
          }}
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </motion.div>
    </div>
  )
}
