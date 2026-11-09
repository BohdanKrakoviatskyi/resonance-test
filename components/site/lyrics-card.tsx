'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, ListMusic, ListPlus, MicVocal, Search, ThumbsDown } from 'lucide-react'
import { GlassCard, SoundCloudBadge } from './primitives'
import { cn } from '@/lib/utils'

const lines = [
  'Забираю права',
  'На твои чувства, чувства',
  'Сквозь мои пальцы',
  'Тянется лето',
  'Где бы ты не был',
  'Здесь тебя нету',
  'Я вспоминаю',
  'Вплоть до рассвета',
  'Где бы ты не был',
  'Там меня тоже нет',
  'Как перестать грустить',
]

const LINE_HEIGHT = 34

export function LyricsCard() {
  const [active, setActive] = useState(3)

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

      {/* Exact replica of Resonance Now Playing / Lyrics panel so everything fits completely */}
      <div className="relative mt-5 flex flex-1 flex-col overflow-hidden rounded-[1.35rem] border border-[#4a3228]/70 bg-gradient-to-b from-[#231712] via-[#1a120e] to-[#130d0a] p-4 shadow-[inset_0_1px_0_0_rgba(255,210,185,0.12)] sm:flex-row sm:items-stretch sm:gap-5">
        {/* Left / Top column: Real Album Art, Track Info, Action buttons & Tab switcher */}
        <div className="flex flex-col justify-between sm:w-[205px] sm:shrink-0">
          <div className="flex items-center gap-3.5 sm:block">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_14px_34px_rgba(0,0,0,0.55)] sm:aspect-square sm:size-auto sm:w-full">
              <Image
                src="/images/ooes-cover.png"
                alt="права — ooes album cover"
                width={302}
                height={302}
                className="size-full object-cover"
              />
            </div>

            <div className="min-w-0 sm:mt-3">
              <p className="truncate text-lg font-bold tracking-tight text-white">права</p>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#d6c3b9]">
                <SoundCloudBadge className="text-[11px]" />
                <span className="text-white/30">·</span>
                <span className="font-medium text-[#d6c3b9]">ooes</span>
              </div>

              {/* Action buttons from screenshot: Heart, Dislike, Add to queue */}
              <div className="mt-2.5 flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-[#3c2921] text-[#ffd2be]">
                  <Heart className="size-3.5 fill-current" aria-hidden="true" />
                </span>
                <span className="grid size-8 place-items-center rounded-xl bg-[#3c2921] text-[#e6cfc4]">
                  <ThumbsDown className="size-3.5" aria-hidden="true" />
                </span>
                <span className="grid size-8 place-items-center rounded-xl bg-[#3c2921] text-[#e6cfc4]">
                  <ListPlus className="size-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>

          {/* Lyrics / Up next pill tabs */}
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <div className="flex items-center justify-center gap-1.5 rounded-full bg-[#ffd2be] px-3 py-1.5 text-xs font-semibold text-[#23140d] shadow-sm">
              <MicVocal className="size-3.5" aria-hidden="true" />
              <span>Lyrics</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 rounded-full bg-[#2a1d17] px-3 py-1.5 text-xs font-medium text-[#b7a399]">
              <ListMusic className="size-3.5" aria-hidden="true" />
              <span>Up next</span>
            </div>
          </div>
        </div>

        {/* Right column: Animated scrolling lyrics container */}
        <div
          className="relative mt-3 h-[230px] flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#211611]/90 sm:mt-0 sm:h-auto sm:min-h-[255px]"
          aria-label="Lyrics preview"
        >
          {/* Search button in top-right corner like in the real app */}
          <span
            aria-hidden="true"
            className="absolute top-2.5 right-2.5 z-20 grid size-7 place-items-center rounded-full border border-white/10 bg-[#2c1f19]/90 text-[#c9b5ab]"
          >
            <Search className="size-3.5" />
          </span>

          <div className="relative size-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)]">
            <ul
              className="absolute inset-x-0 top-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateY(${115 - LINE_HEIGHT / 2 - active * LINE_HEIGHT}px)`,
              }}
            >
              {lines.map((line, i) => {
                const isActive = i === active
                return (
                  <li
                    key={`${line}-${i}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      'flex cursor-pointer items-center px-4 text-left text-[15px] font-bold tracking-tight transition-all duration-500 select-none',
                      isActive
                        ? 'scale-[1.02] origin-left text-white [text-shadow:0_0_18px_rgba(255,210,190,0.65)]'
                        : 'text-[#8c7a70]/60 hover:text-[#b7a399]',
                    )}
                    style={{ height: LINE_HEIGHT }}
                  >
                    {line}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
