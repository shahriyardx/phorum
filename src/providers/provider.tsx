'use client'

import type { ReactNode } from 'react'
import SessionProvider from './session-provider'
import { TRPCProvider } from '@/trpc/client'
import { SocketProvider } from './socket-provider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SocketProvider>
      <SessionProvider>
        <TRPCProvider>{children}</TRPCProvider>
      </SessionProvider>
    </SocketProvider>
  )
}

export default Providers
