"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Megaphone,
  Search,
  Plus,
  Printer,
  Cross,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ParchmentCard } from "@/components/annonces/parchment-card"
import { ParchmentAnnouncement } from "@/components/annonces/parchment-announcement"
import type { ParchmentData } from "@/components/annonces/parchment-announcement"

const announcements: ParchmentData[] = [
  {
    id: "1",
    title: "Fête patronale de la paroisse Sainte-Thérèse",
    content:
      "La paroisse Sainte-Thérèse d'Abidjan a l'immense joie de vous inviter à la célébration de sa fête patronale le 15 juin 2026. Une messe solennelle sera célébrée par Monseigneur l'Évêque à 10h00 en présence de toute la communauté paroissiale. Cette messe sera suivie d'un agape fraternel dans la cour de l'église. Que tous les fidèles, les groupes et mouvements de la paroisse se mobilisent pour faire de cette journée un moment de joie et de communion dans la foi. Les chantres, les enfants de chœur et la chorale sont particulièrement invités à ornemer cette célébration de leurs louanges. Une collecte spéciale sera organisée pour les œuvres paroissiales.",
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
      "Chers fidèles, le pèlerinage annuel à Lourdes aura lieu du 12 au 19 septembre 2026. Cette année, nous aurons le privilège de célébrer une messe dans la grotte de Massabielle. Les places sont limitées à 45 personnes. Le prix est de 850 000 FCFA par personne, comprenant le vol, l'hébergement en demi-pension et les transferts. Les inscriptions se font au secrétariat paroissial avec un acompte de 200 000 FCFA. Un certificat médical et une assurance voyage sont obligatoires. Venez nombreux, cette pilgrimage sera une occasion unique de renouveler votre foi auprès de la Vierge Marie.",
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
      "La toiture de l'église principale nécessite une rénovation urgente. Le toit actuel, vieillissant, laisse entrer l'eau lors des fortes pluies, ce qui compromet la sécurité des fidèles et l'intégrité du bâtiment. Le coût estimé des travaux est de 5 000 000 FCFA. Une collecte spéciale sera organisée dimanche prochain. Chaque famille est appelée à contribuer selon ses moyens. Les dons peuvent également être faits par Orange Money, MTN Money ou Wave via la plateforme Ecclesia Connect. Les noms des bienfaiteurs seront inscrits sur un tableau d'honneur dans l'église. Que Dieu récompense votre générosité.",
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
      "La famille Aka a le bonheur de vous annoncer le baptême de leur fille Marie-Solange, qui sera célébré le 25 juin 2026 à 11h00 en l'église Sainte-Thérèse. Les parrains sont M. Jean-Baptiste Brou et Mme Thérèse Touré. Les familles sont cordialement invitées à participer à cette joie sacramentelle. Une réception aura lieu à la salle paroissiale après la cérémonie. Nous demandons aux fidèles de prier pour cette enfant afin que le Saint-Esprit l'éclaire tout au long de sa vie.",
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
      "Le conseil paroissial se réunira jeudi 30 mai 2026 à 18h30 en salle paroissiale. L'ordre du jour comprend : le bilan financier du premier semestre, l'organisation de la fête patronale, les travaux de rénovation de l'église, et les préparatifs du pèlerinage à Lourdes. Tous les membres du conseil sont priés d'assister à cette réunion importante. Les responsables de groupes et mouvements sont également invités à assister à la première partie consacrée aux activités paroissiales.",
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
      "Monseigneur l'Évêque célébrera le sacrement de Confirmation pour les jeunes de la paroisse le dimanche 6 juillet 2026 à 10h00. Les candidats ont suivi un stage de préparation de trois mois sous la direction des catéchistes. Nous invitons tous les familles et parainspirituels à assister à cette célébration solennelle. Les candidats sont priés de se présenter à l'église à 9h30 avec leurs vêtements de cérémonie.",
    type: "confirmation",
    typeLabel: "Confirmation",
    author: "Fr. Bernard Koffi",
    authorRole: "Vicaire paroissial",
    date: "6 Juillet 2026",
    location: "Église principale",
    isPinned: false,
  },
]

const filterOptions = [
  { value: "all", label: "Toutes" },
  { value: "general", label: "Général" },
  { value: "bapteme", label: "Baptême" },
  { value: "mariage", label: "Mariage" },
  { value: "confirmation", label: "Confirmation" },
  { value: "pelerinage", label: "Pèlerinage" },
  { value: "collecte", label: "Collecte" },
  { value: "reunion", label: "Réunion" },
]

export default function AnnoncesPage() {
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
    <MainLayout>
      <div className="space-y-5 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gold" />
              Annonces Paroissiales
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Restez informé des actualités de votre paroisse
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-1.5" />
              <span className="hidden sm:inline">Tout imprimer</span>
              <span className="sm:hidden">Imprimer</span>
            </Button>
            <Button className="cathedral" size="sm">
              <Plus className="w-4 h-4 mr-1.5" />
              Nouvelle
            </Button>
          </div>
        </motion.div>

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

        {/* Filters - horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="overflow-x-auto hide-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0"
        >
          <div className="flex gap-2 sm:flex-wrap sm:justify-start">
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

        {/* Announcements List - Parchment Cards */}
        <div className="space-y-3 sm:space-y-4">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="">
                <CardContent className="p-8 text-center">
                  <Cross className="w-10 h-10 text-stone-gray/30 mx-auto mb-3" />
                  <p className="font-cathedral text-lg text-stone-gray">
                    Aucune annonce trouvée
                  </p>
                  <p className="text-sm text-stone-gray/60 mt-1">
                    Modifiez vos critères de recherche
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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

        {/* Parchment Detail Dialog */}
        {selectedAnnouncement && (
          <ParchmentAnnouncement
            data={selectedAnnouncement}
            isOpen={!!selectedAnnouncement}
            onClose={() => setSelectedAnnouncement(null)}
          />
        )}
      </div>
    </MainLayout>
  )
}
