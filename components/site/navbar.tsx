'use client'

import { useI18n, type Locale } from './i18n'
import { LogoMark, REPO_URL } from './primitives'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { locale, setLocale, t } = useI18n()

  const links = [
    { href: '#features', label: t.nav.audioUi },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#download', label: t.nav.download },
  ]

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex items-center justify-center gap-3 px-4">
      {/* Main navigation pill */}
      <nav
        aria-label="Main"
        className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0d0b0a]/80 py-2 pr-2 pl-4 backdrop-blur-xl"
      >
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center overflow-hidden rounded-full border border-white/15 bg-black">
            <LogoMark className="size-6 rounded-none" />
          </span>
          Resonance
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            {t.nav.github}
          </a>
          <a
            href="#download"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t.nav.download}
          </a>
        </div>
      </nav>

      {/* Separate standalone localization capsule [ EN | RU ] right next to the navbar */}
      <div
        role="group"
        aria-label="Language switcher"
        className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-[#0d0b0a]/80 p-1.5 backdrop-blur-xl"
      >
        {(['en', 'ru'] as Locale[]).map((lang) => {
          const active = locale === lang
          return (
            <button
              key={lang}
              type="button"
              aria-pressed={active}
              onClick={() => setLocale(lang)}
              className={cn(
                'rounded-full px-3 py-1.5 font-mono text-xs font-semibold uppercase transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                active
                  ? 'bg-primary text-primary-foreground shadow-[0_0_16px_oklch(0.88_0.07_55/30%)]'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {lang}
            </button>
          )
        })}
      </div>
    </header>
  )
}
