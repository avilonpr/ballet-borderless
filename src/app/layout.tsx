import type { Metadata } from "next"
import { Bodoni_Moda, Inter, Syne, DM_Sans } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { PageTransition } from "@/components/page-transition"

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "700", "900"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ballet Borderless",
  description:
    "Accessible ballet education for all levels. Group classes, private coaching, pointe work, and original choreography.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${inter.variable} ${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-black">
        <Navbar />
        <main className="pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  )
}
