'use client'

import { useId, useState } from 'react'
import { useI18n } from './i18n'
import { GlassCard } from './primitives'

const MAX_SECONDS = 12

export function CrossfadeCard() {
  const { t } = useI18n()
  const [seconds, setSeconds] = useState(6)
  const inputId = useId()
  const overlap = (seconds / MAX_SECONDS) * 56
  const trackAEnd = 50 + overlap / 2
  const trackBStart = 50 - overlap / 2

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <h3 className="text-xl font-semibold tracking-tight">{t.features.crossfade.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t.features.crossfade.description}
      </p>

      <div className="mt-6 space-y-2 rounded-2xl bg-black/30 p-4" aria-hidden="true">
        <div className="relative h-9">
          <div
            className="absolute inset-y-0 left-0 rounded-lg bg-gradient-to-r from-white/15 to-white/5"
            style={{ width: `${trackAEnd}%` }}
          />
          <div
            className="absolute inset-y-0 rounded-r-lg bg-gradient-to-r from-transparent to-primary/50 transition-[left,width] duration-300"
            style={{ left: `${trackBStart}%`, width: `${overlap}%` }}
          />
        </div>
        <div className="relative h-9">
          <div
            className="absolute inset-y-0 right-0 rounded-lg bg-gradient-to-l from-primary/40 to-white/5 transition-[width] duration-300"
            style={{ width: `${100 - trackBStart}%` }}
          />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="mb-3 flex items-center justify-between text-xs">
          <label htmlFor={inputId} className="text-muted-foreground">
            {t.features.crossfade.fadeLength}
          </label>
          <output htmlFor={inputId} className="font-mono text-primary">
            {seconds === 0 ? t.features.crossfade.off : `${seconds}${t.features.crossfade.unit}`}
          </output>
        </div>
        <input
          id={inputId}
          type="range"
          min={0}
          max={MAX_SECONDS}
          step={1}
          value={seconds}
          onChange={(event) => setSeconds(Number(event.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[oklch(0.88_0.07_55)]"
        />
      </div>
    </GlassCard>
  )
}
