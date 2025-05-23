"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Brain, Eye, Cog, Cloud, Database, Layers, Lightbulb, CheckCircle } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  const skillCategories = [
    {
      icon: <Code className="h-5 w-5 text-[#6366f1]" />,
      title: "Languages",
      description: "Programming languages I work with",
      skills: ["Python", "JavaScript", "C++", "PowerShell", "HTML5", "SQL", "PHP", "TypeScript", "Java", "C#", "CSS3"],
    },
    {
      icon: <Layers className="h-5 w-5 text-[#6366f1]" />,
      title: "Frameworks & Libraries",
      description: "Tools I use to build applications",
      skills: ["ExpressJS", "Redux", "ReactJS", "Springboot", "NodeJS", "NextJS", "Angular"],
    },
    {
      icon: <Database className="h-5 w-5 text-[#6366f1]" />,
      title: "Databases",
      description: "Database systems I'm proficient with",
      skills: ["Redis", "Firebase", "PostgreSQL", "DynamoDB", "MongoDB", "MySQL", "VectorDB", "ChromaDB"],
    },
    {
      icon: <Brain className="h-5 w-5 text-[#6366f1]" />,
      title: "Machine Learning",
      description: "ML frameworks and algorithms",
      skills: [
        "Scikit-learn",
        "TensorFlow",
        "PyTorch",
        "XGBoost",
        "SMOTE",
        "Random Forest",
        "Logistic Regression",
        "Neural Networks",
        "Transformers",
        "CNN",
        "LangChain",
      ],
    },
    {
      icon: <Eye className="h-5 w-5 text-[#6366f1]" />,
      title: "Computer Vision & Data Tools",
      description: "Computer vision tools and techniques",
      skills: ["YOLOv8", "TensorFlow Object Detection API", "OpenCV", "Pandas", "NumPy", "Seaborn", "Transfer Learning", "LabelImg", "PowerBI"],
    },
    {
      icon: <Cloud className="h-5 w-5 text-[#6366f1]" />,
      title: "Cloud & DevOps",
      description: "Cloud services and deployment tools",
      skills: ["Terraform", "Kubernetes", "AWS", "GCP", "Docker", "CI/CD", "Github Actions", "Azure"],
    },
    {
      icon: <Cog className="h-5 w-5 text-[#6366f1]" />,
      title: "APIs & Integrations",
      description: "API development and integration",
      skills: ["Git", "Apache Kafka", "Github OAuth", "RESTful APIs", "GraphQL", "WebAPI","BeautifulSoup", "Selenium"],
    },
    {
      icon: <Lightbulb className="h-5 w-5 text-[#6366f1]" />,
      title: "Software Concepts",
      description: "Software engineering principles I follow",
      skills: [
        "Object-Oriented Programming",
        "Functional Programming",
        "Event-Driven Design",
        "Infrastructure as Code",
        "UML",
        "Microservices Architecture",
        "SOLID principles",
        "Scalability",
        "Optimization",
      ],
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-[#6366f1]" />,
      title: "Soft Skills",
      description: "Professional attributes and interpersonal abilities",
      skills: [
        "Communication",
        "Problem Solving",
        "Team Collaboration",
        "Project Management",
        "Time Management",
        "Leadership",
        "Adaptability",
        "Critical Thinking",
        "Creativity",
      ],
    },
  ]

  // Determine card styles based on theme
  const cardStyle =
    theme === "light" ? "bg-white border-[#6366f1]/20 shadow-sm" : "bg-gray-800 border-[#6366f1]/30 shadow-sm"

  const headingStyle = theme === "light" ? "text-gray-900" : "text-white"

  const descriptionStyle = theme === "light" ? "text-gray-600" : "text-gray-300"

  return (
    <section id="skills" className="py-20 relative z-10 pointer-events-auto" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Skills & Expertise</h2>
          <div className="h-1 w-20 bg-[#6366f1] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional competencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div
                className={`${cardStyle} rounded-lg border p-6 h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className={`text-xl font-semibold ml-2 ${headingStyle}`}>{category.title}</h3>
                </div>
                <p className={`${descriptionStyle} text-sm mb-4`}>{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-[#6366f1] text-white text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
