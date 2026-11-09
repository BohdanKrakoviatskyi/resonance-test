'use client'

import { useState, type PointerEvent } from 'react'
import { useI18n } from './i18n'
import { GlassCard } from './primitives'
import { cn } from '@/lib/utils'

const bands = ['60', '150', '400', '1k', '2.4k', '6k', '12k', '16k'] as const

const builtInPresets = {
  Flat: [50, 50, 50, 50, 50, 50, 50, 50],
  'Bass boost': [92, 80, 62, 48, 44, 46, 50, 52],
  Vocal: [38, 42, 58, 78, 84, 70, 52, 44],
  Bright: [42, 44, 46, 52, 64, 78, 88, 92],
} as const

type BuiltInPresetName = keyof typeof builtInPresets
type PresetKey = BuiltInPresetName | 'Custom'

const ALL_PRESETS: PresetKey[] = ['Flat', 'Bass boost', 'Vocal', 'Bright', 'Custom']

function levelToDb(level: number): string {
  const db = Math.round(((level - 50) / 50) * 12)
  if (db > 0) return `+${db} dB`
  return `${db} dB`
}

export function EqualizerCard() {
  const { t } = useI18n()
  const [preset, setPreset] = useState<PresetKey>('Bass boost')
  const [customLevels, setCustomLevels] = useState<number[]>([
    86, 74, 58, 52, 66, 76, 84, 78,
  ])
  const [draggingBand, setDraggingBand] = useState<number | null>(null)

  const currentLevels: readonly number[] =
    preset === 'Custom' ? customLevels : builtInPresets[preset]

  const updateBandFromPointer = (index: number, e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const raw = 1 - (e.clientY - rect.top) / rect.height
    const nextValue = Math.round(Math.max(8, Math.min(96, raw * 100)))

    setCustomLevels((prev) => {
      const base = preset === 'Custom' ? [...prev] : [...builtInPresets[preset]]
      base[index] = nextValue
      return base
    })
    if (preset !== 'Custom') {
      setPreset('Custom')
    }
  }

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{t.features.equalizer.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t.features.equalizer.description}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-primary">
          {draggingBand !== null
            ? `${bands[draggingBand]} Hz · ${levelToDb(currentLevels[draggingBand])}`
            : '±12 dB'}
        </span>
      </div>

      {/* Expanded interactive equalizer stage filling all space between subtitle and preset pills */}
      <div className="relative mt-5 flex min-h-[255px] flex-1 items-stretch gap-3 rounded-[1.35rem] border border-white/[0.08] bg-[#120d0b] px-4 pt-5 pb-3.5 shadow-[inset_0_1px_0_0_rgba(255,210,185,0.08)] select-none">
        {/* Left dB scale */}
        <div
          aria-hidden="true"
          className="flex flex-col justify-between pb-6 font-mono text-[9px] text-muted-foreground/65"
        >
          <span>+12 dB</span>
          <span>+6 dB</span>
          <span className="text-primary/80">0 dB</span>
          <span>-6 dB</span>
          <span>-12 dB</span>
        </div>

        {/* 8 interactive vertical frequency sliders */}
        <div className="relative flex flex-1 items-stretch justify-between gap-2">
          {/* Horizontal reference grid lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between"
          >
            <div className="border-b border-dashed border-white/[0.05]" />
            <div className="border-b border-dashed border-white/[0.04]" />
            <div className="border-b border-white/[0.12]" />
            <div className="border-b border-dashed border-white/[0.04]" />
            <div className="border-b border-dashed border-white/[0.05]" />
          </div>

          {currentLevels.map((level, i) => {
            const isDragging = draggingBand === i
            return (
              <div
                key={bands[i]}
                className="relative z-10 flex h-full flex-1 flex-col items-center gap-2.5"
              >
                {/* Interactive vertical track */}
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label={`${bands[i]} Hz band`}
                  aria-valuemin={-12}
                  aria-valuemax={12}
                  aria-valuenow={Math.round(((level - 50) / 50) * 12)}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId)
                    setDraggingBand(i)
                    updateBandFromPointer(i, e)
                  }}
                  onPointerMove={(e) => {
                    if (draggingBand === i) {
                      updateBandFromPointer(i, e)
                    }
                  }}
                  onPointerUp={() => setDraggingBand(null)}
                  onPointerCancel={() => setDraggingBand(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                      e.preventDefault()
                      const delta = e.key === 'ArrowUp' ? 5 : -5
                      setCustomLevels((prev) => {
                        const base =
                          preset === 'Custom' ? [...prev] : [...builtInPresets[preset]]
                        base[i] = Math.max(8, Math.min(96, base[i] + delta))
                        return base
                      })
                      setPreset('Custom')
                    }
                  }}
                  className="group relative flex h-full w-full cursor-ns-resize justify-center touch-none py-1"
                >
                  {/* Track groove */}
                  <div className="relative h-full w-2.5 rounded-full bg-white/[0.09] transition-colors group-hover:bg-white/[0.15]">
                    {/* Active bar fill */}
                    <div
                      className={cn(
                        'absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-primary/45 via-primary/85 to-primary',
                        draggingBand === null && 'transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      )}
                      style={{ height: `${level}%` }}
                    />

                    {/* Circular thumb handle at the top of the bar */}
                    <span
                      className={cn(
                        'absolute left-1/2 size-4 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-[#1b120e] bg-[#fff4ee] shadow-[0_0_12px_oklch(0.88_0.07_55/80%)] transition-transform group-hover:scale-125',
                        draggingBand === null && 'transition-[bottom,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        isDragging && 'scale-125 ring-2 ring-primary',
                      )}
                      style={{ bottom: `${level}%` }}
                    />
                  </div>
                </div>

                <span
                  className={cn(
                    'font-mono text-[10px] transition-colors',
                    isDragging ? 'font-semibold text-primary' : 'text-muted-foreground',
                  )}
                >
                  {bands[i]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Preset buttons including Custom */}
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Equalizer presets">
        {ALL_PRESETS.map((name) => {
          const active = preset === name
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => setPreset(name)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                active
                  ? 'border-transparent bg-primary text-primary-foreground shadow-[0_0_18px_oklch(0.88_0.07_55/30%)]'
                  : 'border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/20 hover:text-foreground',
              )}
            >
              {t.features.equalizer.presets[name]}
            </button>
          )
        })}
      </div>
    </GlassCard>
  )
}
