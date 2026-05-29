"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Home, Search, Plus, Eye, Edit, Trash2, Users, ChevronRight } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const families = [
  { id: 1, name: "Famille Koffi", members: 5, address: "Cocody", sector: "Zone Cocody", head: "Bernard Koffi" },
  { id: 2, name: "Famille N'Guessan", members: 4, address: "Cocody", sector: "Zone Cocody", head: "Jean-Pierre N'Guessan" },
  { id: 3, name: "Famille Brou", members: 6, address: "Yopougon", sector: "Zone Yopougon", head: "Antoine Brou" },
  { id: 4, name: "Famille Touré", members: 3, address: "Cocody", sector: "Zone Cocody", head: "Bruno Touré" },
  { id: 5, name: "Famille Aka", members: 4, address: "Yopougon", sector: "Zone Abobo", head: "Marie Aka" },
  { id: 6, name: "Famille Kouamé", members: 3, address: "Cocody", sector: "Zone Marcory", head: "Florence Kouamé" },
  { id: 7, name: "Famille Diallo", members: 5, address: "Yopougon", sector: "Zone Cocody", head: "Aïcha Diallo" },
]

export default function FamillesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = families.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.sector.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <Home className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              Gestion des Familles
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{families.length} familles enregistrées</p>
          </div>
          <Button className="cathedral" size="sm"><Plus className="w-4 h-4 mr-1.5" /> Nouvelle famille</Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Rechercher une famille..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((family, index) => (
            <motion.div key={family.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="glass hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-royal-blue/10 text-royal-blue font-cathedral text-xs">
                          {family.name.split(" ").slice(-1)[0]?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm group-hover:text-royal-blue transition-colors">{family.name}</p>
                        <p className="text-xs text-muted-foreground">{family.head}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {family.members} membres</span>
                    <span>{family.sector}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{family.address}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
