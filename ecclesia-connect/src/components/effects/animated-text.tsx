"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export function AnimatedGradientText({
  children,
  className,
  from = "#1e3f6b",
  via = "#b8923a",
  to = "#1e3f6b",
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to}, ${via}, ${from})`,
        backgroundSize: "200% auto",
        animation: "gradient-shift 4s linear infinite",
      }}
    >
      {children}
    </span>
  )
}

interface GlowTextProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function GlowText({
  children,
  className,
  color = "rgba(184, 146, 58, 0.4)",
}: GlowTextProps) {
  return (
    <span
      className={cn("relative inline-block", className)}
      style={{
        textShadow: `0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
      }}
    >
      {children}
    </span>
  )
}

interface TypewriterTextProps {
  texts: string[]
  className?: string
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
}

export function TypewriterText({
  texts,
  className,
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex]

        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1))
          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1))
          if (currentText === "") {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseDuration])

  return (
    <span className={cn("inline-block", className)}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  speed?: number
  range?: number
}

export function FloatingElement({
  children,
  className,
  speed = 3,
  range = 10,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-range, range, -range],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function ParallaxText({
  children,
  className,
  speed = 0.5,
}: ParallaxTextProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.scrollY
        setOffset(scrolled * speed)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div style={{ transform: `translateY(${offset}px)` }}>
        {children}
      </div>
    </div>
  )
}
