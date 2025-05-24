"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact: ${formState.subject}`)
    const body = encodeURIComponent(`Name: ${formState.name}
Email: ${formState.email}

Message:
${formState.message}

---
Sent from your portfolio website contact form`)

    const mailtoLink = `mailto:smangukia111@gmail.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink
  }

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
    <section id="contact" className="py-20 relative z-10 pointer-events-auto bg-surface" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-text-2 max-w-2xl mx-auto">
            Have a question or want to collaborate? Feel free to reach out to me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <div className="card rounded-lg h-full shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Email</h4>
                      <p className="text-text-2">smangukia111@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Phone</h4>
                      <p className="text-text-2">(123) 456-7890</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Location</h4>
                      <p className="text-text-2">Halifax, Nova Scotia, Canada</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/smangukia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/smangukia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 border border-gray-200 dark:border-gray-700 text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:smangukia111@gmail.com"
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 border border-gray-200 dark:border-gray-700 text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="card rounded-lg shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-bg border-gray-200 dark:border-gray-700"
                    />
                  </div>

                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-bg border-gray-200 dark:border-gray-700"
                    />
                  </div>

                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="bg-bg border-gray-200 dark:border-gray-700"
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="bg-bg border-gray-200 dark:border-gray-700"
                      rows={5}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 px-6 rounded-md shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <Send className="h-5 w-5" />
                    Open Email Client
                  </button>
                </form>

                <div className="mt-6 space-y-3">
                  {/* Gray box */}
                  <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
                    <p className="text-xs text-center" style={{ color: "var(--text-2)" }}>
                      Or email me directly at{" "}
                      <a
                        href="mailto:smangukia111@gmail.com"
                        className="hover:underline"
                        style={{ color: "var(--primary)" }}
                      >
                        smangukia111@gmail.com
                      </a>
                    </p>
                  </div>

                  {/* Amber box using CSS custom properties */}
                  <div className="p-3 rounded-lg border contact-amber-box">
                    <p className="text-xs text-center">
                      💡 <strong>Tip:</strong> If the email client doesn&apos;t open automatically, please copy the email
                      address above and compose your message manually.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
