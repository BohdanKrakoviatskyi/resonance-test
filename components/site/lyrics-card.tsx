import Image from 'next/image'
import { GlassCard } from './primitives'

export function LyricsCard() {
  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Live synced lyrics</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Time-synced lines scroll with the track. Wrong match? Swap the lyrics source in one click.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
          Change lyrics
        </span>
      </div>

      <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#110d0b] shadow-[inset_0_1px_0_0_oklch(1_0_0/8%)]">
        {/* Ambient glow behind the real panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-4 h-36 rounded-full bg-[radial-gradient(circle,oklch(0.65_0.1_50/24%),transparent_70%)] blur-2xl"
        />

        <div className="relative mx-auto flex h-[280px] w-full items-start justify-center overflow-hidden px-3 pt-2 [mask-image:linear-gradient(to_bottom,black_0%,black_74%,transparent_100%)]">
          <Image
            src="/images/lyrics-panel.png"
            alt="Resonance Now Playing sidebar showing album art for 'права' by ooes, action buttons, and glowing time-synced Russian lyrics"
            width={373}
            height={992}
            className="h-auto w-full max-w-[290px] rounded-t-2xl object-cover object-bottom shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
            style={{ marginTop: '-175px' }}
          />
        </div>

        {/* Subtle top/bottom vignette to blend into the dark card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#110d0b]/55 via-transparent to-[#110d0b]/90"
        />
      </div>
    </GlassCard>
  )
}
