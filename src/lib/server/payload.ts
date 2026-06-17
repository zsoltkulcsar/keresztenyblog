import { getPayload } from 'payload'

import config from '@payload-config'

export async function getCmsPayload() {
  try {
    return await getPayload({ config })
  } catch {
    return null
  }
}
