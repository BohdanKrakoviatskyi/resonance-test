import { Cpu, RefreshCw } from 'lucide-react'
import { AppearanceCard } from './appearance-card'
import { CrossfadeCard } from './crossfade-card'
import { EqualizerCard } from './equalizer-card'
import { LyricsCard } from './lyrics-card'
import { GlassCard, Reveal, SectionHeading } from './primitives'

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        badge="More than a player"
        title="What you get"
        description="Everything the streaming apps leave out, in one lightweight desktop player. Try the controls below."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Reveal delay={100} className="lg:col-span-2">
          <EqualizerCard />
        </Reveal>
        <Reveal delay={200} className="lg:col-span-2">
          <LyricsCard />
        </Reveal>
        <Reveal delay={300} className="md:col-span-2 lg:col-span-2">
          <CrossfadeCard />
        </Reveal>

        <Reveal delay={150} className="lg:col-span-2">
          <AppearanceCard />
        </Reveal>

        <Reveal delay={250} className="lg:col-span-2">
          <GlassCard className="flex h-full flex-col p-6">
            <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-primary">
              <Cpu className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">Light on your machine</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Built on Tauri and Rust, so it starts fast and stays easy on CPU and memory while you listen all day.
            </p>
            <div className="mt-auto flex items-end gap-1.5 pt-8" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="animate-eq-bounce h-12 w-full rounded-full bg-gradient-to-t from-primary/10 to-primary/70"
                  style={{ animationDelay: `${(i % 8) * 140}ms` }}
                />
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={350} className="lg:col-span-2">
          <GlassCard className="flex h-full flex-col p-6">
            <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-primary">
              <RefreshCw className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl font-semibold tracking-tight">Updates itself</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Resonance checks GitHub Releases, shows download progress and installs the new version in one click.
            </p>
            <div className="mt-auto space-y-2 pt-8" aria-hidden="true">
              <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>Downloading update</span>
                <span className="text-primary">72%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary/60 to-primary" />
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}
