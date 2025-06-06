"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-20 relative z-10 pointer-events-auto" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div variants={itemVariants}>
            <p className="mb-6">
              I am a graduate student at Dalhousie University specializing in Applied Computer Science with a focus on software development, system-level programming, AI applications, and innovative technical solutions. My expertise spans systems programming languages, full-stack development, and cloud technologies.
            </p>

            <p className="mb-6">
              At Invental Pvt Ltd, I developed a comprehensive learning platform implementing the full software development lifecycle. Working in agile environments, I built scalable systems with real-time processing, secure authentication, and performance optimization that enhanced user engagement and system efficiency.
            </p>

            <p className="mb-6">
              I&apos;ve architected diverse applications from embedded systems to real-time processing pipelines and cloud-native microservices. My experience includes Linux system administration, hardware integration, and AI applications using TensorFlow, combining strong software engineering fundamentals with practical problem-solving across multiple domains.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
