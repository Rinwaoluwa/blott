import { render, screen } from "@testing-library/react"
import { NewsList } from "@/components/news/news-list"
import type { NewsItem } from "@/lib/types/news"

// Mock the NewsCard component
jest.mock("@/components/news/news-card", () => ({
  NewsCard: ({ news }: { news: NewsItem }) => (
    <div data-testid={`news-card-${news.id}`}>
      <h3>{news.headline}</h3>
      <p>{news.source}</p>
    </div>
  ),
}))

const mockNewsItems: NewsItem[] = [
  {
    id: "1",
    headline: "First News Item",
    image: "https://example.com/image1.jpg",
    source: "SOURCE ONE",
    datetime: 1640995200,
    summary: "First summary",
    url: "https://example.com/news/1",
  },
  {
    id: "2",
    headline: "Second News Item",
    image: "https://example.com/image2.jpg",
    source: "SOURCE TWO",
    datetime: 1640995300,
    summary: "Second summary",
    url: "https://example.com/news/2",
  },
  {
    id: "3",
    headline: "Third News Item",
    image: "https://example.com/image3.jpg",
    source: "SOURCE THREE",
    datetime: 1640995400,
    summary: "Third summary",
    url: "https://example.com/news/3",
  },
]

describe("NewsList Component", () => {
  it("renders all news items", () => {
    render(<NewsList news={mockNewsItems} />)

    expect(screen.getByTestId("news-card-1")).toBeInTheDocument()
    expect(screen.getByTestId("news-card-2")).toBeInTheDocument()
    expect(screen.getByTestId("news-card-3")).toBeInTheDocument()
  })

  it("renders correct number of news cards", () => {
    render(<NewsList news={mockNewsItems} />)

    const newsCards = screen.getAllByTestId(/news-card-/)
    expect(newsCards).toHaveLength(3)
  })

  it("renders empty list when no news items provided", () => {
    render(<NewsList news={[]} />)

    const newsCards = screen.queryAllByTestId(/news-card-/)
    expect(newsCards).toHaveLength(0)
  })

  it("applies correct grid layout classes", () => {
    const { container } = render(<NewsList news={mockNewsItems} />)

    const gridContainer = container.querySelector(".grid")
    expect(gridContainer).toHaveClass(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "xl:grid-cols-4",
      "gap-4",
    )
  })

  it("renders news items with correct content", () => {
    render(<NewsList news={mockNewsItems} />)

    expect(screen.getByText("First News Item")).toBeInTheDocument()
    expect(screen.getByText("SOURCE ONE")).toBeInTheDocument()
    expect(screen.getByText("Second News Item")).toBeInTheDocument()
    expect(screen.getByText("SOURCE TWO")).toBeInTheDocument()
  })
})
