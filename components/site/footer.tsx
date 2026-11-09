import { LogoMark, RELEASES_URL, REPO_URL } from './primitives'

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center overflow-hidden rounded-full border border-white/15 bg-black">
              <LogoMark className="size-full rounded-none object-cover" />
            </span>
            Resonance
          </a>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A desktop player for SoundCloud and YouTube Music. Resonance is an independent project and is not affiliated with SoundCloud or YouTube Music.
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-12 text-sm">
          <ul className="space-y-3">
            <li>
              <a href="#features" className="text-muted-foreground hover:text-foreground">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                How it works
              </a>
            </li>
            <li>
              <a href="#download" className="text-muted-foreground hover:text-foreground">
                Download
              </a>
            </li>
          </ul>
          <ul className="space-y-3">
            <li>
              <a href={REPO_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                GitHub
              </a>
            </li>
            <li>
              <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                Releases
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
