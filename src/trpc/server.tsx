import 'server-only'
import { createHydrationHelpers } from '@trpc/react-query/rsc'
import { headers } from 'next/headers'
import { createCallerFactory, createTRPCContext } from './init'
import { makeQueryClient } from './query-client'
import { appRouter } from './routers/_app'

export const getQueryClient = makeQueryClient

export const caller = createCallerFactory(appRouter)(async () =>
  // biome-ignore lint/suspicious/noExplicitAny: N/A
  createTRPCContext({ req: { headers: headers() } as any }),
)

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
)
