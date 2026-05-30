"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CathedralBackground } from "@/components/effects/cathedral-background"
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
  Users,
  Heart,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  Sun,
  Cloud,
  Camera,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ParchmentCard } from "@/components/annonces/parchment-card"
import { ParchmentAnnouncement } from "@/components/annonces/parchment-announcement"
import { MediaGallery } from "@/components/gallery/media-gallery"
import { useMediaStore } from "@/hooks/use-media-store"
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
  {
    icon: Megaphone,
    title: "Annonces",
    description: "Restez informé des actualités paroissiales",
    href: "/annonces-publiques",
  },
  {
    icon: Calendar,
    title: "Calendrier",
    description: "Suivez le calendrier liturgique",
    href: "/annonces-publiques",
  },
  {
    icon: Church,
    title: "Messes",
    description: "Horaires et intentions de messe",
    href: "/annonces-publiques",
  },
  {
    icon: Heart,
    title: "Dons",
    description: "Soutenez les projets paroissiaux",
    href: "/login",
  },
]

export default function PublicPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<ParchmentData | null>(null)
  const { media } = useMediaStore()

  return (
    <div className="min-h-screen bg-background">
      <CathedralBackground />
      {/* Public Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-royal-blue flex items-center justify-center cathedral-glow">
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/annonces-publiques"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Annonces
            </Link>
            <Link
              href="/annonces-publiques"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Horaires
            </Link>
            <Link
              href="/annonces-publiques"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button className="cathedral" size="sm">
                Inscription
              </Button>
            </Link>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card"
          >
            <nav className="flex flex-col p-4 gap-3">
              <Link
                href="/annonces-publiques"
                className="text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Annonces
              </Link>
              <Link
                href="/annonces-publiques"
                className="text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Horaires
              </Link>
              <Link
                href="/annonces-publiques"
                className="text-sm font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative py-16 sm:py-20 lg:py-28">
          {/* Background image */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 z-[1]" style={{
            background: `linear-gradient(135deg, rgba(30, 63, 107, 0.92) 0%, rgba(20, 44, 78, 0.88) 50%, rgba(30, 63, 107, 0.92) 100%)`,
          }} />
          {/* Gold accent */}
          <div className="absolute inset-0 z-[2]" style={{
            background: `radial-gradient(ellipse at 80% 20%, rgba(184, 146, 58, 0.15) 0%, transparent 50%)`,
          }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
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
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-base w-full sm:w-auto"
                  >
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          {/* Decorative */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Quick Features */}
        <section className="py-10 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="glass hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                    <CardContent className="p-4 sm:p-5 text-center">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-royal-blue/10 w-fit mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-royal-blue" />
                      </div>
                      <h3 className="font-cathedral font-semibold text-sm sm:text-base mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Public Announcements - Auto-scrolling carousel */}
        <section className="pb-10 sm:pb-16 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-cathedral text-xl sm:text-2xl font-bold">
              Dernières annonces
            </h2>
            <Link
              href="/annonces-publiques"
              className="text-sm text-gold hover:underline flex items-center gap-1"
            >
              Tout voir <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Scrolling container */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
                whileHover={{ animationPlayState: "paused" }}
                style={{ width: "max-content" }}
              >
                {/* Duplicate items for seamless loop */}
                {[...publicAnnouncements, ...publicAnnouncements].map((announcement, index) => (
                  <div
                    key={`${announcement.id}-${index}`}
                    className="flex-shrink-0 w-[340px] sm:w-[400px] cursor-pointer"
                    onClick={() => setSelectedAnnouncement(announcement)}
                  >
                    <ParchmentCard
                      title={announcement.title}
                      content={announcement.content}
                      type={announcement.type}
                      typeLabel={announcement.typeLabel}
                      author={announcement.author}
                      date={announcement.date}
                      isPinned={announcement.isPinned}
                      index={index % publicAnnouncements.length}
                      onClick={() => setSelectedAnnouncement(announcement)}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
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
            </div>

            <MediaGallery
              items={media}
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
          {/* Mass Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-royal-blue/10">
                    <Clock className="w-5 h-5 text-royal-blue" />
                  </div>
                  <h3 className="font-cathedral text-lg font-semibold">
                    Horaires des messes
                  </h3>
                </div>
                <div className="space-y-2">
                  {massSchedule.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm"
                    >
                      <span className="font-medium">{schedule.day}</span>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {schedule.times.map((time) => (
                          <Badge
                            key={time}
                            variant="secondary"
                            className="text-xs"
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

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gold/10">
                    <Church className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-cathedral text-lg font-semibold">
                    Nous contacter
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-stone-gray mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Adresse</p>
                      <p className="text-sm text-muted-foreground">
                        Quartier Cocody, Abidjan, Côte d'Ivoire
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-stone-gray mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Téléphone</p>
                      <p className="text-sm text-muted-foreground">
                        +225 27 XX XX XX XX
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-stone-gray mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        contact@ecclesia-connect.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground italic text-center font-serif-elegant">
                    &ldquo;Que la paix du Christ règne dans vos cœurs&rdquo;
                    — Colossiens 3:15
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
                <span className="text-xs text-muted-foreground block">
                  Paroisse Sainte-Thérèse d'Abidjan
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              © 2026 Ecclesia Connect. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

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
