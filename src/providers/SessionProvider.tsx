'use client'

import { authClient } from '@/lib/auth-client'
import type { Session, User } from 'better-auth'
import { type ReactNode, createContext } from 'react'

export type UserSessionResult = {
  user: User | undefined
  session: Session | undefined
  isPending: boolean
}

export const SessionContext = createContext<UserSessionResult | null>(null)

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending } = authClient.useSession()

  return (
    <SessionContext.Provider
      value={{ session: data?.session, user: data?.user, isPending }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
