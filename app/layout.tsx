import type React from "react"
import type { Metadata } from "next"
import { Rubik } from "next/font/google"
import "./globals.css"

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  title: "BLOTT - Latest Market News",
  description: "Stay updated with the latest market news and insights",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={rubik.variable}>
      <body className={`${rubik.className} antialiased bg-gray-50`}>{children}</body>
    </html>
  )
}
