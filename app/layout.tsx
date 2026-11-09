import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Figtree, Geist_Mono } from 'next/font/google'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-figtree',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Resonance — SoundCloud and YouTube Music in one player',
  description:
    'Resonance is a lightweight desktop music player that brings SoundCloud and YouTube Music together, with an equalizer, synced lyrics, crossfade and deep appearance settings.',
  generator: 'v0.app',
  icons: {
    icon: '/app-icon.png',
    apple: '/app-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0908',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${figtree.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
