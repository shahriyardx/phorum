'use client'

import { createContext, useContext, useEffect, useMemo } from 'react'
import type { Socket } from 'socket.io-client'
import { getSocket } from '@/lib/socket'

const SocketCtx = createContext<Socket | null>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = useMemo(() => getSocket(), [])

  useEffect(() => {
    const onConnect = () => console.log('socket connected', socket.id)
    const onError = (err: unknown) => console.error('socket error', err)

    socket.on('connect', onConnect)
    socket.on('connect_error', onError)

    return () => {
      socket.off('connect', onConnect)
      socket.off('connect_error', onError)
    }
  }, [socket])

  return <SocketCtx.Provider value={socket}>{children}</SocketCtx.Provider>
}

export function useSocket(): Socket {
  const s = useContext(SocketCtx)
  if (!s) throw new Error('useSocket must be used inside <SocketProvider>')
  return s
}
