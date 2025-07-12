import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NewsCard } from "@/components/news/news-card"
import type { NewsItem } from "@/lib/types/news"
import React from 'react';

// Mock the useIsMobile hook
jest.mock("@/hooks/use-mobile", () => ({
    useIsMobile: jest.fn(),
}))

const mockUseIsMobile = require("@/hooks/use-mobile").useIsMobile

// Mock news item data
const mockNewsItem: NewsItem = {
    id: "1",
    headline: "Test News Headline",
    image: "https://example.com/test-image.jpg",
    source: "TEST SOURCE",
    datetime: 1640995200, // January 1, 2022
    summary: "Test summary",
    url: "https://example.com/news/1",
}

const mockNewsItemWithoutImage: NewsItem = {
    ...mockNewsItem,
    image: "",
}

describe("NewsCard Component", () => {
    beforeEach(() => {
        jest.clearAllMocks()
        // Mock window.open
        window.open = jest.fn()
    })

    describe("Desktop Layout", () => {
        beforeEach(() => {
            mockUseIsMobile.mockReturnValue(false)
        })

        it("renders news card with all required elements", () => {
            render(<NewsCard news={mockNewsItem} />)

            expect(screen.getByText("Test News Headline")).toBeInTheDocument()
            expect(screen.getByText("TEST SOURCE")).toBeInTheDocument()
            expect(screen.getByRole("button")).toBeInTheDocument()
        })

        it("renders image when provided", () => {
            render(<NewsCard news={mockNewsItem} />)

            const image = screen.getByAltText("Test News Headline")
            expect(image).toBeInTheDocument()
            expect(image).toHaveAttribute("src", mockNewsItem.image)
        })

        it("renders placeholder when image is not provided", () => {
            render(<NewsCard news={mockNewsItemWithoutImage} />)

            expect(screen.getByText("No image available")).toBeInTheDocument()
        })

        it("opens external link when clicked", async () => {
            const user = userEvent.setup()
            render(<NewsCard news={mockNewsItem} />)

            const card = screen.getByRole("button")
            await user.click(card)

            expect(window.open).toHaveBeenCalledWith(mockNewsItem.url, "_blank", "noopener,noreferrer")
        })

        it("opens external link when Enter key is pressed", async () => {
            const user = userEvent.setup()
            render(<NewsCard news={mockNewsItem} />)

            const card = screen.getByRole("button")
            card.focus()
            await user.keyboard("{Enter}")

            expect(window.open).toHaveBeenCalledWith(mockNewsItem.url, "_blank", "noopener,noreferrer")
        })

        it("opens external link when Space key is pressed", async () => {
            const user = userEvent.setup()
            render(<NewsCard news={mockNewsItem} />)

            const card = screen.getByRole("button")
            card.focus()
            await user.keyboard(" ")

            expect(window.open).toHaveBeenCalledWith(mockNewsItem.url, "_blank", "noopener,noreferrer")
        })

        it("has proper accessibility attributes", () => {
            render(<NewsCard news={mockNewsItem} />)

            const card = screen.getByRole("button")
            expect(card).toHaveAttribute("aria-label", "Read more about: Test News Headline")
            expect(card).toHaveAttribute("tabIndex", "0")
        })
    })

    describe("Mobile Layout", () => {
        beforeEach(() => {
            mockUseIsMobile.mockReturnValue(true)
        })

        it("renders mobile layout correctly", () => {
            render(<NewsCard news={mockNewsItem} />)

            expect(screen.getByText("Test News Headline")).toBeInTheDocument()
            expect(screen.getByText("TEST SOURCE")).toBeInTheDocument()

            // Check for mobile-specific styling
            const card = screen.getByRole("button")
            expect(card).toHaveClass("flex", "gap-3")
        })

    })

    describe("Error Handling", () => {
        it("handles missing URL gracefully", async () => {
            const newsWithoutUrl = { ...mockNewsItem, url: "" }
            const user = userEvent.setup()

            render(<NewsCard news={newsWithoutUrl} />)

            const card = screen.getByRole("button")
            await user.click(card)

            // Should not call window.open if URL is empty
            expect(window.open).not.toHaveBeenCalled()
        })

        it("handles missing source gracefully", () => {
            const newsWithoutSource = { ...mockNewsItem, source: "" }
            render(<NewsCard news={newsWithoutSource} />)

            expect(screen.getByText("Unknown Source")).toBeInTheDocument()
        })
    })
})
