"use client"

import React from "react"
import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Background - Stained glass gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(169, 134, 55, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(169, 134, 55, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(27, 58, 91, 0.05) 0%, transparent 70%),
            linear-gradient(150deg, #1b3a5b 0%, #122a44 40%, #0e1f33 100%)
          `,
        }}
      />

      {/* Decorative circles - cathedral light effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#a98637]/[0.08] blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.02] blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="relative w-20 h-20">
            {/* Glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-[#a98637]/20 blur-xl"
            />
            {/* Cross SVG */}
            <svg
              viewBox="0 0 80 80"
              fill="none"
              className="w-20 h-20 relative z-10"
            >
              <motion.path
                d="M40 8 L40 72 M24 28 L56 28"
                stroke="#a98637"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Decorative ends */}
              <motion.circle
                cx="40" cy="8" r="2"
                fill="#a98637"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              />
              <motion.circle
                cx="40" cy="72" r="2"
                fill="#a98637"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              />
              <motion.circle
                cx="24" cy="28" r="2"
                fill="#a98637"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              />
              <motion.circle
                cx="56" cy="28" r="2"
                fill="#a98637"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-cathedral text-2xl font-bold text-white mb-1 tracking-wide">
            Ecclesia Connect
          </h1>
          <p className="text-sm text-white/40 tracking-[0.2em] uppercase">
            Plateforme paroissiale
          </p>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-[#a98637] to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Subtle text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-xs text-white/25 mt-6 font-serif-elegant italic"
        >
          &ldquo;Que la lumière de Christ éclaire votre chemin&rdquo;
        </motion.p>
      </div>
    </div>
  )
}
