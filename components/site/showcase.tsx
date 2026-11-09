import Image from 'next/image'
import { Reveal, SectionHeading } from './primitives'

export function Showcase() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-x-clip px-6 pb-24 md:pb-32">
      <SectionHeading
        badge="The app"
        title="Your whole library, one calm window"
        description="Browse SoundCloud and YouTube Music playlists side by side, follow lyrics live and keep the queue within reach."
      />
      <Reveal delay={200} className="relative mt-14">
        <div
          aria-hidden="true"
          className="absolute -inset-x-10 -top-10 -bottom-10 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_40%,oklch(0.5_0.08_45/45%),transparent_70%)] blur-2xl"
        />
        <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-2 shadow-[0_40px_120px_-30px_oklch(0.6_0.1_45/40%)]">
          <Image
            src="/images/resonance-app.jpg"
            alt="Resonance home screen showing SoundCloud and YouTube Music playlists, the now playing panel with synced lyrics and the player bar"
            width={1280}
            height={673}
            sizes="(min-width: 1152px) 1120px, 100vw"
            className="h-auto w-full rounded-[1.25rem]"
          />
        </div>
      </Reveal>
    </section>
  )
}
