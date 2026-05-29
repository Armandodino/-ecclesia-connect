"use client"

import React, { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Printer, Cross } from "lucide-react"
import type { ParchmentData } from "./parchment-announcement"

interface PrintAllParchmentsProps {
  announcements: ParchmentData[]
}

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

function getRomanDate(dateStr: string): string {
  const months: Record<string, string> = {
    Janvier: "IANVARIVS", Février: "FEBRVARIVS", Mars: "MARTIVS",
    Avril: "APRILIS", Mai: "MAIVS", Juin: "IVNIVS",
    Juillet: "IVLIVS", Août: "AVGVSTVS", Septembre: "SEPTEMBER",
    Octobre: "OCTOBER", Novembre: "NOVEMBER", Décembre: "DECEMBER",
  }
  const parts = dateStr.split(" ")
  const day = parts[0] ? toRoman(parseInt(parts[0])) : ""
  const month = months[parts[1]] || ""
  const year = parts[2] || "MMXXVI"
  return `${day} ${month} ${year}`
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

export function PrintAllParchments({ announcements }: PrintAllParchmentsProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="parchment-print-area" ref={printRef}>
        {/* Print-only cover page */}
        <div className="print-only">
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-royal-blue/10 flex items-center justify-center mx-auto mb-6">
              <Cross className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-cathedral text-3xl text-royal-blue-dark font-bold tracking-wider mb-2">
              ECCLESIA CONNECT
            </h1>
            <p className="font-cathedral text-sm tracking-[0.3em] text-stone-gray uppercase">
              Paroisse Sainte-Thérèse d'Abidjan
            </p>
            <p className="text-xs text-stone-gray mt-1">
              Archidiocèse d'Abidjan • Quartier Cocody
            </p>
            <div className="ornamental-rule my-8" />
            <p className="font-cathedral text-lg text-royal-blue-dark">
              Annonces Paroissiales
            </p>
            <p className="text-xs text-stone-gray mt-2">
              {new Date().toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="fleur-separator mt-8">
              ❦ ❦ ❦
            </div>
          </div>
        </div>

        {/* Individual parchments */}
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className={`parchment parchment-corners illuminated-border ${index > 0 ? 'mt-8' : ''}`}
            style={{ pageBreakInside: "avoid" }}
          >
            <div className="relative z-[2] p-5 sm:p-8">
              {/* Seal */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="wax-seal">
                    <Cross className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-stone-gray uppercase font-cathedral">
                      {typeLatin[announcement.type] || "ANNVNTIATIO"}
                    </p>
                    <p className="text-xs text-stone-dark font-medium mt-0.5">
                      {announcement.typeLabel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Roman Date */}
              <div className="text-center mb-6">
                <p className="font-cathedral text-lg text-royal-blue font-bold tracking-wider">
                  {getRomanDate(announcement.date)}
                </p>
                <p className="text-xs text-stone-gray mt-1">
                  {announcement.date}
                </p>
              </div>

              <div className="ornamental-rule" />

              {/* Title */}
              <h2 className="font-cathedral text-xl sm:text-2xl text-center text-royal-blue-dark font-bold mb-4 leading-tight">
                {announcement.title}
              </h2>

              {/* Author */}
              <p className="text-xs text-stone-gray text-center mb-6">
                {announcement.author} • {announcement.authorRole}
              </p>

              <div className="ornamental-rule" />

              {/* Content */}
              <div className="my-6">
                <p className="manuscript-text drop-cap font-serif-elegant text-sm sm:text-base text-royal-blue-dark leading-relaxed">
                  {announcement.content}
                </p>
              </div>

              <div className="fleur-separator">
                ❦ ❦ ❦
              </div>

              <div className="text-center mt-4">
                <p className="text-[10px] tracking-[0.2em] text-stone-gray uppercase font-cathedral">
                  Ad Maiorem Dei Gloriam
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Print-only footer */}
        <div className="print-only text-center mt-8 pt-4 border-t border-stone-gray/20">
          <p className="text-[9px] text-stone-gray">
            Ecclesia Connect • Plateforme numérique paroissiale • www.ecclesia-connect.com
          </p>
          <p className="text-[8px] text-stone-gray mt-1">
            {announcements.length} annonce(s) • Document généré le {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>

      {/* Print button - no print */}
      <Button
        onClick={handlePrint}
        variant="outline"
        className="no-print"
      >
        <Printer className="w-4 h-4 mr-2" />
        Tout imprimer ({announcements.length})
      </Button>
    </>
  )
}
