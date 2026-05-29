"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Church,
  Clock,
  MapPin,
  Users,
  Play,
  Calendar,
  Heart,
  Video,
  ChevronRight,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const masses = [
  {
    id: 1,
    title: "Messe dominicale - 10h",
    celebrant: "Fr. Jean Kouassi",
    time: "Dimanche 10h00",
    location: "Église principale",
    isLive: true,
    viewers: 45,
    type: "dominicale",
  },
  {
    id: 2,
    title: "Messe des jeunes",
    celebrant: "Fr. Bernard Koffi",
    time: "Samedi 18h00",
    location: "Chapelle latérale",
    isLive: false,
    viewers: 0,
    type: "jeunes",
  },
  {
    id: 3,
    title: "Messe quotidienne",
    celebrant: "Fr. Jean Kouassi",
    time: "Lundi-Vendredi 06h30",
    location: "Église principale",
    isLive: false,
    viewers: 0,
    type: "quotidienne",
  },
]

const intentions = [
  { name: "Famille Koffi", intention: "Pour la santé de Maman", date: "30 Mai", status: "en_cours" },
  { name: "Jean-Pierre N'Guessan", intention: "Pour le repos de Papa", date: "31 Mai", status: "en_cours" },
  { name: "Marie Claire", intention: "Action de grâce", date: "1 Juin", status: "programmee" },
  { name: "Famille Dupont", intention: "Anniversaire de mariage", date: "2 Juin", status: "programmee" },
  { name: "Antoine Brou", intention: "Vocation sacerdotale", date: "3 Juin", status: "programmee" },
]

export default function MessesPage() {
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
              <Church className="w-8 h-8 text-gold" />
              Messes & Célébrations
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Horaires, intentions et diffusions en direct
            </p>
          </div>
          <Button className="cathedral">
            <Heart className="w-4 h-4 mr-2" />
            Donner une intention
          </Button>
        </motion.div>

        {/* Live Mass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass overflow-hidden cathedral-glow">
            <div className="stained-glass p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                </div>
                <span className="font-semibold">EN DIRECT</span>
              </div>
              <h2 className="font-cathedral text-2xl font-bold mt-3">
                Messe dominicale - 10h
              </h2>
              <p className="text-white/80 mt-1">
                Célébrée par Fr. Jean Kouassi
              </p>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Dimanche 10h00
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Église principale
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    45 téléspectateurs
                  </span>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Regarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mass Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-royal-blue" />
                  Programme des messes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {masses.map((mass) => (
                    <div
                      key={mass.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-royal-blue/10 flex items-center justify-center">
                        <Church className="w-5 h-5 text-royal-blue" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{mass.title}</p>
                          {mass.isLive && (
                            <Badge className="bg-red-600 text-white text-xs">
                              LIVE
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mass.celebrant} • {mass.time}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {mass.location}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Intentions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-wine-red" />
                  Intentions de messe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {intentions.map((intention, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-muted/30"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {intention.name}
                        </span>
                        <Badge
                          variant={
                            intention.status === "en_cours" ? "gold" : "secondary"
                          }
                          className="text-xs"
                        >
                          {intention.status === "en_cours"
                            ? "En cours"
                            : "Programmée"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {intention.intention}
                      </p>
                      <p className="text-xs text-gold mt-1">{intention.date}</p>
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
