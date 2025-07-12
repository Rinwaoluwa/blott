"use client"

import { Component, type ReactNode } from "react"
import { ErrorState } from "./error-state"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Something went wrong"
          message="An unexpected error occurred. Please refresh the page and try again."
          onRetry={() => {
            this.setState({ hasError: false, error: undefined })
            window.location.reload()
          }}
        />
      )
    }

    return this.props.children
  }
}
