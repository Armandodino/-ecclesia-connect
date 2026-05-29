"use client"

import { useState, useEffect } from "react"

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  city: string
}

const fallbackWeather: WeatherData = {
  temperature: 28,
  condition: "Ensoleillé",
  humidity: 75,
  city: "Abidjan",
}

export function useWeather(): WeatherData & { loading: boolean } {
  const [weather, setWeather] = useState<WeatherData>(fallbackWeather)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate weather - in production, use OpenWeatherMap API
    const hour = new Date().getHours()
    let condition = "Ensoleillé"
    if (hour >= 14 && hour <= 17) condition = "Partiellement nuageux"
    if (hour >= 18 || hour <= 5) condition = "Clair"

    setWeather({
      temperature: 26 + Math.floor(Math.random() * 6),
      condition,
      humidity: 70 + Math.floor(Math.random() * 15),
      city: "Abidjan",
    })
    setLoading(false)
  }, [])

  return { ...weather, loading }
}
