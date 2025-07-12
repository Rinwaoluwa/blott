import { getMarketNews } from "@/lib/api/news-api"
import { NewsList } from "./news-list"
import { ErrorState } from "@/components/ui/error-state"

export async function NewsContainer() {
  try {
    const newsData = await getMarketNews()

    if (!newsData || newsData.length === 0) {
      return (
        <ErrorState
          title="No News Available"
          message="We couldn't find any news articles at the moment. Please try again later."
        />
      )
    }

    return <NewsList news={newsData} />
  } catch (error) {
    return (
      <ErrorState
        title="Failed to Load News"
        message="We're having trouble loading the latest news. Please check your connection and try again."
      />
    )
  }
}
