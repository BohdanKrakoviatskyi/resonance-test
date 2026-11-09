'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, Heart, Volume1, Volume2 } from 'lucide-react'
import { HitPlaySidebarWidget } from './hit-play-sidebar-widget'
import { useI18n } from './i18n'
import {
  GlassCard,
  LogoMark,
  Reveal,
  SectionHeading,
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
      visual: <NormalizationVisual />,
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
              <GlassCard className="flex h-full w-full flex-col p-5">
                <div className="min-h-[104px]">
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

// ============================================================================
// 01: ПЛОТНЫЙ ВИДЖЕТ АККАУНТОВ И СИНХРОНИЗАЦИИ (БЕЗ ОБРЕЗКИ ТЕКСТА И БЕЗ OAUTH 2.0)
// ============================================================================
function ConnectVisual() {
  const { t } = useI18n()
  const [scLinked, setScLinked] = useState(true)
  const [ytLinked, setYtLinked] = useState(true)

  const syncPct = scLinked && ytLinked ? 100 : scLinked || ytLinked ? 50 : 0

  return (
    <div className="flex h-full flex-1 flex-col gap-2.5 rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#251813] via-[#1c130f] to-[#140e0b] p-3 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.1)] select-none">
      {/* SoundCloud account card */}
      <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1a110d]/95 p-3">
        {/* Row 1: 28x28 icon + platform name on left, compact Linked badge on right */}
        <div className="flex w-full items-center justify-between gap-1.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-[#ff5500]/15 text-[#ff5500] ring-1 ring-[#ff5500]/30">
              <svg aria-hidden="true" viewBox="0 0 24 14" fill="currentColor" className="h-2.5 w-3.5">
                <path d="M1.5 7.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0v-7a.75.75 0 0 1 .75-.75Zm3 1a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm6.25-3A4.75 4.75 0 0 1 21.4 5.3a3.25 3.25 0 0 1-.15 6.45H13.5a.75.75 0 0 1-.75-.75V3.25a.75.75 0 0 1 .5-.7 4.73 4.73 0 0 1 3.5-1.05Z" />
              </svg>
            </span>
            <span className="text-[12.5px] font-bold leading-tight tracking-tight whitespace-nowrap text-white">
              SoundCloud
            </span>
          </div>

          <button
            type="button"
            onClick={() => setScLinked((v) => !v)}
            className={cn(
              'inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-[7px] py-[2px] font-mono text-[10px] font-semibold tracking-tight whitespace-nowrap transition-all',
              scLinked
                ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30 hover:bg-emerald-500/25'
                : 'bg-white/[0.06] text-muted-foreground hover:bg-white/10 hover:text-white',
            )}
          >
            {scLinked && <Check className="size-2.5 shrink-0 stroke-[2.5]" />}
            <span>{scLinked ? t.howItWorks.step1.linked : t.howItWorks.step1.Paused}</span>
          </button>
        </div>

        {/* Row 2: Full-width subtitle */}
        <p className="mt-2 font-mono text-[10.5px] leading-tight whitespace-nowrap text-[#b8a49a]">
          likes • reposts • sets
        </p>

        {/* Row 3: Clean stats line */}
        <div className="mt-2 border-t border-white/[0.06] pt-2 font-mono text-[10.5px] whitespace-nowrap text-[#a8948a]">
          {t.howItWorks.step1.scStats}
        </div>
      </div>

      {/* YouTube Music account card */}
      <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1a110d]/95 p-3">
        {/* Row 1: 28x28 icon + platform name on left, compact Linked badge on right */}
        <div className="flex w-full items-center justify-between gap-1.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-[#ff0033]/15 text-[#ff0033] ring-1 ring-[#ff0033]/30">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5">
                <circle cx="8" cy="8" r="7.5" fill="#ff0033" />
                <circle cx="8" cy="8" r="4.2" stroke="white" strokeOpacity="0.9" strokeWidth="1" />
                <path d="M6.8 5.9L10.3 8L6.8 10.1V5.9Z" fill="white" />
              </svg>
            </span>
            <span className="text-[12.5px] font-bold leading-tight tracking-tight whitespace-nowrap text-white">
              YouTube Music
            </span>
          </div>

          <button
            type="button"
            onClick={() => setYtLinked((v) => !v)}
            className={cn(
              'inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-full px-[7px] py-[2px] font-mono text-[10px] font-semibold tracking-tight whitespace-nowrap transition-all',
              ytLinked
                ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30 hover:bg-emerald-500/25'
                : 'bg-white/[0.06] text-muted-foreground hover:bg-white/10 hover:text-white',
            )}
          >
            {ytLinked && <Check className="size-2.5 shrink-0 stroke-[2.5]" />}
            <span>{ytLinked ? t.howItWorks.step1.linked : t.howItWorks.step1.Paused}</span>
          </button>
        </div>

        {/* Row 2: Full-width subtitle */}
        <p className="mt-2 font-mono text-[10.5px] leading-tight whitespace-nowrap text-[#b8a49a]">
          playlists • albums • mixes
        </p>

        {/* Row 3: Clean stats line */}
        <div className="mt-2 border-t border-white/[0.06] pt-2 font-mono text-[10.5px] whitespace-nowrap text-[#a8948a]">
          {t.howItWorks.step1.ytStats}
        </div>
      </div>

      {/* Sync status panel — single-line headings & single-line bottom capsule */}
      <div className="flex w-full flex-1 flex-col justify-center gap-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1e1410]/95 p-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/15 bg-black">
            <LogoMark className="size-5 rounded-none" />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-bold leading-tight tracking-tight whitespace-nowrap text-white">
              {t.howItWorks.step1.synced}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight whitespace-nowrap text-[#b8a49a]">
              {t.howItWorks.step1.mergeSub}
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex w-full items-center justify-between gap-1 font-mono text-[10px] tracking-tight">
            <span className="whitespace-nowrap text-[#b8a49a]">
              {scLinked && ytLinked
                ? '982 tracks indexed'
                : scLinked
                  ? '840 tracks indexed'
                  : ytLinked
                    ? '142 tracks indexed'
                    : 'Paused'}
            </span>
            <span className="font-semibold whitespace-nowrap text-[#f5d0c5]">
              {syncPct}% synced
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ff5500] via-[#f5d0c5] to-[#ff0033] transition-all duration-500"
              style={{ width: `${syncPct}%` }}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-black/35 px-2 py-2 text-[9.5px] font-medium tracking-tight whitespace-nowrap text-[#c7b3a9]">
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="whitespace-nowrap">{t.howItWorks.step1.oauthNote}</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 02: ТОЧНАЯ МИНИ-КОПИЯ САЙДБАРА С ОРАНЖЕВЫМ FAVORITES И БЕЗ ПУСТОТЫ ВНИЗУ
// ============================================================================
interface SidebarPlaylist {
  id: string
  name: string
  count: number
  source: 'fav' | 'sc' | 'yt'
  cover?: string
}

const SIDEBAR_PLAYLISTS: SidebarPlaylist[] = [
  { id: 'fav', name: 'Favorites', count: 533, source: 'fav' },
  { id: 'vajbik-main', name: 'Vajbik :/', count: 45, source: 'sc', cover: '/images/playlists/vajbik.png' },
  { id: 'stalker', name: 'Stalker 2: Radio', count: 40, source: 'sc', cover: '/images/playlists/stalker.png' },
  { id: 'johan', name: 'Johan x goddamn', count: 6, source: 'yt', cover: '/images/playlists/johan.png' },
  { id: '1448', name: '1448', count: 255, source: 'sc', cover: '/images/playlists/p1448.png' },
  { id: 'dm', name: 'dm', count: 170, source: 'sc', cover: '/images/playlists/dm.png' },
  { id: 'hardstyle', name: 'HardStyle', count: 25, source: 'sc', cover: '/images/playlists/hardstyle.png' },
]

function LibraryVisual() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<'all' | 'sc' | 'yt'>('all')
  const [activeId, setActiveId] = useState<string>('vajbik-main')

  const filtered = SIDEBAR_PLAYLISTS.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'sc') return item.source === 'sc' || item.source === 'fav'
    return item.source === 'yt' || item.source === 'fav'
  })

  return (
    <div className="flex h-full flex-1 flex-col rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#251813] via-[#1c130f] to-[#140e0b] p-3 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.1)] select-none">
      {/* Sidebar header + [ All ] [ SC ] [ YTM ] filter tabs */}
      <div className="flex items-center justify-between gap-2 px-1 pb-2.5">
        <span className="text-[10px] font-bold tracking-[0.14em] text-[#b8a49a] uppercase">
          PLAYLISTS
        </span>
        <div className="flex items-center gap-1 rounded-full border border-white/[0.07] bg-black/35 p-0.5">
          {(
            [
              { key: 'all', label: t.howItWorks.step2.filterAll },
              { key: 'sc', label: 'SC' },
              { key: 'yt', label: 'YTM' },
            ] as const
          ).map((tab) => {
            const active = filter === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={cn(
                  'cursor-pointer rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold whitespace-nowrap transition-all',
                  active
                    ? 'bg-[#f5d0c5] text-[#21130d]'
                    : 'text-[#a8948a] hover:text-white',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Full-height playlist container (flex-1, no bottom hole, hidden scrollbar) */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1e1410]/95 p-1.5">
        <ul className="custom-queue-scroll flex h-full flex-1 flex-col gap-1.5 overflow-y-auto">
          {filtered.map((item) => {
            const active = item.id === activeId
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-all duration-200',
                    active
                      ? 'bg-[#3d2b22]/90 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.08)]'
                      : 'hover:bg-white/[0.05]',
                  )}
                >
                  {/* 36x36 rounded square cover — warm orange/peach heart for Favorites */}
                  {item.source === 'fav' ? (
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#e87a30]/35 text-[#f5d0c5] shadow-inner"
                      style={{ background: 'rgba(232, 122, 48, 0.15)' }}
                    >
                      <Heart className="size-4 fill-[#e87a30] text-[#e87a30]" aria-hidden="true" />
                    </span>
                  ) : (
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                      <Image
                        src={item.cover!}
                        alt={item.name}
                        width={72}
                        height={72}
                        className="size-full object-cover"
                      />
                    </div>
                  )}

                  {/* Two-line title + platform icon & track count */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'truncate text-xs font-bold leading-tight transition-colors',
                        active ? 'text-[#f5d0c5]' : 'text-white/90',
                      )}
                    >
                      {item.source === 'fav' ? t.howItWorks.step2.favoritesName : item.name}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[10px] leading-tight text-[#a8948a]">
                      {item.source === 'sc' && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 14"
                          fill="#ff5500"
                          className="h-2.5 w-3.5 shrink-0"
                        >
                          <path d="M1.5 7.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0v-7a.75.75 0 0 1 .75-.75Zm3 1a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm6.25-3A4.75 4.75 0 0 1 21.4 5.3a3.25 3.25 0 0 1-.15 6.45H13.5a.75.75 0 0 1-.75-.75V3.25a.75.75 0 0 1 .5-.7 4.73 4.73 0 0 1 3.5-1.05Z" />
                        </svg>
                      )}
                      {item.source === 'yt' && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="size-3 shrink-0"
                        >
                          <circle cx="8" cy="8" r="7.5" fill="#ff0033" />
                          <circle cx="8" cy="8" r="4.2" stroke="white" strokeOpacity="0.9" strokeWidth="1" />
                          <path d="M6.8 5.9L10.3 8L6.8 10.1V5.9Z" fill="white" />
                        </svg>
                      )}
                      {item.source === 'fav' && (
                        <span className="size-1.5 shrink-0 rounded-full bg-[#e87a30]" />
                      )}
                      <span className="whitespace-nowrap">
                        {item.count} {t.howItWorks.step2.tracksUnit}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

// ============================================================================
// 03: ИНТЕРАКТИВНЫЙ ВИДЖЕТ AUDIO NORMALIZATION (ПЛОТНЫЙ FLEX GAP-3.5 БЕЗ ПУСТОТ)
// ============================================================================
type LufsKey = 'quiet' | 'standard' | 'loud'

const LUFS_CONFIG: Record<
  LufsKey,
  {
    lufs: string
    headroom: string
    bars: number[]
  }
> = {
  quiet: {
    lufs: '-18 LUFS',
    headroom: '-2.0 dB',
    bars: [42, 46, 44, 48, 45, 43, 47, 45, 44, 46, 43, 45],
  },
  standard: {
    lufs: '-14 LUFS',
    headroom: '-1.0 dB',
    bars: [66, 70, 68, 72, 69, 67, 71, 68, 70, 69, 67, 70],
  },
  loud: {
    lufs: '-11 LUFS',
    headroom: '-0.3 dB',
    bars: [86, 90, 88, 92, 89, 87, 91, 88, 90, 89, 87, 90],
  },
}

const RAW_UNNORMALIZED_BARS = [24, 96, 30, 98, 22, 92, 35, 99, 28, 95, 25, 97]

function SoundwaveBadgeIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={cn('size-4', className)}
    >
      <rect x="2.5" y="8" width="2" height="4" rx="1" fill="currentColor" />
      <rect x="6" y="5" width="2" height="10" rx="1" fill="currentColor" />
      <rect x="9.5" y="2.5" width="2" height="15" rx="1" fill="currentColor" />
      <rect x="13" y="5.5" width="2" height="9" rx="1" fill="currentColor" />
      <rect x="16.5" y="8" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
  )
}

function NormalizationVisual() {
  const { t } = useI18n()
  const [enabled, setEnabled] = useState(true)
  const [target, setTarget] = useState<LufsKey>('standard')

  const activeConfig = LUFS_CONFIG[target]
  const bars = enabled ? activeConfig.bars : RAW_UNNORMALIZED_BARS

  return (
    <div className="flex h-full flex-1 flex-col gap-3.5 rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#251813] via-[#1c130f] to-[#140e0b] p-3.5 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.1)] select-none">
      {/* Header: square soundwave icon + title + subtitle */}
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#38271f] text-[#f7d2c4] shadow-inner">
          <SoundwaveBadgeIcon className="size-4" />
        </span>
        <div>
          <p className="text-[13px] font-bold leading-tight text-white">
            {t.howItWorks.step3.widgetTitle}
          </p>
          <p className="mt-0.5 text-[11px] leading-tight text-[#b8a49a]">
            {t.howItWorks.step3.widgetSub}
          </p>
        </div>
      </div>

      {/* Enabled / Disabled 2-button row with taller solid padding */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setEnabled(true)}
          className={cn(
            'flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200',
            enabled
              ? 'bg-[#f7d2c4] text-[#21130d] shadow-sm'
              : 'bg-[#2a1d17] text-[#b8a49a] hover:bg-[#34241d] hover:text-white',
          )}
        >
          <Check className="size-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
          <span>{t.howItWorks.step3.enabled}</span>
        </button>

        <button
          type="button"
          onClick={() => setEnabled(false)}
          className={cn(
            'flex cursor-pointer items-center justify-center rounded-xl px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200',
            !enabled
              ? 'bg-[#f7d2c4] text-[#21130d] shadow-sm'
              : 'bg-[#2a1d17] text-[#b8a49a] hover:bg-[#34241d] hover:text-white',
          )}
        >
          <span>{t.howItWorks.step3.disabled}</span>
        </button>
      </div>

      {/* Target loudness section with 3 solid non-wrapping buttons */}
      <div className="space-y-2">
        <p className="px-0.5 text-[11px] font-bold tracking-tight text-white/90">
          {t.howItWorks.step3.targetLoudness}
        </p>

        <div className="flex flex-col gap-1.5">
          {(
            [
              {
                key: 'quiet' as const,
                label: t.howItWorks.step3.quiet,
                icon: <Volume1 className="size-3.5 shrink-0" />,
              },
              {
                key: 'standard' as const,
                label: t.howItWorks.step3.standard,
                icon: <SoundwaveBadgeIcon className="size-3.5 shrink-0" />,
              },
              {
                key: 'loud' as const,
                label: t.howItWorks.step3.loud,
                icon: <Volume2 className="size-3.5 shrink-0" />,
              },
            ]
          ).map((item) => {
            const isSelected = enabled && target === item.key
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setEnabled(true)
                  setTarget(item.key)
                }}
                className={cn(
                  'flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all duration-200',
                  isSelected
                    ? 'bg-[#f7d2c4] text-[#21130d] shadow-sm'
                    : 'bg-[#2a1d17] text-[#b8a49a] hover:bg-[#34241d] hover:text-white',
                )}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Expanded Loudness Meter visualizer filling remaining space at bottom */}
      <div className="box-border flex w-full flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1e1410]/95 p-3">
        <div className="flex w-full items-center justify-between gap-1 text-[10.5px] font-medium tracking-[-0.02em] text-[#b8a49a]">
          <span className="whitespace-nowrap">
            {enabled ? `Target: ${activeConfig.lufs}` : 'Raw peaks'}
          </span>
          <span
            className={cn(
              'font-semibold whitespace-nowrap',
              enabled ? 'text-[#f7d2c4]' : 'text-amber-400',
            )}
          >
            {enabled ? t.howItWorks.step3.limiterActive : t.howItWorks.step3.limiterBypassed}
          </span>
        </div>

        {/* Tall expressive loudness bars (2x taller) */}
        <div className="my-2.5 flex min-h-[68px] flex-1 items-end justify-between gap-1.5 px-0.5">
          {bars.map((val, i) => (
            <div
              key={i}
              className="relative flex h-full flex-1 items-end rounded-full bg-white/[0.07]"
            >
              <div
                className={cn(
                  'w-full rounded-full transition-all duration-300',
                  enabled
                    ? 'bg-gradient-to-t from-[#f7d2c4]/40 to-[#f7d2c4]'
                    : val > 90
                      ? 'bg-gradient-to-t from-amber-500/50 to-red-400'
                      : 'bg-white/30',
                )}
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>

        <div className="flex w-full items-center justify-between gap-1 text-[10.5px] font-medium tracking-[-0.02em] text-[#8c786e]">
          <span className="whitespace-nowrap">
            Headroom: {enabled ? activeConfig.headroom : '+2.4 dB'}
          </span>
          <span className="whitespace-nowrap">True Peak DSP</span>
        </div>
      </div>
    </div>
  )
}
