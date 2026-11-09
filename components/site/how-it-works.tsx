import { Check } from 'lucide-react'
import { GlassCard, LogoMark, Reveal, SectionHeading } from './primitives'

const steps = [
  {
    title: 'Connect',
    description: 'Sign in to SoundCloud and YouTube Music right inside the app.',
    visual: <ConnectVisual />,
  },
  {
    title: 'Import',
    description: 'Your playlists, likes and artists appear in one sidebar.',
    visual: <LibraryVisual />,
  },
  {
    title: 'Tune',
    description: 'Dial in the equalizer, crossfade and lyrics to taste.',
    visual: <TuneVisual />,
  },
  {
    title: 'Play',
    description: 'Hit play and follow synced lyrics as the track moves.',
    visual: <PlayVisual />,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        badge="Connect • Import • Tune • Play"
        title="How it works"
        description="From sign-in to your first song in a few clicks."
      />
      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={140 + index * 110} className="h-full">
              <GlassCard className="flex h-full min-h-[360px] flex-col p-6">
                <span className="font-mono text-xs text-primary/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <div className="mt-auto pt-8" aria-hidden="true">
                  {step.visual}
                </div>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ConnectVisual() {
  return (
    <div className="grid h-36 place-items-center">
      <div className="relative grid size-28 place-items-center rounded-full bg-[radial-gradient(circle,oklch(0.3_0.02_50),oklch(0.14_0.005_50))] ring-1 ring-white/10">
        <div className="absolute inset-[-14px] rounded-full ring-1 ring-white/5" />
        <div className="absolute inset-[-28px] rounded-full ring-1 ring-white/[0.03]" />
        <div className="grid size-12 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-black">
          <LogoMark className="size-full rounded-none object-cover" />
        </div>
      </div>
    </div>
  )
}

function LibraryVisual() {
  const rows = ['SoundCloud', 'YouTube Music', 'Liked songs', 'Playlists']
  return (
    <ul className="space-y-1.5">
      {rows.map((row, i) => (
        <li
          key={row}
          className={
            i === 0
              ? 'flex items-center justify-between rounded-xl bg-gradient-to-r from-white/20 to-white/5 px-3 py-2.5 text-xs font-medium'
              : 'flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2.5 text-xs text-muted-foreground'
          }
        >
          {row}
          {i === 0 && <Check className="size-3.5 text-primary" />}
        </li>
      ))}
    </ul>
  )
}

function TuneVisual() {
  const levels = [45, 70, 55, 85, 40, 65, 75]
  return (
    <div className="flex h-36 items-end justify-between gap-2 rounded-2xl bg-white/[0.03] p-4">
      {levels.map((level, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div className="relative w-1 flex-1 rounded-full bg-white/10">
            <div
              className="absolute inset-x-0 bottom-0 rounded-full bg-primary/80"
              style={{ height: `${level}%` }}
            />
            <div
              className="absolute left-1/2 size-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-foreground shadow"
              style={{ bottom: `${level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function PlayVisual() {
  return (
    <div className="space-y-4 rounded-2xl bg-white/[0.03] p-4">
      <div className="space-y-1.5 text-center text-xs">
        <p className="text-foreground/30 blur-[0.5px]">Lights low, the city hums</p>
        <p className="font-medium text-foreground [text-shadow:0_0_16px_oklch(0.88_0.07_55/60%)]">
          Carry the echo home
        </p>
        <p className="text-foreground/30 blur-[0.5px]">Hold on to the glow</p>
      </div>
      <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
        <span>1:16</span>
        <div className="h-1 flex-1 rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-primary" />
        </div>
        <span>2:26</span>
      </div>
    </div>
  )
}
