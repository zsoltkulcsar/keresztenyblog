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
    { label: 'Források', url: '/resources' },
  ],
  doctrine:
    'A Szentírás marad a végső tekintély a tanításban, feddésben és formálódásban. A kiadvány egyértelműen keresztény, protestáns jellegű és pásztori hangvételű.',
  editorialPosture:
    'Az írás maradjon nyugodt, komoly és olvasható. Először a Szentírás áll, utána következnek a tanulmányozást segítő anyagok, a díszítő zaj pedig maradjon háttérben.',
  manifesto:
    'A Kovász azért van, hogy mélyítse a Biblia megértését, lelki útmutatást adjon, és világosan beszéljen a mindennapi keresztény életről új hívőknek és érett olvasóknak egyaránt.',
  mission:
    'Új keresztényeket tanítani, vezetőket támogatni, és olyan tartalmat adni, amely a Szentírás-központú íráson keresztül erősíti a mindennapi kapcsolatot Istennel.',
  teamMembers: [
    {
      bio: 'Vezeti a szerkesztői irányt, és a kiadványt a Szentírás középpontjában tartja.',
      name: 'Szerkesztőség',
      role: 'Szerkesztői irány',
    },
    {
      bio: 'A pásztori tanítással, teológiai átnézéssel és a hosszabb cikkek folyamatával foglalkozik.',
      name: 'Pásztori rovat',
      role: 'Teológiai átnézés',
    },
  ],
  visualIdentity:
    'A sötét szerkesztőségi keret, a nagy kontrasztú tipográfia és a visszafogott elrendezés közel tartja az oldalt a kívánt irányhoz, miközben mobilon és asztali nézetben is olvasható marad.',
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
