"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Cross,
  Church,
  Calendar,
  Megaphone,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Heart,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  Sun,
  Cloud,
  Droplets,
  Star,
  Play,
  Image as ImageIcon,
  Quote,
  Users,
  Sparkles,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParchmentCard } from "@/components/annonces/parchment-card"
import { ParchmentAnnouncement } from "@/components/annonces/parchment-announcement"
import { MediaGallery, type MediaItem } from "@/components/gallery/media-gallery"
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll"
import { useDailyVerse } from "@/hooks/api/use-bible-verse"
import { useSaintOfDay } from "@/hooks/api/use-saint-of-day"
import { useWeather } from "@/hooks/api/use-weather"
import type { ParchmentData } from "@/components/annonces/parchment-announcement"

const publicAnnouncements: ParchmentData[] = [
  {
    id: "1",
    title: "Fête patronale de la paroisse Sainte-Thérèse",
    content:
      "La paroisse Sainte-Thérèse d'Abidjan a l'immense joie de vous inviter à la célébration de sa fête patronale le 15 juin 2026. Une messe solennelle sera célébrée par Monseigneur l'Évêque à 10h00 en présence de toute la communauté paroissiale. Cette messe sera suivie d'un agape fraternel dans la cour de l'église.",
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
      "Le pèlerinage annuel à Lourdes aura lieu du 12 au 19 septembre 2026. Places limitées à 45 personnes. Inscriptions au secrétariat paroissial avec un acompte de 200 000 FCFA.",
    type: "pelerinage",
    typeLabel: "Pèlerinage",
    author: "Mme Catherine N'Guessan",
    authorRole: "Secrétaire",
    date: "20 Juin 2026",
    isPinned: false,
  },
  {
    id: "3",
    title: "Baptême de Marie-Solange Aka",
    content:
      "La famille Aka a le bonheur de vous annoncer le baptême de leur fille Marie-Solange, célébré le 25 juin 2026 à 11h00 en l'église Sainte-Thérèse.",
    type: "bapteme",
    typeLabel: "Baptême",
    author: "Mme Marie Aka",
    authorRole: "Fidèle",
    date: "25 Juin 2026",
    isPinned: false,
  },
]

const galleryItems: MediaItem[] = [
  {
    id: "1",
    type: "image",
    src: "",
    title: "Messe solennelle de Pâques",
    description: "Célébration de la Résurrection du Seigneur avec la chorale paroissiale",
    category: "Célébrations",
    date: "20 Avril 2026",
    location: "Église Sainte-Thérèse",
    author: "Fr. Jean Kouassi",
    likes: 89,
  },
  {
    id: "2",
    type: "image",
    src: "",
    title: "Retraite spirituelle des jeunes",
    description: "Week-end de retreat au Centre Marialis de Bingerville",
    category: "Jeunesse",
    date: "12-14 Mai 2026",
    location: "Bingerville",
    likes: 67,
  },
  {
    id: "3",
    type: "video",
    src: "",
    title: "Chorale Sainte-Cécile en concert",
    description: "Performance de la chorale lors du concert de Noël 2025",
    category: "Musique",
    date: "25 Décembre 2025",
    duration: "4:32",
    likes: 124,
  },
  {
    id: "4",
    type: "image",
    src: "",
    title: "Baptême de la promotion 2026",
    description: "15 nouveau-nés ont reçu le sacrement de baptême",
    category: "Sacrements",
    date: "25 Mai 2026",
    location: "Église Sainte-Thérèse",
    likes: 156,
  },
  {
    id: "5",
    type: "image",
    src: "",
    title: "Pèlerinage à Yamasan",
    description: "Le sanctuaire marian de Yamasan accueille les pèlerins ivoiriens",
    category: "Pèlerinages",
    date: "15 Août 2025",
    location: "Yamasan",
    likes: 203,
  },
  {
    id: "6",
    type: "video",
    src: "",
    title: "Vépres du dimanche",
    description: "Célébration des vêpres en musique avec la communauté",
    category: "Célébrations",
    date: "22 Mai 2026",
    duration: "28:15",
    likes: 45,
  },
  {
    id: "7",
    type: "image",
    src: "",
    title: "Fête patronale 2025",
    description: "La communauté réunie pour la fête de Sainte-Thérèse",
    category: "Communauté",
    date: "1 Octobre 2025",
    location: "Cour de l'église",
    likes: 178,
  },
  {
    id: "8",
    type: "image",
    src: "",
    title: "Catéchisme des enfants",
    description: "Les enfants apprennent les fondements de la foi",
    category: "Formation",
    date: "Mercredi 28 Mai 2026",
    location: "Salle Saint-Joseph",
    likes: 92,
  },
  {
    id: "9",
    type: "video",
    src: "",
    title: "Procession du Corpus Domini",
    description: "La procession eucharistique dans les rues du quartier",
    category: "Célébrations",
    date: "22 Juin 2026",
    duration: "12:45",
    likes: 134,
  },
]

