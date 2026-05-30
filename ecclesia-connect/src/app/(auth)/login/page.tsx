"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Cross, Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const success = await login(email, password)
    if (success) {
      router.push("/admin")
    } else {
      setError("Email ou mot de passe incorrect")
    }
    setLoading(false)
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
              &ldquo;Que la lumière de Christ éclaire votre chemin&rdquo;
            </p>
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
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="w-16 h-16 rounded-2xl bg-royal-blue flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Cross className="w-8 h-8 text-gold" />
              </div>
            </Link>
            <h1 className="font-cathedral text-2xl font-bold">Ecclesia Connect</h1>
          </div>

          <div className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4">
              ← Retour à l&apos;accueil
            </Link>
            <h2 className="font-cathedral text-2xl font-bold mb-2">
              Connexion
            </h2>
            <p className="text-muted-foreground mb-6">
              Accédez à votre espace paroissial
            </p>

            {/* Demo credentials */}
            <div className="mb-4 p-3 rounded-xl bg-royal-blue/5 border border-royal-blue/10">
              <p className="text-xs font-semibold text-royal-blue mb-1">Comptes de démonstration :</p>
              <p className="text-xs text-muted-foreground">
                <strong>Admin :</strong> admin@ecclesia-connect.com / admin123
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>Membre :</strong> marie@ecclesia-connect.com / membre123
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                className="w-full bg-royal-blue text-white hover:bg-royal-blue-light font-semibold text-base py-6"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Pas encore de compte?{" "}
              <Link href="/register" className="text-gold hover:underline font-semibold">
                S&apos;inscrire
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
