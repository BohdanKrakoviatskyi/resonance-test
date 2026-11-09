'use client'

import { useState } from 'react'
import { GlassCard } from './primitives'
import { cn } from '@/lib/utils'

const bands = ['60', '150', '400', '1k', '2.4k', '6k', '12k', '16k']

const presets = {
  Flat: [50, 50, 50, 50, 50, 50, 50, 50],
  'Bass boost': [92, 80, 62, 48, 44, 46, 50, 52],
  Vocal: [38, 42, 58, 78, 84, 70, 52, 44],
  Bright: [42, 44, 46, 52, 64, 78, 88, 92],
} as const

type PresetName = keyof typeof presets

export function EqualizerCard() {
  const [preset, setPreset] = useState<PresetName>('Bass boost')
  const levels = presets[preset]

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <h3 className="text-xl font-semibold tracking-tight">Equalizer</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Shape the sound band by band, or start from a preset.
      </p>

      <div className="mt-6 flex h-36 items-end justify-between gap-2 rounded-2xl bg-black/30 px-4 pt-4 pb-3">
        {levels.map((level, i) => (
          <div key={bands[i]} className="flex h-full flex-1 flex-col items-center gap-2">
            <div className="relative w-1.5 flex-1 rounded-full bg-white/10">
              <div
                className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-primary/60 to-primary transition-[height] duration-500 ease-out"
                style={{ height: `${level}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-muted-foreground">{bands[i]}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-5" role="group" aria-label="Equalizer presets">
        {(Object.keys(presets) as PresetName[]).map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={preset === name}
            onClick={() => setPreset(name)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              preset === name
                ? 'border-transparent bg-primary text-primary-foreground'
                : 'border-white/10 bg-white/[0.04] text-muted-foreground hover:text-foreground',
            )}
          >
            {name}
          </button>
        ))}
      </div>
    </GlassCard>
  )
}
