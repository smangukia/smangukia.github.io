import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
})

export const metadata = {
  title: "Samarth Mangukia | Applied Computer Science Portfolio",
  description:
    "Portfolio website for Samarth Mangukia, Master of Applied Computer Science student at Dalhousie University",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} transition-colors`}>
        <ThemeProvider defaultTheme="light">
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
