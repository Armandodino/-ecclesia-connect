"use client"

import { useState, useEffect } from "react"

interface BibleVerse {
  reference: string
  text: string
  translation: string
}

const fallbackVerses: BibleVerse[] = [
  {
    reference: "Jean 3, 16",
    text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
    translation: "LSG",
  },
  {
    reference: "Psaume 23, 1-3",
    text: "L'Éternel est mon berger : je ne manquerai de rien. Il me fait reposer dans de verts pâturages, il me conduit au bord des eaux tranquilles.",
    translation: "LSG",
  },
  {
    reference: "Philippiens 4, 13",
    text: "Je puis tout par celui qui me fortifie.",
    translation: "LSG",
  },
  {
    reference: "Romains 8, 28",
    text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu.",
    translation: "LSG",
  },
  {
    reference: "Matthieu 11, 28",
    text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
    translation: "LSG",
  },
  {
    reference: "Jérémie 29, 11",
    text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.",
    translation: "LSG",
  },
  {
    reference: "1 Corinthiens 13, 4-7",
    text: "L'amour est patient, il est bienveillant ; l'amour ne jalouse pas, il ne fait pas ostentation, il ne s'enorgueillit pas.",
    translation: "LSG",
  },
]

export function useDailyVerse(): BibleVerse & { loading: boolean } {
  const [verse, setVerse] = useState<BibleVerse>(fallbackVerses[0])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use day of year to cycle through verses
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        86400000
    )
    setVerse(fallbackVerses[dayOfYear % fallbackVerses.length])
    setLoading(false)
  }, [])

  return { ...verse, loading }
}
