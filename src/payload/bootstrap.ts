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

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: DEV_ADMIN.email,
      },
    },
    overrideAccess: true,
  })

  await payload.create({
    collection: 'users',
    data: DEV_ADMIN,
    draft: true,
    overrideAccess: true,
  })

  payload.logger.info('Seeded local dev admin user dev@payloadcms.com / test')
}
