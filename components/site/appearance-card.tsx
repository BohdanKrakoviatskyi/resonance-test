'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Heart,
  MicVocal,
  PanelRight,
  Pause,
  Play,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react'
import { useI18n } from './i18n'
import { GlassCard } from './primitives'
import { cn } from '@/lib/utils'

const TOTAL_SECONDS = 146 // 2:26

const themes = [
  { name: 'Ember', hue: 40 },
  { name: 'Rose', hue: 12 },
  { name: 'Moss', hue: 145 },
  { name: 'Ocean', hue: 235 },
  { name: 'Violet', hue: 300 },
] as const

function formatTime(sec: number) {
  const s = Math.max(0, Math.min(TOTAL_SECONDS, Math.floor(sec)))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export function AppearanceCard() {
  const { t } = useI18n()
  const [active, setActive] = useState<(typeof themes)[number]>(themes[0])
  const [playing, setPlaying] = useState(true)
  const [elapsed, setElapsed] = useState(23)
  const [liked, setLiked] = useState(true)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setElapsed((prev) => (prev >= TOTAL_SECONDS ? 0 : prev + 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [playing])

  const { hue } = active
  const progress = Math.max(4, (elapsed / TOTAL_SECONDS) * 100)
  const accent = `oklch(0.89 0.055 ${hue})`
  const accentGlow = `oklch(0.75 0.12 ${hue} / 45%)`

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{t.features.appearance.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t.features.appearance.description}
          </p>
        </div>
      </div>

      {/* Stage container with ambient glow */}
      <div className="relative mt-6 flex flex-1 flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#110d0b] px-3 py-6 shadow-[inset_0_1px_0_0_oklch(1_0_0/8%)] sm:px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-4 rounded-full blur-2xl transition-all duration-500"
          style={{
            background: `radial-gradient(65% 85% at 50% 50%, oklch(0.5 0.11 ${hue} / 35%), transparent 75%)`,
          }}
        />

        {/* Crisp native replica of the Resonance Player Bar */}
        <div
          className="relative z-10 w-full rounded-[1.35rem] border px-3.5 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition-all duration-500 sm:px-4 sm:py-3.5"
          style={{
            borderColor: `oklch(0.58 0.07 ${hue} / 45%)`,
            background: `linear-gradient(115deg, oklch(0.24 0.04 ${hue}) 0%, oklch(0.32 0.055 ${hue}) 38%, oklch(0.21 0.035 ${hue}) 100%)`,
          }}
        >
          {/* Top row: Track info (left), Transport controls (center), Utility & volume (right) */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
            {/* Left: Real cover art + title + SoundCloud ooes + heart */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-white/15 shadow-md">
                <Image
                  src="/images/ooes-cover.png"
                  alt="права — ooes"
                  width={120}
                  height={120}
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold leading-tight text-white">права</p>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 14"
                    fill="#ff5500"
                    className="h-2.5 w-3.5 shrink-0"
                  >
                    <path d="M1.5 7.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0v-7a.75.75 0 0 1 .75-.75Zm3 1a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm6.25-3A4.75 4.75 0 0 1 21.4 5.3a3.25 3.25 0 0 1-.15 6.45H13.5a.75.75 0 0 1-.75-.75V3.25a.75.75 0 0 1 .5-.7 4.73 4.73 0 0 1 3.5-1.05Z" />
                  </svg>
                  <span className="truncate font-medium">ooes</span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Favorite track"
                onClick={() => setLiked((v) => !v)}
                className="ml-1 shrink-0 transition-transform active:scale-90"
              >
                <Heart
                  className={cn('size-4 transition-colors', liked ? 'fill-current' : 'opacity-50')}
                  style={{ color: accent }}
                />
              </button>
            </div>

            {/* Center: Shuffle, Prev, Play/Pause, Next, Repeat-1 */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
              <Shuffle className="hidden size-3.5 text-white/60 sm:block" aria-hidden="true" />
              <button
                type="button"
                aria-label="Previous"
                onClick={() => setElapsed((prev) => Math.max(0, prev - 10))}
                className="text-white/75 transition-colors hover:text-white"
              >
                <SkipBack className="size-4 fill-current" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label={playing ? 'Pause' : 'Play'}
                onClick={() => setPlaying((p) => !p)}
                className={cn(
                  'grid size-10 place-items-center text-[#1d130e] transition-all duration-300 active:scale-95',
                  playing ? 'rounded-[13px]' : 'rounded-full',
                )}
                style={{
                  background: 'linear-gradient(180deg, #fff6f1 0%, #f1d4c6 100%)',
                  boxShadow: `0 0 24px ${accentGlow}`,
                }}
              >
                {playing ? (
                  <Pause className="size-4 fill-current stroke-[2.5]" aria-hidden="true" />
                ) : (
                  <Play
                    className="size-4 translate-x-[1px] fill-current stroke-[2.5]"
                    aria-hidden="true"
                  />
                )}
              </button>

              <button
                type="button"
                aria-label="Next"
                onClick={() => setElapsed((prev) => Math.min(TOTAL_SECONDS, prev + 15))}
                className="text-white/75 transition-colors hover:text-white"
              >
                <SkipForward className="size-4 fill-current" aria-hidden="true" />
              </button>
              <span className="hidden size-7 place-items-center rounded-lg bg-white/[0.08] text-white/85 sm:grid">
                <Repeat1 className="size-3.5" aria-hidden="true" />
              </span>
            </div>

            {/* Right: Lyrics toggle, Sidebar toggle, Volume slider */}
            <div className="hidden items-center justify-end gap-2 sm:flex">
              <span className="grid size-7 place-items-center rounded-lg text-white/70">
                <MicVocal className="size-3.5" aria-hidden="true" />
              </span>
              <span
                className="grid size-7 place-items-center rounded-lg bg-white/[0.09]"
                style={{ color: accent }}
              >
                <PanelRight className="size-3.5" aria-hidden="true" />
              </span>
              <Volume2 className="ml-1 size-3.5 text-white/65" aria-hidden="true" />
              <div className="relative flex h-4 w-16 items-center">
                <div className="h-1.5 w-full rounded-full bg-black/30" />
                <div
                  className="absolute left-0 h-2 rounded-l-full"
                  style={{ width: '62%', background: accent }}
                />
                <span
                  className="absolute top-1/2 h-4 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: '62%', background: accent }}
                />
              </div>
            </div>
          </div>

          {/* Bottom row: Interactive Seekbar — Wavy when playing, Straight line when paused */}
          <div className="mt-2 flex items-center justify-center gap-2.5 sm:px-10">
            <span className="w-8 text-right font-mono text-[11px] font-semibold text-white/70 tabular-nums">
              {formatTime(elapsed)}
            </span>

            <div
              role="slider"
              tabIndex={0}
              aria-label="Seek position"
              aria-valuemin={0}
              aria-valuemax={TOTAL_SECONDS}
              aria-valuenow={elapsed}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                setElapsed(Math.round(ratio * TOTAL_SECONDS))
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') setElapsed((s) => Math.min(TOTAL_SECONDS, s + 5))
                if (e.key === 'ArrowLeft') setElapsed((s) => Math.max(0, s - 5))
              }}
              className="group relative flex h-5 flex-1 cursor-pointer items-center"
            >
              <div className="relative h-[3px] w-full rounded-full bg-white/15">
                <span
                  className="absolute top-1/2 right-0 size-1 -translate-y-1/2 rounded-full"
                  style={{ background: accent }}
                />
              </div>

              <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center overflow-hidden transition-[width] duration-300"
                style={{ width: `calc(${progress}% - 4px)` }}
              >
                {playing ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 360 14"
                    preserveAspectRatio="none"
                    className="animate-wave-drift h-3.5 w-[360px] shrink-0"
                    style={{ color: accent }}
                  >
                    <path
                      d="M 0 7 Q 6 1.5, 12 7 T 24 7 T 36 7 T 48 7 T 60 7 T 72 7 T 84 7 T 96 7 T 108 7 T 120 7 T 132 7 T 144 7 T 156 7 T 168 7 T 180 7 T 192 7 T 204 7 T 216 7 T 228 7 T 240 7 T 252 7 T 264 7 T 276 7 T 288 7 T 300 7 T 312 7 T 324 7 T 336 7 T 348 7 T 360 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <div
                    className="h-[3.5px] w-full rounded-full transition-all duration-300"
                    style={{ background: accent }}
                  />
                )}
              </div>

              <span
                className="pointer-events-none absolute top-1/2 h-4 w-[3.5px] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(255,210,190,0.8)] transition-[left] duration-300 group-hover:scale-y-110"
                style={{
                  left: `${progress}%`,
                  background: accent,
                }}
              />
            </div>

            <span className="w-8 font-mono text-[11px] font-semibold text-white/70 tabular-nums">
              2:26
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2.5 pt-5" role="group" aria-label="Theme">
        {themes.map((theme) => (
          <button
            key={theme.name}
            type="button"
            aria-label={t.features.appearance.themes[theme.name]}
            aria-pressed={active.name === theme.name}
            onClick={() => setActive(theme)}
            className={cn(
              'size-7 rounded-full ring-offset-2 ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              active.name === theme.name
                ? 'scale-110 ring-2 ring-white/80'
                : 'opacity-75 hover:opacity-100',
            )}
            style={{ background: `oklch(0.72 0.12 ${theme.hue})` }}
          />
        ))}
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {t.features.appearance.themes[active.name]}
        </span>
      </div>
    </GlassCard>
  )
}
