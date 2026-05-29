"use client"

import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Image as ImageIcon,
  Video,
  Calendar,
  MapPin,
  Tag,
  Download,
  Share2,
  Heart,
  ZoomIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface MediaItem {
  id: string
  type: "image" | "video"
  src: string
  thumbnail?: string
  title: string
  description?: string
  category: string
  date?: string
  location?: string
  author?: string
  likes?: number
  videoUrl?: string
  duration?: string
}

interface MediaGalleryProps {
  items: MediaItem[]
  categories?: string[]
  showFilters?: boolean
  columns?: 2 | 3 | 4
}

export function MediaGallery({
  items,
  categories = ["Tout"],
  showFilters = true,
  columns = 3,
}: MediaGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tout")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredItems =
    selectedCategory === "Tout"
      ? items
      : items.filter((item) => item.category === selectedCategory)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
  }, [])

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return
      const len = filteredItems.length
      if (direction === "next") {
        setLightboxIndex((lightboxIndex + 1) % len)
      } else {
        setLightboxIndex((lightboxIndex - 1 + len) % len)
      }
    },
    [lightboxIndex, filteredItems.length]
  )

  const allCategories = ["Tout", ...new Set(items.map((i) => i.category))]

  return (
    <div className="space-y-6">
      {/* Filters */}
      {showFilters && allCategories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {allCategories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "whitespace-nowrap",
                selectedCategory === cat && "bg-royal-blue text-white"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div
        className={cn(
          "grid gap-3 sm:gap-4",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-muted"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openLightbox(index)}
            >
              {/* Image/Video */}
              <div className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-royal-blue/10 to-gold/10 flex items-center justify-center">
                  {item.type === "video" ? (
                    <Video className="w-10 h-10 text-royal-blue/30" />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-royal-blue/30" />
                  )}
                </div>
                {/* When real images are added, replace with: */}
                {/* <img src={item.src} alt={item.title} className="w-full h-full object-cover" /> */}
              </div>

              {/* Overlay */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300",
                  hoveredId === item.id ? "opacity-100" : "opacity-0"
                )}
              />

              {/* Video badge */}
              {item.type === "video" && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
              )}

              {/* Duration */}
              {item.duration && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-black/50 backdrop-blur-sm text-white text-[10px] border-0">
                    {item.duration}
                  </Badge>
                </div>
              )}

              {/* Hover info */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 p-4 z-10 transition-all duration-300",
                  hoveredId === item.id
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                )}
              >
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-white/70 text-xs line-clamp-2">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white text-[9px] border-0">
                    {item.category}
                  </Badge>
                  {item.date && (
                    <span className="text-white/60 text-[10px] flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {item.date}
                    </span>
                  )}
                </div>
              </div>

              {/* Zoom icon */}
              <div
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300",
                  hoveredId === item.id
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate("prev")
              }}
              className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigate("next")
              }}
              className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Content */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl w-full mx-4 flex flex-col lg:flex-row gap-6 max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Media */}
              <div className="flex-1 flex items-center justify-center min-h-[300px]">
                <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-royal-blue/20 to-gold/10 flex items-center justify-center">
                  {filteredItems[lightboxIndex].type === "video" ? (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                      <p className="text-white/60 text-sm">
                        {filteredItems[lightboxIndex].duration}
                      </p>
                    </div>
                  ) : (
                    <ImageIcon className="w-16 h-16 text-white/20" />
                  )}
                  {/* When real images: <img src={item.src} className="w-full h-full object-contain rounded-xl" /> */}
                </div>
              </div>

              {/* Info Panel */}
              <div className="lg:w-80 flex-shrink-0 text-white">
                <h2 className="font-cathedral text-xl font-bold mb-2">
                  {filteredItems[lightboxIndex].title}
                </h2>
                {filteredItems[lightboxIndex].description && (
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {filteredItems[lightboxIndex].description}
                  </p>
                )}
                <div className="space-y-3 mb-6">
                  <Badge className="bg-white/10 text-white border-white/20">
                    {filteredItems[lightboxIndex].category}
                  </Badge>
                  {filteredItems[lightboxIndex].date && (
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="w-4 h-4" />
                      {filteredItems[lightboxIndex].date}
                    </div>
                  )}
                  {filteredItems[lightboxIndex].location && (
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <MapPin className="w-4 h-4" />
                      {filteredItems[lightboxIndex].location}
                    </div>
                  )}
                  {filteredItems[lightboxIndex].author && (
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Tag className="w-4 h-4" />
                      {filteredItems[lightboxIndex].author}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 flex-1">
                    <Heart className="w-4 h-4 mr-1.5" />
                    {filteredItems[lightboxIndex].likes || 0}
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 flex-1">
                    <Share2 className="w-4 h-4 mr-1.5" />
                    Partager
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* Counter */}
                <p className="text-center text-white/40 text-xs mt-4">
                  {lightboxIndex + 1} / {filteredItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
