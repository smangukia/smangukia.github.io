"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
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
    <footer ref={ref} className="relative z-10 bg-bg mt-20 pointer-events-auto py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left side - Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full md:w-1/2"
          >
            <motion.div variants={itemVariants} className="flex items-center mb-6">
              <h3 className="text-xl font-bold text-text-1">Samarth Mangukia</h3>
            </motion.div>

            {/* <motion.div variants={itemVariants} className="mb-6">
              <p className="text-text-2 text-sm max-w-md">
                Master's student at Dalhousie University exploring the intersection of full-stack development, cloud
                technologies, and software architecture.
              </p>
            </motion.div> */}

            <motion.div variants={itemVariants}>
              <div className="flex items-center space-x-4 mb-4">
                <Mail className="h-4 w-4 text-text-2" />
                <a
                  href="mailto:smangukia111@gmail.com"
                  className="text-text-2 text-sm hover:text-primary transition-colors"
                >
                  smangukia111@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Phone className="h-4 w-4 text-text-2" />
                <a href="tel:+11234567890" className="text-text-2 text-sm hover:text-primary transition-colors">
                  (782) 899-2252
                </a>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <MapPin className="h-4 w-4 text-text-2" />
                <span className="text-text-2 text-sm">Halifax, Nova Scotia, Canada</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Quick links and social */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full md:w-1/2 flex flex-col md:flex-row justify-between"
          >
            {/* Quick Links */}
            <motion.div variants={itemVariants} className="mb-6 md:mb-0">
              <h4 className="text-base font-semibold mb-4 text-text-1">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-text-2 text-sm hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-text-2 text-sm hover:text-primary transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-text-2 text-sm hover:text-primary transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-text-2 text-sm hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-base font-semibold mb-4 text-text-1">Connect</h4>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/smangukia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full h-8 w-8 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/smangukia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full h-8 w-8 border border-gray-200 dark:border-gray-700 text-[#6366f1] hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#6366f1]/50 dark:hover:border-[#6366f1]/50 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:smangukia111@gmail.com"
                  className="inline-flex items-center justify-center rounded-full h-8 w-8 border border-gray-200 dark:border-gray-700 text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-400/50 dark:hover:border-blue-400/50 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center"
        >
          <p className="text-text-2 text-xs">© {new Date().getFullYear()} Samarth Mangukia. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
