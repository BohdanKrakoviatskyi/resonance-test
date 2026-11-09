'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Slide {
  id: string
  label: string
  src: string
  alt: string
  glow: string
}

const SLIDES: Slide[] = [
  {
    id: 'home',
    label: 'Library & Synced Lyrics',
    src: '/images/resonance-app.jpg',
    alt: 'Resonance home screen showing SoundCloud and YouTube Music playlists and live Russian lyrics for ooes — права',
    glow: 'oklch(0.52 0.1 45 / 55%)',
  },
  {
    id: 'settings',
    label: 'Liquid Glass & Adaptive Themes',
    src: '/images/resonance-settings.png',
    alt: 'Resonance appearance settings with Liquid Glass refraction, blur controls, and adaptive artwork colors',
    glow: 'oklch(0.55 0.11 215 / 50%)',
  },
  {
    id: 'playback',
    label: 'Unified Queue & Now Playing',
    src: '/images/resonance-library.png',
    alt: 'Resonance desktop player playing SoundCloud track руины with unified playlist sidebar',
    glow: 'oklch(0.48 0.09 35 / 50%)',
  },
]

export function HeroShowcaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const getRelativeRole = (index: number): 'center' | 'left' | 'right' => {
    const diff = (index - activeIndex + SLIDES.length) % SLIDES.length
    if (diff === 0) return 'center'
    if (diff === SLIDES.length - 1) return 'left'
    return 'right'
  }

  return (
    <div className="relative z-10 mx-auto -mt-12 w-full max-w-[1400px] overflow-visible px-4 sm:px-8 md:-mt-24">
      {/* Ambient glow behind the active center mockup */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 -top-10 -bottom-10 -z-10 mx-auto max-w-5xl rounded-[3rem] blur-3xl transition-all duration-700"
        style={{
          background: `radial-gradient(60% 55% at 50% 40%, ${SLIDES[activeIndex].glow}, transparent 72%)`,
        }}
      />

      {/* Fan stage — overflow-visible ensures left & right cards are never clipped */}
      <div className="relative mx-auto aspect-[1280/673] w-full max-w-[920px] overflow-visible">
        {SLIDES.map((slide, index) => {
          const role = getRelativeRole(index)
          const isCenter = role === 'center'
          const isLeft = role === 'left'

          return (
            <div
              key={slide.id}
              role={isCenter ? undefined : 'button'}
              tabIndex={isCenter ? -1 : 0}
              aria-label={isCenter ? slide.label : `Show ${slide.label}`}
              onClick={() => {
                if (!isCenter) setActiveIndex(index)
              }}
              onKeyDown={(e) => {
                if (!isCenter && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  setActiveIndex(index)
                }
              }}
              style={{
                zIndex: isCenter ? 30 : 10,
                transform: isCenter
                  ? 'translate3d(0%, 0%, 0) scale(1) rotate(0deg)'
                  : isLeft
                    ? 'translate3d(-19%, 3%, 0) scale(0.86) rotate(-4.5deg)'
                    : 'translate3d(19%, 3%, 0) scale(0.86) rotate(4.5deg)',
                filter: isCenter ? 'brightness(1)' : 'brightness(0.45)',
              }}
              className={cn(
                'absolute inset-0 origin-bottom rounded-[1.5rem] border p-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none',
                isCenter
                  ? 'border-white/15 bg-gradient-to-b from-white/14 to-white/[0.03] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85)]'
                  : 'cursor-pointer border-white/10 bg-white/[0.03] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.75)] hover:!brightness-[0.62]',
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1280}
                height={673}
                priority={index === 0}
                sizes="(min-width: 1024px) 920px, 92vw"
                className="h-full w-full rounded-[1.1rem] object-cover"
              />
            </div>
          )
        })}
      </div>

      {/* Interactive caption pills to switch slides or see which view is active */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {SLIDES.map((slide, index) => {
          const active = index === activeIndex
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300',
                active
                  ? 'border-primary/40 bg-primary/15 text-foreground shadow-[0_0_20px_oklch(0.88_0.07_55/20%)]'
                  : 'border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground',
              )}
            >
              {slide.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
