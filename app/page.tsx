import { Suspense } from "react"
import { NewsContainer } from "@/components/news/news-container"
import { Header } from "@/components/layout/header"
import { LoadingState } from "@/components/ui/loading-state"
import { ErrorBoundary } from "@/components/ui/error-boundary"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0E0D13]">
      <Header />
      <main className="cont#0E0D13ainer mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">NEWS</h2>
        </div>
        <ErrorBoundary>
          <Suspense fallback={<LoadingState />}>
            <NewsContainer />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  )
}
