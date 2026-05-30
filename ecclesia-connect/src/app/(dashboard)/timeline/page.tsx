"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Clock,
  Droplets,
  Cross,
  Hand,
  Heart,
  Users,
  GraduationCap,
  Star,
  Plus,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const timelineEvents = [
  {
    id: 1,
    type: "bapteme",
    title: "Baptême",
    date: "15 Mars 1995",
    description: "Baptisé à l'église Sainte-Thérèse d'Abidjan",
    icon: Droplets,
    color: "text-royal-blue",
    bgColor: "bg-royal-blue/10",
    priest: "Fr. Jean-Baptiste Messi",
  },
  {
    id: 2,
    type: "communion",
    title: "Première Communion",
    date: "12 Juin 2003",
    description: "Réception de la première communion solennelle",
    icon: Cross,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
    priest: "Fr. Paul N'Guessan",
  },
  {
    id: 3,
    type: "confirmation",
    title: "Confirmation",
    date: "8 Mai 2005",
    description: "Confirmation par Mgr Samuel Kleda",
    icon: Hand,
    color: "text-deep-purple",
    bgColor: "bg-deep-purple/10",
    priest: "Mgr Samuel Kleda",
  },
  {
    id: 4,
    type: "mariage",
    title: "Mariage",
    date: "20 Juillet 2012",
    description: "Mariage avec Marie-Claire Touré",
    icon: Heart,
    color: "text-wine-red",
    bgColor: "bg-wine-red/10",
    priest: "Fr. Jean Kouassi",
  },
  {
    id: 5,
    type: "engagement",
    title: "Adhésion Légion de Marie",
    date: "1 Janvier 2015",
    description: "Entrée dans la Légion de Marie comme membre actif",
    icon: Users,
    color: "text-royal-blue",
    bgColor: "bg-royal-blue/10",
    priest: null,
  },
  {
    id: 6,
    type: "engagement",
    title: "Responsable de secteur",
    date: "1 Septembre 2020",
    description: "Nomination comme responsable du Zone Cocody",
    icon: Star,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
    priest: null,
  },
]

export default function TimelinePage() {
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
              <Clock className="w-8 h-8 text-gold" />
              Ma Timeline de Vie Chrétienne
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Chronologie de votre parcours de foi
            </p>
          </div>
          <Button className="cathedral">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un événement
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Années de foi", value: "31", icon: Cross },
            { label: "Sacrements", value: "4", icon: Droplets },
            { label: "Engagements", value: "6", icon: Users },
            { label: "Années de mariage", value: "14", icon: Heart },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="">
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold font-cathedral">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="">
            <CardContent className="p-6">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-royal-blue to-gold" />

                <div className="space-y-8">
                  {timelineEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="relative flex items-start gap-6"
                    >
                      {/* Icon */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-full ${event.bgColor} flex items-center justify-center border-4 border-card`}
                        >
                          <event.icon className={`w-6 h-6 ${event.color}`} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="gold" className="text-xs">
                            {event.date}
                          </Badge>
                        </div>
                        <h3 className="font-cathedral font-semibold text-base sm:text-lg mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        {event.priest && (
                          <p className="text-xs text-muted-foreground">
                            Célébré par {event.priest}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  )
}
