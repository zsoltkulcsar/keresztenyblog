'use client'

import { useMemo, useState } from 'react'

import { getTranslations } from '@/lib/i18n'

const t = getTranslations()

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
      setMessage(t.common.linkCopied)
    } catch {
      setMessage(t.common.copyFailed)
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
      setMessage(t.common.shared)
    } catch {
      setMessage(t.common.shareCancelled)
    }
  }

  return (
    <div className="share-tools" aria-label={t.common.articleUtilities}>
      <button type="button" onClick={share}>
        {t.common.share}
      </button>
      <button type="button" onClick={copyLink}>
        {t.common.copyLink}
      </button>
      {!canShare ? <span>{t.common.shareClipboardFallback}</span> : null}
      {message ? <span aria-live="polite">{message}</span> : null}
    </div>
  )
}
