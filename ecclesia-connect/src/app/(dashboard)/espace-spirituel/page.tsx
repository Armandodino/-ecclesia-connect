"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  Pen,
  Heart,
  Hand,
  Cross,
  Brain,
  Calendar,
  Plus,
  BookMarked,
  Sparkles,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const spiritualTools = [
  {
    id: "rosary",
    title: "Chapelet interactif",
    icon: Hand,
    color: "text-deep-purple",
    bgColor: "bg-deep-purple/10",
    description: "Priez le chapelet avec guidage audio et visuel",
  },
  {
    id: "way-of-cross",
    title: "Chemin de Croix",
    icon: Cross,
    color: "text-wine-red",
    bgColor: "bg-wine-red/10",
    description: "Parcourez les 14 stations avec méditations",
  },
  {
    id: "examen",
    title: "Examen de conscience",
    icon: Brain,
    color: "text-royal-blue",
    bgColor: "bg-royal-blue/10",
    description: "Guidance pour votre examination quotidienne",
  },
  {
    id: "meditation",
    title: "Méditations",
    icon: Sparkles,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
    description: "Réflexions quotidiennes sur les Écritures",
  },
]

const journalEntries = [
  {
    date: "29 Mai 2026",
    mood: "Paisible",
    content:
      "Aujourd'hui, la messe m'a profondément touché. L'homélie sur la miséricorde divine m'a rappelé que chaque jour est une nouvelle chance de commencer.",
  },
  {
    date: "28 Mai 2026",
    mood: "Reconnaissant",
    content:
      "Action de grâce pour la guérison de ma mère. Les prières de la communauté ont été exaucées. Dieu est fidèle.",
  },
  {
    date: "27 Mai 2026",
    mood: "En paix",
    content:
      "Le temps passé en adoration devant le Saint-Sacrement m'a apporté une grande sérénité. J'ai senti la présence du Seigneur.",
  },
]

const prayerIntentions = [
  { content: "Pour la guérison de Maman", author: "Marie", prayers: 45, isAnonymous: false },
  { content: "Pour les vocations sacerdotales", author: "Anonymous", prayers: 78, isAnonymous: true },
  { content: "Pour la paix dans le monde", author: "Jean-Pierre", prayers: 120, isAnonymous: false },
  { content: "Pour le repos de l'âme de Papa", author: "Anonymous", prayers: 32, isAnonymous: true },
]

export default function EspaceSpirituelPage() {
  const [journalText, setJournalText] = useState("")

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
              <BookOpen className="w-8 h-8 text-gold" />
              Espace Spirituel
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Votre parcours de foi au quotidien
            </p>
          </div>
        </motion.div>

        {/* Spiritual Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spiritualTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-5 text-center">
                  <div className={`p-4 rounded-2xl ${tool.bgColor} w-fit mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <tool.icon className={`w-8 h-8 ${tool.color}`} />
                  </div>
                  <h3 className="font-cathedral font-semibold mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Journal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Pen className="w-5 h-5 text-gold" />
                    Mon Journal Spirituel
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Nouvelle entrée
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="Partagez vos pensées et réflexions spirituelles..."
                      value={journalText}
                      onChange={(e) => setJournalText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button className="mt-2 cathedral" size="sm">
                      Enregistrer
                    </Button>
                  </div>
                  {journalEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-muted/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{entry.date}</span>
                        <Badge variant="gold">{entry.mood}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {entry.content}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Prayer Intentions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-wine-red" />
                    Intentions de prière
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prayerIntentions.map((intention, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-muted/30"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">
                            {intention.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Par {intention.author}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-wine-red">
                          <Hand className="w-4 h-4" />
                          {intention.prayers}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-wine-red hover:text-wine-red"
                      >
                        <Hand className="w-4 h-4 mr-1" />
                        Prier pour cette intention
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}
