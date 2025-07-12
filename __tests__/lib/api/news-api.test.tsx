import { getMarketNews } from "@/lib/api/news-api"
import type { NewsApiResponse } from "@/lib/types/news"

// Mock fetch globally
global.fetch = jest.fn()

const mockApiResponse: NewsApiResponse[] = [
  {
    id: "1",
    headline: "Test News 1",
    image: "https://example.com/image1.jpg",
    source: "Test Source 1",
    datetime: 1640995200,
    summary: "Test summary 1",
    url: "https://example.com/news/1",
  },
  {
    id: "2",
    headline: "Test News 2",
    image: "https://example.com/image2.jpg",
    source: "Test Source 2",
    datetime: 1640995300,
    summary: "Test summary 2",
    url: "https://example.com/news/2",
  },
]

describe("getMarketNews API function", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("successfully fetches and transforms news data", async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    })

    const result = await getMarketNews()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://finnhub.io/api/v1/news"),
      expect.objectContaining({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
      }),
    )

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: "1",
        headline: "Test News 1",
        source: "Test Source 1",
      }),
    )
  })

  it("handles API errors gracefully", async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    await expect(getMarketNews()).rejects.toThrow("Failed to fetch market news")
  })

  it("handles network errors", async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"))

    await expect(getMarketNews()).rejects.toThrow("Failed to fetch market news")
  })

  it("generates IDs for items without IDs", async () => {
    const responseWithoutIds = mockApiResponse.map((item) => ({ ...item, id: undefined }))
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => responseWithoutIds,
    })

    const result = await getMarketNews()

    expect(result[0].id).toMatch(/^news-\d+-0$/)
    expect(result[1].id).toMatch(/^news-\d+-1$/)
  })

  it("constructs correct API URL with parameters", async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    })

    await getMarketNews()

    const calledUrl = (fetch as jest.Mock).mock.calls[0][0]
    expect(calledUrl).toContain("category=general")
    expect(calledUrl).toContain("token=crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg")
  })
})
