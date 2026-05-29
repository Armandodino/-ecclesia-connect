"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  MessageCircle,
  Send,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image,
  Video,
  Smile,
  AtSign,
  Plus,
  Users,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const posts = [
  {
    id: 1,
    author: { name: "Fr. Jean Kouassi", role: "Curé" },
    content:
      "Chers fidèles, je vous invite à la fête patronale de notre paroisse le 15 juin. Ce sera un moment de joie et de communion fraternelle. Que Dieu vous bénisse!",
    time: "Il y a 2 heures",
    likes: 45,
    comments: 12,
    shares: 8,
  },
  {
    id: 2,
    author: { name: "Marie Claire Brou", role: "Chorale" },
    content:
      "Notre chorale se prépare pour le concert de Noël! 🎵 Nous cherchons de nouveaux membres. Si vous aimez le chant, rejoignez-nous le samedi à 15h!",
    time: "Il y a 5 heures",
    likes: 32,
    comments: 8,
    shares: 5,
  },
  {
    id: 3,
    author: { name: "Jean-Pierre N'Guessan", role: "JEC" },
    content:
      "Retraite spirituelle réussie pour les jeunes de la JEC! Merci à tous les participants et à Fr. Paul pour son accompagnement. 🙏",
    time: "Hier",
    likes: 67,
    comments: 15,
    shares: 12,
  },
  {
    id: 4,
    author: { name: "Catherine Aka", role: "Fidèle" },
    content:
      "Action de grâce pour la naissance de ma fille Marie-Solange! Merci pour vos prières et vos vœux. Que Dieu vous bénisse tous. ❤️",
    time: "Il y a 2 jours",
    likes: 89,
    comments: 24,
    shares: 6,
  },
]

const onlineUsers = [
  { name: "Fr. Jean", status: "En ligne" },
  { name: "Marie Claire", status: "En ligne" },
  { name: "Jean-Pierre", status: "Il y a 5 min" },
  { name: "Catherine", status: "Il y a 15 min" },
]

export default function SocialPage() {
  const [newPost, setNewPost] = useState("")

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
              <MessageCircle className="w-8 h-8 text-gold" />
              Communauté
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Partagez et échangez avec votre paroisse
            </p>
          </div>
          <Button className="cathedral">
            <Users className="w-4 h-4 mr-2" />
            Groupes
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* New Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gold/10 text-gold font-cathedral text-xs">
                        AB
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Partagez quelque chose avec la communauté..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[80px] resize-none border-none bg-muted/30 focus:bg-muted/50 transition-colors"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Image className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Video className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Smile className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button className="cathedral" size="sm">
                          <Send className="w-4 h-4 mr-1" />
                          Publier
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Posts */}
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="glass">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-royal-blue/10 text-royal-blue font-cathedral text-xs">
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {post.author.role} • {post.time}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="mt-3 text-foreground leading-relaxed">
                          {post.content}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
                          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-wine-red transition-colors cursor-pointer">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-royal-blue transition-colors cursor-pointer">
                            <MessageCircle className="w-4 h-4" />
                            {post.comments}
                          </button>
                          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors cursor-pointer">
                            <Share2 className="w-4 h-4" />
                            {post.shares}
                          </button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto"
                          >
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Online Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">En ligne</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {onlineUsers.map((user, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gold/10 text-gold font-cathedral text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald rounded-full border-2 border-card" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Actions rapides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Messagerie privée
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Mes groupes
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer un groupe
                    </Button>
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
