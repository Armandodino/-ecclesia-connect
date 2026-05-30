"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, Plus, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const events = [
  { id: 1, title: "Messe dominicale", date: "Dimanche 10h00", location: "Église principale", type: "mass", attendees: 320, recurring: true },
  { id: 2, title: "Fête patronale", date: "15 Juin 2026", location: "Église principale", type: "celebration", attendees: 500, recurring: false },
  { id: 3, title: "Réunion conseil", date: "30 Mai 18h30", location: "Salle paroissiale", type: "meeting", attendees: 15, recurring: false },
  { id: 4, title: "Retraite spirituelle", date: "12-14 Juillet", location: "Centre Marialis", type: "retreat", attendees: 45, recurring: false },
  { id: 5, title: "Catéchisme enfants", date: "Mercredi 16h00", location: "Salle Saint-Joseph", type: "catechesis", attendees: 65, recurring: true },
]

const typeColors: Record<string, string> = {
  mass: "bg-royal-blue/10 text-royal-blue",
  celebration: "bg-gold/10 text-gold-dark",
  meeting: "bg-deep-purple/10 text-deep-purple",
  retreat: "bg-emerald/10 text-emerald",
  catechesis: "bg-wine-red/10 text-wine-red",
}

export default function EvenementsPage() {
  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              Gestion des Événements
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{events.length} événements</p>
          </div>
          <Button className="cathedral" size="sm"><Plus className="w-4 h-4 mr-1.5" /> Nouvel événement</Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event, index) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className=" hover:shadow-md transition-all">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`${typeColors[event.type]} text-[10px]`}>{event.type}</Badge>
                        {event.recurring && <Badge variant="outline" className="text-[10px]">Récurrent</Badge>}
                      </div>
                      <h3 className="font-semibold text-sm">{event.title}</h3>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.attendees}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
