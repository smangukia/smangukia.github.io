"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = useCallback((href: string) => {
    setIsMobileMenuOpen(false)

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const section = document.querySelector(href)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="nav">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("#")
              }}
              className="logo"
            >
              <span>Samarth Mangukia</span>
            </Link>

            {/* Desktop Navigation - show on medium screens and up */}
            <div className="nav-menu hidden md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className="nav-link"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button - show only on small screens */}
            <button className="md:hidden text-current p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation - only show on small screens */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-20 left-0 w-full backdrop-blur-md z-40 py-4 shadow-lg md:hidden"
          style={{
            backgroundColor: "var(--surface)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <nav className="container flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.href)
                }}
                className="py-2 font-medium transition-colors"
                style={{
                  color: "var(--text-1)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement
                  target.style.color = "var(--primary)"
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement
                  target.style.color = "var(--text-1)"
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
