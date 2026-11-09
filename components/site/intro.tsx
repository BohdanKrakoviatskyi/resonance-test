import { Library, Palette, SlidersHorizontal } from 'lucide-react'
import { GlassCard, Reveal, SectionHeading } from './primitives'

const pillars = [
  {
    icon: Library,
    title: 'Two libraries, one player',
  },
  {
    icon: SlidersHorizontal,
    title: 'Studio-grade sound controls',
  },
  {
    icon: Palette,
    title: 'Yours to restyle, end to end',
  },
]

export function Intro() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        badge="Introduction"
        title="What is Resonance?"
        description="A lightweight desktop player that pulls your playlists and likes from SoundCloud and YouTube Music, then plays them in one place with an equalizer, synced lyrics, crossfade and a look you control."
      />
      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title }, index) => (
          <li key={title}>
            <Reveal delay={150 + index * 110}>
              <GlassCard className="flex items-center gap-4 p-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="text-base font-medium text-balance">{title}</span>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
