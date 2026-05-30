"use client"

import React, { useMemo } from "react"
import Particles from "@tsparticles/react"
import type { ISourceOptions } from "@tsparticles/engine"

interface ParticleBackgroundProps {
  className?: string
  quantity?: number
  color?: string
}

export function ParticleBackground({
  className = "",
  quantity = 40,
  color = "#b8923a",
}: ParticleBackgroundProps) {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: { value: quantity, density: { enable: true } },
        color: { value: color },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.05, max: 0.2 },
          animation: { enable: true, speed: 0.3, sync: false },
        },
        size: { value: { min: 1, max: 2.5 } },
        links: {
          enable: true,
          distance: 120,
          color: color,
          opacity: 0.08,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none" as const,
          random: false,
          straight: false,
          outModes: { default: "out" as const },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" as const },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.2 } },
        },
      },
      detectRetina: true,
      emitters: [],
    }),
    [quantity, color]
  )

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      <Particles id="tsparticles" options={options} className="w-full h-full" />
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ")
}
