"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Badge } from "./ui/badge"

// Update the Projects component to use theme variables
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  type Project = {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    github?: string
    details: string
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "HandyShare – Peer-to-Peer Lending Platform",
      description: "A comprehensive web application designed to facilitate the sharing and renting of household items.",
      image: "/handyshare1.png",
      tags: ["Spring Boot", "React.js", "Ant Design", "JWT", "Stripe", "CI/CD"],
      github: "https://github.com/smangukia/HandyShare",
      details:
        "HandyShare is a comprehensive web application designed to facilitate the sharing and renting of household items. Built with a robust backend using Spring Boot MVC and a dynamic frontend with React.js, HandyShare ensures a seamless user experience for both item owners and renters.\n\nI implemented secure user authentication using JWT, including sign-up, email verification, and login, while addressing token conflict issues for a smoother user experience. The platform includes features for user registration with email verification, authentication and login, product management, payment processing via Stripe integration, and lending item management.\n\nThe backend is built with Spring Boot and includes dependencies for JPA, web services, security, email functionalities, and validation. The frontend leverages React.js along with Ant Design for UI components, react-router-dom for routing, and axios for HTTP communications. The project also includes a CI/CD pipeline to automate builds, tests, and deployments, and incorporated Designite to support maintainable, high-quality code.",
    },
    {
      id: 2,
      title: "CommuneDrop – Cloud-Native Delivery Platform",
      description:
        "A comprehensive delivery tracking platform with real-time location tracking and microservice architecture.",
      image: "/communedrop-platform.png",
      tags: ["React", ".NET", "Node.js", "Kafka", "Redis", "AWS", "Kubernetes", "Terraform"],
      github: "https://github.com/smangukia/CommuneDrop",
      details:
        "CommuneDrop is a comprehensive delivery tracking platform built with a modern microservice architecture. The platform enables real-time delivery tracking, secure payment processing, and efficient order management through a set of specialized microservices deployed on AWS EKS.\n\nThe system architecture consists of multiple microservices: AuthService (.NET, Duende Identity Server, MongoDB) for authentication and authorization, Frontend Service (React, Vite, TailwindCSS, Socket.IO) for user interface, LiveLocationService (Node.js, Socket.IO, Kafka, MongoDB) for real-time driver location tracking, LocationService (Node.js, Express, AWS Location, Redis) for geocoding and route calculation, OrderService (Node.js, TypeScript, Express, MongoDB, Kafka) for order management, and PaymentService (Node.js, TypeScript, Express, MongoDB, Stripe) for payment processing.\n\nI built the real-time location tracking system using Node.js, Socket.IO, and Kafka, enabling smooth communication between drivers and customers through an event-driven architecture. The entire infrastructure is provisioned and managed using Terraform on AWS EKS, with features like custom VPC configuration, node groups with spot instances for cost optimization, and load balancing with SSL/TLS termination support.",
    },
    {
      id: 3,
      title: "Document Converter – Scalable Document Transformation Platform",
      description:
        "A microservices-based application for converting documents between various formats with web and API interfaces.",
      image: "/documentconverter.png",
      tags: ["React.js", "Node.js", "AWS", "Terraform", "Microservices"],
      github: "https://github.com/smangukia/Document-Converter",
      details:
        "Document Converter is a service that converts documents between common formats (e.g., Markdown to HTML, HTML to PDF) with a modern microservices architecture. The platform allows users to upload documents in various formats (Markdown, HTML, DOCX, TXT) and convert them to different output formats (HTML, PDF, Markdown, TXT).\n\nThe architecture follows a microservices approach with four main layers: User-facing Layer (React-based web interface and API endpoints), Processing Layer (document validation, format detection, and conversion pipeline), Storage Layer (document persistence and metadata management), and Analytics Layer (usage tracking and conversion metrics).\n\nThe project utilizes various AWS services including Lambda and EC2 for compute, S3 for document storage, API Gateway for networking, DynamoDB for conversion history, and SQS for processing queue. I designed and deployed this scalable cloud infrastructure using Terraform (IaC) on AWS, and incorporated automation workflows aligned with DevOps best practices. The system supports a wide range of conversions including Markdown to HTML, HTML to PDF, DOCX to HTML, and many others.",
    },
    {
      id: 4,
      title: "Raspberry Pi NAS Server – Self-Hosted Storage Solution",
      description:
        "A professional-grade Network Attached Storage server built with Raspberry Pi 5, featuring ZFS, Docker, and Kubernetes capabilities.",
      image: "/raspberrypi.jpg",
      tags: ["Raspberry Pi", "ZFS", "OpenMediaVault", "Docker", "Kubernetes", "Pi-hole", "Edge Computing"],
      details:
        "I built a robust, enterprise-grade Network Attached Storage (NAS) server solution using the Raspberry Pi 5, demonstrating how powerful, cost-effective server systems can be built with modern SBC technology.\n\nThe hardware implementation combines the Raspberry Pi 5's computing power with a Radxa Penta SATA HAT, allowing connection of multiple hard drives. I configured four 1TB drives in ZFS for reliable, fault-tolerant storage with advanced data protection features, running on the lightweight Raspberry Pi OS Lite to maximize available resources for storage operations.\n\nFor the software stack, I deployed OpenMediaVault for comprehensive storage management, secured with proper SSL certificates for encrypted remote access. I extended functionality through several key plugins including OpenMediaVault Compose for Docker container management and OpenMediaVault Kubernetes (K3s), providing a single-node Kubernetes environment with pre-installed Traefik, Cert-Manager, and Kubernetes Dashboard. I implemented static IP addressing with appropriate port forwarding to enable secure accessibility while maintaining security, and added Pi-hole for network-level content filtering.\n\nThis system provides multiple professional use cases including secure document management, local backup solutions, media asset management, development environment with Git repository hosting and CI/CD artifact storage, collaborative workspace with team file sharing, edge computing platform, and containerized application hosting running microservices via Docker and Kubernetes.",
    },
    {
      id: 5,
      title: "Brain Tumor MRI Detection",
      description:
        "A Flask-based web application that uses deep learning with transfer learning (MobileNet) to detect brain tumors from MRI scans with high accuracy.",
      image: "/tumordetection.png",
      tags: ["Python", "Flask", "TensorFlow", "Keras", "MobileNet", "Transfer Learning", "Deep Learning"],
      github: "https://github.com/smangukia/brain-tumor-detection",
      details:
        "This project is a Flask-based web application that uses deep learning with transfer learning (MobileNet) to detect brain tumors from MRI scans with over 97% accuracy.\n\nThe application features a user-friendly interface with drag-and-drop functionality for MRI scan uploads, real-time analysis with instant processing and results display, and clear visualization of detection results with confidence scores. It's privacy-focused with all processing done locally on the server and no permanent storage of uploaded images.\n\nThe model development journey involved multiple iterations. Initially, I developed a custom CNN architecture trained from scratch with ~5.6 million trainable parameters and 94.80% accuracy on test data. To improve performance, I implemented a transfer learning approach using MobileNet, which reduced parameters to only 50,177 (100x reduction), improved accuracy to 97.32%, and achieved faster convergence in just 5 epochs.\n\nThe technology stack includes Flask for the backend, TensorFlow/Keras with MobileNet architecture for deep learning, and HTML/CSS/JavaScript for the frontend. The application includes robust error handling for model compatibility issues and is designed with security considerations in mind.",
    },
    {
      id: 6,
      title: "Real-Time Object Detection",
      description:
        "A custom object detection system using TensorFlow Object Detection API and pretrained SSD MobileNet V2 model for real-time detection.",
      image: "/realtimeobjectdetection.png",
      tags: ["TensorFlow", "Object Detection API", "Computer Vision", "SSD MobileNet", "Jupyter Notebook"],
      github: "https://github.com/smangukia/Real-Time-Object-Detection",
      details:
        "This is a custom object detection project created in Jupyter Notebook using TensorFlow Object Detection API and trained on pretrained model such as SSD MobileNet V2 FPNLite 320x320 from TensorFlow model zoo for initializing the custom model when training on novel datasets.\n\nThe project follows a comprehensive workflow that includes image collection, dataset preparation, model training, and evaluation. I implemented a process to collect and annotate images, manually divide them into training and testing sets, and train the model using transfer learning techniques.\n\nThe system allows for real-time object detection with live video feeds, providing bounding boxes and confidence scores for detected objects. The implementation includes steps for installing the TensorFlow Object Detection API, configuring the training pipeline, and evaluating model performance using metrics like mAP (mean Average Precision) and Recall through Tensorboard.\n\nThis project demonstrates practical application of computer vision techniques and the power of transfer learning for custom object detection tasks, even with limited training data. The modular approach allows for easy adaptation to detect different objects by retraining the model with new datasets.",
    },
  ]

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

  const [currentIndex, setCurrentIndex] = useState(0)
  const projectsPerPage = 2
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const nextProjects = () => {
    setCurrentIndex((prev) => (prev + projectsPerPage >= projects.length ? 0 : prev + projectsPerPage))
  }

  const prevProjects = () => {
    setCurrentIndex((prev) => (prev - projectsPerPage < 0 ? projects.length - projectsPerPage : prev - projectsPerPage))
  }

  const visibleProjects = projects.slice(currentIndex, currentIndex + projectsPerPage)

  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (selectedProject) {
      document.body.classList.add("modal-open")
    } else {
      document.body.classList.remove("modal-open")
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("modal-open")
    }
  }, [selectedProject])

  return (
    <section id="projects" className="py-20 relative z-10 pointer-events-auto" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-text-2 max-w-2xl mx-auto">
            Explore my latest projects showcasing my skills in full-stack development, cloud technologies, and software
            architecture.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
              >
                <div className="card rounded-lg overflow-hidden h-full flex flex-col hover:border-primary-300 hover:shadow-md transition-all duration-300 group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-xl font-semibold leading-none tracking-tight">{project.title}</h3>
                  </div>
                  <div className="p-6 pt-0 flex-grow">
                    <p className="text-text-2 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center p-6 pt-0 justify-between">
                    <button
                      className="text-primary hover:text-primary-dark hover:bg-primary-50 dark:hover:bg-primary-900/20 bg-transparent px-3 py-2 rounded-md transition-colors"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                    </button>
                    <div className="flex gap-2">
                      {project.github && project.id !== 4 && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md h-10 w-10 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                className="inline-flex items-center justify-center rounded-md h-10 w-10 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={prevProjects}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center text-gray-400">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${
                      Math.floor(currentIndex / projectsPerPage) === index
                        ? "bg-primary"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
              <button
                className="inline-flex items-center justify-center rounded-md h-10 w-10 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={nextProjects}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <motion.div variants={itemVariants} className="text-center mt-12">
        <a href="https://github.com/smangukia" target="_blank" rel="noopener noreferrer" className="btn inline-flex">
            View All Projects
          </a>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm overflow-hidden"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative card rounded-lg max-w-4xl w-full max-h-[80vh] shadow-xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 z-10 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full h-10 w-10 inline-flex items-center justify-center"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="relative h-64 w-full flex-shrink-0">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent"></div>
              </div>

              <div className="p-6 overflow-y-auto flex-grow flex flex-col max-h-[calc(80vh-16rem)]">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="text-text-2 mb-6 whitespace-pre-line overflow-y-auto pr-2">
                  {selectedProject.details}
                </div>

                <div className="flex gap-4 mt-auto pt-4">
                  {selectedProject.github && selectedProject.id !== 4 && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white"
                    >
                      <Github className="h-4 w-4 mr-2" /> View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
