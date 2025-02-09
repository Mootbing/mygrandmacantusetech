import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Grandma's Smart Home Adventure",
  description: 'Help Grandma navigate her smart home in this retro-styled puzzle game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 