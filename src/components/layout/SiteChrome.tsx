import Link from 'next/link'
import type { ReactNode } from 'react'

const primaryLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/series', label: 'Series' },
  { href: '/napi-ige', label: 'Daily Verse' },
  { href: '/authors', label: 'Authors' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
]

const utilityLinks = [
  { href: '/search', label: 'Search' },
  { href: '/admin', label: 'Admin' },
]

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-brand-block">
          <p className="site-imprint">Hungarian Christian journal</p>
          <Link className="site-brand" href="/">
            Kovasz
          </Link>
          <p className="site-tagline">
            Scripture-first articles, series, Daily Verse, and study resources.
          </p>
        </div>

        <nav className="site-nav" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions">
          {utilityLinks.map((link) => (
            <Link className={link.href === '/search' ? 'search-entry' : 'admin-link'} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </header>

      <div className="site-frame">{children}</div>

      <footer className="site-footer">
        <div>
          <p className="eyebrow">Browse</p>
          <div className="site-footer-links">
            {primaryLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Kovasz</p>
          <p className="site-footer-copy">
            A dark editorial frame for theological reading, Scripture, and practical Christian life.
          </p>
        </div>
      </footer>
    </div>
  )
}
