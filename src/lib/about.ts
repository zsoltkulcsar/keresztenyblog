import { getCmsPayload } from '@/lib/server/payload'

export type AboutTeamMember = {
  bio: string
  name: string
  role: string
}

export type AboutContactLink = {
  label: string
  url: string
}

export type AboutPageContent = {
  contactLinks: AboutContactLink[]
  doctrine: string
  editorialPosture: string
  manifesto: string
  mission: string
  teamMembers: AboutTeamMember[]
  visualIdentity: string
}

const fallbackAboutPage: AboutPageContent = {
  contactLinks: [
    { label: 'Email', url: 'mailto:hello@kovasz.hu' },
    { label: 'Resources', url: '/resources' },
  ],
  doctrine:
    'Scripture remains the final authority for teaching, correction, and formation. The publication is explicitly Christian, Protestant in shape, and pastoral in tone.',
  editorialPosture:
    'The writing should stay calm, serious, and readable. Scripture comes first, supporting study helps follow, and decorative noise should stay out of the way.',
  manifesto:
    'Kovasz exists to deepen understanding of the Bible, give spiritual guidance, and speak clearly about daily Christian life for new believers and mature readers alike.',
  mission:
    'Teach new Christians, support leaders, and provide content that strengthens daily relationship with God through Scripture-centered writing.',
  teamMembers: [
    {
      bio: 'Leads the editorial direction and keeps the publication centered on Scripture.',
      name: 'Editorial Team',
      role: 'Editorial direction',
    },
    {
      bio: 'Handles pastoral teaching, theological review, and the long-form article pipeline.',
      name: 'Pastoral Desk',
      role: 'Theological review',
    },
  ],
  visualIdentity:
    'A dark editorial frame, high-contrast typography, and restrained layout choices keep the site close to the reference direction while staying readable on mobile and desktop.',
}

function normalizeAboutPage(doc: any): AboutPageContent {
  return {
    contactLinks: Array.isArray(doc.contactLinks)
      ? doc.contactLinks
          .map((link: any) => ({ label: String(link?.label ?? ''), url: String(link?.url ?? '') }))
          .filter((link: AboutContactLink) => Boolean(link.label && link.url))
      : [],
    doctrine: String(doc.doctrine ?? ''),
    editorialPosture: String(doc.editorialPosture ?? ''),
    manifesto: String(doc.manifesto ?? ''),
    mission: String(doc.mission ?? ''),
    teamMembers: Array.isArray(doc.teamMembers)
      ? doc.teamMembers
          .map((member: any) => ({
            bio: String(member?.bio ?? ''),
            name: String(member?.name ?? ''),
            role: String(member?.role ?? ''),
          }))
          .filter((member: AboutTeamMember) => Boolean(member.name))
      : [],
    visualIdentity: String(doc.visualIdentity ?? ''),
  }
}

export function getFallbackAboutPage() {
  return fallbackAboutPage
}

export async function loadAboutPageContent() {
  const payload = await getCmsPayload()
  if (!payload) return fallbackAboutPage

  try {
    const result = await (payload as any).findGlobal({
      draft: false,
      slug: 'about-page',
    })

    if (result && (result.manifesto || result.mission || result.doctrine)) {
      return normalizeAboutPage(result)
    }
  } catch {
    return fallbackAboutPage
  }

  return fallbackAboutPage
}
