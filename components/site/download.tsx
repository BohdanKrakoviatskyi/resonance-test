import { Download as DownloadIcon, Laptop, Monitor, Terminal } from 'lucide-react'
import { GlassCard, REPO_URL, Reveal, SectionHeading } from './primitives'

const platforms = [
  {
    icon: Monitor,
    name: 'Windows',
    detail: 'Windows 10 / 11, 64-bit',
    primary: {
      label: 'Download',
      format: '.exe',
      href: '/api/download?platform=windows-exe',
    },
    secondary: [
      { label: '.msi installer', href: '/api/download?platform=windows-msi' },
    ],
  },
  {
    icon: Laptop,
    name: 'macOS',
    detail: 'macOS 13 or newer, Apple Silicon and Intel',
    primary: {
      label: 'Apple Silicon',
      format: '.dmg',
      href: '/api/download?platform=macos-arm64',
    },
    secondary: [
      { label: 'Intel (.dmg)', href: '/api/download?platform=macos-x64' },
    ],
  },
  {
    icon: Terminal,
    name: 'Linux',
    detail: 'Wayland or X11, PipeWire or PulseAudio',
    primary: {
      label: 'Download',
      format: '.AppImage',
      href: '/api/download?platform=linux-appimage',
    },
    secondary: [
      { label: '.deb', href: '/api/download?platform=linux-deb' },
      { label: '.rpm', href: '/api/download?platform=linux-rpm' },
    ],
  },
]

export function Download() {
  return (
    <section id="download" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 h-80 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.5_0.08_45/30%),transparent_70%)] blur-2xl"
      />
      <SectionHeading
        badge="Download"
        title="Get Resonance"
        description="Free and open source. Pick your platform and start listening."
      />

      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {platforms.map(({ icon: Icon, name, detail, primary, secondary }, index) => (
          <li key={name}>
            <Reveal delay={140 + index * 110} className="h-full">
              <GlassCard className="flex h-full flex-col p-6">
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                <a
                  href={primary.href}
                  download
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
                >
                  <DownloadIcon className="size-4" aria-hidden="true" />
                  {primary.label}
                  <span className="font-mono text-xs text-black/50">{primary.format}</span>
                </a>
                {secondary.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                    <span>Also available:</span>
                    {secondary.map((alt) => (
                      <a
                        key={alt.href}
                        href={alt.href}
                        download
                        className="font-mono text-foreground/80 underline underline-offset-4 transition-colors hover:text-primary"
                      >
                        {alt.label}
                      </a>
                    ))}
                  </div>
                )}
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={400}>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Prefer to build it yourself?{' '}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            Browse the source on GitHub
          </a>
          .
        </p>
      </Reveal>
    </section>
  )
}
