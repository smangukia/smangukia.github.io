import { Suspense } from "react"
import dynamic from "next/dynamic"
import LoadingSpinner from "@/components/loading-spinner"
import BackgroundWrapper from "@/components/background-wrapper"
import Header from "@/components/header"

// Dynamically import components with code splitting
const Hero = dynamic(() => import("@/components/hero"), { ssr: true })
const About = dynamic(() => import("@/components/about"), { ssr: true })
const Projects = dynamic(() => import("@/components/projects"), { ssr: true })
const Skills = dynamic(() => import("@/components/skills"), { ssr: true })
const Contact = dynamic(() => import("@/components/contact"), { ssr: true })
const Footer = dynamic(() => import("@/components/footer"), { ssr: true })

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      <BackgroundWrapper />

      <div className="relative z-10">
        <Header />

        <div>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
          </Suspense>

          <div>
            <Suspense fallback={<LoadingSpinner />}>
              <About />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <Skills />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <Projects />
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
              <Contact />
            </Suspense>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
