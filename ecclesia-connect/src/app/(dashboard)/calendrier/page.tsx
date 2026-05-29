"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Church,
  Plus,
  Filter,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const liturgicalEvents = [
  { date: 1, title: "Solennité de la Trinité", color: "#D4AF37", type: "solennite" },
  { date: 3, title: "Fête de la Visitation", color: "#D4AF37", type: "fete" },
  { date: 8, title: "Messe des dimanches", color: "#1E3A5F", type: "messe" },
  { date: 10, title: "Réunion chorale", color: "#5B2C8E", type: "reunion" },
  { date: 12, title: "Saint Jean-Baptiste", color: "#D4AF37", type: "saint" },
  { date: 14, title: "Catéchisme", color: "#1E3A5F", type: "catechesis" },
  { date: 15, title: "Fête patronale", color: "#6B2D5B", type: "fete" },
  { date: 18, title: "Messe des dimanches", color: "#1E3A5F", type: "messe" },
  { date: 20, title: "Veillée de prière", color: "#5B2C8E", type: "priere" },
  { date: 22, title: "Collecte spéciale", color: "#1B5E20", type: "collecte" },
  { date: 24, title: "Messe des dimanches", color: "#1E3A5F", type: "messe" },
  { date: 25, title: "Baptême Marie-Solange", color: "#D4AF37", type: "sacrement" },
  { date: 27, title: "Conseil paroissial", color: "#5B2C8E", type: "reunion" },
  { date: 29, title: "Messe des dimanches", color: "#1E3A5F", type: "messe" },
  { date: 30, title: "Confession", color: "#1E3A5F", type: "sacrement" },
]

const massSchedule = [
  { day: "Dimanche", times: ["07h00", "10h00", "18h00"], type: "messe" },
  { day: "Lundi", times: ["06h30", "18h00"], type: "messe" },
  { day: "Mardi", times: ["06h30", "18h00"], type: "messe" },
  { day: "Mercredi", times: ["06h30", "18h00"], type: "messe" },
  { day: "Jeudi", times: ["06h30", "18h00"], type: "messe" },
  { day: "Vendredi", times: ["06h30", "18h00"], type: "messe" },
  { day: "Samedi", times: ["06h30", "18h00"], type: "vepres" },
]

const intentions = [
  { name: "Famille Koffi", intention: "Pour la santé de Maman", date: "30 Mai", status: "en_cours" },
  { name: "Jean-Pierre N'Guessan", intention: "Pour le repos de Papa", date: "31 Mai", status: "en_cours" },
  { name: "Marie Claire", intention: "Action de grâce", date: "1 Juin", status: "programmee" },
  { name: "Famille Dupont", intention: "Anniversaire de mariage", date: "2 Juin", status: "programmee" },
]

export default function CalendrierPage() {
  const [currentMonth] = useState(new Date(2026, 5)) // June 2026
  const [selectedView, setSelectedView] = useState("month")

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

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
              <CalendarIcon className="w-8 h-8 text-gold" />
              Calendrier Liturgique
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Temps ordinaire - 10ème semaine
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
            <Button className="cathedral">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <h2 className="font-cathedral text-xl font-semibold">
                    {currentMonth.toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-2 sm:p-6">
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2">
                  {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-[10px] sm:text-xs font-semibold text-muted-foreground py-1 sm:py-2"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                  {emptyDays.map((_, i) => (
                    <div key={`empty-${i}`} className="h-12 sm:h-16 lg:h-20" />
                  ))}
                  {days.map((day) => {
                    const dayEvents = liturgicalEvents.filter(
                      (e) => e.date === day
                    )
                    const isToday = day === 29

                    return (
                      <div
                        key={day}
                        className={`h-12 sm:h-16 lg:h-20 p-0.5 sm:p-1 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${
                          isToday
                            ? "border-gold bg-gold/5"
                            : "border-transparent"
                        }`}
                      >
                        <div
                          className={`text-[10px] sm:text-xs font-semibold mb-0.5 sm:mb-1 ${
                            isToday ? "text-gold" : "text-foreground"
                          }`}
                        >
                          {day}
                        </div>
                        <div className="space-y-0 hidden sm:block">
                          {dayEvents.slice(0, 2).map((event, i) => (
                            <div
                              key={i}
                              className="text-[9px] truncate rounded px-1 py-0.5"
                              style={{
                                backgroundColor: `${event.color}20`,
                                color: event.color,
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[9px] text-muted-foreground text-center">
                              +{dayEvents.length - 2}
                            </div>
                          )}
                        </div>
                        {/* Mobile: show dot indicator */}
                        {dayEvents.length > 0 && (
                          <div className="sm:hidden flex justify-center">
                            <div
                              className="w-1 h-1 rounded-full"
                              style={{ backgroundColor: dayEvents[0].color }}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border/50">
                  {[
                    { color: "#1E3A5F", label: "Messes" },
                    { color: "#D4AF37", label: "Solennités" },
                    { color: "#5B2C8E", label: "Réunions" },
                    { color: "#6B2D5B", label: "Sacrements" },
                    { color: "#1B5E20", label: "Collectes" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Mass Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Church className="w-5 h-5 text-royal-blue" />
                    Horaires des messes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {massSchedule.map((schedule) => (
                      <div
                        key={schedule.day}
                        className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                      >
                        <span className="text-sm font-medium">{schedule.day}</span>
                        <div className="flex gap-2">
                          {schedule.times.map((time) => (
                            <Badge key={time} variant="secondary" className="text-xs">
                              {time}
                            </Badge>
                          ))}
                        </div>
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
                    <Clock className="w-5 h-5 text-gold" />
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
                              intention.status === "en_cours"
                                ? "gold"
                                : "secondary"
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
                  <Button variant="outline" className="w-full mt-4">
                    Ajouter une intention
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
