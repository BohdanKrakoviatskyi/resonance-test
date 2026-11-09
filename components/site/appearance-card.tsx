'use client'

import { useState } from 'react'
import { Heart, Pause, Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react'
import { GlassCard, SoundCloudBadge, WavySeekbar } from './primitives'
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
  const accent = `oklch(0.86 0.08 ${hue})`

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Adaptive player bar &amp; themes</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            The interface pulls ambient colors directly from album artwork, or locks to your custom palette and waveform style.
          </p>
        </div>
      </div>

      <div
        className="mt-6 rounded-2xl border border-white/10 p-4 transition-[background] duration-500"
        style={{
          background: `radial-gradient(120% 140% at 15% 0%, oklch(0.34 0.08 ${hue}), oklch(0.14 0.025 ${hue}))`,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="size-11 shrink-0 rounded-xl border border-white/15 shadow-inner"
              style={{
                background: `linear-gradient(135deg, oklch(0.78 0.11 ${hue}), oklch(0.38 0.09 ${hue + 35}))`,
              }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-white">права</p>
                <Heart className="size-3.5 shrink-0 fill-current" style={{ color: accent }} />
              </div>
              <SoundCloudBadge className="mt-0.5 text-[11px]" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/75">
            <Shuffle className="hidden size-3.5 text-white/45 sm:block" aria-hidden="true" />
            <SkipBack className="size-4" aria-hidden="true" />
            <span
              className="grid size-9 place-items-center rounded-full text-black transition-[background] duration-500"
              style={{ background: accent }}
            >
              <Pause className="size-4 fill-current" aria-hidden="true" />
            </span>
            <SkipForward className="size-4" aria-hidden="true" />
            <Repeat className="hidden size-3.5 text-white/45 sm:block" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-2.5 font-mono text-[10px] text-white/60">
          <span>1:16</span>
          <WavySeekbar progress={52} accentColor={accent} />
          <span>2:26</span>
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
              'size-7 rounded-full ring-offset-2 ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              active.name === theme.name ? 'scale-110 ring-2 ring-white/80' : 'opacity-75 hover:opacity-100',
            )}
            style={{ background: `oklch(0.72 0.12 ${theme.hue})` }}
          />
        ))}
        <span className="ml-auto font-mono text-xs text-muted-foreground">{active.name}</span>
      </div>
    </GlassCard>
  )
}
