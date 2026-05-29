"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Megaphone,
  Calendar,
  Church,
  Cross,
  Users,
  BookOpen,
  Library,
  HeartHandshake,
  MessageCircle,
  Settings,
  Bot,
  Map,
  BookMarked,
  Clock,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const navigation = [
  { href: "/", label: "Accueil", icon: Home, section: "principal" },
  { href: "/annonces", label: "Annonces", icon: Megaphone, section: "principal" },
  { href: "/calendrier", label: "Calendrier", icon: Calendar, section: "principal" },
  { href: "/messes", label: "Messes", icon: Church, section: "principal" },
  { href: "/sacrements", label: "Sacrements", icon: Cross, section: "vie-eglise" },
  { href: "/mouvements", label: "Mouvements", icon: Users, section: "vie-eglise" },
  { href: "/espace-spirituel", label: "Spirituel", icon: BookOpen, section: "spirituel" },
  { href: "/bibliotheque", label: "Bibliothèque", icon: Library, section: "spirituel" },
  { href: "/dons", label: "Dons", icon: HeartHandshake, section: "communaute" },
  { href: "/social", label: "Communauté", icon: MessageCircle, section: "communaute" },
  { href: "/admin", label: "Administration", icon: Settings, section: "admin" },
  { href: "/ia", label: "Assistant IA", icon: Bot, section: "admin" },
  { href: "/carte-spirituelle", label: "Carte Spirituelle", icon: Map, section: "innovations" },
  { href: "/temoignages", label: "Témoignages", icon: BookMarked, section: "innovations" },
  { href: "/timeline", label: "Ma Timeline", icon: Clock, section: "innovations" },
  { href: "/notifications", label: "Notifications", icon: Bell, section: "admin" },
]

const sections = [
  { id: "principal", label: "Principal" },
  { id: "vie-eglise", label: "Vie de l Église" },
  { id: "spirituel", label: "Spirituel" },
  { id: "communaute", label: "Communauté" },
  { id: "admin", label: "Administration" },
  { id: "innovations", label: "Innovations" },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const groupedNav = sections.map((section) => ({
    ...section,
    items: navigation.filter((item) => item.section === section.id),
  }))

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-border bg-card/80 backdrop-blur-xl flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-royal-blue flex items-center justify-center cathedral-glow">
            <Cross className="w-5 h-5 text-gold" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="font-cathedral text-lg font-bold text-foreground leading-tight">
                  Ecclesia
                </span>
                <span className="text-[10px] text-gold font-semibold tracking-widest uppercase">
                  Connect
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="space-y-1 px-3">
          {groupedNav.map((section) => (
            <div key={section.id} className="mb-2">
              {!collapsed && (
                <button
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === section.id ? null : section.id
                    )
                  }
                  className="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {section.label}
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 transition-transform",
                      expandedSection === section.id && "rotate-180"
                    )}
                  />
                </button>
              )}
              {(collapsed || expandedSection === section.id) && (
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                          isActive
                            ? "bg-royal-blue text-white shadow-md"
                            : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-5 h-5 flex-shrink-0 transition-colors",
                            isActive
                              ? "text-gold"
                              : "text-muted-foreground group-hover:text-gold"
                          )}
                        />
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="truncate"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {isActive && !collapsed && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-gold"
                          />
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User section */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-gold/30">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-gold/10 text-gold font-cathedral text-xs">
              AB
            </AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  Fr. Jean Kouassi
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Curé paroissial
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-accent/10 transition-colors cursor-pointer"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </motion.aside>
  )
}
