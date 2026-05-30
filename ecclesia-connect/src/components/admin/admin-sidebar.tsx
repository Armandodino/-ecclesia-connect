"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Home,
  Megaphone,
  Calendar,
  Cross,
  UsersRound,
  HandHeart,
  Settings,
  ArrowLeft,
  ChevronRight,
  Camera,
} from "lucide-react"
import { cn } from "@/lib/utils"

const adminNav = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/admin/fideles", label: "Fidèles", icon: Users },
  { href: "/admin/familles", label: "Familles", icon: Home },
  { href: "/admin/annonces-admin", label: "Annonces", icon: Megaphone },
  { href: "/admin/evenements", label: "Événements", icon: Calendar },
  { href: "/admin/sacrements-admin", label: "Sacrements", icon: Cross },
  { href: "/admin/groupes", label: "Groupes", icon: UsersRound },
  { href: "/admin/media", label: "Médias", icon: Camera },
  { href: "/admin/dons-admin", label: "Dons", icon: HandHeart },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card/80 backdrop-blur-xl h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-3 h-3" />
          Retour au site
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
            <Settings className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="font-cathedral text-sm font-bold">Administration</p>
            <p className="text-[10px] text-muted-foreground">Panel de contrôle</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {adminNav.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-royal-blue text-white shadow-md"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <motion.div layoutId="adminIndicator" className="w-1.5 h-1.5 rounded-full bg-gold" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </aside>
  )
}
