type PreviewDoc = {
  slug?: string | null
  date?: string | null
}

export function buildPreviewUrl(basePath: string, doc: PreviewDoc) {
  const slug = doc.slug ?? doc.date
  if (!slug) {
    return null
  }

  return `${basePath}/${slug}`
}
