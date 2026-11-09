'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GlassCard } from './primitives'
import { cn } from '@/lib/utils'

const themes = [
  { name: 'Ember', hue: 45, rotate: 0 },
  { name: 'Rose', hue: 10, rotate: -35 },
  { name: 'Moss', hue: 145, rotate: 95 },
  { name: 'Ocean', hue: 235, rotate: 185 },
  { name: 'Violet', hue: 300, rotate: 250 },
]

export function AppearanceCard() {
  const [active, setActive] = useState(themes[0])

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

      <div className="relative mt-6 flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#110d0b] p-3 shadow-[inset_0_1px_0_0_oklch(1_0_0/8%)]">
        {/* Ambient glow reacting to the selected theme */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-full blur-2xl transition-all duration-500"
          style={{
            background: `radial-gradient(65% 80% at 50% 50%, oklch(0.55 0.12 ${active.hue} / 38%), transparent 75%)`,
          }}
        />

        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.65)]">
          <Image
            src="/images/player-bar.png"
            alt="Resonance player bar showing album cover for 'права' by ooes, playback controls, and wavy progress bar"
            width={1229}
            height={114}
            className="h-auto w-full object-cover transition-[filter] duration-500"
            style={{
              filter: `hue-rotate(${active.rotate}deg) brightness(0.96) contrast(1.03)`,
            }}
          />
          {/* Subtle dark vignette around edges to blend into the card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 [background:radial-gradient(85%_95%_at_50%_50%,transparent_60%,rgba(17,13,11,0.55)_100%)]"
          />
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
