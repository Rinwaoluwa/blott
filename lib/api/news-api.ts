import type { NewsItem, NewsApiResponse } from "@/lib/types/news"
import { NEWS_API_CONFIG } from "@/lib/constants/api"

export async function getMarketNews(): Promise<NewsItem[]> {
  try {
    const url = new URL(NEWS_API_CONFIG.BASE_URL)
    url.searchParams.append("category", NEWS_API_CONFIG.CATEGORY)
    url.searchParams.append("token", NEWS_API_CONFIG.API_KEY)

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Cache for 5 minutes to improve performance
      next: { revalidate: 300 },
    });


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: NewsApiResponse[] = await response.json()

    // Transform API response to our internal format
    return data.map((item, index) => ({
      id: item.id || `news-${Date.now()}-${index}`,
      headline: item.headline,
      image: item.image,
      source: item.source,
      datetime: item.datetime,
      summary: item.summary,
      url: item.url,
    }))
  } catch (error) {
    throw new Error("Failed to fetch market news")
  }
}
