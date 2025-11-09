'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import useSession from '@/hooks/useSession'

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth/signin')
    }
  }, [isPending, session, router])

  if (isPending) {
    return <p>Loading...</p>
  }

  if (!session) {
    return <p>Redirecting to sign in...</p>
  }

  return <>{children}</>
}

export default RequireAuth
