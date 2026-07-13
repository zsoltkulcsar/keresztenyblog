'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { getTranslations } from '@/lib/i18n'

const t = getTranslations()

const primaryLinks = [
  { href: '/articles', label: t.chrome.links.articles },
  { href: '/series', label: t.chrome.links.series },
  { href: '/resources', label: t.chrome.links.resources },
  { href: '/about', label: t.chrome.links.about },
]

const footerGroups = [
  {
    links: [
      { href: '/articles', label: t.chrome.links.articles },
      { href: '/series', label: t.chrome.links.series },
      { href: '/resources', label: t.chrome.links.resources },
      { href: '/books', label: t.chrome.links.books },
      { href: '/about', label: t.chrome.links.about },
    ],
    title: t.chrome.footerGroups.read,
  },
  {
    links: [
      { href: '/topics', label: t.chrome.links.topics },
      { href: '/audiences', label: t.chrome.links.audiences },
      { href: '/audiences/new-believers', label: t.chrome.links.newBelievers },
      { href: '/topics/pastoral-theology', label: t.chrome.links.pastoralTheology },
    ],
    title: t.chrome.footerGroups.discover,
  },
  {
    links: [
      { href: '/about', label: t.chrome.links.contact },
      { href: '/about', label: t.chrome.links.team },
      { href: '/search', label: t.chrome.links.search },
    ],
    title: t.chrome.footerGroups.about,
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
            <summary className="site-nav-summary">{t.chrome.menu}</summary>
            <nav className="site-nav" aria-label={t.chrome.primaryNav}>
              {primaryLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
              <form action="/search" className="site-mobile-search" method="get" role="search">
                <label htmlFor="mobile-site-search">{t.chrome.search}</label>
                <input id="mobile-site-search" name="q" placeholder={t.chrome.search} type="search" />
              </form>
            </nav>
          </details>

          <nav className="site-nav site-nav-desktop" aria-label={t.chrome.primaryNav}>
            {primaryLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-header-actions">
          <details className="site-search-popover">
            <summary aria-label={t.chrome.searchOpen} className="site-search-link">
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
              <label htmlFor="site-header-search">{t.chrome.search}</label>
              <input id="site-header-search" name="q" placeholder={t.chrome.search} type="search" />
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
          <p>2026 Kovasz. {t.chrome.allRightsReserved}</p>
          <div>
            <Link href="/about">{t.chrome.links.contact}</Link>
            <Link href="/search">{t.chrome.links.search}</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
