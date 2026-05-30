"use client"

import React from "react"
import { motion } from "framer-motion"

export function CathedralBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, rgba(30, 63, 107, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(184, 146, 58, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(30, 63, 107, 0.02) 0%, transparent 70%),
            var(--background)
          `,
        }}
      />

      {/* Subtle cross pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30, 63, 107, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 63, 107, 1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative light orbs */}
      <motion.div
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(184, 146, 58, 0.15), transparent)" }}
      />
      <motion.div
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(30, 63, 107, 0.12), transparent)" }}
      />
      <motion.div
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(184, 146, 58, 0.05), transparent)" }}
      />
    </div>
  )
}

export function StainedGlassOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top-right light beam */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.04]"
        style={{
          background: "conic-gradient(from 135deg, transparent 0%, rgba(184, 146, 58, 0.8) 10%, transparent 20%)",
          filter: "blur(40px)",
        }}
      />
      {/* Bottom-left light beam */}
      <div
        className="absolute -bottom-20 -left-20 w-60 h-60 opacity-[0.03]"
        style={{
          background: "conic-gradient(from 315deg, transparent 0%, rgba(30, 63, 107, 0.8) 10%, transparent 20%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  )
}
