'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ============================================================================
// СЛАЙДЫ КАРУСЕЛИ ПРИЛОЖЕНИЯ (легко заменить пути к картинкам или цвета)
// ============================================================================
export interface ShowcaseSlide {
  id: string
  src: string
  alt: string
  glowColor: string
  shadowColor: string
}

export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'amber-default',
    src: '/images/resonance-app.jpg',
    alt: 'Resonance desktop player in warm amber-brown theme with SoundCloud and YouTube Music playlists and live synced lyrics',
    glowColor: 'oklch(0.52 0.1 45 / 48%)',
    shadowColor: 'oklch(0.45 0.09 45 / 55%)',
  },
  {
    id: 'crimson-red',
    src: '/images/resonance-crimson.jpg',
    alt: 'Resonance desktop player Good evening home screen in deep crimson-red theme',
    glowColor: 'oklch(0.46 0.14 22 / 48%)',
    shadowColor: 'oklch(0.42 0.13 22 / 55%)',
  },
  {
    id: 'ocean-teal',
    src: '/images/resonance-teal.jpg',
    alt: 'Resonance desktop player in cool cyan-teal theme with adaptive player bar and synced lyrics',
    glowColor: 'oklch(0.52 0.11 210 / 48%)',
    shadowColor: 'oklch(0.45 0.1 210 / 55%)',
  },
]

type CardRole = 'center' | 'left' | 'right'

export function HeroShowcaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Вычисляем позицию каждой карточки в круговом стеке из 3 элементов:
  // При activeIndex = 0:
  // - индекс 0 -> 'center' (оранжевая по центру)
  // - индекс 2 -> 'left'   (бирюзовая слева позади)
  // - индекс 1 -> 'right'  (бордовая справа позади)
  const getRole = (index: number): CardRole => {
    const diff = (index - activeIndex + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length
    if (diff === 0) return 'center'
    if (diff === SHOWCASE_SLIDES.length - 1) return 'left'
    return 'right'
  }

  const activeSlide = SHOWCASE_SLIDES[activeIndex]

  return (
    <div className="relative z-10 mx-auto -mt-12 w-full max-w-6xl overflow-visible px-6 sm:px-10 md:-mt-24">
      {/* Динамическое фоновое свечение (ambient glow), меняющее цвет под активный скриншот */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-10 -z-10 rounded-[3rem] blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(62% 58% at 50% 38%, ${activeSlide.glowColor}, transparent 72%)`,
        }}
      />

      {/* Сцена веерной карусели (overflow-visible, чтобы боковые карточки и свечение не обрезались) */}
      <div className="relative mx-auto aspect-[1280/673] w-full max-w-[940px] overflow-visible">
        {SHOWCASE_SLIDES.map((slide, index) => {
          const role = getRole(index)
          const isCenter = role === 'center'
          const isLeft = role === 'left'

          return (
            <div
              key={slide.id}
              role={isCenter ? undefined : 'button'}
              tabIndex={isCenter ? -1 : 0}
              aria-label={isCenter ? slide.alt : `Switch preview to ${slide.id}`}
              onClick={() => {
                if (!isCenter) setActiveIndex(index)
              }}
              onKeyDown={(e) => {
                if (!isCenter && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  setActiveIndex(index)
                }
              }}
              style={{
                zIndex: isCenter ? 3 : 1,
                boxShadow: isCenter
                  ? `0 40px 120px -25px ${slide.shadowColor}`
                  : '0 24px 60px -20px rgba(0, 0, 0, 0.75)',
              }}
              className={cn(
                'absolute inset-0 origin-center rounded-[1.6rem] border p-2 select-none',
                'transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,filter,opacity]',
                isCenter && [
                  'translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100',
                  'border-white/14 bg-gradient-to-b from-white/12 to-white/[0.02] backdrop-blur-sm',
                  '[filter:brightness(1)_saturate(1)_blur(0px)]',
                ],
                isLeft && [
                  // Сдвиг влево так, чтобы выглядывало ~13% ширины, и поворот +3.5deg (внешний левый верхний кончик смотрит вверх)
                  '-translate-x-[13.5%] translate-y-1.5 scale-[0.85] rotate-[3.5deg] cursor-pointer opacity-75',
                  'border-white/10 bg-white/[0.03]',
                  '[filter:brightness(0.4)_saturate(0.85)_blur(1px)]',
                  'hover:-translate-x-[14.5%] hover:translate-y-0 hover:opacity-95 hover:[filter:brightness(0.6)_saturate(0.95)_blur(0px)]',
                ],
                !isCenter &&
                  !isLeft && [
                    // Зеркально справа: выглядывает ~13% ширины, поворот -3.5deg (внешний правый верхний кончик смотрит вверх)
                    'translate-x-[13.5%] translate-y-1.5 scale-[0.85] -rotate-[3.5deg] cursor-pointer opacity-75',
                    'border-white/10 bg-white/[0.03]',
                    '[filter:brightness(0.4)_saturate(0.85)_blur(1px)]',
                    'hover:translate-x-[14.5%] hover:translate-y-0 hover:opacity-95 hover:[filter:brightness(0.6)_saturate(0.95)_blur(0px)]',
                  ],
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1280}
                height={673}
                priority
                sizes="(min-width: 1152px) 940px, 92vw"
                className="h-full w-full rounded-[1.15rem] object-cover"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
