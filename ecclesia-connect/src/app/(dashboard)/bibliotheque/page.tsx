"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Library,
  Search,
  BookOpen,
  FileText,
  Heart,
  Bookmark,
  ChevronRight,
  Filter,
  Star,
  Clock,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { id: "bible", label: "Bible", icon: BookOpen, count: 73 },
  { id: "catechisme", label: "Catéchisme", icon: FileText, count: 12 },
  { id: "encycliques", label: "Encycliques", icon: FileText, count: 28 },
  { id: "vatican", label: "Documents du Vatican", icon: FileText, count: 45 },
  { id: "prieres", label: "Prières", icon: Heart, count: 150 },
  { id: "neuvaines", label: "Neuvaines", icon: Clock, count: 24 },
]

const books = [
  {
    id: 1,
    title: "La Sainte Bible",
    subtitle: "Traduction Œcuménique",
    category: "bible",
    chapters: 1189,
    progress: 35,
    lastRead: "Genèse 15",
  },
  {
    id: 2,
    title: "Catéchisme de l'Église Catholique",
    subtitle: "Compendium",
    category: "catechisme",
    chapters: 2866,
    progress: 12,
    lastRead: "Article 2",
  },
  {
    id: 3,
    title: "Laudato Si'",
    subtitle: "Encyclique du Pape François",
    category: "encycliques",
    chapters: 216,
    progress: 68,
    lastRead: "Chapitre 4",
  },
  {
    id: 4,
    title: "Evangelii Gaudium",
    subtitle: "L'joie de l'Évangile",
    category: "encycliques",
    chapters: 288,
    progress: 45,
    lastRead: "Chapitre 2",
  },
  {
    id: 5,
    title: "Le Rosaire",
    subtitle: "Guide complet du rosaire",
    category: "prieres",
    chapters: 20,
    progress: 80,
    lastRead: "Glorieux",
  },
  {
    id: 6,
    title: "Neuvaine à la Sainte Vierge",
    subtitle: "Prières de 9 jours",
    category: "neuvaines",
    chapters: 9,
    progress: 100,
    lastRead: "Jour 9",
  },
]

const prayers = [
  { title: "Notre Père", category: "Prière fondamentale" },
  { title: "Je vous salue Marie", category: "Prière fondamentale" },
  { title: "Gloire au Père", category: "Prière fondamentale" },
  { title: "Chapelet des douleurs", category: "Prières mariales" },
  { title: "Acte de contrition", category: "Prière de pénitence" },
  { title: "Prière de saint François", category: "Prière de confiance" },
]

export default function BibliothequePage() {
  const [searchQuery, setSearchQuery] = useState("")

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
              <Library className="w-8 h-8 text-gold" />
              Bibliothèque Catholique
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Textes sacrés, encycliques et prières
            </p>
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
              placeholder="Rechercher dans la bibliothèque..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <category.icon className="w-6 h-6 text-royal-blue mx-auto mb-2 group-hover:text-gold transition-colors" />
                  <p className="text-sm font-medium">{category.label}</p>
                  <p className="text-xs text-muted-foreground">{category.count} textes</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="library" className="space-y-4">
          <TabsList>
            <TabsTrigger value="library">Ma Bibliothèque</TabsTrigger>
            <TabsTrigger value="prayers">Prières</TabsTrigger>
            <TabsTrigger value="favorites">Favoris</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="glass hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-3 rounded-xl bg-royal-blue/10">
                          <BookOpen className="w-6 h-6 text-royal-blue" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="font-cathedral font-semibold mb-1 group-hover:text-royal-blue transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {book.subtitle}
                      </p>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-semibold">{book.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold rounded-full transition-all duration-500"
                            style={{ width: `${book.progress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Dernière lecture: {book.lastRead}
                      </p>
                      <Button variant="outline" className="w-full mt-3" size="sm">
                        Continuer la lecture
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prayers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prayers.map((prayer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="glass hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-wine-red/10">
                        <Heart className="w-5 h-5 text-wine-red" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{prayer.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {prayer.category}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <Card className="glass">
              <CardContent className="p-8 text-center">
                <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-cathedral font-semibold mb-2">
                  Aucun favori pour le moment
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ajoutez des livres à vos favoris pour les retrouver facilement
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
