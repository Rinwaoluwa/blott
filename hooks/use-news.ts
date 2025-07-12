"use client"

import { useState, useEffect } from "react"
import type { NewsItem } from "@/lib/types/news"

interface UseNewsReturn {
  news: NewsItem[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useNews(): UseNewsReturn {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/news")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setNews(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return {
    news,
    loading,
    error,
    refetch: fetchNews,
  }
}
