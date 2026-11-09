import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Figtree, Geist_Mono } from 'next/font/google'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin', 'latin-ext', 'cyrillic-ext'],
  variable: '--font-figtree',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Resonance — SoundCloud & YouTube Music Desktop Player',
  description:
    'Native Tauri + Rust desktop music player combining SoundCloud and YouTube Music with live synced lyrics, a multi-band equalizer, crossfade, and adaptive artwork themes.',
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
