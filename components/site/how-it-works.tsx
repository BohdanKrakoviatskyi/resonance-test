'use client'

import { useState, type PointerEvent } from 'react'
import { ArrowDownUp, Check, Heart, SlidersHorizontal } from 'lucide-react'
import { HitPlaySidebarWidget } from './hit-play-sidebar-widget'
import { useI18n } from './i18n'
import {
  GlassCard,
  LogoMark,
  Reveal,
  SectionHeading,
  SoundCloudBadge,
  YouTubeMusicBadge,
} from './primitives'
import { cn } from '@/lib/utils'

export function HowItWorks() {
  const { t } = useI18n()

  const steps = [
    {
      title: t.howItWorks.step1.title,
      description: t.howItWorks.step1.description,
      visual: <ConnectVisual />,
    },
    {
      title: t.howItWorks.step2.title,
      description: t.howItWorks.step2.description,
      visual: <LibraryVisual />,
    },
    {
      title: t.howItWorks.step3.title,
      description: t.howItWorks.step3.description,
      visual: <TuneVisual />,
    },
    {
      title: t.howItWorks.step4.title,
      description: t.howItWorks.step4.description,
      visual: <HitPlaySidebarWidget />,
    },
  ]

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-28">
      <SectionHeading
        eyebrow={t.howItWorks.eyebrow}
        title={t.howItWorks.title}
        description={t.howItWorks.description}
      />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={index} className="flex">
            <Reveal delay={80 + index * 90} className="flex w-full">
              <GlassCard className="flex h-full w-full flex-col p-6">
                <div className="min-h-[108px]">
                  <span className="font-mono text-xs text-primary/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-1 flex-col">{step.visual}</div>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ConnectVisual() {
  const { t } = useI18n()
  return (
    <div className="flex h-full flex-1 flex-col justify-between rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#251813] via-[#1c130f] to-[#140e0b] p-4 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.08)]">
      {/* SoundCloud card */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3.5 py-3">
        <div>
          <SoundCloudBadge className="text-xs" />
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            likes · reposts · sets
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-medium text-emerald-400">
          <Check className="size-3" /> {t.howItWorks.step1.linked}
        </span>
      </div>

      {/* Central sync node */}
      <div className="relative my-2 flex flex-col items-center justify-center py-2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-[#ff5500]/50 via-primary/70 to-[#ff0033]/50"
        />
        <div className="relative z-10 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#1c130f] px-3.5 py-2 shadow-[0_0_25px_oklch(0.88_0.07_55/25%)]">
          <LogoMark className="size-5" />
          <span className="text-xs font-semibold text-foreground">
            {t.howItWorks.step1.synced}
          </span>
          <ArrowDownUp className="size-3.5 text-primary" aria-hidden="true" />
        </div>
      </div>

      {/* YouTube Music card */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/35 px-3.5 py-3">
        <div>
          <YouTubeMusicBadge className="text-xs" />
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            playlists · albums · mixes
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] font-medium text-emerald-400">
          <Check className="size-3" /> {t.howItWorks.step1.linked}
        </span>
      </div>

      {/* Bottom status note */}
      <div className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] py-2 font-mono text-[10px] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-emerald-400" />
        <span>{t.howItWorks.step1.oauthNote}</span>
      </div>
    </div>
  )
}

function LibraryVisual() {
  const { t } = useI18n()
  const [activeIdx, setActiveIdx] = useState(1)

  const rows = [
    { name: t.howItWorks.step2.favoritesName, count: 533, source: 'fav' as const },
    { name: 'Vajbik :/', count: 45, source: 'sc' as const },
    { name: 'Stalker 2: Radio', count: 40, source: 'sc' as const },
    { name: 'Johan x goddamn', count: 6, source: 'yt' as const },
    { name: 'dm', count: 170, source: 'sc' as const },
    { name: 'Vajbik', count: 17, source: 'sc' as const },
  ]

  return (
    <div className="flex h-full flex-1 flex-col justify-between rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#251813] via-[#1c130f] to-[#140e0b] p-3 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.08)] select-none">
      <div className="mb-2 flex items-center justify-between px-2 pt-0.5 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
        <span>Playlists</span>
        <span className="font-mono text-primary">SC + YTM</span>
      </div>

      <ul className="flex flex-1 flex-col justify-between gap-1">
        {rows.map((row, idx) => {
          const active = idx === activeIdx
          return (
            <li key={row.name}>
              <button
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all duration-200',
                  active
                    ? 'bg-[#3d2b22] font-semibold text-[#f5d0c5] shadow-[inset_0_1px_0_0_rgba(255,215,195,0.1)]'
                    : 'bg-white/[0.02] text-muted-foreground hover:bg-white/[0.06] hover:text-foreground',
                )}
              >
                <span className="flex items-center gap-2.5 truncate">
                  {row.source === 'fav' ? (
                    <Heart className="size-3.5 shrink-0 fill-current text-primary" />
                  ) : (
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{
                        background: row.source === 'sc' ? '#ff5500' : '#ff0033',
                      }}
                    />
                  )}
                  <span className="truncate">{row.name}</span>
                </span>
                <span className="ml-2 shrink-0 font-mono text-[10px] opacity-75">
                  {row.count} {t.howItWorks.step2.tracksUnit}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function TuneVisual() {
  const { t } = useI18n()
  const [levels, setLevels] = useState<number[]>([82, 68, 52, 46, 64, 76, 88])
  const [custom, setCustom] = useState(false)
  const [dragging, setDragging] = useState<number | null>(null)

  const updateBar = (index: number, e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const raw = 1 - (e.clientY - rect.top) / rect.height
    const val = Math.round(Math.max(12, Math.min(95, raw * 100)))
    setLevels((prev) => {
      const next = [...prev]
      next[index] = val
      return next
    })
    setCustom(true)
  }

  return (
    <div className="flex h-full flex-1 flex-col justify-between rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#251813] via-[#1c130f] to-[#140e0b] p-3.5 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.08)] select-none">
      {/* Top status chips: Crossfade 5 s + preset indicator */}
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[10px] font-medium text-foreground">
          <SlidersHorizontal className="size-3 text-primary" aria-hidden="true" />
          {t.howItWorks.step3.crossfadeChip}
        </span>
        <button
          type="button"
          onClick={() => {
            setLevels([82, 68, 52, 46, 64, 76, 88])
            setCustom(false)
          }}
          className={cn(
            'rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold transition-colors',
            custom
              ? 'bg-primary text-primary-foreground'
              : 'border border-white/10 bg-white/[0.04] text-primary',
          )}
        >
          {custom ? t.howItWorks.step3.presetCustom : t.howItWorks.step3.presetWarm}
        </button>
      </div>

      {/* Tall interactive equalizer sliders */}
      <div className="mt-3 flex flex-1 items-end justify-between gap-2 rounded-2xl border border-white/[0.05] bg-black/35 px-3.5 py-4">
        {levels.map((level, i) => (
          <div
            key={i}
            role="slider"
            tabIndex={0}
            aria-label={`Band ${i + 1}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={level}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId)
              setDragging(i)
              updateBar(i, e)
            }}
            onPointerMove={(e) => {
              if (dragging === i) updateBar(i, e)
            }}
            onPointerUp={() => setDragging(null)}
            onPointerCancel={() => setDragging(null)}
            className="group relative flex h-full flex-1 cursor-ns-resize flex-col items-center justify-end touch-none"
          >
            <div className="relative w-2 flex-1 rounded-full bg-white/10 transition-colors group-hover:bg-white/15">
              <div
                className={cn(
                  'absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-t from-primary/45 to-primary',
                  dragging === null && 'transition-[height] duration-300',
                )}
                style={{ height: `${level}%` }}
              />
              <div
                className={cn(
                  'absolute left-1/2 size-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border border-[#1c130f] bg-foreground shadow-[0_0_10px_oklch(0.88_0.07_55/75%)] transition-transform group-hover:scale-125',
                  dragging === null && 'transition-[bottom,transform] duration-300',
                )}
                style={{ bottom: `${level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
