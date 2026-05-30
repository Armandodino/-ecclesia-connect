"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  Settings,
  Filter,
  Trash2,
  Mail,
  MessageCircle,
  Calendar,
  Heart,
  Church,
  Gift,
  AlertCircle,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notifications = [
  {
    id: 1,
    type: "mass",
    title: "Rappel de messe",
    body: "La messe dominicale commence dans 1 heure. N'oubliez pas de rejoindre l'église!",
    time: "Il y a 10 min",
    read: false,
    icon: Church,
    color: "text-royal-blue",
    bgColor: "bg-royal-blue/10",
  },
  {
    id: 2,
    type: "event",
    title: "Réunion chorale",
    body: "Rappel: Réunion de la chorale ce samedi à 15h en salle paroissiale.",
    time: "Il y a 1 heure",
    read: false,
    icon: Calendar,
    color: "text-deep-purple",
    bgColor: "bg-deep-purple/10",
  },
  {
    id: 3,
    type: "donation",
    title: "Don reçu",
    body: "Votre don de 25 000 FCFA a bien été reçu. Merci pour votre générosité!",
    time: "Il y a 3 heures",
    read: false,
    icon: Gift,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
  },
  {
    id: 4,
    type: "prayer",
    title: "Intention de prière",
    body: "Marie-Solange a partagé une intention de prière: \"Pour la guérison de Maman\".",
    time: "Il y a 5 heures",
    read: true,
    icon: Heart,
    color: "text-wine-red",
    bgColor: "bg-wine-red/10",
  },
  {
    id: 5,
    type: "announcement",
    title: "Nouvelle annonce",
    body: "Fête patronale de la paroisse le 15 juin. Événement majeur!",
    time: "Hier",
    read: true,
    icon: BellRing,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
  },
  {
    id: 6,
    type: "sacrament",
    title: "Demande de sacrement",
    body: "Votre demande de baptême a été validée. Prochaine étape: paiement.",
    time: "Il y a 2 jours",
    read: true,
    icon: Check,
    color: "text-emerald",
    bgColor: "bg-emerald/10",
  },
]

const notificationSettings = [
  { label: "Rappels de messe", enabled: true, channel: "push" },
  { label: "Événements à venir", enabled: true, channel: "push" },
  { label: "Nouvelles annonces", enabled: true, channel: "push" },
  { label: "Intentions de prière", enabled: true, channel: "push" },
  { label: "Dons et collectes", enabled: false, channel: "email" },
  { label: "Demandes de sacrements", enabled: true, channel: "sms" },
  { label: "Messages privés", enabled: true, channel: "push" },
]

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all")

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read
    if (filter === "read") return n.read
    return true
  })

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
              <Bell className="w-8 h-8 text-gold" />
              Notifications
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Gérez vos alertes et préférences
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CheckCheck className="w-4 h-4 mr-2" />
              Tout marquer lu
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            {/* Filters */}
            <div className="flex gap-2">
              {["all", "unread", "read"].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={filter === f ? "cathedral" : ""}
                >
                  {f === "all" ? "Toutes" : f === "unread" ? "Non lues" : "Lues"}
                </Button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-2">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={` transition-all duration-200 cursor-pointer ${
                      !notification.read
                        ? "border-l-4 border-gold bg-gold/5"
                        : ""
                    } hover:shadow-md`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-xl ${notification.bgColor} flex-shrink-0`}>
                          <notification.icon className={`w-5 h-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.body}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          {!notification.read && (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Préférences de notification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationSettings.map((setting, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-sm">{setting.label}</p>
                        <p className="text-xs text-muted-foreground">
                          Canal: {setting.channel}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {setting.channel === "push" && <Bell className="w-3 h-3 mr-1" />}
                          {setting.channel === "email" && <Mail className="w-3 h-3 mr-1" />}
                          {setting.channel === "sms" && <MessageCircle className="w-3 h-3 mr-1" />}
                          {setting.channel}
                        </Badge>
                        <button
                          className={`w-10 h-6 rounded-full transition-colors ${
                            setting.enabled ? "bg-gold" : "bg-muted"
                          } cursor-pointer`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                              setting.enabled ? "translate-x-5" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
