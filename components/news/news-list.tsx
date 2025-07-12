"use client"

import { motion } from "framer-motion"
import { NewsCard } from "./news-card"
import type { NewsItem } from "@/lib/types/news"

interface NewsListProps {
  news: NewsItem[]
}

export function NewsList({ news }: NewsListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center "
      >
        {news.map((item, index) => (
          <motion.div key={`${item.id}-${index}`} variants={itemVariants as any} className="md:w-[317px]">
            <NewsCard news={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
