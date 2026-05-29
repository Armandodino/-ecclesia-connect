"use client"

import React from "react"
import { motion } from "framer-motion"
import { Cross, Calendar, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ParchmentCardProps {
  title: string
  content: string
  type: string
  typeLabel: string
  author: string
  date: string
  isPinned?: boolean
  onClick: () => void
  index: number
}

const typeColors: Record<string, string> = {
  general: "bg-royal-blue/10 text-royal-blue border-royal-blue/20",
  deces: "bg-stone-gray/10 text-stone-gray border-stone-gray/20",
  mariage: "bg-wine-red/10 text-wine-red border-wine-red/20",
  bapteme: "bg-royal-blue/10 text-royal-blue border-royal-blue/20",
  confirmation: "bg-deep-purple/10 text-deep-purple border-deep-purple/20",
  pelerinage: "bg-gold/10 text-gold-dark border-gold/20",
  collecte: "bg-emerald/10 text-emerald border-emerald/20",
  reunion: "bg-royal-blue/10 text-royal-blue border-royal-blue/20",
}

const typeSealBg: Record<string, string> = {
  general: "from-royal-blue to-royal-blue-dark",
  deces: "from-stone-gray to-stone-dark",
  mariage: "from-wine-red to-wine-red/80",
  bapteme: "from-royal-blue to-royal-blue-light",
  confirmation: "from-deep-purple to-deep-purple/80",
  pelerinage: "from-gold to-gold-dark",
  collecte: "from-emerald to-emerald/80",
  reunion: "from-royal-blue to-royal-blue-light",
}

export function ParchmentCard({
  title,
  content,
  type,
  typeLabel,
  author,
  date,
  isPinned,
  onClick,
  index,
}: ParchmentCardProps) {
  const truncatedContent = content.length > 120
    ? content.substring(0, 120) + "..."
    : content

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      className="parchment parchment-corners parchment-card cursor-pointer group"
    >
      <div className="relative z-[2] p-4 sm:p-5">
        {/* Pinned indicator */}
        {isPinned && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] tracking-[0.15em] text-gold-dark uppercase font-cathedral font-semibold">
              Épinglée
            </span>
          </div>
        )}

        <div className="flex items-start gap-3 sm:gap-4">
          {/* Mini Wax Seal */}
          <div className="flex-shrink-0">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${typeSealBg[type] || typeSealBg.general} flex items-center justify-center shadow-md`}
            >
              <Cross className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Type badge */}
            <Badge className={`${typeColors[type] || typeColors.general} text-[10px] mb-2 border`}>
              {typeLabel}
            </Badge>

            {/* Title */}
            <h3 className="font-cathedral text-base sm:text-lg font-semibold text-royal-blue-dark group-hover:text-gold-dark transition-colors leading-snug mb-1.5">
              {title}
            </h3>

            {/* Content preview */}
            <p className="font-serif-elegant text-sm text-stone-dark leading-relaxed line-clamp-2 mb-3">
              {truncatedContent}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[11px] text-stone-gray">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
                <span>•</span>
                <span>{author}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-gray group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
