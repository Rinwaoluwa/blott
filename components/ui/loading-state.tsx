"use client"

import { motion } from "framer-motion"

export function LoadingState() {
  const skeletonVariants = {
    loading: {
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            variants={skeletonVariants}
            animate="loading"
            className="bg-gray-900 rounded-lg overflow-hidden h-56"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image skeleton */}
            <div className="h-full bg-gray-800 relative">
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                {/* Source and date */}
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-700 rounded w-20" />
                  <div className="h-3 bg-gray-700 rounded w-16" />
                </div>
                {/* Title */}
                <div className="space-y-1">
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
