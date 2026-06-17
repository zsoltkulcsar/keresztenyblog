export type UserRole = 'admin' | 'editor'

type UserLike = {
  role?: string | null
} | null
type BooleanAccess = (args: { req: any }) => boolean | Promise<boolean>

function getRole(user: UserLike): UserRole | null {
  if (user?.role === 'admin' || user?.role === 'editor') {
    return user.role
  }

  return null
}

export function isAdmin(user: UserLike) {
  return getRole(user) === 'admin'
}

export function isEditor(user: UserLike) {
  return getRole(user) === 'editor'
}

export function isAdminOrEditor(user: UserLike) {
  return isAdmin(user) || isEditor(user)
}

export function allowAdminOnly(): BooleanAccess {
  return ({ req }) => isAdmin(req.user as UserLike)
}

export function allowEditorOrAdmin(): BooleanAccess {
  return ({ req }) => isAdminOrEditor(req.user as UserLike)
}

export function allowPublicRead(): BooleanAccess {
  return () => true
}

export function allowFirstAdminOrAdminOnly(): BooleanAccess {
  return async ({ req }) => {
    if (isAdmin(req.user as UserLike)) {
      return true
    }

    const existingUsers = await req.payload.count({
      collection: 'users',
      overrideAccess: true,
    })

    return existingUsers.totalDocs === 0
  }
}

export function canManageCollection(user: UserLike) {
  return isAdminOrEditor(user)
}
