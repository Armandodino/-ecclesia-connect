"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Settings, Save, Church, MapPin, Phone, Mail, Globe, Bell, Shield, Users } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ParametresPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <Settings className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              Paramètres
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Configuration de la paroisse
            </p>
          </div>
          <Button className="cathedral" size="sm" onClick={handleSave}>
            <Save className="w-4 h-4 mr-1.5" />
            {saved ? "Sauvegardé ✓" : "Sauvegarder"}
          </Button>
        </motion.div>

        <Tabs defaultValue="parish" className="space-y-4">
          <TabsList className="flex overflow-x-auto hide-scrollbar">
            <TabsTrigger value="parish" className="whitespace-nowrap">
              <Church className="w-4 h-4 mr-1.5" />
              Paroisse
            </TabsTrigger>
            <TabsTrigger value="notifications" className="whitespace-nowrap">
              <Bell className="w-4 h-4 mr-1.5" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="roles" className="whitespace-nowrap">
              <Shield className="w-4 h-4 mr-1.5" />
              Rôles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parish" className="space-y-4">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Church className="w-4 h-4 text-gold" />
                  Informations paroissiales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom de la paroisse</Label>
                  <Input defaultValue="Paroisse Sainte-Thérèse" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Diocèse</Label>
                    <Input defaultValue="Archidiocèse d'Abidjan" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ville</Label>
                    <Input defaultValue="Abidjan" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <Input defaultValue="Quartier Cocody, Abidjan, Côte d'Ivoire" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input defaultValue="+225 27 XX XX XX XX" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="contact@ecclesia-connect.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Site web</Label>
                  <Input defaultValue="https://ecclesia-connect.com" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-base">Préférences de notification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Notifications push", description: "Recevoir les alertes sur l'appareil", enabled: true },
                    { label: "Emails de rappel", description: "Rappels de messes et événements", enabled: true },
                    { label: "Notifications SMS", description: "Alertes importantes par SMS", enabled: false },
                    { label: "Newsletter hebdomadaire", description: "Résumé des annonces de la semaine", enabled: true },
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{setting.label}</p>
                        <p className="text-xs text-muted-foreground">{setting.description}</p>
                      </div>
                      <button className={`w-10 h-6 rounded-full transition-colors cursor-pointer ${setting.enabled ? "bg-gold" : "bg-muted"}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${setting.enabled ? "translate-x-5" : "translate-x-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="space-y-4">
            <Card className="">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gold" />
                  Rôles et permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { role: "Super Admin", description: "Accès complet au système", users: 1 },
                    { role: "Évêque", description: "Supervision diocésaine", users: 1 },
                    { role: "Curé", description: "Administration paroissiale", users: 1 },
                    { role: "Vicaire", description: "Assistance au curé", users: 1 },
                    { role: "Secrétaire", description: "Gestion administrative", users: 2 },
                    { role: "Responsable de groupe", description: "Gestion d'un groupe/mouvement", users: 7 },
                    { role: "Fidèle", description: "Membre de la paroisse", users: 1234 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{item.role}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{item.users} utilisateur{item.users > 1 ? "s" : ""}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
