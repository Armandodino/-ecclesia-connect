"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Map,
  Home,
  Users,
  Church,
  MapPin,
  ZoomIn,
  ZoomOut,
  Layers,
  Filter,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const sectors = [
  { name: "Zone Cocody", families: 85, color: "#1E3A5F" },
  { name: "Zone Marcory", families: 72, color: "#D4AF37" },
  { name: "Zone Yopougon", families: 68, color: "#5B2C8E" },
  { name: "Zone Abobo", families: 55, color: "#6B2D5B" },
  { name: "Zone Plateau", families: 32, color: "#1B5E20" },
]

const groups = [
  { name: "Chorale", members: 45, position: { x: 30, y: 40 } },
  { name: "JEC", members: 60, position: { x: 60, y: 25 } },
  { name: "Légion de Marie", members: 30, position: { x: 45, y: 60 } },
  { name: "Groupe de Prière", members: 50, position: { x: 75, y: 50 } },
]

export default function CarteSpirituellePage() {
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
              <Map className="w-8 h-8 text-gold" />
              Carte Spirituelle
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Visualisation géographique de la paroisse
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline">
              <Layers className="w-4 h-4 mr-2" />
              Couches
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className=" overflow-hidden">
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-to-br from-royal-blue/5 to-gold/5">
                {/* Simulated map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Church marker */}
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <div className="p-3 rounded-full bg-gold shadow-lg cathedral-glow">
                        <Church className="w-8 h-8 text-royal-blue" />
                      </div>
                      <p className="text-xs font-semibold text-center mt-1 bg-card px-2 py-1 rounded shadow">
                        Église Sainte-Thérèse
                      </p>
                    </div>

                    {/* Sector markers */}
                    {sectors.map((sector, index) => {
                      const positions = [
                        { top: "20%", left: "25%" },
                        { top: "70%", left: "20%" },
                        { top: "30%", left: "70%" },
                        { top: "75%", left: "75%" },
                        { top: "45%", left: "45%" },
                      ]
                      return (
                        <div
                          key={index}
                          className="absolute z-10"
                          style={positions[index]}
                        >
                          <div
                            className="w-16 h-16 rounded-full opacity-30 animate-pulse"
                            style={{ backgroundColor: sector.color }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-card rounded-lg px-2 py-1 shadow-md text-center">
                              <p className="text-xs font-semibold">{sector.families}</p>
                              <p className="text-[9px] text-muted-foreground">familles</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    {/* Group markers */}
                    {groups.map((group, index) => (
                      <div
                        key={index}
                        className="absolute z-10"
                        style={{
                          top: `${group.position.y}%`,
                          left: `${group.position.x}%`,
                        }}
                      >
                        <div className="bg-card rounded-lg px-2 py-1 shadow-md flex items-center gap-1">
                          <Users className="w-3 h-3 text-royal-blue" />
                          <span className="text-xs font-medium">{group.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sectors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Secteurs pastoraux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sectors.map((sector, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sector.color }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{sector.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {sector.families} familles
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Groups */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Groupes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groups.map((group, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                      >
                        <div className="p-2 rounded-lg bg-royal-blue/10">
                          <Users className="w-4 h-4 text-royal-blue" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{group.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {group.members} membres
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="">
                <CardContent className="p-5">
                  <div className="text-center">
                    <p className="text-3xl font-bold font-cathedral text-gold">
                      312
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Familles dans la paroisse
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