const massSchedule = [
  { day: "Dimanche", times: ["07h00", "10h00", "18h00"] },
  { day: "Lundi", times: ["06h30", "18h00"] },
  { day: "Mardi", times: ["06h30", "18h00"] },
  { day: "Mercredi", times: ["06h30", "18h00"] },
  { day: "Jeudi", times: ["06h30", "18h00"] },
  { day: "Vendredi", times: ["06h30", "18h00"] },
  { day: "Samedi", times: ["06h30", "17h30 (Vêpres)"] },
]

const features = [
  { icon: Megaphone, title: "Annonces", description: "Restez informé des actualités", href: "/annonces-publiques" },
  { icon: Calendar, title: "Calendrier", description: "Calendrier liturgique", href: "/annonces-publiques" },
  { icon: Church, title: "Messes", description: "Horaires et intentions", href: "/annonces-publiques" },
  { icon: Heart, title: "Dons", description: "Soutenez nos projets", href: "/login" },
]

const stats = [
  { value: "1 247", label: "Fidèles actifs" },
  { value: "312", label: "Familles" },
  { value: "7", label: "Groupes" },
  { value: "15+", label: "Ans de foi" },
]

function PublicPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<ParchmentData | null>(null)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const verse = useDailyVerse()
  const saint = useSaintOfDay()
  const weather = useWeather()

  return (
    <div className="min-h-screen bg-background">
      {/* Public Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-royal-blue flex items-center justify-center shadow-md">
              <Cross className="w-4.5 h-4.5 text-gold" />
            </div>
            <div className="hidden sm:block">
              <span className="font-cathedral text-lg font-bold text-foreground leading-tight block">
                Ecclesia
              </span>
              <span className="text-[9px] text-gold font-semibold tracking-widest uppercase">
                Connect
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/annonces-publiques" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Annonces
            </Link>
            <a href="#galerie" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Galerie
            </a>
            <Link href="/annonces-publiques" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Horaires
            </Link>
            <Link href="/annonces-publiques" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-royal-blue text-white hover:bg-royal-blue-light font-semibold">
                Inscription
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-border bg-card"
          >
            <nav className="flex flex-col p-4 gap-3">
              <Link href="/annonces-publiques" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Annonces
              </Link>
              <a href="#galerie" className="text-sm font-medium py-2 cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                Galerie
              </a>
              <Link href="/annonces-publiques" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Horaires
              </Link>
              <Link href="/annonces-publiques" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section with parallax */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative overflow-hidden">
        <div className="stained-glass py-16 sm:py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <Cross className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
              </div>
              <h1 className="font-cathedral text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Paroisse Sainte-Thérèse
              </h1>
              <p className="text-white/70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10">
                Bienvenue dans l&apos;espace numérique de notre paroisse.
                Restez connectés avec la communauté de foi.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link href="/annonces-publiques">
                  <Button className="bg-white text-royal-blue hover:bg-white/90 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base w-full sm:w-auto">
                    Voir les annonces
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-base w-full sm:w-auto">
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Quick Info Bar - Verse, Saint, Weather */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 -mt-8 relative z-20 mb-10 sm:mb-16"
        >
          {/* Daily Verse */}
          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gold/10 flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Verset du jour
                  </p>
                  <p className="text-xs font-serif-elegant italic text-foreground leading-relaxed line-clamp-3">
                    {verse.text}
                  </p>
                  <p className="text-[10px] text-gold mt-1 font-medium">
                    — {verse.reference}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saint of the Day */}
          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-royal-blue/10 flex-shrink-0">
                  <Star className="w-4 h-4 text-royal-blue" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Saint du jour
                  </p>
                  <p className="text-sm font-cathedral font-semibold text-foreground">
                    {saint.name}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {saint.shortBio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather */}
          <Card className="glass">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald/10 flex-shrink-0">
                  <Sun className="w-4 h-4 text-emerald" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Météo — {weather.city}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-cathedral">{weather.temperature}°</span>
                    <span className="text-xs text-muted-foreground">{weather.condition}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Droplets className="w-3 h-3" />
                    {weather.humidity}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Quick Features */}
        <section className="py-10 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="glass hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 sm:p-5 text-center">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-royal-blue/10 w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-royal-blue" />
                      </div>
                      <h3 className="font-cathedral font-semibold text-sm sm:text-base mb-1">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-10 sm:py-16"
        >
          <div className="stained-glass rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="font-cathedral text-2xl sm:text-3xl font-bold mb-8">
              Une communauté vivante
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <p className="text-3xl sm:text-4xl font-bold font-cathedral text-gold">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/70 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Announcements */}
        <section className="pb-10 sm:pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-cathedral text-xl sm:text-2xl font-bold">
              Dernières annonces
            </h2>
            <Link href="/annonces-publiques" className="text-sm text-gold hover:underline flex items-center gap-1">
              Tout voir <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {publicAnnouncements.map((announcement, index) => (
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
            ))}
          </div>
        </section>

        {/* ============ PHOTO & VIDEO GALLERY ============ */}
        <section id="galerie" className="pb-10 sm:pb-16 scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Camera className="w-5 h-5 text-gold" />
                  <h2 className="font-cathedral text-xl sm:text-2xl font-bold">
                    Galerie Photos & Vidéos
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Revivez les moments forts de notre communauté
                </p>
              </div>
              <Button variant="outline" size="sm">
                <ImageIcon className="w-4 h-4 mr-1.5" />
                Tout voir
              </Button>
            </div>

            <MediaGallery
              items={galleryItems}
              columns={3}
              showFilters={true}
            />

            {/* Upload CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Card className="glass border-dashed border-2 border-border hover:border-gold/50 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-cathedral text-lg font-semibold mb-2">
                    Partagez vos moments de foi
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Connectez-vous pour ajouter vos photos et vidéos à la galerie paroissiale.
                    Chaque image raconte une histoire de foi.
                  </p>
                  <Link href="/login">
                    <Button className="bg-royal-blue text-white hover:bg-royal-blue-light font-semibold">
                      Se connecter pour partager
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Mass Schedule + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pb-10 sm:pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="glass">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-royal-blue/10">
                    <Clock className="w-5 h-5 text-royal-blue" />
                  </div>
                  <h3 className="font-cathedral text-lg font-semibold">Horaires des messes</h3>
                </div>
                <div className="space-y-2">
                  {massSchedule.map((schedule) => (
                    <div key={schedule.day} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm">
                      <span className="font-medium">{schedule.day}</span>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {schedule.times.map((time) => (
                          <Badge key={time} variant="secondary" className="text-xs">{time}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="glass">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gold/10">
                    <Church className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-cathedral text-lg font-semibold">Nous contacter</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-stone-gray mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Adresse</p>
                      <p className="text-sm text-muted-foreground">Quartier Cocody, Abidjan, Côte d&apos;Ivoire</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-stone-gray mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Téléphone</p>
                      <p className="text-sm text-muted-foreground">+225 27 XX XX XX XX</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-stone-gray mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contact@ecclesia-connect.com</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground italic text-center font-serif-elegant">
                    &ldquo;Que la paix du Christ règne dans vos cœurs&rdquo; — Colossiens 3:15
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-royal-blue flex items-center justify-center">
                <Cross className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="font-cathedral text-sm font-bold">Ecclesia Connect</span>
                <span className="text-xs text-muted-foreground block">Paroisse Sainte-Thérèse d&apos;Abidjan</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              © 2026 Ecclesia Connect. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

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

export default function Home() {
  return (
    <SmoothScrollProvider>
      <PublicPage />
    </SmoothScrollProvider>
  )
}
