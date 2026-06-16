'use client'

import { useEffect, useState } from 'react'

type ReadingProgressProps = {
  label?: string
}

export function ReadingProgress({ label = 'Reading progress' }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const value = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 100
      setProgress(value)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="reading-progress" aria-label={label}>
      <span style={{ width: `${progress}%` }} />
    </div>
  )
}

