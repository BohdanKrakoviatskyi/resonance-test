'use client'

import { Download as DownloadIcon, Laptop, Monitor, Terminal } from 'lucide-react'
import { useI18n } from './i18n'
import { GlassCard, REPO_URL, Reveal, SectionHeading } from './primitives'

export function Download() {
  const { t } = useI18n()

  const platforms = [
    {
      icon: Monitor,
      name: 'Windows',
      detail: t.download.platforms.windowsDetail,
      primary: {
        label: t.download.platforms.windowsPrimary,
        format: '.exe',
        href: '/api/download?platform=windows-exe',
      },
      secondary: [
        {
          label: t.download.platforms.windowsSecondary,
          href: '/api/download?platform=windows-msi',
        },
      ],
    },
    {
      icon: Laptop,
      name: 'macOS',
      detail: t.download.platforms.macosDetail,
      primary: {
        label: t.download.platforms.macosPrimary,
        format: '.dmg',
        href: '/api/download?platform=macos-arm64',
      },
      secondary: [
        {
          label: t.download.platforms.macosSecondary,
          href: '/api/download?platform=macos-x64',
        },
      ],
    },
    {
      icon: Terminal,
      name: 'Linux',
      detail: t.download.platforms.linuxDetail,
      primary: {
        label: t.download.platforms.linuxPrimary,
        format: '.AppImage',
        href: '/api/download?platform=linux-appimage',
      },
      secondary: [
        { label: '.deb', href: '/api/download?platform=linux-deb' },
        { label: '.rpm', href: '/api/download?platform=linux-rpm' },
      ],
    },
  ]

  return (
    <section id="download" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 h-80 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,oklch(0.5_0.08_45/28%),transparent_70%)] blur-2xl"
      />
      <SectionHeading
        eyebrow={t.download.eyebrow}
        title={t.download.title}
        description={t.download.description}
        align="center"
      />

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {platforms.map(({ icon: Icon, name, detail, primary, secondary }, index) => (
          <li key={name}>
            <Reveal delay={100 + index * 100} className="h-full">
              <GlassCard className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                    {primary.format}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                <a
                  href={primary.href}
                  download
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <DownloadIcon className="size-4" aria-hidden="true" />
                  {primary.label}
                </a>
                {secondary.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                    <span>{t.download.also}</span>
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

      <Reveal delay={350}>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t.download.sourcePrefix}{' '}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            {t.download.sourceLink}
          </a>
          .
        </p>
      </Reveal>
    </section>
  )
}
