"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0E0D13] border md:border-0 border-b-1 border-b-[#272735]"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image src="/BLOTT.svg" alt="BLOTT LOGO" width={120} height={40} />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
