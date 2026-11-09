import { Cpu, HardDriveDownload, RefreshCw } from 'lucide-react'
import { AppearanceCard } from './appearance-card'
import { CrossfadeCard } from './crossfade-card'
import { EqualizerCard } from './equalizer-card'
import { LyricsCard } from './lyrics-card'
import { GlassCard, Reveal, SectionHeading } from './primitives'

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Audio Engine & Interface"
        title="Built for people who actually care how their player feels."
        description="Web players eat hundreds of megabytes of RAM and give you zero control over sound. Resonance runs natively with real audio shaping and interactive controls."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        <Reveal delay={60} className="lg:col-span-7">
          <LyricsCard />
        </Reveal>

        <Reveal delay={140} className="lg:col-span-5">
          <EqualizerCard />
        </Reveal>

        <Reveal delay={180} className="lg:col-span-5">
          <CrossfadeCard />
        </Reveal>

        <Reveal delay={240} className="lg:col-span-7">
          <AppearanceCard />
        </Reveal>
      </div>

      <Reveal delay={300} className="mt-4">
        <GlassCard className="grid divide-y divide-white/8 p-0 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-start gap-4 p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
              <Cpu className="size-4" aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-semibold tracking-tight">Tauri + Rust core</h3>
                <span className="font-mono text-xs text-primary">~45 MB RAM</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                No bundled Chromium bloat. Starts in under a second and stays invisible to your CPU while you game or work.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
              <RefreshCw className="size-4" aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-semibold tracking-tight">One-click auto-updater</h3>
                <span className="font-mono text-xs text-primary">GitHub Releases</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Checks for signed releases in the background, downloads the delta, and restarts into the new build right from the sidebar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
              <HardDriveDownload className="size-4" aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-semibold tracking-tight">Tiny native installers</h3>
                <span className="font-mono text-xs text-primary">&lt; 15 MB</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Signed builds for Windows (.exe, .msi), macOS (Apple Silicon &amp; Intel), and Linux (.AppImage, .deb, .rpm).
              </p>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  )
}
