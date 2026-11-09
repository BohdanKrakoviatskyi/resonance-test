'use client'

import { Cpu, HardDriveDownload, RefreshCw } from 'lucide-react'
import { AppearanceCard } from './appearance-card'
import { CrossfadeCard } from './crossfade-card'
import { EqualizerCard } from './equalizer-card'
import { useI18n } from './i18n'
import { LyricsCard } from './lyrics-card'
import { GlassCard, Reveal, SectionHeading } from './primitives'

export function Features() {
  const { t } = useI18n()

  return (
    <section id="features" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/4 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.48_0.09_45/22%),transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-10 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.45_0.08_30/20%),transparent_70%)] blur-3xl"
      />
      <SectionHeading
        eyebrow={t.features.eyebrow}
        title={t.features.title}
        description={t.features.description}
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
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-base font-semibold tracking-tight">
                  {t.features.specs.tauriTitle}
                </h3>
                <span className="font-mono text-xs text-primary">
                  {t.features.specs.tauriBadge}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {t.features.specs.tauriDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
              <RefreshCw className="size-4" aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-semibold tracking-tight">
                  {t.features.specs.updaterTitle}
                </h3>
                <span className="font-mono text-xs text-primary">
                  {t.features.specs.updaterBadge}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {t.features.specs.updaterDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-primary">
              <HardDriveDownload className="size-4" aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-base font-semibold tracking-tight">
                  {t.features.specs.installerTitle}
                </h3>
                <span className="font-mono text-xs text-primary">
                  {t.features.specs.installerBadge}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {t.features.specs.installerDesc}
              </p>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  )
}
