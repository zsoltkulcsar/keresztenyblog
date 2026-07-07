'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useState } from 'react'

const primaryLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/series', label: 'Series' },
  { href: '/resources', label: 'Resources' },
  { href: '/books', label: 'Books' },
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
      { href: '/search', label: 'Search' },
    ],
    title: 'Read',
  },
  {
    links: [
      { href: '/series', label: 'For new believers' },
      { href: '/series', label: 'For mature believers' },
      { href: '/books', label: 'Recommended books' },
      { href: '/resources', label: 'Scripture studies' },
      { href: '/articles', label: 'Topical guides' },
    ],
    title: 'Learn',
  },
  {
    links: [
      { href: '/about', label: 'Contact us' },
      { href: '/resources', label: 'Submit a question' },
      { href: '/about', label: 'Our team' },
      { href: '/about', label: 'Support' },
      { href: '/about', label: 'Help center' },
    ],
    title: 'About Kovasz',
  },
  {
    links: [
      { href: '/about', label: 'FAQ' },
      { href: '/search', label: 'Feedback' },
      { href: '/about', label: 'Report an issue' },
      { href: '/about', label: 'Privacy policy' },
      { href: '/about', label: 'Terms of service' },
    ],
    title: 'Help',
  },
  {
    links: [
      { href: '/articles', label: 'Articles' },
      { href: '/series', label: 'Series' },
      { href: '/resources', label: 'Resources' },
      { href: '/books', label: 'Books' },
      { href: '/about', label: 'About' },
      { href: '/search', label: 'Search' },
    ],
    title: 'Explore',
  },
]

export function SiteChrome({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
          <form
            action="/search"
            className={`site-header-search ${isSearchOpen ? 'is-open' : ''}`}
            method="get"
            role="search"
          >
            <label htmlFor="site-header-search">Search</label>
            <input
              id="site-header-search"
              name="q"
              placeholder="Search"
              tabIndex={isSearchOpen ? 0 : -1}
              type="search"
            />
          </form>
          <button
            aria-controls="site-header-search"
            aria-expanded={isSearchOpen}
            aria-label="Open search"
            className="site-search-link"
            onClick={() => setIsSearchOpen((open) => !open)}
            type="button"
          >
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
              <path
                d="m20 20-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
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
            <Link href="/about">Privacy policy</Link>
            <Link href="/about">Terms of service</Link>
            <Link href="/about">Cookie settings</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
