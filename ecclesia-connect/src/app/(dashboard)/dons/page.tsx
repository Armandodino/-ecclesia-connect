"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  Wallet,
  CreditCard,
  Smartphone,
  TrendingUp,
  Target,
  Gift,
  Receipt,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const campaigns = [
  {
    id: 1,
    title: "Rénovation de la toiture",
    description: "Collecte pour la rénovation de la toiture de l'église principale",
    goal: 5000000,
    raised: 3200000,
    endDate: "30 Juin 2026",
    donors: 156,
  },
  {
    id: 2,
    title: "Aide aux plus démunis",
    description: "Distribution de vivres aux familles nécessiteuses de la paroisse",
    goal: 2000000,
    raised: 1800000,
    endDate: "15 Juillet 2026",
    donors: 234,
  },
  {
    id: 3,
    title: "Nouvel orgue de l'église",
    description: "Acquisition d'un nouvel orgue pour les célébrations",
    goal: 10000000,
    raised: 2500000,
    endDate: "31 Décembre 2026",
    donors: 89,
  },
]

const paymentMethods = [
  {
    id: "orange",
    name: "Orange Money",
    color: "bg-[#FF6600]",
    textColor: "text-[#FF6600]",
    icon: Smartphone,
  },
  {
    id: "mtn",
    name: "MTN Money",
    color: "bg-[#FFCC00]",
    textColor: "text-[#CC9900]",
    icon: Smartphone,
  },
  {
    id: "wave",
    name: "Wave",
    color: "bg-[#00D4FF]",
    textColor: "text-[#00B8D4]",
    icon: Smartphone,
  },
  {
    id: "card",
    name: "Carte bancaire",
    color: "bg-royal-blue",
    textColor: "text-royal-blue",
    icon: CreditCard,
  },
]

const recentDonations = [
  { name: "Famille Koffi", amount: 50000, method: "Orange Money", date: "29 Mai" },
  { name: "Jean-Pierre N'Guessan", amount: 25000, method: "MTN Money", date: "28 Mai" },
  { name: "Anonymous", amount: 100000, method: "Carte bancaire", date: "28 Mai" },
  { name: "Marie Claire", amount: 15000, method: "Wave", date: "27 Mai" },
]

export default function DonsPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const amounts = [5000, 10000, 25000, 50000, 100000]

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
              <Heart className="w-8 h-8 text-gold" />
              Gestion des Dons
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Contribuez aux projets de votre paroisse
            </p>
          </div>
          <Button variant="outline">
            <Receipt className="w-4 h-4 mr-2" />
            Mes reçus
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-gold" />
                  Faire un don
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Montant du don
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                    {amounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={
                          selectedAmount === amount ? "default" : "outline"
                        }
                        className={
                          selectedAmount === amount ? "cathedral" : ""
                        }
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount(amount.toString())
                        }}
                      >
                        {(amount / 1000).toFixed(0)}K
                      </Button>
                    ))}
                  </div>
                  <Input
                    placeholder="Montant personnalisé (FCFA)"
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                    }}
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Mode de paiement
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-center cursor-pointer ${
                          selectedMethod === method.id
                            ? "border-gold bg-gold/5"
                            : "border-border hover:border-gold/30"
                        }`}
                      >
                        <method.icon
                          className={`w-6 h-6 mx-auto mb-2 ${method.textColor}`}
                        />
                        <span className="text-xs font-medium">{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message (optionnel)
                  </label>
                  <Input placeholder="Ajoutez un message à votre don..." />
                </div>

                {/* Submit */}
                <Button
                  className="w-full cathedral text-lg py-6"
                  disabled={!selectedMethod || !customAmount}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Donner {customAmount ? `${Number(customAmount).toLocaleString()} FCFA` : ""}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Total Donations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="">
                <CardContent className="p-5">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total des dons</p>
                    <p className="text-3xl font-bold font-cathedral text-gold">
                      7 500 000 FCFA
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-emerald" />
                      <span className="text-sm text-emerald font-medium">
                        +18% ce mois
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Donations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Derniers dons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentDonations.map((donation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                      >
                        <div>
                          <p className="text-sm font-medium">{donation.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {donation.method} • {donation.date}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-gold">
                          {donation.amount.toLocaleString()} FCFA
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Campaigns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-cathedral text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-gold" />
            Campagnes en cours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className=" hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-5">
                    <h3 className="font-cathedral font-semibold mb-2">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {campaign.description}
                    </p>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">
                          {campaign.raised.toLocaleString()} FCFA
                        </span>
                        <span className="font-semibold">
                          {campaign.goal.toLocaleString()} FCFA
                        </span>
                      </div>
                      <Progress
                        value={(campaign.raised / campaign.goal) * 100}
                        className="h-3"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{campaign.donors} donateurs</span>
                      <span>Fin: {campaign.endDate}</span>
                    </div>
                    <Button className="w-full mt-4 cathedral" size="sm">
                      <Gift className="w-4 h-4 mr-2" />
                      Contribuer
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
