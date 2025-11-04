import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../init'
import { ThreadSchema } from '@/schema/thread'

export const threadRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ThreadSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.thread.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
          isFlagged: false,
        },
      })
    }),
})
