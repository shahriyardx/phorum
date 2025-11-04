import { useContext } from 'react'
import {
  SessionContext,
  type UserSessionResult,
} from '@/providers/SessionProvider'

const useSession = () => {
  const session = useContext(SessionContext) as UserSessionResult

  return session
}

export default useSession
