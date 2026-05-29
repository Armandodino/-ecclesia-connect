"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Cross, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex cross-pattern">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden stained-glass items-center justify-center">
        <div className="relative z-10 text-center text-white px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
              <Cross className="w-12 h-12 text-gold" />
            </div>
            <h1 className="font-cathedral text-5xl font-bold mb-4">
              Ecclesia Connect
            </h1>
            <p className="text-white/80 text-xl font-serif-elegant italic">
              &ldquo;Rejoignez la communauté de foi&rdquo;
            </p>
            <div className="mt-8 space-y-4 text-left text-white/70">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span>Consultez les annonces paroissiales</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span>Suivez les événements et messes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span>Participez à la vie spirituelle</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-royal-blue flex items-center justify-center mx-auto mb-4 cathedral-glow">
              <Cross className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-cathedral text-2xl font-bold">Ecclesia Connect</h1>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4">
              ← Retour à l&apos;accueil
            </Link>
            <h2 className="font-cathedral text-2xl font-bold mb-2">
              Inscription
            </h2>
            <p className="text-muted-foreground mb-6">
              Créez votre compte paroissial
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Jean-Pierre Dupont"
                    className="pl-10"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+225 07 XX XX XX XX"
                    className="pl-10"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={form.password}
                    onChange={(e) => updateForm("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateForm("confirmPassword", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 rounded border-border" />
                <span className="text-muted-foreground">
                  J&apos;accepte les{" "}
                  <Link href="#" className="text-gold hover:underline">
                    conditions d&apos;utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="#" className="text-gold hover:underline">
                    politique de confidentialité
                  </Link>
                </span>
              </div>

              <Button className="w-full cathedral text-base py-6" type="submit">
                Créer mon compte
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Déjà un compte?{" "}
              <Link
                href="/login"
                className="text-gold hover:underline font-semibold"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
