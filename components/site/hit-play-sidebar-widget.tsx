'use client'

import { useState, type PointerEvent } from 'react'
import Image from 'next/image'
import { Heart, ListMusic, ListPlus, MicVocal, ThumbsDown } from 'lucide-react'
import { useI18n } from './i18n'
import { cn } from '@/lib/utils'

// ============================================================================
// ДАННЫЕ ОЧЕРЕДИ ТРЕКОВ (Up next) — легко подставить свои пути к аватаркам
// ============================================================================
export interface QueueTrack {
  id: string
  title: string
  artist: string
  cover: string
  duration: string
  lyrics: string[]
}

export const UP_NEXT_TRACKS: QueueTrack[] = [
  {
    id: 'raznye',
    title: 'разные',
    artist: 'zer0cks',
    cover: '/images/tracks/raznye.png',
    duration: '1:54',
    lyrics: [
      'Лепестки сакуры падают вниз',
      'Мы с тобой разные — это наш приз',
      'Пиксельный ветер качает траву',
      'В этом мире я снова живу',
    ],
  },
  {
    id: 'monstr',
    title: 'монстр',
    artist: 'норман грейсон',
    cover: '/images/tracks/monstr.png',
    duration: '2:12',
    lyrics: [
      'В темноте горят глаза',
      'Не вернёмся мы назад',
      'Тень скользит по потолку',
      'Я молчу в своём углу',
    ],
  },
  {
    id: 'ruiny',
    title: 'руины',
    artist: 'норман грейсон',
    cover: '/images/tracks/ruiny.png',
    duration: '2:34',
    lyrics: [
      'На обломках старых стен',
      'Пепел ждёт своих перемен',
      'Сквозь багровый горизонт',
      'Тишина зовёт вперёд',
    ],
  },
  {
    id: 'fortuna',
    title: 'princeofscale — FORTUNA 812',
    artist: 'just_sad_maan',
    cover: '/images/tracks/fortuna.png',
    duration: '1:48',
    lyrics: [
      'Гудки в холодном проводе',
      'Ночной маршрут по городу',
      'Восемь-один-два на связи',
      'Свет фонарей в тумане гаснет',
    ],
  },
  {
    id: 'scooby',
    title: 'the scooby snacks - p3b3.wav',
    artist: '1724',
    cover: '/images/tracks/scooby.png',
    duration: '2:05',
    lyrics: [
      'Серый дым и белый шум',
      'Потерял счёт своих дум',
      'Плёнка крутит старый сэмпл',
      'Засыпает спальный сектор',
    ],
  },
  {
    id: 'miura',
    title: 'BATO - Miura',
    artist: 'Русская Рэп-Сцена',
    cover: '/images/tracks/miura.png',
    duration: '2:19',
    lyrics: [
      'Чёрный кузов режет ночь',
      'Разгоняя тени прочь',
      'На спидометре предел',
      'Это всё, чего хотел',
    ],
  },
  {
    id: 'prava',
    title: 'права',
    artist: 'ooes',
    cover: '/images/tracks/prava.png',
    duration: '2:26',
    lyrics: [
      'Забираю права',
      'На твои чувства, чувства',
      'Сквозь мои пальцы',
      'Тянется лето',
    ],
  },
]

