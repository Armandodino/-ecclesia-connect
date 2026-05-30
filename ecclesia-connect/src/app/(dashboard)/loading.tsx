"use client"

import React from "react"
import { motion } from "framer-motion"

export default function DashboardLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(169, 134, 55, 0.1) 0%, transparent 50%),
            linear-gradient(150deg, #1b3a5b 0%, #122a44 100%)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14">
            <motion.path
              d="M30 6 L30 54 M18 22 L42 22"
              stroke="#a98637"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-white/50 font-serif-elegant italic"
        >
          Chargement...
        </motion.p>
      </div>
    </div>
  )
}
