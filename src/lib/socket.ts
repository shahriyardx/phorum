'use client'

import { io, type Socket } from 'socket.io-client'

const g = globalThis as unknown as { __socket?: Socket }

function createSocket() {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL
  return io(url ?? undefined, {
    autoConnect: true,
    transports: ['websocket'],
    withCredentials: true,
  })
}

export function getSocket(): Socket {
  if (!g.__socket) {
    g.__socket = createSocket()
  }

  // biome-ignore lint/style/noNonNullAssertion: Not applicable
  return g.__socket!
}
