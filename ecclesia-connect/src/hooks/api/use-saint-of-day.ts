"use client"

import { useState, useEffect } from "react"

interface SaintOfDay {
  name: string
  feast: string
  patronOf?: string
  shortBio: string
}

const saints: SaintOfDay[] = [
  {
    name: "Saint Jean-Baptiste",
    feast: "24 juin",
    patronOf: "des prêtres et des prophètes",
    shortBio: "Le Précurseur, qui prépara les chemins du Seigneur.",
  },
  {
    name: "Saint Pierre et Saint Paul",
    feast: "29 juin",
    patronOf: "de l'Église universelle",
    shortBio: "Les piliers de l'Église, martyrs à Rome.",
  },
  {
    name: "Sainte Marie-Madeleine",
    feast: "22 juillet",
    patronOf: "de la pénitence",
    shortBio: "Témoin fidèle de la Résurrection du Christ.",
  },
  {
    name: "Saint Benoît",
    feast: "11 juillet",
    patronOf: "de l'Europe et des moines",
    shortBio: "Père du monachisme occidental, fondateur de l'ordre de Saint-Benoît.",
  },
  {
    name: "Sainte Thérèse d'Avila",
    feast: "15 octobre",
    patronOf: "des écrivains et des malades",
    shortBio: "Réformatrice carmélite, Docteur de l'Église.",
  },
  {
    name: "Saint François d'Assise",
    feast: "4 octobre",
    patronOf: "des animaux et de l'écologie",
    shortBio: "Le poverello, stigmatisé, patron de l'écologie.",
  },
  {
    name: "Sainte Thérèse de l'Enfant-Jésus",
    feast: "1 octobre",
    patronOf: "des missions et des enfants",
    shortBio: "La petite voie, Docteur de l'Église.",
  },
  {
    name: "Saint Louis de Gonzague",
    feast: "21 juin",
    patronOf: "des jeunes",
    shortBio: "Modèle de pureté et de dévotion mariale.",
  },
  {
    name: "Saint Ignace de Loyola",
    feast: "31 juillet",
    patronOf: "des spiritualités",
    shortBio: "Fondateur des Jésuites, maître de discernement.",
  },
  {
    name: "Sainte Cécile",
    feast: "22 novembre",
    patronOf: "des musiciens et des chorales",
    shortBio: "Patronne de la musique sacrée.",
  },
  {
    name: "Saint Vincent de Paul",
    feast: "27 septembre",
    patronOf: "des œuvres de charité",
    shortBio: "Apôtre de la charité, fondateur des Lazaristes.",
  },
  {
    name: "Saint Martin de Tours",
    feast: "11 novembre",
    patronOf: "des soldats et des pauvres",
    shortBio: "L'évêque qui partagea son manteau avec un mendiant.",
  },
]

export function useSaintOfDay(): SaintOfDay & { loading: boolean } {
  const [saint, setSaint] = useState<SaintOfDay>(saints[0])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        86400000
    )
    setSaint(saints[dayOfYear % saints.length])
    setLoading(false)
  }, [])

  return { ...saint, loading }
}
