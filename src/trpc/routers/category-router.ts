import { createTRPCRouter, publicProcedure } from '../init'

export const categoryRouter = createTRPCRouter({
  allCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany()
  }),
})
