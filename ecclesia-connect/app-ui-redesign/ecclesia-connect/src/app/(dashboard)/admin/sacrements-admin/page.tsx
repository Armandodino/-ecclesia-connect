"use client"

import React from "react"
import { motion } from "framer-motion"
import { Cross, CheckCircle2, Clock, AlertCircle, XCircle, Eye, ChevronRight } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const requests = [
  { id: 1, name: "Marie-Solange Aka", type: "Baptême", status: "validated", date: "25 Juin 2026", documents: 3, notes: "Parents: Paul & Marie Aka" },
  { id: 2, name: "Jean-Pierre N'Guessan & Aïcha Diallo", type: "Mariage", status: "pending", date: "15 Août 2026", documents: 2, notes: "Préparation en cours" },
  { id: 3, name: "Bruno Touré", type: "Confirmation", status: "paid", date: "6 Juillet 2026", documents: 4, notes: "Paiement reçu: 25 000 FCFA" },
  { id: 4, name: "Thérèse Brou", type: "Première Communion", status: "completed", date: "18 Mai 2026", documents: 3, notes: "Célébré le 18 Mai" },
  { id: 5, name: "Antoine Brou", type: "Confirmation", status: "pending", date: "6 Juillet 2026", documents: 1, notes: "Documents manquants" },
]

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "En attente", color: "bg-gold/10 text-gold-dark", icon: Clock },
  validated: { label: "Validé", color: "bg-royal-blue/10 text-royal-blue", icon: CheckCircle2 },
  paid: { label: "Payé", color: "bg-emerald/10 text-emerald", icon: CheckCircle2 },
  scheduled: { label: "Planifié", color: "bg-deep-purple/10 text-deep-purple", icon: Clock },
  completed: { label: "Terminé", color: "bg-emerald/10 text-emerald", icon: CheckCircle2 },
  rejected: { label: "Rejeté", color: "bg-destructive/10 text-destructive", icon: XCircle },
}

export default function SacrementsAdminPage() {
  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
            <Cross className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
            Demandes de Sacrements
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {requests.filter(r => r.status === "pending").length} en attente •{" "}
            {requests.filter(r => r.status === "validated").length} validées
          </p>
        </motion.div>

        <div className="space-y-3">
          {requests.map((request, index) => {
            const status = statusConfig[request.status]
            const StatusIcon = status.icon
            return (
              <motion.div key={request.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className="glass hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${status.color} flex-shrink-0`}>
                        <StatusIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="font-medium text-sm">{request.name}</p>
                          <Badge className={`${status.color} text-[10px]`}>{status.label}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{request.type} • {request.date}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{request.notes}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="secondary" className="text-[10px]">{request.documents} docs</Badge>
                        {request.status === "pending" && (
                          <Button size="sm" className="cathedral text-xs h-7">
                            Valider
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
