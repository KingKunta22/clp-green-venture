import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Load Inter font (better than Poppins for professional sites)
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CLP Agarwood - Premium Products',
  description: 'Your one-stop shop for Agarwood, Perfumes, Dog Food & Seedlings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50 dark:bg-black`}>
        {children}
      </body>
    </html>
  )
}