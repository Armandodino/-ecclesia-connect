"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  MessageCircle,
  Lightbulb,
  HelpCircle,
  History,
} from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const suggestedQuestions = [
  "Quelle est la signification du sacrement de baptême?",
  "Explique-moi le mystère de la Trinité",
  "Que dit la Bible sur le pardon?",
  "Comment préparer une homélie sur la miséricorde?",
  "Raconte-moi l'histoire de sainte Thérèse d'Avila",
]

const conversationHistory = [
  {
    role: "user",
    content: "Qu'est-ce que le sacrement de l'Eucharistie?",
  },
  {
    role: "assistant",
    content:
      "L'Eucharistie est le sacrement par lequel le Christ se donne lui-même sous les espaces du pain et du vin. C'est le « sacrement des sacrements », car il contient le Christ lui-même, sa chair et son sang.\n\nDans l'Eucharistie, nous recevons :\n- Le Corps du Christ (le pain consacré)\n- Le Sang du Christ (le vin consacré)\n\nC'est un mystère de foi : le pain et le vin deviennent véritablement le Corps et le Sang du Christ, tout en conservant leurs apparences sensibles. C'est ce qu'on appelle la transsubstantiation.\n\nL'Eucharistie est:\n1. Un sacrifice (rend présent le sacrifice du Calvaire)\n2. Un repas (communion avec le Christ et les frères)\n3. Un sacrement (présence réelle du Christ)\n\n« Faites ceci en mémoire de moi » (Luc 22:19)",
  },
  {
    role: "user",
    content: "Comment puis-je approfondir ma vie eucharistique?",
  },
  {
    role: "assistant",
    content:
      "Voici quelques pistes pour approfondir votre vie eucharistique :\n\n1. **Préparation avant la messe**\n   - Priez avant la célébration\n   - Lisez les lectures du jour\n   - Préparez votre cœur par un examen de conscience\n\n2. **Pendant la messe**\n   - Participez activement aux chants et prières\n   - Méditez les paroles de l'homélie\n   - Approchez-vous de la communion avec foi\n\n3. **Après la messe**\n   - Prolongez votre temps de prière\n   - Méditez la présence du Christ en vous\n   - Mettez en pratique les enseignements reçus\n\n4. **Adoration du Saint-Sacrement**\n   - Venez adorer le Christ présent dans l'Eucharistie\n   - Accordez-vous un moment de silence et de prière\n\n5. **Communion spirituelle**\n   - En dehors de la messe, faites des actes de communion spirituelle\n   - « Mon Jésus, je crois que Vous êtes vraiment présent dans l'ostie sainte... »",
  },
]

export default function IaPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(conversationHistory)

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([
      ...messages,
      { role: "user", content: message },
      {
        role: "assistant",
        content:
          "Merci pour votre question. Je suis en train de réfléchir à une réponse complète pour vous aider dans votre parcours de foi. Un instant s'il vous plaît...",
      },
    ])
    setMessage("")
  }

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
              <Bot className="w-8 h-8 text-gold" />
              Assistant IA Catholique
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Votre compagnon pour approfondir la foi
            </p>
          </div>
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" />
            Historique
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="glass h-[50vh] sm:h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback
                        className={
                          msg.role === "assistant"
                            ? "bg-gold/10 text-gold font-cathedral text-xs"
                            : "bg-royal-blue/10 text-royal-blue font-cathedral text-xs"
                        }
                      >
                        {msg.role === "assistant" ? "IA" : "VO"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === "assistant"
                          ? "bg-muted/30 text-foreground"
                          : "bg-royal-blue text-white"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Posez votre question sur la foi..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button
                    className="cathedral"
                    onClick={handleSend}
                    disabled={!message.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggested Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-gold" />
                    Questions suggérées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(question)}
                        className="w-full text-left p-3 rounded-xl bg-muted/30 hover:bg-muted/50 text-sm transition-colors cursor-pointer"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    Capacités
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { icon: BookOpen, label: "Réponses sur la foi" },
                      { icon: HelpCircle, label: "Explication des lectures" },
                      { icon: MessageCircle, label: "Aide aux homélies" },
                      { icon: Sparkles, label: "Génération de prières" },
                    ].map((capability, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-sm"
                      >
                        <capability.icon className="w-4 h-4 text-gold" />
                        {capability.label}
                      </div>
                    ))}
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
