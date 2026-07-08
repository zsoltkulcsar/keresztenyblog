import type { Payload } from 'payload'

const DEV_ADMIN = {
  email: 'dev@payloadcms.com',
  password: 'test',
  role: 'admin' as const,
}

export async function seedDevAdminIfNeeded(payload: Payload): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  const existing = await payload.find({
    collection: 'users',
    limit: 1,
    where: {
      email: {
        equals: DEV_ADMIN.email,
      },
    },
    overrideAccess: true,
  })

  const existingUser = existing.docs[0]

  if (existingUser?.id) {
    await payload.update({
      id: existingUser.id,
      collection: 'users',
      data: {
        password: DEV_ADMIN.password,
        role: DEV_ADMIN.role,
      },
      overrideAccess: true,
    })
    return
  }

  try {
    await payload.create({
      collection: 'users',
      data: DEV_ADMIN,
      draft: true,
      overrideAccess: true,
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('email')) {
      return
    }

    throw error
  }

  payload.logger.info('Seeded local dev admin user dev@payloadcms.com / test')
}
