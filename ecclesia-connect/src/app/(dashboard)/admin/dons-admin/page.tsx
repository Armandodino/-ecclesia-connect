"use client"

import React from "react"
import { motion } from "framer-motion"
import { HandHeart, TrendingUp, Users, Target, ArrowUpRight, Smartphone, CreditCard } from "lucide-react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const stats = [
  { label: "Total collecté", value: "7.5M FCFA", change: "+18%", icon: HandHeart, color: "text-gold-dark", bg: "bg-gold/10" },
  { label: "Donateurs", value: "489", change: "+12%", icon: Users, color: "text-royal-blue", bg: "bg-royal-blue/10" },
  { label: "Campagnes actives", value: "3", change: "0", icon: Target, color: "text-emerald", bg: "bg-emerald/10" },
]

const campaigns = [
  { id: 1, title: "Rénovation toiture", goal: 5000000, raised: 3200000, donors: 156, endDate: "30 Juin" },
  { id: 2, title: "Aide aux démunis", goal: 2000000, raised: 1800000, donors: 234, endDate: "15 Juillet" },
  { id: 3, title: "Nouvel orgue", goal: 10000000, raised: 2500000, donors: 89, endDate: "31 Décembre" },
]

const recentDonations = [
  { name: "Famille Koffi", amount: 50000, method: "Orange Money", date: "29 Mai" },
  { name: "Jean-Pierre N'Guessan", amount: 25000, method: "MTN Money", date: "28 Mai" },
  { name: "Anonymous", amount: 100000, method: "Carte bancaire", date: "28 Mai" },
  { name: "Marie Claire", amount: 15000, method: "Wave", date: "27 Mai" },
  { name: "Bruno Touré", amount: 30000, method: "Orange Money", date: "26 Mai" },
]

export default function DonsAdminPage() {
  return (
    <AdminLayout>
      <div className="space-y-5 sm:space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cathedral text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2 sm:gap-3">
            <HandHeart className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
            Suivi des Dons
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className="">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-bold font-cathedral mt-1">{stat.value}</p>
                      <span className="text-xs text-emerald font-semibold">{stat.change}</span>
                    </div>
                    <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaigns */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-gold" />
                  Campagnes en cours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-3 rounded-xl bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{campaign.title}</p>
                        <Badge variant="secondary" className="text-[10px]">{campaign.donors} donateurs</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{(campaign.raised / 1000000).toFixed(1)}M / {(campaign.goal / 1000000).toFixed(0)}M FCFA</span>
                        <span className="font-semibold">{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                      </div>
                      <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Donations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  Derniers dons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div>
                        <p className="text-sm font-medium">{donation.name}</p>
                        <p className="text-xs text-muted-foreground">{donation.method} • {donation.date}</p>
                      </div>
                      <span className="text-sm font-semibold text-gold-dark">{donation.amount.toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  )
}