export function HitPlaySidebarWidget() {
  const { t } = useI18n()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'up-next' | 'lyrics'>('up-next')
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({
    raznye: true,
    prava: true,
  })
  const [scrubProgress, setScrubProgress] = useState(46)
  const [activeLyricLine, setActiveLyricLine] = useState(1)

  const currentTrack = UP_NEXT_TRACKS[selectedIndex]
  const isLiked = !!likedIds[currentTrack.id]

  const toggleLike = () => {
    setLikedIds((prev) => ({
      ...prev,
      [currentTrack.id]: !prev[currentTrack.id],
    }))
  }

  const updateScrubFromEvent = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0.05, Math.min(0.96, (e.clientX - rect.left) / rect.width))
    setScrubProgress(Math.round(ratio * 100))
    const lineIdx = Math.min(
      currentTrack.lyrics.length - 1,
      Math.floor(ratio * currentTrack.lyrics.length),
    )
    setActiveLyricLine(lineIdx)
  }

  return (
    <div className="flex h-full flex-col rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#251813] via-[#1c130f] to-[#140e0b] p-3 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.1)] select-none">
      {/* Верхняя часть правой панели: квадратная обложка, название, SoundCloud + автор и кнопки ❤️ 👎 ➕ */}
      <div className="flex items-center gap-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_10px_25px_rgba(0,0,0,0.55)]">
          <Image
            key={currentTrack.cover}
            src={currentTrack.cover}
            alt={`${currentTrack.title} — ${currentTrack.artist}`}
            width={160}
            height={160}
            className="size-full object-cover transition-all duration-300"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p
            key={currentTrack.title}
            className="truncate text-sm font-bold tracking-tight text-white transition-all duration-300"
          >
            {currentTrack.title}
          </p>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#c7b3a9]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 14"
              fill="#ff5500"
              className="h-2.5 w-3.5 shrink-0"
            >
              <path d="M1.5 7.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0v-7a.75.75 0 0 1 .75-.75Zm3 1a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm6.25-3A4.75 4.75 0 0 1 21.4 5.3a3.25 3.25 0 0 1-.15 6.45H13.5a.75.75 0 0 1-.75-.75V3.25a.75.75 0 0 1 .5-.7 4.73 4.73 0 0 1 3.5-1.05Z" />
            </svg>
            <span className="truncate font-medium">{currentTrack.artist}</span>
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Like track"
              onClick={toggleLike}
              className={cn(
                'grid size-6 place-items-center rounded-lg bg-[#3b2820] transition-transform active:scale-90',
                isLiked ? 'text-[#f5d0c5]' : 'text-[#bda79c]/70 hover:text-white',
              )}
            >
              <Heart className={cn('size-3', isLiked && 'fill-current')} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Dislike track"
              className="grid size-6 place-items-center rounded-lg bg-[#3b2820] text-[#dfcac0] transition-colors hover:bg-[#483228]"
            >
              <ThumbsDown className="size-3" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Add to queue"
              className="grid size-6 place-items-center rounded-lg bg-[#3b2820] text-[#dfcac0] transition-colors hover:bg-[#483228]"
            >
              <ListPlus className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Переключатель вкладок [ Lyrics ] и [ Up next ] */}
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => setActiveTab('lyrics')}
          className={cn(
            'flex items-center justify-center gap-1.5 rounded-full py-1.5 text-[11px] font-semibold transition-all duration-250',
            activeTab === 'lyrics'
              ? 'bg-[#f5d0c5] text-[#21130d] shadow-sm'
              : 'bg-[#2a1d17] text-[#b8a49a] hover:bg-[#34241d] hover:text-white',
          )}
        >
          <MicVocal className="size-3" aria-hidden="true" />
          <span>{t.howItWorks.step4.tabLyrics}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('up-next')}
          className={cn(
            'flex items-center justify-center gap-1.5 rounded-full py-1.5 text-[11px] font-semibold transition-all duration-250',
            activeTab === 'up-next'
              ? 'bg-[#f5d0c5] text-[#21130d] shadow-sm'
              : 'bg-[#2a1d17] text-[#b8a49a] hover:bg-[#34241d] hover:text-white',
          )}
        >
          <ListMusic className="size-3" aria-hidden="true" />
          <span>{t.howItWorks.step4.tabUpNext}</span>
        </button>
      </div>

      {/* Контентная панель с кастомным тонким скроллбаром без стрелок */}
      <div className="mt-2.5 h-[196px] flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1e1410]/95 p-1.5">
        {activeTab === 'up-next' ? (
          <ul
            aria-label="Up next queue"
            className="custom-queue-scroll h-full space-y-1 overflow-y-auto pr-1"
          >
            {UP_NEXT_TRACKS.map((track, idx) => {
              const isPlaying = idx === selectedIndex
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIndex(idx)
                      setActiveLyricLine(1)
                    }}
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-all duration-200',
                      isPlaying
                        ? 'bg-[#3d2b22]/90 shadow-[inset_0_1px_0_0_rgba(255,215,195,0.08)]'
                        : 'hover:bg-white/[0.05]',
                    )}
                  >
                    <div className="relative size-8 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                      <Image
                        src={track.cover}
                        alt={track.title}
                        width={64}
                        height={64}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          'truncate text-[11px] font-semibold leading-tight transition-colors',
                          isPlaying ? 'text-[#f5d0c5]' : 'text-white/90',
                        )}
                      >
                        {track.title}
                      </p>
                      <p className="mt-0.5 truncate text-[10px] leading-tight text-[#a8948a]">
                        {track.artist}
                      </p>
                    </div>

                    {isPlaying && (
                      <span
                        aria-label="Now playing"
                        className="ml-1 flex h-3.5 shrink-0 items-end gap-[2px] pr-1"
                      >
                        <span
                          className="animate-eq-bounce h-3 w-[2.5px] rounded-full bg-[#f5d0c5]"
                          style={{ animationDelay: '0ms' }}
                        />
                        <span
                          className="animate-eq-bounce h-3.5 w-[2.5px] rounded-full bg-[#f5d0c5]"
                          style={{ animationDelay: '180ms' }}
                        />
                        <span
                          className="animate-eq-bounce h-2.5 w-[2.5px] rounded-full bg-[#f5d0c5]"
                          style={{ animationDelay: '340ms' }}
                        />
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="flex h-full flex-col justify-between px-2 py-1.5">
            <ul className="space-y-1.5 overflow-hidden">
              {currentTrack.lyrics.map((line, idx) => {
                const active = idx === activeLyricLine
                return (
                  <li key={line}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveLyricLine(idx)
                        setScrubProgress(Math.round(((idx + 0.5) / currentTrack.lyrics.length) * 100))
                      }}
                      className={cn(
                        'w-full truncate text-left text-xs font-bold transition-all duration-300',
                        active
                          ? 'text-white [text-shadow:0_0_14px_rgba(245,208,197,0.65)]'
                          : 'text-[#8c786e]/65 hover:text-[#c7b3a9]',
                      )}
                    >
                      {line}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-auto border-t border-white/[0.06] pt-2">
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#b8a49a]">
                <span>0:48</span>
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Waveform scrub"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={scrubProgress}
                  onPointerDown={updateScrubFromEvent}
                  onPointerMove={(e) => {
                    if (e.buttons === 1) updateScrubFromEvent(e)
                  }}
                  className="relative flex h-4 flex-1 cursor-pointer items-center touch-none"
                >
                  <div className="h-[2.5px] w-full rounded-full bg-white/15" />
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center overflow-hidden"
                    style={{ width: `${scrubProgress}%` }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 200 12"
                      preserveAspectRatio="none"
                      className="animate-wave-drift h-3 w-[200px] shrink-0 text-[#f5d0c5]"
                    >
                      <path
                        d="M 0 6 Q 5 1.5, 10 6 T 20 6 T 30 6 T 40 6 T 50 6 T 60 6 T 70 6 T 80 6 T 90 6 T 100 6 T 110 6 T 120 6 T 130 6 T 140 6 T 150 6 T 160 6 T 170 6 T 180 6 T 190 6 T 200 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span
                    className="pointer-events-none absolute top-1/2 h-3.5 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5d0c5] shadow-[0_0_8px_rgba(245,208,197,0.8)]"
                    style={{ left: `${scrubProgress}%` }}
                  />
                </div>
                <span>{currentTrack.duration}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
