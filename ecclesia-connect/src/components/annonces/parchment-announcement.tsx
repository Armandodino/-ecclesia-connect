"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { Printer, Download, X, Calendar, MapPin, User, Cross } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export interface ParchmentData {
  id: string
  title: string
  content: string
  type: string
  typeLabel: string
  author: string
  authorRole: string
  date: string
  location?: string
  isPinned?: boolean
}

interface ParchmentAnnouncementProps {
  data: ParchmentData
  isOpen: boolean
  onClose: () => void
}

const typeSealColors: Record<string, string> = {
  general: "linear-gradient(135deg, #1E3A5F 0%, #142840 100%)",
  deces: "linear-gradient(135deg, #5C5854 0%, #3C3A38 100%)",
  mariage: "linear-gradient(135deg, #6B2D5B 0%, #4A1F3F 100%)",
  bapteme: "linear-gradient(135deg, #1E3A5F 0%, #2A5082 100%)",
  confirmation: "linear-gradient(135deg, #5B2C8E 0%, #3D1E5E 100%)",
  pelerinage: "linear-gradient(135deg, #B8962E 0%, #8B7220 100%)",
  collecte: "linear-gradient(135deg, #1B5E20 0%, #145218 100%)",
  reunion: "linear-gradient(135deg, #1E3A5F 0%, #2A5082 100%)",
}

const typeLatin: Record<string, string> = {
  general: "ANNVNTIATIO",
  deces: "DECESSVS",
  mariage: "MATRIMONIVM",
  bapteme: "BAPTISMVS",
  confirmation: "CONFIRMATIO",
  pelerinage: "PEREGRINATIO",
  collecte: "COLLECTA",
  reunion: "CONVENTVS",
}

function getDayName(dateStr: string): string {
  const months: Record<string, string> = {
    Janvier: "01", Février: "02", Mars: "03", Avril: "04",
    Mai: "05", Juin: "06", Juillet: "07", Août: "08",
    Septembre: "09", Octobre: "10", Novembre: "11", Décembre: "12",
  }
  const parts = dateStr.split(" ")
  if (parts.length >= 3) {
    const day = parts[0]
    const month = months[parts[1]] || "01"
    const year = parts[2]
    const date = new Date(`${year}-${month}-${day}`)
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    return days[date.getDay()]
  }
  return ""
}

function getRomanMonth(dateStr: string): string {
  const romanMonths: Record<string, string> = {
    Janvier: "IANVARIVS", Février: "FEBRVARIVS", Mars: "MARTIVS",
    Avril: "APRILIS", Mai: "MAIVS", Juin: "IVNIVS",
    Juillet: "IVLIVS", Août: "AVGVSTVS", Septembre: "SEPTEMBER",
    Octobre: "OCTOBER", Novembre: "NOVEMBER", Décembre: "DECEMBER",
  }
  const parts = dateStr.split(" ")
  return romanMonths[parts[1]] || parts[1]?.toUpperCase() || ""
}

