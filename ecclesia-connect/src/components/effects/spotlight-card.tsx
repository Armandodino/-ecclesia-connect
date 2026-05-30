"use client"

import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(184, 146, 58, 0.15)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}

interface HoverBorderGradientProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  gradient?: string
}

export function HoverBorderGradient({
  children,
  className,
  containerClassName,
  gradient = "from-royal-blue via-gold to-royal-blue",
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={cn("relative p-[1px] rounded-2xl overflow-hidden", containerClassName)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r transition-opacity duration-500",
          gradient,
          hovered ? "opacity-100" : "opacity-40"
        )}
      />
      <div className={cn("relative bg-white/90 rounded-2xl", className)}>
        {children}
      </div>
    </div>
  )
}

interface ShimmerBorderProps {
  children: React.ReactNode
  className?: string
}

export function ShimmerBorder({ children, className }: ShimmerBorderProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        className
      )}
    >
      {/* Animated shimmer border */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-[-2px] rounded-2xl"
          style={{
            background: "conic-gradient(from 0deg, transparent, #b8923a, transparent, #1e3f6b, transparent)",
            animation: "spin 4s linear infinite",
          }}
        />
      </div>
      {/* Inner content */}
      <div className="relative m-[1px] rounded-2xl bg-white/90 backdrop-blur-xl">
        {children}
      </div>
    </div>
  )
}

interface BackgroundGradientProps {
  children: React.ReactNode
  className?: string
  gradient?: string
}

export function BackgroundGradient({
  children,
  className,
  gradient = "from-royal-blue/5 via-transparent to-gold/5",
}: BackgroundGradientProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
      <div className="relative">{children}</div>
    </div>
  )
}
