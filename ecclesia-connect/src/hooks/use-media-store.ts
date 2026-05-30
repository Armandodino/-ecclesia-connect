"use client"

import { useState, useEffect, useCallback } from "react"

export interface MediaItem {
  id: string
  type: "image" | "video"
  src: string
  thumbnail?: string
  title: string
  description: string
  category: string
  date: string
  location?: string
  author: string
  likes: number
  duration?: string
  fileName: string
  fileSize: number
  uploadedAt: string
}

const STORAGE_KEY = "ecclesia-media"

const defaultMedia: MediaItem[] = [
  {
    id: "1",
    type: "image",
    src: "",
    title: "Messe solennelle de Pâques",
    description: "Célébration de la Résurrection du Seigneur avec la chorale paroissiale",
    category: "Célébrations",
    date: "20 Avril 2026",
    location: "Église Sainte-Thérèse",
    author: "Fr. Jean Kouassi",
    likes: 89,
    fileName: "paques-2026.jpg",
    fileSize: 2400000,
    uploadedAt: "2026-04-20T10:00:00Z",
  },
  {
    id: "2",
    type: "image",
    src: "",
    title: "Retraite spirituelle des jeunes",
    description: "Week-end de retreat au Centre Marialis de Bingerville",
    category: "Jeunesse",
    date: "12 Mai 2026",
    location: "Bingerville",
    author: "Mme Aïcha Diallo",
    likes: 67,
    fileName: "retraite-jeunes.jpg",
    fileSize: 1800000,
    uploadedAt: "2026-05-14T15:30:00Z",
  },
  {
    id: "3",
    type: "video",
    src: "",
    title: "Chorale Sainte-Cécile en concert",
    description: "Performance de la chorale lors du concert de Noël 2025",
    category: "Musique",
    date: "25 Décembre 2025",
    duration: "4:32",
    author: "Florence Kouamé",
    likes: 124,
    fileName: "chorale-noel.mp4",
    fileSize: 45000000,
    uploadedAt: "2025-12-26T09:00:00Z",
  },
  {
    id: "4",
    type: "image",
    src: "",
    title: "Baptême de la promotion 2026",
    description: "15 nouveau-nés ont reçu le sacrement de baptême",
    category: "Sacrements",
    date: "25 Mai 2026",
    location: "Église Sainte-Thérèse",
    author: "Fr. Jean Kouassi",
    likes: 156,
    fileName: "bapteme-2026.jpg",
    fileSize: 3200000,
    uploadedAt: "2026-05-25T14:00:00Z",
  },
  {
    id: "5",
    type: "image",
    src: "",
    title: "Pèlerinage à Yamasan",
    description: "Le sanctuaire marian de Yamasan accueille les pèlerins ivoiriens",
    category: "Pèlerinages",
    date: "15 Août 2025",
    location: "Yamasan",
    author: "Mme Catherine N'Guessan",
    likes: 203,
    fileName: "yamasan-2025.jpg",
    fileSize: 4100000,
    uploadedAt: "2025-08-16T08:00:00Z",
  },
  {
    id: "6",
    type: "video",
    src: "",
    title: "Vépres du dimanche",
    description: "Célébration des vêpres en musique avec la communauté",
    category: "Célébrations",
    date: "22 Mai 2026",
    duration: "28:15",
    author: "Fr. Bernard Koffi",
    likes: 45,
    fileName: "vepres-dimanche.mp4",
    fileSize: 89000000,
    uploadedAt: "2026-05-22T18:30:00Z",
  },
  {
    id: "7",
    type: "image",
    src: "",
    title: "Fête patronale 2025",
    description: "La communauté réunie pour la fête de Sainte-Thérèse",
    category: "Communauté",
    date: "1 Octobre 2025",
    location: "Cour de l'église",
    author: "Bruno Touré",
    likes: 178,
    fileName: "fete-patronale.jpg",
    fileSize: 5600000,
    uploadedAt: "2025-10-02T12:00:00Z",
  },
  {
    id: "8",
    type: "image",
    src: "",
    title: "Catéchisme des enfants",
    description: "Les enfants apprennent les fondements de la foi",
    category: "Formation",
    date: "28 Mai 2026",
    location: "Salle Saint-Joseph",
    author: "Mme Thérèse Brou",
    likes: 92,
    fileName: "catechisme.jpg",
    fileSize: 2100000,
    uploadedAt: "2026-05-28T16:00:00Z",
  },
  {
    id: "9",
    type: "video",
    src: "",
    title: "Procession du Corpus Domini",
    description: "La procession eucharistique dans les rues du quartier",
    category: "Célébrations",
    date: "22 Juin 2026",
    duration: "12:45",
    author: "Fr. Jean Kouassi",
    likes: 134,
    fileName: "corpus-domini.mp4",
    fileSize: 67000000,
    uploadedAt: "2026-06-22T10:00:00Z",
  },
]

export function useMediaStore() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setMedia(JSON.parse(stored))
      } else {
        setMedia(defaultMedia)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMedia))
      }
    } catch {
      setMedia(defaultMedia)
    }
    setLoaded(true)
  }, [])

  const save = useCallback((items: MediaItem[]) => {
    setMedia(items)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [])

  const addMedia = useCallback(
    (item: Omit<MediaItem, "id" | "uploadedAt" | "likes">) => {
      const newItem: MediaItem = {
        ...item,
        id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
        likes: 0,
        uploadedAt: new Date().toISOString(),
      }
      save([newItem, ...media])
      return newItem
    },
    [media, save]
  )

  const deleteMedia = useCallback(
    (id: string) => {
      save(media.filter((m) => m.id !== id))
    },
    [media, save]
  )

  const updateMedia = useCallback(
    (id: string, updates: Partial<MediaItem>) => {
      save(media.map((m) => (m.id === id ? { ...m, ...updates } : m)))
    },
    [media, save]
  )

  const likeMedia = useCallback(
    (id: string) => {
      save(
        media.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
      )
    },
    [media, save]
  )

  return { media, loaded, addMedia, deleteMedia, updateMedia, likeMedia }
}
