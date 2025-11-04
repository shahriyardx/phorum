import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '../init'

export const categoryRouter = createTRPCRouter({
  allCategories: baseProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany()
  }),
})
