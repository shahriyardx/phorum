import { useContext } from 'react'
import {
  SessionContext,
  type UserSessionResult,
} from '@/providers/session-provider'

const useSession = () => {
  const session = useContext(SessionContext) as UserSessionResult

  const getInitials = (name: string) => {
    if (!name) return '?'

    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase()
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  return {
    ...session,
    user: session.user
      ? { ...session.user, initials: getInitials(session.user?.name || '?') }
      : null,
  }
}

export default useSession
