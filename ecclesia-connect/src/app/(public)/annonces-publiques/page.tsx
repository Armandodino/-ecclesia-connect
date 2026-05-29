"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Megaphone,
  Search,
  Calendar,
  MapPin,
  Clock,
  Church,
  Cross,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ParchmentCard } from "@/components/annonces/parchment-card"
import { ParchmentAnnouncement } from "@/components/annonces/parchment-announcement"
import type { ParchmentData } from "@/components/annonces/parchment-announcement"

const announcements: ParchmentData[] = [
  {
    id: "1",
    title: "Fête patronale de la paroisse Sainte-Thérèse",
    content:
      "La paroisse Sainte-Thérèse d'Abidjan a l'immense joie de vous inviter à la célébration de sa fête patronale le 15 juin 2026. Une messe solennelle sera célébrée par Monseigneur l'Évêque à 10h00 en présence de toute la communauté paroissiale. Cette messe sera suivie d'un agape fraternel dans la cour de l'église. Que tous les fidèles, les groupes et mouvements de la paroisse se mobilisent pour faire de cette journée un moment de joie et de communion dans la foi.",
    type: "general",
    typeLabel: "Annonce générale",
    author: "Fr. Jean Kouassi",
    authorRole: "Curé paroissial",
    date: "15 Juin 2026",
    location: "Église principale Sainte-Thérèse",
    isPinned: true,
  },
  {
    id: "2",
    title: "Inscription pèlerinage à Lourdes — Septembre 2026",
    content:
      "Le pèlerinage annuel à Lourdes aura lieu du 12 au 19 septembre 2026. Cette année, nous aurons le privilège de célébrer une messe dans la grotte de Massabielle. Les places sont limitées à 45 personnes. Le prix est de 850 000 FCFA par personne. Les inscriptions se font au secrétariat paroissial avec un acompte de 200 000 FCFA.",
    type: "pelerinage",
    typeLabel: "Pèlerinage",
    author: "Mme Catherine N'Guessan",
    authorRole: "Secrétaire paroissiale",
    date: "20 Juin 2026",
    location: "Secrétariat paroissial",
    isPinned: false,
  },
  {
    id: "3",
    title: "Collecte spéciale pour la rénovation de la toiture",
    content:
      "La toiture de l'église principale nécessite une rénovation urgente. Le coût estimé des travaux est de 5 000 000 FCFA. Une collecte spéciale sera organisée dimanche prochain. Chaque famille est appelée à contribuer selon ses moyens. Les dons peuvent également être faits via la plateforme Ecclesia Connect.",
    type: "collecte",
    typeLabel: "Collecte",
    author: "Fr. Bernard Koffi",
    authorRole: "Vicaire paroissial",
    date: "22 Juin 2026",
    location: "Église principale",
    isPinned: false,
  },
  {
    id: "4",
    title: "Baptême de Marie-Solange Aka",
    content:
      "La famille Aka a le bonheur de vous annoncer le baptême de leur fille Marie-Solange, qui sera célébré le 25 juin 2026 à 11h00 en l'église Sainte-Thérèse. Les parrains sont M. Jean-Baptiste Brou et Mme Thérèse Touré. Les familles sont cordialement invitées.",
    type: "bapteme",
    typeLabel: "Baptême",
    author: "Mme Marie Aka",
    authorRole: "Fidèle",
    date: "25 Juin 2026",
    isPinned: false,
  },
  {
    id: "5",
    title: "Réunion du conseil paroissial",
    content:
      "Le conseil paroissial se réunira jeudi 30 mai 2026 à 18h30 en salle paroissiale. L'ordre du jour comprend : le bilan financier du premier semestre, l'organisation de la fête patronale, les travaux de rénovation de l'église. Tous les membres du conseil sont priés d'assister.",
    type: "reunion",
    typeLabel: "Réunion",
    author: "Fr. Jean Kouassi",
    authorRole: "Curé paroissial",
    date: "30 Mai 2026",
    location: "Salle paroissiale",
    isPinned: false,
  },
  {
    id: "6",
    title: "Confirmation de la promotion 2026",
    content:
      "Monseigneur l'Évêque célébrera le sacrement de Confirmation pour les jeunes de la paroisse le dimanche 6 juillet 2026 à 10h00. Les candidats ont suivi un stage de préparation de trois mois. Nous invitons tous les familles et parrains à assister à cette célébration solennelle.",
    type: "confirmation",
    typeLabel: "Confirmation",
    author: "Fr. Bernard Koffi",
    authorRole: "Vicaire paroissial",
    date: "6 Juillet 2026",
    location: "Église principale",
    isPinned: false,
  },
]

