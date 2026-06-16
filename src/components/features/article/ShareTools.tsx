'use client'

import { useMemo, useState } from 'react'

type ShareToolsProps = {
  title: string
  url: string
}

export function ShareTools({ title, url }: ShareToolsProps) {
  const [message, setMessage] = useState('')
  const canShare = useMemo(() => typeof navigator !== 'undefined' && 'share' in navigator, [])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setMessage('Link copied')
    } catch {
      setMessage('Copy failed')
    }
  }

  const share = async () => {
    if (typeof navigator === 'undefined' || !('share' in navigator)) {
      await copyLink()
      return
    }

    try {
      await navigator.share({
        title,
        url,
      })
      setMessage('Shared')
    } catch {
      setMessage('Share cancelled')
    }
  }

  return (
    <div className="share-tools" aria-label="Article utilities">
      <button type="button" onClick={share}>
        Share
      </button>
      <button type="button" onClick={copyLink}>
        Copy link
      </button>
      {!canShare ? <span>Share uses clipboard on this browser.</span> : null}
      {message ? <span aria-live="polite">{message}</span> : null}
    </div>
  )
}

