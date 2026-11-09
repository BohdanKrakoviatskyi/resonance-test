import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { AnimatedHeroBackground } from './animated-hero-background'
import { HeroShowcaseCarousel } from './hero-showcase-carousel'
import {
  AnimatedText,
  LogoMark,
  REPO_URL,
  Reveal,
  SoundCloudBadge,
  YouTubeMusicBadge,
} from './primitives'

export function Hero() {
  return (
    <section id="top" className="relative overflow-x-clip pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Ambient top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[540px] max-w-5xl rounded-full bg-[radial-gradient(55%_50%_at_50%_30%,oklch(0.52_0.09_45/38%),transparent_72%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <div
          className="animate-rise-in inline-flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md"
          style={{ animationDelay: '40ms' }}
        >
          <span>One desktop library for</span>
          <SoundCloudBadge />
          <span className="text-white/30">+</span>
          <YouTubeMusicBadge />
        </div>

        <h1 className="mt-6 text-balance text-4xl leading-[1.06] font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          <AnimatedText
            text="Your underground tracks and main library in one window."
            wordClassName="bg-gradient-to-b from-white to-white/75 bg-clip-text text-transparent"
            baseDelay={100}
            stagger={50}
          />
        </h1>

        <p
          className="animate-rise-in mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ animationDelay: '420ms' }}
        >
          Stop juggling browser tabs. Resonance merges your SoundCloud likes and YouTube Music playlists into a fast, native desktop player with synced lyrics, a 10-band equalizer, and seamless crossfade.
        </p>

        <div
          className="animate-rise-in mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: '540ms' }}
        >
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_oklch(0.88_0.07_55/30%)] transition-transform hover:scale-[1.02]"
          >
            <ArrowDown className="size-4" aria-hidden="true" />
            Download for Desktop
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/10"
          >
            Source on GitHub
            <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden="true" />
          </a>
        </div>

        <p
          className="animate-rise-in mt-4 font-mono text-xs text-muted-foreground/80"
          style={{ animationDelay: '640ms' }}
        >
          Windows 10/11 (.exe, .msi) · macOS (.dmg) · Linux (.AppImage, .deb, .rpm) · Built with Tauri &amp; Rust
        </p>
      </div>

      {/* Ribbed dunes / soundwave horizon background with glowing RS emblem */}
      <div className="relative -mt-4 aspect-[16/9] w-full min-h-[360px] md:-mt-10 md:aspect-[2.25/1]">
        <AnimatedHeroBackground src="/images/hero-dunes.png" />
        {/* Extra seamless top & bottom feathering into the page background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-background via-background/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/70 to-transparent"
        />
        <div className="absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-beam-pulse absolute -inset-12 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative grid size-20 place-items-center rounded-3xl border border-white/20 bg-gradient-to-b from-white/20 to-white/[0.04] p-1.5 shadow-[0_0_60px_oklch(0.88_0.07_55/40%)] backdrop-blur-md">
            <div className="grid size-full place-items-center overflow-hidden rounded-2xl bg-black">
              <LogoMark className="size-14 rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3-screenshot Fan Carousel */}
      <Reveal delay={180} className="overflow-visible">
        <HeroShowcaseCarousel />
      </Reveal>
    </section>
  )
}
