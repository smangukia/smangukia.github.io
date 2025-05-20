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
              I am a graduate student at Dalhousie University, specializing in Applied Computer Science with a focus on
              full-stack development, cloud technologies, and AI. My technical toolkit includes React.js, Node.js,
              Spring Boot, and cloud platforms like AWS and Kubernetes.
            </p>

            <p className="mb-6">
              At Invental Pvt Ltd, I developed a comprehensive learning platform implementing the full software
              development lifecycle. Working in an agile environment, I built features including interactive dashboards,
              GitHub OAuth integration, and real-time evaluation systems that enhanced user engagement and assessment
              efficiency.
            </p>

            <p className="mb-6">
              I&apos;ve architected production-ready applications using microservices and event-driven design with Kafka and
              Socket.IO. My work with TensorFlow and Keras has allowed me to implement transfer learning solutions for
              computer vision problems, combining my software engineering expertise with practical AI applications.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
