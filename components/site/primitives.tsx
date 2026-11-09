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
  stagger = 55,
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
        'relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.012] shadow-[inset_0_1px_0_0_oklch(1_0_0/8%)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
      <LogoMark className="size-3.5 rounded-sm" />
      {children}
    </span>
  )
}

export function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string
  title: string
  description: string
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
      <Reveal delay={0}>
        <Badge>{badge}</Badge>
      </Reveal>
      <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
        <AnimatedText
          text={title}
          scrollTrigger
          baseDelay={80}
          stagger={50}
        />
      </h2>
      <Reveal delay={200}>
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </Reveal>
    </div>
  )
}
