import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary"
  className?: string
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variantStyles = {
    default: "bg-primary-50 text-primary-700 border border-primary-200",
    outline: "border border-gray-300 text-gray-700 bg-transparent",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
