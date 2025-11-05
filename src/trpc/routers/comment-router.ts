import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../init'

export const commentRouter = createTRPCRouter({
  topLevelComments: publicProcedure
    .input(z.object({ threadId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.comment.findMany({
        where: {
          threadId: input.threadId,
          parentId: null,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              replies: true,
            },
          },
        },
      })
    }),
  commentReplies: publicProcedure
    .input(z.object({ threadId: z.string(), parentId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.comment.findMany({
        where: {
          threadId: input.threadId,
          parentId: input.parentId,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              replies: true,
            },
          },
        },
      })
    }),
  createComment: protectedProcedure
    .input(
      z.object({
        threadId: z.string().min(1, 'invalid comment id'),
        content: z.string().min(1, 'comment content is required'),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.comment.create({
        data: {
          content: input.content,
          threadId: input.threadId,
          userId: ctx.session.user.id,
        },
      })
    }),
  createReply: protectedProcedure
    .input(
      z.object({
        threadId: z.string().min(1, 'invalid comment id'),
        content: z.string().min(1, 'comment content is required'),
        parentId: z.string().min(1, 'invalid parent id'),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.comment.create({
        data: {
          content: input.content,
          threadId: input.threadId,
          userId: ctx.session.user.id,
          parentId: input.parentId,
        },
      })
    }),
})