export function ParchmentAnnouncement({
  data,
  isOpen,
  onClose,
}: ParchmentAnnouncementProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const dayName = getDayName(data.date)
  const romanMonth = getRomanMonth(data.date)
  const parts = data.date.split(" ")
  const romanDay = parts[0] ? toRoman(parseInt(parts[0])) : ""
  const year = parts[2] || "MMXXVI"

  function toRoman(num: number): string {
    const romanNumerals: [number, string][] = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
    ]
    let result = ""
    for (const [value, numeral] of romanNumerals) {
      while (num >= value) {
        result += numeral
        num -= value
      }
    }
    return result
  }

  return (
    <>
      {/* Screen Dialog */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-transparent border-none shadow-none">
          <div className="parchment-print-area" ref={printRef}>
            {/* Print-only header */}
            <div className="print-only text-center mb-6">
              <p className="text-xs tracking-[0.3em] text-stone-gray uppercase font-cathedral">
                Paroisse Sainte-Thérèse d'Abidjan
              </p>
              <p className="text-[10px] text-stone-gray mt-1">
                Archidiocèse d'Abidjan • Quartier Cocody
              </p>
            </div>

            {/* The Parchment */}
            <div className="parchment parchment-corners illuminated-border relative">
              {/* Close button - no print */}
              <button
                onClick={onClose}
                className="no-print absolute top-3 right-3 z-10 p-1.5 rounded-full bg-stone-gray/10 hover:bg-stone-gray/20 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-stone-gray" />
              </button>

              <div className="relative z-[2] p-5 sm:p-8">
                {/* Wax Seal + Type */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="wax-seal"
                      style={{ background: typeSealColors[data.type] || typeSealColors.general }}
                    >
                      <Cross className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-stone-gray uppercase font-cathedral">
                        {typeLatin[data.type] || "ANNVNTIATIO"}
                      </p>
                      <p className="text-xs text-stone-dark font-medium mt-0.5">
                        {data.typeLabel}
                      </p>
                    </div>
                  </div>
                  {data.isPinned && (
                    <Badge className="bg-gold/20 text-gold-dark border-gold/30 text-[10px] no-print">
                      Épinglée
                    </Badge>
                  )}
                </div>

                {/* Liturgical Date Header */}
                <div className="liturgical-header mb-4">
                  <p className="font-cathedral text-xs tracking-[0.3em] text-stone-gray uppercase">
                    {dayName}
                  </p>
                </div>

                {/* Roman Date */}
                <div className="text-center mb-6">
                  <p className="font-cathedral text-lg sm:text-xl text-royal-blue font-bold tracking-wider">
                    {romanDay} {romanMonth} {year}
                  </p>
                  <p className="text-xs text-stone-gray mt-1">
                    {data.date}
                  </p>
                </div>

                {/* Ornamental Rule */}
                <div className="ornamental-rule" />

                {/* Title - Gothic style */}
                <h2 className="font-cathedral text-xl sm:text-2xl lg:text-3xl text-center text-royal-blue-dark font-bold mb-4 leading-tight">
                  {data.title}
                </h2>

                {/* Author */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <User className="w-3 h-3 text-stone-gray" />
                  <p className="text-xs text-stone-gray">
                    {data.author} • {data.authorRole}
                  </p>
                </div>

                {/* Ornamental Rule */}
                <div className="ornamental-rule" />

                {/* Content - Manuscript style with drop cap */}
                <div className="parchment-scroll my-6">
                  <p className="manuscript-text drop-cap font-serif-elegant text-sm sm:text-base text-royal-blue-dark leading-relaxed">
                    {data.content}
                  </p>
                </div>

                {/* Location if present */}
                {data.location && (
                  <div className="flex items-center justify-center gap-2 mt-4 mb-2">
                    <MapPin className="w-3 h-3 text-stone-gray" />
                    <p className="text-xs text-stone-gray italic">
                      {data.location}
                    </p>
                  </div>
                )}

                {/* Fleur separator */}
                <div className="fleur-separator">
                  ❦ ❦ ❦
                </div>

                {/* Signature area */}
                <div className="text-center mt-4">
                  <p className="text-[10px] tracking-[0.2em] text-stone-gray uppercase font-cathedral">
                    Ad Maiorem Dei Gloriam
                  </p>
                  <p className="text-[9px] text-stone-gray mt-2 italic">
                    Fait à la Paroisse Sainte-Thérèse d'Abidjan
                  </p>
                </div>
              </div>
            </div>

            {/* Print-only footer */}
            <div className="print-only text-center mt-6 pt-4 border-t border-stone-gray/20">
              <p className="text-[9px] text-stone-gray">
                Ecclesia Connect • Plateforme numérique paroissiale • www.ecclesia-connect.com
              </p>
              <p className="text-[8px] text-stone-gray mt-1">
                Document généré le {new Date().toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Action buttons - no print */}
          <div className="no-print flex items-center justify-center gap-3 mt-4 pb-4">
            <Button
              onClick={handlePrint}
              className="cathedral"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer le parchemin
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
            >
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
