"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Cross,
  Droplets,
  Heart,
  Hand,
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Calendar,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const sacramentTypes = [
  {
    id: "bapteme",
    title: "Baptême",
    icon: Droplets,
    color: "text-royal-blue",
    bgColor: "bg-royal-blue/10",
    description: "Premier sacrement de l'initiation chrétienne",
    requirements: [
      "Acte de naissance",
      "Certificat de baptême des parents",
      "Attestation de catéchisme",
      "Témoins (2)",
    ],
  },
  {
    id: "communion",
    title: "Première Communion",
    icon: Cross,
    color: "text-gold-dark",
    bgColor: "bg-gold/10",
    description: "Réception du Corps du Christ pour la première fois",
    requirements: [
      "Certificat de baptême",
      "Certificat de catéchisme",
      "Lettre du catéchiste",
    ],
  },
  {
    id: "confirmation",
    title: "Confirmation",
    icon: Hand,
    color: "text-deep-purple",
    bgColor: "bg-deep-purple/10",
    description: "Confirmation de la foi par l'Esprit Saint",
    requirements: [
      "Certificat de baptême",
      "Certificat de première communion",
      "Lettre du curé",
      "Témoin (1)",
    ],
  },
  {
    id: "mariage",
    title: "Mariage",
    icon: Heart,
    color: "text-wine-red",
    bgColor: "bg-wine-red/10",
    description: "Union sacramentelle devant Dieu",
    requirements: [
      "Acte de baptême des deux époux",
      "Certificat de confirmation",
      "Certificat de mariage civil",
      "Témoins (2)",
      "Attestation de préparation au mariage",
    ],
  },
]

const requests = [
  {
    id: 1,
    type: "Baptême",
    status: "validated",
    date: "25 Juin 2026",
    progress: 60,
  },
  {
    id: 2,
    type: "Mariage",
    status: "pending",
    date: "15 Août 2026",
    progress: 20,
  },
  {
    id: 3,
    type: "Confirmation",
    status: "paid",
    date: "20 Juillet 2026",
    progress: 80,
  },
]

const statusConfig = {
  pending: { label: "En attente", color: "bg-gold/10 text-gold-dark", icon: Clock },
  validated: { label: "Validé", color: "bg-royal-blue/10 text-royal-blue", icon: CheckCircle2 },
  paid: { label: "Payé", color: "bg-emerald/10 text-emerald", icon: CheckCircle2 },
  scheduled: { label: "Planifié", color: "bg-deep-purple/10 text-deep-purple", icon: Calendar },
  completed: { label: "Terminé", color: "bg-emerald/10 text-emerald", icon: CheckCircle2 },
  rejected: { label: "Rejeté", color: "bg-destructive/10 text-destructive", icon: AlertCircle },
}

export default function SacrementsPage() {
  const [selectedSacrament, setSelectedSacrament] = useState<string | null>(null)

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
              <Cross className="w-8 h-8 text-gold" />
              Gestion des Sacrements
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Demandes, documents et suivi des sacrements
            </p>
          </div>
        </motion.div>

        {/* Sacrament Types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sacramentTypes.map((sacrament, index) => (
            <motion.div
              key={sacrament.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`glass cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedSacrament === sacrament.id
                    ? "ring-2 ring-gold cathedral-glow"
                    : ""
                }`}
                onClick={() => setSelectedSacrament(sacrament.id)}
              >
                <CardContent className="p-5">
                  <div className={`p-3 rounded-xl ${sacrament.bgColor} w-fit mb-3`}>
                    <sacrament.icon className={`w-6 h-6 ${sacrament.color}`} />
                  </div>
                  <h3 className="font-cathedral font-semibold text-base sm:text-lg mb-1">
                    {sacrament.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {sacrament.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Selected Sacrament Details */}
        {selectedSacrament && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  Documents requis -{" "}
                  {sacramentTypes.find((s) => s.id === selectedSacrament)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Documents à fournir</h4>
                    <ul className="space-y-2">
                      {sacramentTypes
                        .find((s) => s.id === selectedSacrament)
                        ?.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            {req}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Processus</h4>
                    <div className="space-y-3">
                      {["Demande", "Validation", "Paiement", "Convocation", "Confirmation"].map(
                        (step, i) => (
                          <div key={step} className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                i < 3
                                  ? "bg-gold text-royal-blue-dark"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {i + 1}
                            </div>
                            <span
                              className={`text-sm ${
                                i < 3 ? "text-foreground" : "text-muted-foreground"
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                    <Button className="w-full mt-4 cathedral">
                      <Upload className="w-4 h-4 mr-2" />
                      Faire une demande
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* My Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Mes demandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => {
                  const status = statusConfig[request.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  return (
                    <div
                      key={request.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{request.type}</span>
                          <Badge className={status.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Date prévue: {request.date}
                        </p>
                        <Progress value={request.progress} className="h-2" />
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  )
}
