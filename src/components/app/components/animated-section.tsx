"use client"

import { useIntersectionObserver } from "../hooks/use-intersection-observer"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fade-up", delay = 0 }: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const animationClasses = {
    "fade-up": "animate-on-scroll",
    "fade-left": "animate-on-scroll-left",
    "fade-right": "animate-on-scroll-right",
    scale: "animate-on-scroll-scale",
  }

  return (
    <div
      ref={ref}
      className={`${animationClasses[animation]} ${isIntersecting ? "animate" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
