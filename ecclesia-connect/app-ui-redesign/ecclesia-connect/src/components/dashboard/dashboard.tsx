"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Church,
  Users,
  Calendar,
  Heart,
  TrendingUp,
  Megaphone,
  Clock,
  BookOpen,
  Cloud,
  Sun,
  CloudRain,
  ChevronRight,
  Cross,
  Hand,
  Star,
  ArrowUpRight,
  Activity,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const stats = [
  {
    label: "Fidèles actifs",
    value: "1 247",
    change: "+12%",
    icon: Users,
    color: "text-royal-blue",
    bgColor: "bg-royal-blue/10",
  },
  {
    label: "Événements ce mois",
    value: "23",
    change: "+5",
    icon: Calendar,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
  },
  {
    label: "Dons collectés",
    value: "2 450 000 FCFA",
    change: "+18%",
    icon: Heart,
    color: "text-wine-red",
    bgColor: "bg-wine-red/10",
  },
  {
    label: "Taux de participation",
    value: "78%",
    change: "+3%",
    icon: TrendingUp,
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
]

const upcomingEvents = [
  {
    title: "Messe dominicale",
    time: "Dimanche, 10h00",
    location: "Église principale",
    type: "mass",
    attendees: 320,
  },
  {
    title: "Réunion chorale",
    time: "Samedi, 15h00",
    location: "Salle paroissiale",
    type: "meeting",
    attendees: 45,
  },
  {
    title: "Catéchisme enfants",
    time: "Mercredi, 16h00",
    location: "Salle Saint-Joseph",
    type: "catechesis",
    attendees: 65,
  },
  {
    title: "Veillée de prière",
    time: "Vendredi, 20h00",
    location: "Chapelle latérale",
    type: "prayer",
    attendees: 120,
  },
]

const announcements = [
  {
    title: "Fête patronale de la paroisse",
    type: "general",
    date: "15 Juin 2026",
    urgent: true,
  },
  {
    title: "Inscription pèlerinage Lourdes",
    type: "pelerinage",
    date: "20 Juin 2026",
    urgent: false,
  },
  {
    title: "Collecte pour la rénovation",
    type: "collecte",
    date: "22 Juin 2026",
    urgent: false,
  },
  {
    title: "Baptême de Marie-Solange",
    type: "bapteme",
    date: "25 Juin 2026",
    urgent: false,
  },
]

const saints = [
  "Saint Jean-Baptiste",
  "Saint Pierre et Saint Paul",
  "Sainte Marie-Madeleine",
  "Saint Benoît",
  "Sainte Thérèse d'Avila",
]

export function Dashboard() {
  const today = new Date()
  const greeting =
    today.getHours() < 12
      ? "Bonjour"
      : today.getHours() < 18
        ? "Bon après-midi"
        : "Bonsoir"

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl stained-glass p-4 sm:p-6 lg:p-8 text-white"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
            <span className="text-xs sm:text-sm font-medium text-white/80">
              {today.toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="font-cathedral text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            {greeting}, Fr. Amadou
          </h1>
          <p className="text-white/80 text-sm sm:text-base lg:text-lg">
            Que la paix du Christ soit avec vous aujourd&apos;hui.
          </p>
        </div>
        <div className="absolute top-4 right-4 opacity-10">
          <Cross className="w-32 h-32" />
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -top-4 -right-16 w-24 h-24 rounded-full bg-white/5" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                    <p className="text-lg sm:text-2xl font-bold mt-1 font-cathedral">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-emerald" />
                      <span className="text-xs font-medium text-emerald">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} transition-transform group-hover:scale-110`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Word of the Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass cathedral-glow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gold/10">
                    <BookOpen className="w-5 h-5 text-gold" />
                  </div>
                  <CardTitle className="text-lg">Mot du Curé</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="font-serif-elegant text-lg italic text-foreground/90 leading-relaxed border-l-4 border-gold pl-4">
                  &ldquo;Aimez-vous les uns les autres comme je vous ai aimés. Il n&apos;ya
                  pas de plus grand amour que de donner sa vie pour ceux que l&apos;on
                  aime.&rdquo;
                </blockquote>
                <p className="text-sm text-muted-foreground mt-3">
                  — Fr. Jean Kouassi, Dimanche 29 Mai 2026
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-royal-blue/10">
                      <Calendar className="w-5 h-5 text-royal-blue" />
                    </div>
                    <CardTitle className="text-lg">Événements à venir</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm">
                    Tout voir <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-royal-blue/10 flex items-center justify-center">
                        {event.type === "mass" ? (
                          <Church className="w-5 h-5 text-royal-blue" />
                        ) : event.type === "meeting" ? (
                          <Users className="w-5 h-5 text-royal-blue" />
                        ) : event.type === "catechesis" ? (
                          <BookOpen className="w-5 h-5 text-royal-blue" />
                        ) : (
                          <Hand className="w-5 h-5 text-royal-blue" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-royal-blue transition-colors">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge variant="secondary">
                          <Users className="w-3 h-3 mr-1" />
                          {event.attendees}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-wine-red/10">
                      <Megaphone className="w-5 h-5 text-wine-red" />
                    </div>
                    <CardTitle className="text-lg">Dernières annonces</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm">
                    Tout voir <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {announcements.map((announcement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className="flex-shrink-0">
                        {announcement.urgent ? (
                          <Badge variant="destructive">Urgent</Badge>
                        ) : (
                          <Badge variant="gold">
                            {announcement.type}
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {announcement.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {announcement.date}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Saint of the Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass overflow-hidden">
              <div className="stained-glass p-6 text-white text-center">
                <Star className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="font-cathedral text-lg font-semibold">
                  Saint du Jour
                </h3>
              </div>
              <CardContent className="p-5 text-center">
                <p className="font-cathedral text-xl font-bold text-foreground mb-2">
                  Saint Jean-Baptiste
                </p>
                <p className="text-sm text-muted-foreground">
                  Patron des prêtres et des prophètes
                </p>
                <div className="mt-4 p-3 rounded-xl bg-muted/30">
                  <p className="font-serif-elegant text-sm italic text-foreground/80">
                    &ldquo;Il faut qu&apos;Il croisse et que je diminue.&rdquo;
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Reading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-deep-purple/10">
                    <BookOpen className="w-5 h-5 text-deep-purple" />
                  </div>
                  <CardTitle className="text-lg">Lecture du Jour</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Première Lecture
                    </p>
                    <p className="text-sm font-medium">Josué 24, 14-29</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Psaume
                    </p>
                    <p className="text-sm font-medium">Psaume 123 (124)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Évangile
                    </p>
                    <p className="text-sm font-medium">Marc 12, 28-34</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Lire la lecture complète
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Verse of the Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass cathedral-glow">
              <CardContent className="p-5">
                <div className="text-center">
                  <Cross className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="font-serif-elegant text-base italic text-foreground/90 leading-relaxed mb-3">
                    &ldquo;Car j&apos;ai l&apos;impression que les souffrances du moment
                    présent sont sans proportion avec la gloire qui doit se
                    révéler pour nous.&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-gold">
                    — Romains 8, 18
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="glass">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Météo locale</p>
                    <p className="text-2xl font-bold font-cathedral">28°C</p>
                    <p className="text-sm text-muted-foreground">Abidjan, Côte d'Ivoire</p>
                  </div>
                  <div className="text-gold">
                    <Sun className="w-12 h-12" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                  <div>
                    <p className="font-medium">Dim</p>
                    <Sun className="w-4 h-4 mx-auto text-gold" />
                    <p>30°</p>
                  </div>
                  <div>
                    <p className="font-medium">Lun</p>
                    <Cloud className="w-4 h-4 mx-auto" />
                    <p>27°</p>
                  </div>
                  <div>
                    <p className="font-medium">Mar</p>
                    <CloudRain className="w-4 h-4 mx-auto" />
                    <p>25°</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Parish Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald/10">
                    <Activity className="w-5 h-5 text-emerald" />
                  </div>
                  <CardTitle className="text-lg">Activité paroissiale</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Messes dominicales", value: 320, max: 500 },
                    { label: "Groupes actifs", value: 12, max: 15 },
                    { label: "Sacrements ce mois", value: 8, max: 20 },
                    { label: "Nouveaux membres", value: 15, max: 30 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold">
                          {item.value}/{item.max}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(item.value / item.max) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gold rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
