import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Happy Rakshabandhan - Celebrate the Bond of Love",
  description:
    "Celebrate Rakshabandhan with beautiful wishes, gifts, and memories. Send heartfelt messages and explore amazing gift ideas for your siblings.",
  keywords: "Rakshabandhan, Rakhi, Festival, Siblings, Wishes, Gifts, Indian Festival",
  authors: [{ name: "Gaurav Patil" }],
  openGraph: {
    title: "Happy Rakshabandhan - Celebrate the Bond of Love",
    description: "Celebrate Rakshabandhan with beautiful wishes, gifts, and memories.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Rakshabandhan",
    description: "Celebrate the beautiful bond between brothers and sisters.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
