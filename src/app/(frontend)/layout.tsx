import type { ReactNode } from 'react'
import './styles.css'

export const metadata = {
  description: 'Kovasz is a Hungarian Christian publication for articles, series, and study resources.',
  title: 'Kovasz',
}

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props

  return <>{children}</>
}
