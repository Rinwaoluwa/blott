"use client"

import { renderHook, act } from "@testing-library/react"
import { useIsMobile } from "@/hooks/use-mobile"

// Mock window.innerWidth
Object.defineProperty(window, "innerWidth", {
  writable: true,
  configurable: true,
  value: 1024,
})

// Mock window.addEventListener and removeEventListener
const mockAddEventListener = jest.fn()
const mockRemoveEventListener = jest.fn()

Object.defineProperty(window, "addEventListener", {
  writable: true,
  value: mockAddEventListener,
})

Object.defineProperty(window, "removeEventListener", {
  writable: true,
  value: mockRemoveEventListener,
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
    dispatchEvent: jest.fn(),
  })),
});

describe("useIsMobile hook", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns false for desktop screen sizes", () => {
    window.innerWidth = 1024
    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it("returns true for mobile screen sizes", () => {
    window.innerWidth = 600
    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it("returns false for screen sizes above mobile breakpoint", () => {
    window.innerWidth = 769
    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it("adds change event listener on mount", () => {
    renderHook(() => useIsMobile())

    expect(mockAddEventListener).toHaveBeenCalledWith("change", expect.any(Function))
  })

  it("removes change event listener on unmount", () => {
    const { unmount } = renderHook(() => useIsMobile())

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function))
  })

  it("updates value when window is resized", () => {
    window.innerWidth = 1024
    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)

    // Simulate window resize
    act(() => {
      window.innerWidth = 600
      // Get the resize handler that was registered
      const resizeHandler = mockAddEventListener.mock.calls.find((call) => call[0] === "change")[1]
      resizeHandler()
    })

    expect(result.current).toBe(true)
  })
})
