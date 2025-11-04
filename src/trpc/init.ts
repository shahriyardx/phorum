import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { initTRPC, TRPCError } from '@trpc/server'
import type { Session, User } from 'better-auth'

export type TRPCContext = {
  prisma: typeof prisma
  session: {
    user: User
    session: Session
  } | null
}

export async function createTRPCContext(opts: {
  req: Request
}): Promise<TRPCContext> {
  const authSession = await auth.api.getSession({
    headers: opts.req.headers,
  })

  return {
    prisma,
    session: authSession,
  }
}

const t = initTRPC.context<TRPCContext>().create()

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are not logged in',
    })

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  })
})

export const protectedProcedure = t.procedure.use(isAuthed)
