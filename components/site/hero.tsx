import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { AnimatedText, LogoMark, REPO_URL, Reveal } from './primitives'

const sources = [
  'SoundCloud',
  'YouTube Music',
  'Tauri',
  'Rust',
  'GitHub',
  'Windows',
  'macOS',
  'Linux',
]

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 md:pt-44">
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <h1 className="text-balance text-5xl leading-[1.05] font-semibold tracking-tight md:text-7xl">
          <AnimatedText
            text="One player for every sound you love."
            wordClassName="animate-text-shimmer bg-[linear-gradient(110deg,#fff_0%,rgba(255,255,255,0.72)_45%,oklch(0.88_0.07_55)_70%,#fff_100%)] bg-clip-text text-transparent"
            baseDelay={40}
            stagger={65}
          />
        </h1>
        <p className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
          <AnimatedText
            text="SoundCloud. YouTube Music. A single, beautifully tuned desktop player."
            baseDelay={420}
            stagger={38}
          />
        </p>
        <div
          className="animate-rise-in flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: '780ms' }}
        >
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-[0_0_40px_oklch(1_0_0/18%)] transition-transform hover:scale-[1.03]"
          >
            <ArrowDown className="size-4" aria-hidden="true" />
            Download Resonance
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/10"
          >
            View on GitHub
          </a>
        </div>
      </div>

      <div className="relative -mt-8 aspect-[16/9] w-full min-h-[360px] md:-mt-16 md:aspect-[2.2/1]">
        <Image
          src="/images/hero-dunes.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_72%,transparent_100%)]"
        />
        <div className="absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-beam-pulse absolute -inset-10 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid size-20 place-items-center rounded-3xl border border-white/20 bg-gradient-to-b from-white/20 to-white/[0.04] p-1.5 shadow-[0_0_60px_oklch(0.88_0.07_55/35%)] backdrop-blur-md">
            <div className="grid size-full place-items-center overflow-hidden rounded-2xl bg-black">
              <LogoMark className="size-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-6 max-w-5xl px-6 pb-8 md:-mt-12">
        <Reveal delay={100}>
          <p className="mb-6 text-center text-xs tracking-[0.14em] text-muted-foreground uppercase">
            Plays what you love, on every desktop
          </p>
        </Reveal>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-medium tracking-tight text-foreground/55">
          {sources.map((name, i) => (
            <li key={name}>
              <Reveal delay={180 + i * 60}>
                <span className="inline-block transition-colors duration-300 hover:text-foreground">
                  {name}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
