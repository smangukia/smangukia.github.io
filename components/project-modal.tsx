"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, Github, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github?: string
  demo?: string
  details: string
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 text-white hover:bg-white/10 rounded-full"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="relative h-64 w-full">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="bg-purple-900/40 hover:bg-purple-800/40 text-white border border-purple-500/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-gray-300 mb-6">{project.details}</p>

            <div className="flex gap-4">
              {project.github && (
                <Button className="bg-gray-800 hover:bg-gray-700 text-white">
                  <Github className="h-4 w-4 mr-2" /> View Code
                </Button>
              )}
              {project.demo && (
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
