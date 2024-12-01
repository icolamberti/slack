export type UserType = {
  id: number
  name: string
  email: string
  email_verified_at?: string
  avatar?: string
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: UserType
  }
  flash?: {
    [key in 'status' | 'success' | 'error']?: string
  }
}
