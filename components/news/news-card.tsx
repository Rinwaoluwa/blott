"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { formatDate } from "@/lib/utils/date-utils"
import type { NewsItem } from "@/lib/types/news"
import { useIsMobile } from "@/hooks/use-mobile"
import { NewsCardMetadata } from "./news-card-metadata"
import { NewsCardHeadline } from "./news-card-headline"
import { NewsPlaceholderIcon } from "./news-placeholer-icon"

interface NewsCardProps {
  news: NewsItem
}

export function NewsCard({ news }: NewsCardProps) {
  const isMobile = useIsMobile()

  const handleCardClick = () => {
    if (news.url) {
      window.open(news.url, "_blank", "noopener,noreferrer")
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleCardClick()
    }
  }

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="md:relative flex gap-3 md:block cursor-pointer h-full p-[16px] group transition-all duration-300 ease-in-out hover:bg-hover-bg"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Read more about: ${news.headline}`}
    >
      <div className="flex-shrink-0 h-[100px] w-[100px] md:mr-0 md:h-[179px] md:w-[285px]">
        {news.image ? (
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.headline}
            className="object-fill h-full w-full transition-transform duration-500 ease-out group-hover:scale-100"
            height={179}
            width={285}
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <NewsPlaceholderIcon />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-start md:block max-w-[300px] md:max-w-full md:mt-2">
        <NewsCardMetadata source={news.source} datetime={news.datetime} />
        <NewsCardHeadline headline={news.headline} />
      </div>
    </motion.article>
  )
}

