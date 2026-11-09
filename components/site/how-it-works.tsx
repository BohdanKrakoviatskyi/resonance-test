import { Check } from 'lucide-react'
import { HitPlaySidebarWidget } from './hit-play-sidebar-widget'
import {
  GlassCard,
  LogoMark,
  Reveal,
  SectionHeading,
  SoundCloudBadge,
  YouTubeMusicBadge,
} from './primitives'

const steps = [
  {
    title: 'Connect accounts',
    description: 'Sign in to SoundCloud and YouTube Music directly inside Resonance.',
    visual: <ConnectVisual />,
    interactive: false,
  },
  {
    title: 'Unified sidebar',
    description: 'Your playlists, likes, and radio mixes appear together in one clean tree.',
    visual: <LibraryVisual />,
    interactive: false,
  },
  {
    title: 'Dial in your sound',
    description: 'Configure your multi-band EQ curve and crossfade overlap once.',
    visual: <TuneVisual />,
    interactive: false,
  },
  {
    title: 'Hit play',
    description: 'Queue tracks across both platforms with live lyrics and waveform scrubbing.',
    visual: <HitPlaySidebarWidget />,
    interactive: true,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-28">
      <SectionHeading
        eyebrow="Workflow"
        title="From install to first track in under a minute."
        description="No manual playlist exports or third-party converters. Log in and your library is already there."
      />
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={80 + index * 90} className="h-full">
              <GlassCard className="flex h-full min-h-[340px] flex-col p-6">
                <span className="font-mono text-xs text-primary/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2.5 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <div className="mt-auto pt-5" aria-hidden={step.interactive ? undefined : 'true'}>
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
    <div className="flex h-44 flex-col justify-center gap-2.5 rounded-2xl bg-black/35 p-3.5">
      <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-xs">
        <SoundCloudBadge />
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400">
          <Check className="size-3" /> Linked
        </span>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-xs">
        <YouTubeMusicBadge />
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400">
          <Check className="size-3" /> Linked
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-muted-foreground">
        <LogoMark className="size-4" />
        <span>Synced with Resonance</span>
      </div>
    </div>
  )
}

function LibraryVisual() {
  const rows = [
    { name: 'Vajbik :/', count: '45 tracks', source: 'sc', active: true },
    { name: 'Stalker 2: Radio', count: '40 tracks', source: 'sc', active: false },
    { name: 'Johan x goddamn', count: '6 tracks', source: 'yt', active: false },
    { name: 'HardStyle', count: '25 tracks', source: 'sc', active: false },
  ]
  return (
    <ul className="space-y-1.5 rounded-2xl bg-black/35 p-3">
      {rows.map((row) => (
        <li
          key={row.name}
          className={
            row.active
              ? 'flex items-center justify-between rounded-xl bg-white/12 px-3 py-2 text-xs font-medium text-foreground'
              : 'flex items-center justify-between rounded-xl bg-white/[0.02] px-3 py-2 text-xs text-muted-foreground'
          }
        >
          <span className="flex items-center gap-2 truncate">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ background: row.source === 'sc' ? '#ff5500' : '#ff0033' }}
            />
            <span className="truncate">{row.name}</span>
          </span>
          <span className="ml-2 shrink-0 font-mono text-[10px] opacity-65">{row.count}</span>
        </li>
      ))}
    </ul>
  )
}

function TuneVisual() {
  const levels = [78, 65, 50, 44, 62, 74, 85]
  return (
    <div className="flex h-44 items-end justify-between gap-2 rounded-2xl bg-black/35 p-4">
      {levels.map((level, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div className="relative w-1.5 flex-1 rounded-full bg-white/10">
            <div
              className="absolute inset-x-0 bottom-0 rounded-full bg-primary/80"
              style={{ height: `${level}%` }}
            />
            <div
              className="absolute left-1/2 size-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-foreground shadow"
              style={{ bottom: `${level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
