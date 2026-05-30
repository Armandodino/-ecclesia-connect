"use client"

import React from "react"
import { motion } from "framer-motion"
import { UsersRound, Plus, Users, Calendar, Edit, Trash2, Music, GraduationCap, Shield, Crown, BookOpen, Zap } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const groups = [
  { id: 1, name: "Chorale Sainte-Cécile", icon: Music, members: 45, leader: "Florence Kouamé", meeting: "Sam 15h", color: "text-deep-purple", bg: "bg-deep-purple/10" },
  { id: 2, name: "Enfants de Chœur", icon: Music, members: 25, leader: "Sr. Marie-Claire", meeting: "Dim 09h", color: "text-gold-dark", bg: "bg-gold/10" },
  { id: 3, name: "JEC", icon: GraduationCap, members: 60, leader: "Aïcha Diallo", meeting: "Ven 17h", color: "text-royal-blue", bg: "bg-royal-blue/10" },
  { id: 4, name: "Cœur Vaillant", icon: Shield, members: 35, leader: "Jean-Pierre N'Guessan", meeting: "Sam 10h", color: "text-wine-red", bg: "bg-wine-red/10" },
  { id: 5, name: "Légion de Marie", icon: Crown, members: 30, leader: "Thérèse Brou", meeting: "Sam 08h", color: "text-royal-blue", bg: "bg-royal-blue/10" },
  { id: 6, name: "Groupe de Prière", icon: BookOpen, members: 50, leader: "Fr. Bernard Koffi", meeting: "Mer 19h", color: "text-emerald", bg: "bg-emerald/10" },
  { id: 7, name: "Jeunesse Catholique", icon: Zap, members: 80, leader: "Bruno Touré", meeting: "Dim 16h", color: "text-gold-dark", bg: "bg-gold/10" },
]

export default function GroupesPage() {
  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <UsersRound className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              Gestion des Groupes
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{groups.length} groupes • {groups.reduce((a, g) => a + g.members, 0)} membres</p>
          </div>
          <Button className="cathedral" size="sm"><Plus className="w-4 h-4 mr-1.5" /> Nouveau groupe</Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {groups.map((group, index) => (
            <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className=" hover:shadow-md transition-all group">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${group.bg}`}>
                        <group.icon className={`w-5 h-5 ${group.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm group-hover:text-royal-blue transition-colors">{group.name}</p>
                        <p className="text-xs text-muted-foreground">{group.leader}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {group.members} membres</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {group.meeting}</span>
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
