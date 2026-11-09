'use client'

import { useEffect, useState } from 'react'
import { GlassCard, SoundCloudBadge } from './primitives'
import { cn } from '@/lib/utils'

const lines = [
  'Где бы я ни была',
  'Мысли мои - вода',
  'Я же права, скажи им',
  'Всё было правильно',
  'Убиты - ранены',
  'Мы же всё пережили',
  'Сквозь мои пальцы',
  'Тянется лето',
]

const LINE_HEIGHT = 38

export function LyricsCard() {
  const [active, setActive] = useState(2)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % lines.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Live synced lyrics</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Time-synced lines scroll with the track. Wrong match? Swap the lyrics source in one click.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
          Change lyrics
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-t-2xl border-x border-t border-white/8 bg-black/45 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="size-6 rounded-md bg-gradient-to-br from-sky-300/80 to-emerald-700/70" />
          <div>
            <p className="font-semibold leading-none text-foreground">права</p>
            <SoundCloudBadge className="mt-1 text-[10px]" />
          </div>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">ooes</span>
      </div>

      <div
        className="relative h-[180px] overflow-hidden rounded-b-2xl border-x border-b border-white/8 bg-black/35 [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]"
        aria-label="Lyrics preview"
      >
        <ul
          className="absolute inset-x-0 top-0 transition-transform duration-700 ease-out"
          style={{ transform: `translateY(${90 - LINE_HEIGHT / 2 - active * LINE_HEIGHT}px)` }}
        >
          {lines.map((line, i) => (
            <li
              key={line}
              onClick={() => setActive(i)}
              className={cn(
                'flex cursor-pointer items-center px-5 text-left text-sm font-semibold transition-all duration-500',
                i === active
                  ? 'text-foreground [text-shadow:0_0_20px_oklch(0.88_0.07_55/65%)]'
                  : 'text-foreground/30 hover:text-foreground/55',
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
