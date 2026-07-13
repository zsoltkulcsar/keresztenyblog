import type { ReactNode } from 'react'
import { SiteChrome } from '@/components/layout/SiteChrome'
import { getTranslations } from '@/lib/i18n'
import './styles.css'

const t = getTranslations()

export const metadata = {
  description: t.layout.description,
  title: 'Kovasz',
}

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props

  return <SiteChrome>{children}</SiteChrome>
}
