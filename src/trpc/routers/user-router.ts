import { createTRPCRouter, protectedProcedure } from '../init'

export const userRouter = createTRPCRouter({
  stats: protectedProcedure.query(async ({ ctx }) => {
    const threads = await ctx.prisma.thread.count({
      where: {
        userId: ctx.session.user.id,
      },
    })

    const comments = await ctx.prisma.comment.count({
      where: {
        userId: ctx.session.user.id,
      },
    })

    return { threads, comments }
  }),
})
