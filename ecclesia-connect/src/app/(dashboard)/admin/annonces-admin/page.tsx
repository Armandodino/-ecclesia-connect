"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Megaphone, Search, Plus, Edit, Trash2, Eye, Calendar, Pin } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const announcements = [
  { id: 1, title: "Fête patronale de la paroisse", type: "general", author: "Fr. Jean Kouassi", date: "15 Juin 2026", status: "published", isPinned: true },
  { id: 2, title: "Pèlerinage à Lourdes", type: "pelerinage", author: "Mme Catherine N'Guessan", date: "20 Juin 2026", status: "published", isPinned: false },
  { id: 3, title: "Collecte rénovation toiture", type: "collecte", author: "Fr. Bernard Koffi", date: "22 Juin 2026", status: "draft", isPinned: false },
  { id: 4, title: "Baptême Marie-Solange", type: "bapteme", author: "Mme Marie Aka", date: "25 Juin 2026", status: "published", isPinned: false },
  { id: 5, title: "Réunion conseil paroissial", type: "reunion", author: "Fr. Jean Kouassi", date: "30 Mai 2026", status: "archived", isPinned: false },
]

const typeColors: Record<string, string> = {
  general: "bg-royal-blue/10 text-royal-blue",
  pelerinage: "bg-gold/10 text-gold-dark",
  collecte: "bg-emerald/10 text-emerald",
  bapteme: "bg-royal-blue/10 text-royal-blue",
  reunion: "bg-deep-purple/10 text-deep-purple",
  deces: "bg-stone-gray/10 text-stone-gray",
  mariage: "bg-wine-red/10 text-wine-red",
  confirmation: "bg-deep-purple/10 text-deep-purple",
}

export default function AnnoncesAdminPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = announcements.filter(
    (a) => a.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <Megaphone className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              Gestion des Annonces
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{announcements.length} annonces</p>
          </div>
          <Button className="cathedral" size="sm"><Plus className="w-4 h-4 mr-1.5" /> Nouvelle annonce</Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="">
            <CardContent className="p-0 divide-y divide-border/50">
              {filtered.map((announcement) => (
                <div key={announcement.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {announcement.isPinned && <Pin className="w-3 h-3 text-gold" />}
                        <Badge className={`${typeColors[announcement.type]} text-[10px]`}>{announcement.type}</Badge>
                        <Badge variant={announcement.status === "published" ? "success" : announcement.status === "draft" ? "secondary" : "outline"} className="text-[10px]">
                          {announcement.status === "published" ? "Publié" : announcement.status === "draft" ? "Brouillon" : "Archivé"}
                        </Badge>
                      </div>
                      <p className="font-medium text-sm truncate">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{announcement.author} • {announcement.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-3.5 h-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
