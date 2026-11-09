import { LogoMark, REPO_URL } from './primitives'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#download', label: 'Download' },
]

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-white/10 bg-black/40 py-2 pr-2 pl-4 backdrop-blur-xl"
      >
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center overflow-hidden rounded-full border border-white/15 bg-black">
            <LogoMark className="size-full rounded-none object-cover" />
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
            GitHub
          </a>
          <a
            href="#download"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  )
}
