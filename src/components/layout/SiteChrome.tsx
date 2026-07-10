'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

const primaryLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/series', label: 'Series' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
]

const footerGroups = [
  {
    links: [
      { href: '/articles', label: 'Articles' },
      { href: '/series', label: 'Series' },
      { href: '/resources', label: 'Resources' },
      { href: '/books', label: 'Books' },
      { href: '/about', label: 'About' },
    ],
    title: 'Read',
  },
  {
    links: [
      { href: '/topics', label: 'Topics' },
      { href: '/audiences', label: 'Audiences' },
      { href: '/audiences/new-believers', label: 'New believers' },
      { href: '/topics/pastoral-theology', label: 'Pastoral theology' },
    ],
    title: 'Discover',
  },
  {
    links: [
      { href: '/about', label: 'Contact us' },
      { href: '/about', label: 'Our team' },
      { href: '/search', label: 'Search' },
    ],
    title: 'About',
  },
]

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-brand-block">
          <Link className="site-brand" href="/">
            Kovasz
          </Link>
        </div>

        <div className="site-nav-shell">
          <details className="site-nav-drawer">
            <summary className="site-nav-summary">Menu</summary>
            <nav className="site-nav" aria-label="Primary">
              {primaryLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <form action="/search" className="site-mobile-search" method="get" role="search">
                <label htmlFor="mobile-site-search">Search</label>
                <input id="mobile-site-search" name="q" placeholder="Search" type="search" />
              </form>
            </nav>
          </details>

          <nav className="site-nav site-nav-desktop" aria-label="Primary">
            {primaryLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-header-actions">
          <details className="site-search-popover">
            <summary aria-label="Open search" className="site-search-link">
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path
                  d="m20 20-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </summary>
            <form action="/search" className="site-header-search" method="get" role="search">
              <label htmlFor="site-header-search">Search</label>
              <input id="site-header-search" name="q" placeholder="Search" type="search" />
            </form>
          </details>
        </div>
      </header>

      <div className="site-frame">{children}</div>

      <footer className="site-footer" id="site-footer">
        <div className="site-footer-main">
          <Link className="site-footer-logo" href="/">
            Kovasz
          </Link>
          <div className="site-footer-columns">
            {footerGroups.map((group) => (
              <div className="site-footer-group" key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <Link href={link.href} key={`${group.title}-${link.label}`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>2026 Kovasz. All rights reserved.</p>
          <div>
            <Link href="/about">Contact</Link>
            <Link href="/search">Search</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
