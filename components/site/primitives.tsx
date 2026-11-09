'use client'

import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const REPO_URL = 'https://github.com/BohdanKrakoviatskyi/Resonance'
export const RELEASES_URL = `${REPO_URL}/releases/latest`

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/app-icon.png"
      alt="Resonance"
      width={64}
      height={64}
      className={cn('size-5 rounded-md object-contain', className)}
    />
  )
}

export function SoundCloudBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium text-[#ff5500]',
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 24 14" fill="currentColor" className="h-3 w-4">
        <path d="M1.5 7.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Zm3-2a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0v-7a.75.75 0 0 1 .75-.75Zm3 1a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75Zm6.25-3A4.75 4.75 0 0 1 21.4 5.3a3.25 3.25 0 0 1-.15 6.45H13.5a.75.75 0 0 1-.75-.75V3.25a.75.75 0 0 1 .5-.7 4.73 4.73 0 0 1 3.5-1.05Z" />
      </svg>
      SoundCloud
    </span>
  )
}

export function YouTubeMusicBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium text-[#ff0033]',
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5">
        <circle cx="8" cy="8" r="7.5" fill="#ff0033" />
        <circle cx="8" cy="8" r="4.2" stroke="white" strokeOpacity="0.9" strokeWidth="1" />
        <path d="M6.8 5.9L10.3 8L6.8 10.1V5.9Z" fill="white" />
      </svg>
      YouTube Music
    </span>
  )
}

export function WavySeekbar({
  progress = 42,
  accentColor,
  className,
}: {
  progress?: number
  accentColor?: string
  className?: string
}) {
  return (
    <div className={cn('relative flex h-4 w-full items-center', className)}>
      <div className="h-[3px] w-full rounded-full bg-white/15" />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${progress}%` }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 240 12"
          preserveAspectRatio="none"
          className="h-full w-[240px]"
          style={{ color: accentColor ?? 'var(--primary)' }}
        >
          <path
            d="M 0 6 Q 4 1, 8 6 T 16 6 T 24 6 T 32 6 T 40 6 T 48 6 T 56 6 T 64 6 T 72 6 T 80 6 T 88 6 T 96 6 T 104 6 T 112 6 T 120 6 T 128 6 T 136 6 T 144 6 T 152 6 T 160 6 T 168 6 T 176 6 T 184 6 T 192 6 T 200 6 T 208 6 T 216 6 T 224 6 T 232 6 T 240 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span
        className="absolute top-1/2 h-3.5 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full shadow"
        style={{
          left: `${progress}%`,
          background: accentColor ?? 'var(--primary)',
        }}
      />
    </div>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
      className={cn(
        'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform,filter]',
        visible
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-5 opacity-0 blur-[4px]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function AnimatedText({
  text,
  className,
  wordClassName,
  baseDelay = 0,
  stagger = 50,
  scrollTrigger = false,
}: {
  text: string
  className?: string
  wordClassName?: string
  baseDelay?: number
  stagger?: number
  scrollTrigger?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(!scrollTrigger)

  useEffect(() => {
    if (!scrollTrigger) return
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [scrollTrigger])

  const words = text.split(' ')

  return (
    <span ref={ref} className={cn('inline', className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block">
          <span
            style={
              scrollTrigger
                ? ({ transitionDelay: `${baseDelay + i * stagger}ms` } as CSSProperties)
                : ({ animationDelay: `${baseDelay + i * stagger}ms` } as CSSProperties)
            }
            className={cn(
              'inline-block',
              scrollTrigger
                ? cn(
                    'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    visible
                      ? 'translate-y-0 opacity-100 blur-0'
                      : 'translate-y-4 opacity-0 blur-[4px]',
                  )
                : 'animate-rise-in',
              wordClassName,
            )}
          >
            {word}
          </span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  )
}

export function GlassCard({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-[#14110f]/90 shadow-[inset_0_1px_0_0_oklch(1_0_0/7%)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description: string
  align?: 'left' | 'center'
}) {
  const isCenter = align === 'center'
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        isCenter ? 'mx-auto max-w-2xl items-center text-center' : 'max-w-2xl items-start text-left',
      )}
    >
      {eyebrow && (
        <Reveal delay={0}>
          <span className="font-mono text-xs font-medium tracking-[0.16em] text-primary uppercase">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        <AnimatedText text={title} scrollTrigger baseDelay={60} stagger={45} />
      </h2>
      <Reveal delay={160}>
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </Reveal>
    </div>
  )
}
