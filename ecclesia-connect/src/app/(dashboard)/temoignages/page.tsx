"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  BookMarked,
  Quote,
  Heart,
  Share2,
  Play,
  Image,
  Plus,
  Star,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    author: { name: "Marie-Solange Aka", role: "Fidèle" },
    content:
      "Depuis que j'ai rejoint la chorale de la paroisse, ma vie spirituelle s'est transformée. La musique est devenue ma façon de prier et de louer Dieu. Merci à toute la communauté!",
    date: "28 Mai 2026",
    likes: 45,
    hasImage: true,
    category: "Grâce",
  },
  {
    id: 2,
    author: { name: "Jean-Pierre N'Guessan", role: "JEC" },
    content:
      "La retraite spirituelle de la JEC a été une expérience extraordinaire. J'ai découvert le sens profond de ma vocation et la joie de servir les autres.",
    date: "25 Mai 2026",
    likes: 67,
    hasVideo: true,
    category: "Témoignage",
  },
  {
    id: 3,
    author: { name: "Catherine Brou", role: "Légion de Marie" },
    content:
      "Visiter les malades avec la Légion de Marie m'a appris la valeur du service désintéressé. Chaque visite est une rencontre avec le Christ lui-même.",
    date: "22 Mai 2026",
    likes: 34,
    hasImage: false,
    category: "Service",
  },
  {
    id: 4,
    author: { name: "Bruno Touré", role: "Cœur Vaillant" },
    content:
      "Le Cœur Vaillant m'a appris la discipline, le courage et l'amour du prochain. Je suis fier de faire partie de ce mouvement depuis 5 ans.",
    date: "20 Mai 2026",
    likes: 56,
    hasImage: true,
    category: "Formation",
  },
]

const categories = ["Tous", "Grâce", "Témoignage", "Service", "Formation", "Guérison"]

export default function TemoignagesPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <BookMarked className="w-8 h-8 text-gold" />
              Mur des Témoignages
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Partagez et inspirez-vous des témoignages de foi
            </p>
          </div>
          <Button className="cathedral">
            <Plus className="w-4 h-4 mr-2" />
            Partager un témoignage
          </Button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 flex-wrap"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "Tous" ? "default" : "outline"}
              size="sm"
              className={category === "Tous" ? "cathedral" : ""}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className=" hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gold/10 text-gold font-cathedral text-xs">
                        {testimonial.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.author.role} • {testimonial.date}
                      </p>
                    </div>
                    <Badge variant="gold" className="ml-auto">
                      {testimonial.category}
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <Quote className="w-6 h-6 text-gold/30 mb-2" />
                    <p className="text-foreground leading-relaxed font-serif-elegant">
                      {testimonial.content}
                    </p>
                  </div>

                  {testimonial.hasImage && (
                    <div className="mt-4 rounded-xl overflow-hidden bg-muted/30 h-40 flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}

                  {testimonial.hasVideo && (
                    <div className="mt-4 rounded-xl overflow-hidden bg-muted/30 h-40 flex items-center justify-center relative">
                      <Play className="w-12 h-12 text-muted-foreground" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-5 h-5 text-royal-blue ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-wine-red transition-colors cursor-pointer">
                      <Heart className="w-4 h-4" />
                      {testimonial.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-royal-blue transition-colors cursor-pointer">
                      <Share2 className="w-4 h-4" />
                      Partager
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