const massSchedule = [
  { day: "Dimanche", times: ["07h00", "10h00", "18h00"] },
  { day: "Lundi", times: ["06h30", "18h00"] },
  { day: "Mardi", times: ["06h30", "18h00"] },
  { day: "Mercredi", times: ["06h30", "18h00"] },
  { day: "Jeudi", times: ["06h30", "18h00"] },
  { day: "Vendredi", times: ["06h30", "18h00"] },
  { day: "Samedi", times: ["06h30", "17h30"] },
]

const filterOptions = [
  { value: "all", label: "Toutes" },
  { value: "general", label: "Général" },
  { value: "bapteme", label: "Baptême" },
  { value: "confirmation", label: "Confirmation" },
  { value: "pelerinage", label: "Pèlerinage" },
  { value: "collecte", label: "Collecte" },
  { value: "reunion", label: "Réunion" },
]

export default function AnnoncesPubliquesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<ParchmentData | null>(null)

  const filtered = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      selectedFilter === "all" || a.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="font-cathedral text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3">
          <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
          Annonces Paroissiales
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Consultez les annonces de la paroisse Sainte-Thérèse
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Announcements List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une annonce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="overflow-x-auto hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0"
          >
            <div className="flex gap-2">
              {filterOptions.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`whitespace-nowrap ${
                    selectedFilter === filter.value ? "cathedral" : ""
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Announcements */}
          <div className="space-y-3 sm:space-y-4">
            {filtered.length === 0 ? (
              <Card className="glass">
                <CardContent className="p-8 text-center">
                  <Cross className="w-10 h-10 text-stone-gray/30 mx-auto mb-3" />
                  <p className="font-cathedral text-lg text-stone-gray">
                    Aucune annonce trouvée
                  </p>
                </CardContent>
              </Card>
            ) : (
              filtered.map((announcement, index) => (
                <ParchmentCard
                  key={announcement.id}
                  title={announcement.title}
                  content={announcement.content}
                  type={announcement.type}
                  typeLabel={announcement.typeLabel}
                  author={announcement.author}
                  date={announcement.date}
                  isPinned={announcement.isPinned}
                  index={index}
                  onClick={() => setSelectedAnnouncement(announcement)}
                />
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="stained-glass text-white">
              <CardContent className="p-5 sm:p-6 text-center">
                <Church className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="font-cathedral text-lg font-bold mb-2">
                  Rejoignez la communauté
                </h3>
                <p className="text-sm text-white/70 mb-4">
                  Créez un compte pour accéder à tous les services
                </p>
                <Button className="bg-white text-royal-blue hover:bg-white/90 font-semibold w-full">
                  Créer un compte gratuit
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mass Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-royal-blue" />
                  <h3 className="font-cathedral font-semibold">
                    Horaires des messes
                  </h3>
                </div>
                <div className="space-y-2">
                  {massSchedule.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0 text-sm"
                    >
                      <span className="font-medium">{schedule.day}</span>
                      <div className="flex gap-1 flex-wrap justify-end">
                        {schedule.times.map((time) => (
                          <Badge
                            key={time}
                            variant="secondary"
                            className="text-[10px]"
                          >
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
        </div>
      </div>

      {/* Parchment Dialog */}
      {selectedAnnouncement && (
        <ParchmentAnnouncement
          data={selectedAnnouncement}
          isOpen={!!selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      )}
    </div>
  )
}
