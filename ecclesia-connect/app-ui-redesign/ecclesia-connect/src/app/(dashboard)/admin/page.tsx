"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Home,
  Megaphone,
  Calendar,
  Cross,
  HandHeart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  Church,
  ChevronRight,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stats = [
  { label: "Fidèles actifs", value: "1 247", change: "+12%", trend: "up", icon: Users, color: "text-royal-blue", bg: "bg-royal-blue/10" },
  { label: "Familles", value: "312", change: "+8%", trend: "up", icon: Home, color: "text-gold-dark", bg: "bg-gold/10" },
  { label: "Annonces ce mois", value: "23", change: "+5", trend: "up", icon: Megaphone, color: "text-wine-red", bg: "bg-wine-red/10" },
  { label: "Événements à venir", value: "8", change: "-2", trend: "down", icon: Calendar, color: "text-deep-purple", bg: "bg-deep-purple/10" },
  { label: "Sacrements en cours", value: "12", change: "+3", trend: "up", icon: Cross, color: "text-emerald", bg: "bg-emerald/10" },
  { label: "Dons ce mois", value: "2.4M FCFA", change: "+18%", trend: "up", icon: HandHeart, color: "text-gold-dark", bg: "bg-gold/10" },
]

const recentActivity = [
  { type: "member", text: "Nouveau fidèle inscrit : Marie-Solange Aka", time: "Il y a 2h", icon: UserPlus, color: "text-emerald" },
  { type: "sacrament", text: "Demande de baptême validée pour Jean Dupont", time: "Il y a 4h", icon: CheckCircle2, color: "text-royal-blue" },
  { type: "announcement", text: "Annonce publiée : Fête patronale", time: "Hier", icon: Megaphone, color: "text-gold-dark" },
  { type: "donation", text: "Don reçu : 50 000 FCFA (Orange Money)", time: "Hier", icon: HandHeart, color: "text-wine-red" },
  { type: "event", text: "Événement créé : Réunion conseil", time: "Il y a 2 jours", icon: Calendar, color: "text-deep-purple" },
  { type: "alert", text: "Demande de mariage en attente de validation", time: "Il y a 2 jours", icon: AlertCircle, color: "text-gold-dark" },
]

const pendingActions = [
  { label: "3 demandes de sacrements en attente", href: "/admin/sacrements-admin", urgent: true },
  { label: "1 demande de mariage à valider", href: "/admin/sacrements-admin", urgent: true },
  { label: "5 nouveaux fidèles à approuver", href: "/admin/fideles", urgent: false },
  { label: "2 annonces à modérer", href: "/admin/annonces-admin", urgent: false },
]

const quickLinks = [
  { label: "Gérer les fidèles", href: "/admin/fideles", icon: Users },
  { label: "Publier une annonce", href: "/admin/annonces-admin", icon: Megaphone },
  { label: "Créer un événement", href: "/admin/evenements", icon: Calendar },
  { label: "Voir les dons", href: "/admin/dons-admin", icon: HandHeart },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold">
            Tableau de bord
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Vue d&apos;ensemble de la paroisse Sainte-Thérèse
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass hover:shadow-md transition-all">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.color}`} />
                    </div>
                    <div className="flex items-center gap-0.5">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-emerald" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      )}
                      <span className={`text-[10px] font-semibold ${stat.trend === "up" ? "text-emerald" : "text-destructive"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <p className="text-lg sm:text-xl font-bold font-cathedral">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="glass">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    Activité récente
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Tout voir
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                      <activity.icon className={`w-4 h-4 ${activity.color} mt-0.5 flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pending Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-gold" />
                    Actions en attente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pendingActions.map((action, index) => (
                      <Link
                        key={index}
                        href={action.href}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          {action.urgent && (
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                          )}
                          <span className="text-sm group-hover:text-foreground transition-colors">
                            {action.label}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-gold transition-colors" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">
                    Actions rapides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {quickLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-xs sm:text-sm">
                          <link.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gold" />
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
