import Image from 'next/image'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
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
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
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

        <h1 className="mt-6 text-balance bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl leading-[1.06] font-semibold tracking-tight text-transparent sm:text-6xl md:text-7xl">
          <AnimatedText
            text="Your underground tracks and main library in one window."
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
      <div className="relative -mt-6 aspect-[16/9] w-full min-h-[340px] md:-mt-14 md:aspect-[2.3/1]">
        <Image
          src="/images/hero-dunes.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_28%,black_72%,transparent_100%)]"
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

      {/* Real desktop app showcase emerging from the horizon glow */}
      <Reveal delay={180} className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 sm:px-6 md:-mt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-10 -z-10 rounded-[3rem] bg-[radial-gradient(60%_55%_at_50%_35%,oklch(0.5_0.09_45/42%),transparent_70%)] blur-2xl"
        />
        <div className="relative rounded-[1.6rem] border border-white/12 bg-gradient-to-b from-white/12 to-white/[0.02] p-2 shadow-[0_40px_120px_-25px_oklch(0.45_0.09_45/55%)] backdrop-blur-sm">
          <Image
            src="/images/resonance-app.jpg"
            alt="Resonance desktop interface playing 'права' by ooes from SoundCloud, showing YouTube Music and SoundCloud playlists on the left and live synced Russian lyrics on the right"
            width={1280}
            height={673}
            priority
            sizes="(min-width: 1152px) 1120px, 100vw"
            className="h-auto w-full rounded-[1.15rem]"
          />
        </div>
      </Reveal>
    </section>
  )
}
