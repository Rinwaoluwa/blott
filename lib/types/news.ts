export interface NewsApiResponse {
  id?: string
  headline: string
  image: string
  source: string
  datetime: number
  summary?: string
  url: string
}

export interface NewsItem {
  id: string
  headline: string
  image: string
  source: string
  datetime: number
  summary?: string
  url: string
}
