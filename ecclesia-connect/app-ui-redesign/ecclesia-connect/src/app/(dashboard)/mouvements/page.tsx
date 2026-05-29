"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Users,
  Music,
  GraduationCap,
  Shield,
  Crown,
  BookOpen,
  Zap,
  Calendar,
  MapPin,
  UserPlus,
  ChevronRight,
  Image,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const movements = [
  {
    id: 1,
    name: "Chorale Sainte-Cécile",
    icon: Music,
    color: "text-deep-purple",
    bgColor: "bg-deep-purple/10",
    members: 45,
    leader: "Mme Florence Kouamé",
    meetingDay: "Samedi",
    meetingTime: "15h00",
    description: "Louange et adoration par la musique",
    activities: ["Répétition samedi", "Messe dominicale", "Concert de Noël"],
  },
  {
    id: 2,
    name: "Enfants de Chœur",
    icon: Music,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
    members: 25,
    leader: "Sr. Marie-CLAIRE",
    meetingDay: "Dimanche",
    meetingTime: "09h00",
    description: "Formation liturgique des jeunes",
    activities: ["Messe des enfants", "Catéchisme", "Camp d'été"],
  },
  {
    id: 3,
    name: "JEC - Jeunesse Étudiante Chrétienne",
    icon: GraduationCap,
    color: "text-royal-blue",
    bgColor: "bg-royal-blue/10",
    members: 60,
    leader: "Sr. Aïcha Diallo",
    meetingDay: "Vendredi",
    meetingTime: "17h00",
    description: "Action des jeunes étudiants catholiques",
    activities: ["Réunion hebdo", "Forum social", "Retraite annuel"],
  },
  {
    id: 4,
    name: "Cœur Vaillant",
    icon: Shield,
    color: "text-wine-red",
    bgColor: "bg-wine-red/10",
    members: 35,
    leader: "M. Jean-Pierre N'Guessan",
    meetingDay: "Samedi",
    meetingTime: "10h00",
    description: "Mouvement des jeunes garçons",
    activities: ["Activités sportives", "Catéchisme", "Camp"],
  },
  {
    id: 5,
    name: "Légion de Marie",
    icon: Crown,
    color: "text-royal-blue",
    bgColor: "bg-royal-blue/10",
    members: 30,
    leader: "Mme Thérèse Brou",
    meetingDay: "Samedi",
    meetingTime: "08h00",
    description: "Dévotion mariale et œuvres apostoliques",
    activities: ["Présentation mariale", "Visite malades", "Rosaire vivant"],
  },
  {
    id: 6,
    name: "Groupe de Prière",
    icon: BookOpen,
    color: "text-emerald",
    bgColor: "bg-emerald/10",
    members: 50,
    leader: "Fr. Bernard Koffi",
    meetingDay: "Mercredi",
    meetingTime: "19h00",
    description: "Prière communautaire et intercession",
    activities: ["Adoration", "Prière de guérison", "Veillée mensuelle"],
  },
  {
    id: 7,
    name: "Jeunesse Catholique",
    icon: Zap,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
    members: 80,
    leader: "M. Bruno Touré",
    meetingDay: "Dimanche",
    meetingTime: "16h00",
    description: "Animation de la vie des jeunes paroissiens",
    activities: ["Catéchisme", "Sorties", "Projets sociaux"],
  },
]

export default function MouvementsPage() {
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
              <Users className="w-8 h-8 text-gold" />
              Mouvements & Associations
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Rejoignez et participez à la vie de votre paroisse
            </p>
          </div>
          <Button className="cathedral">
            <UserPlus className="w-4 h-4 mr-2" />
            Rejoindre un groupe
          </Button>
        </motion.div>

        {/* Movements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movements.map((movement, index) => (
            <motion.div
              key={movement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="glass hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${movement.bgColor}`}>
                      <movement.icon className={`w-6 h-6 ${movement.color}`} />
                    </div>
                    <Badge variant="secondary">
                      <Users className="w-3 h-3 mr-1" />
                      {movement.members} membres
                    </Badge>
                  </div>

                  <h3 className="font-cathedral font-semibold text-base sm:text-lg mb-1">
                    {movement.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 flex-1">
                    {movement.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      Responsable: {movement.leader}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {movement.meetingDay} à {movement.meetingTime}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {movement.activities.map((activity, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {activity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Image className="w-4 h-4 mr-1" />
                      Galerie
                    </Button>
                    <Button className="cathedral flex-1" size="sm">
                      Rejoindre
                    </Button>
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
