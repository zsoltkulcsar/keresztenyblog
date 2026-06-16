import type { ReactNode } from 'react'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'

export const metadata = {
  description: 'Kovasz is a Hungarian Christian publication for articles, series, and study resources.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    description: 'Kovasz is a Hungarian Christian publication for articles, series, and study resources.',
    siteName: 'Kovasz',
    title: 'Kovasz',
    type: 'website',
    url: siteUrl,
  },
  title: {
    default: 'Kovasz',
    template: '%s | Kovasz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kovasz',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  )
}
