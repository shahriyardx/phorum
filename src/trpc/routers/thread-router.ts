import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../init'
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
  allThreads: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.thread.findMany({
      include: {
        Category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    })
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.thread.findUnique({
        where: {
          id: input.id,
        },
      })
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: ThreadSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.thread.update({
        where: {
          id: input.id,
        },
        data: {
          ...input.data,
        },
      })
    }),
})
