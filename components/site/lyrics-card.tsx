'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from './primitives'
import { cn } from '@/lib/utils'

const lines = [
  'Lights low, the city hums along',
  'Every window holds a song',
  'Carry the echo home',
  'Hold on to the glow',
  'Static fades, the chorus climbs',
  'We are right on time',
  'Let the night replay',
  'One more verse to stay',
]

const LINE_HEIGHT = 40

export function LyricsCard() {
  const [active, setActive] = useState(2)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % lines.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <h3 className="text-xl font-semibold tracking-tight">Synced lyrics</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Follow every line live, and swap in a different lyrics source if the match is off.
      </p>

      <div
        className="relative mt-6 h-[200px] overflow-hidden rounded-2xl bg-black/30 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
        aria-label="Lyrics preview"
      >
        <ul
          className="absolute inset-x-0 top-0 transition-transform duration-700 ease-out"
          style={{ transform: `translateY(${100 - LINE_HEIGHT / 2 - active * LINE_HEIGHT}px)` }}
        >
          {lines.map((line, i) => (
            <li
              key={line}
              className={cn(
                'flex items-center justify-center px-4 text-center text-sm font-medium transition-all duration-500',
                i === active
                  ? 'text-foreground [text-shadow:0_0_18px_oklch(0.88_0.07_55/55%)]'
                  : 'text-foreground/25',
              )}
              style={{ height: LINE_HEIGHT }}
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  )
}
