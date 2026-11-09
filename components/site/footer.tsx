'use client'

import { useI18n } from './i18n'
import { LogoMark, RELEASES_URL, REPO_URL } from './primitives'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center overflow-hidden rounded-full border border-white/15 bg-black">
              <LogoMark className="size-6 rounded-none" />
            </span>
            Resonance
          </a>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t.footer.description}
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-12 text-sm">
          <ul className="space-y-3">
            <li>
              <a href="#features" className="text-muted-foreground hover:text-foreground">
                {t.nav.audioUi}
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                {t.nav.howItWorks}
              </a>
            </li>
            <li>
              <a href="#download" className="text-muted-foreground hover:text-foreground">
                {t.nav.download}
              </a>
            </li>
          </ul>
          <ul className="space-y-3">
            <li>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                {t.nav.github}
              </a>
            </li>
            <li>
              <a
                href={RELEASES_URL}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                {t.footer.releases}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
