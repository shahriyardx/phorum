'use client'

import type { ReactNode } from 'react'
import SessionProvider from './SessionProvider'
import { TRPCProvider } from '@/trpc/client'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </SessionProvider>
  )
}

export default Providers
