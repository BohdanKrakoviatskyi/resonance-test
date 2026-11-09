'use client'

import { useState } from 'react'
import { Pause, SkipBack, SkipForward } from 'lucide-react'
import { GlassCard } from './primitives'
import { cn } from '@/lib/utils'

const themes = [
  { name: 'Ember', hue: 45 },
  { name: 'Rose', hue: 10 },
  { name: 'Moss', hue: 145 },
  { name: 'Ocean', hue: 235 },
  { name: 'Violet', hue: 300 },
]

export function AppearanceCard() {
  const [active, setActive] = useState(themes[0])
  const { hue } = active

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <h3 className="text-xl font-semibold tracking-tight">Make it yours</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Colors adapt to the album art, or pick your own theme and wallpaper.
      </p>

      <div
        className="mt-6 rounded-2xl p-4 transition-[background] duration-500"
        style={{
          background: `radial-gradient(120% 120% at 20% 0%, oklch(0.38 0.09 ${hue}), oklch(0.16 0.03 ${hue}))`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="size-12 shrink-0 rounded-xl"
            style={{
              background: `linear-gradient(135deg, oklch(0.8 0.1 ${hue}), oklch(0.4 0.1 ${hue + 30}))`,
            }}
          />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-2 w-2/3 rounded-full bg-white/70" />
            <div className="h-1.5 w-1/3 rounded-full bg-white/30" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-white/70">
          <SkipBack className="size-4" aria-hidden="true" />
          <span
            className="grid size-9 place-items-center rounded-full text-black/80 transition-[background] duration-500"
            style={{ background: `oklch(0.9 0.06 ${hue})` }}
          >
            <Pause className="size-4" aria-hidden="true" />
          </span>
          <SkipForward className="size-4" aria-hidden="true" />
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2.5 pt-5" role="group" aria-label="Theme">
        {themes.map((theme) => (
          <button
            key={theme.name}
            type="button"
            aria-label={theme.name}
            aria-pressed={active.name === theme.name}
            onClick={() => setActive(theme)}
            className={cn(
              'size-8 rounded-full ring-offset-2 ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              active.name === theme.name ? 'scale-110 ring-2 ring-white/70' : 'hover:scale-105',
            )}
            style={{ background: `oklch(0.7 0.13 ${theme.hue})` }}
          />
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{active.name}</span>
      </div>
    </GlassCard>
  )
}
