"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserPlus,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const members = [
  { id: 1, name: "Jean Kouassi", email: "jean@ecclesia.com", phone: "+225 07 09 12 34 56", role: "Curé", sector: "Zone Cocody", family: "Famille Kouassi", joined: "Jan 2015", status: "active", baptised: true, confirmed: true },
  { id: 2, name: "Bernard Koffi", email: "bernard@ecclesia.com", phone: "+225 05 04 56 78 90", role: "Vicaire", sector: "Zone Marcory", family: "Famille Koffi", joined: "Mar 2018", status: "active", baptised: true, confirmed: true },
  { id: 3, name: "Catherine N'Guessan", email: "catherine@email.com", phone: "+225 01 03 21 43 65", role: "Secrétaire", sector: "Zone Cocody", family: "Famille N'Guessan", joined: "Sep 2016", status: "active", baptised: true, confirmed: true },
  { id: 4, name: "Marie-Solange Aka", email: "marie@email.com", phone: "+225 07 08 76 54 32", role: "Fidèle", sector: "Zone Yopougon", family: "Famille Aka", joined: "Fév 2026", status: "active", baptised: true, confirmed: false },
  { id: 5, name: "Jean-Pierre N'Guessan", email: "jp@email.com", phone: "+225 05 07 89 01 23", role: "Fidèle", sector: "Zone Cocody", family: "Famille N'Guessan", joined: "Jun 2020", status: "active", baptised: true, confirmed: true },
  { id: 6, name: "Thérèse Brou", email: "therese@email.com", phone: "+225 01 06 54 32 10", role: "Fidèle", sector: "Zone Abobo", family: "Famille Brou", joined: "Avr 2019", status: "active", baptised: true, confirmed: true },
  { id: 7, name: "Bruno Touré", email: "bruno@email.com", phone: "+225 07 02 34 56 78", role: "Fidèle", sector: "Zone Yopougon", family: "Famille Touré", joined: "Nov 2021", status: "active", baptised: true, confirmed: true },
  { id: 8, name: "Florence Kouamé", email: "florence@email.com", phone: "+225 05 01 23 45 67", role: "Chorale", sector: "Zone Marcory", family: "Famille Kouamé", joined: "Aoû 2017", status: "active", baptised: true, confirmed: true },
  { id: 9, name: "Antoine Brou", email: "antoine@email.com", phone: "+225 01 09 87 65 43", role: "Fidèle", sector: "Zone Abobo", family: "Famille Brou", joined: "Jan 2022", status: "inactive", baptised: true, confirmed: false },
  { id: 10, name: "Aïcha Diallo", email: "aicha@email.com", phone: "+225 07 06 54 32 10", role: "JEC", sector: "Zone Cocody", family: "Famille Diallo", joined: "Sep 2023", status: "active", baptised: true, confirmed: true },
]

export default function FidelesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              Gestion des Fidèles
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {members.length} fidèles enregistrés • {members.filter(m => m.status === "active").length} actifs
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1.5" />
              Exporter
            </Button>
            <Button className="cathedral" size="sm" onClick={() => setShowAddDialog(true)}>
              <UserPlus className="w-4 h-4 mr-1.5" />
              Nouveau
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un fidèle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Members List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="">
            <CardContent className="p-0">
              {/* Table Header - Desktop */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-4 border-b border-border font-medium text-xs text-muted-foreground uppercase tracking-wider">
                <div className="col-span-3">Nom</div>
                <div className="col-span-2">Rôle</div>
                <div className="col-span-2">Contact</div>
                <div className="col-span-2">Secteur</div>
                <div className="col-span-1">Statut</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>

              {/* Members */}
              <div className="divide-y divide-border/50">
                {filtered.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 sm:p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                  >
                    {/* Desktop View */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gold/10 text-gold font-cathedral text-xs">
                            {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.family}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="secondary" className="text-xs">{member.role}</Badge>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs flex items-center gap-1"><Mail className="w-3 h-3" /> {member.email}</p>
                        <p className="text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> {member.phone}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> {member.sector}</p>
                      </div>
                      <div className="col-span-1">
                        <Badge variant={member.status === "active" ? "success" : "destructive"} className="text-xs">
                          {member.status === "active" ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setSelectedMember(member); }}>
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="lg:hidden flex items-center gap-3">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarFallback className="bg-gold/10 text-gold font-cathedral text-xs">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{member.name}</p>
                          <Badge variant={member.status === "active" ? "success" : "destructive"} className="text-[9px] flex-shrink-0">
                            {member.status === "active" ? "Actif" : "Inactif"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{member.role} • {member.sector}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Aucun fidèle trouvé
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Member Detail Dialog */}
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-cathedral">
                {selectedMember?.name}
              </DialogTitle>
              <DialogDescription>
                Détails du fidèle
              </DialogDescription>
            </DialogHeader>
            {selectedMember && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-gold/10 text-gold font-cathedral text-lg">
                      {selectedMember.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{selectedMember.name}</p>
                    <Badge variant="secondary">{selectedMember.role}</Badge>
                    <Badge variant={selectedMember.status === "active" ? "success" : "destructive"} className="ml-2">
                      {selectedMember.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedMember.email}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Téléphone</p>
                    <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedMember.phone}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Secteur</p>
                    <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {selectedMember.sector}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Famille</p>
                    <p>{selectedMember.family}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Inscrit le</p>
                    <p className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {selectedMember.joined}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Sacrements</p>
                    <div className="flex gap-1 mt-0.5">
                      {selectedMember.baptised && <Badge variant="gold" className="text-[9px]">Baptisé</Badge>}
                      {selectedMember.confirmed && <Badge variant="gold" className="text-[9px]">Confirmé</Badge>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="cathedral flex-1" size="sm">
                    <Edit className="w-4 h-4 mr-1.5" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-1.5" />
                    Supprimer
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Member Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-cathedral">
                Nouveau fidèle
              </DialogTitle>
              <DialogDescription>
                Ajouter un nouveau fidèle à la paroisse
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" placeholder="Jean-Pierre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" placeholder="Dupont" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="addEmail">Email</Label>
                <Input id="addEmail" type="email" placeholder="jean@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addPhone">Téléphone</Label>
                <Input id="addPhone" type="tel" placeholder="+225 07 XX XX XX XX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="addSector">Secteur</Label>
                <Input id="addSector" placeholder="Zone Cocody" />
              </div>
              <Button className="cathedral w-full" onClick={() => setShowAddDialog(false)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Ajouter le fidèle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
