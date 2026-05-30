"use client"

import React from "react"
import { motion } from "framer-motion"

interface AnimatedBeamsProps {
  className?: string
  beamWidth?: number
  beamHeight?: number
  beamNumber?: number
  colors?: string[]
  speed?: number
}

export function AnimatedBeams({
  className,
  beamWidth = 2,
  beamHeight = 120,
  beamNumber = 6,
  colors = ["#1e3f6b", "#b8923a", "#1e3f6b", "#b8923a", "#1e3f6b", "#b8923a"],
  speed = 3,
}: AnimatedBeamsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {Array.from({ length: beamNumber }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: beamWidth,
            height: beamHeight,
            left: `${(i + 1) * (100 / (beamNumber + 1))}%`,
            top: "-10%",
            background: `linear-gradient(180deg, transparent, ${colors[i % colors.length]}40, transparent)`,
            filter: "blur(2px)",
          }}
          animate={{
            y: ["0%", "200%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

interface OrbitingCircleProps {
  className?: string
  radius?: number
  duration?: number
  delay?: number
}

export function OrbitingCircle({
  className,
  radius = 100,
  duration = 20,
  delay = 0,
}: OrbitingCircleProps) {
  return (
    <div className={cn("absolute", className)}>
      <motion.div
        className="w-3 h-3 rounded-full bg-gold"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        style={{
          width: radius * 2,
          height: radius * 2,
          position: "relative",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold shadow-[0_0_10px_rgba(184,146,58,0.5)]" />
      </motion.div>
    </div>
  )
}

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const deltaX = (clientX - centerX) / 5
    const deltaY = (clientY - centerY) / 5
    setPosition({ x: deltaX, y: deltaY })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className={cn("inline-block", className)}>
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
