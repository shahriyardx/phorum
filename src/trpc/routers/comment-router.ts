import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../init'
import { getCommentProfanityData } from '@/lib/ai'
import { TRPCError } from '@trpc/server'

export const commentRouter = createTRPCRouter({
  topLevelComments: publicProcedure
    .input(z.object({ threadId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.comment.findMany({
        where: {
          threadId: input.threadId,
          parentId: null,
        },
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          author: {
            select: {
              id: true,
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
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          author: {
            select: {
              id: true,
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
      const text = await getCommentProfanityData(
        JSON.stringify({ content: input.content }),
      )

      const aiData = JSON.parse(text) as {
        isFlagged: boolean
        flagReason: string
      }

      if (aiData.isFlagged) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: aiData.flagReason,
        })
      }

      const comment = await ctx.prisma.comment.create({
        data: {
          content: input.content,
          threadId: input.threadId,
          userId: ctx.session.user.id,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      })

      const thread = await ctx.prisma.thread.findUnique({
        where: {
          id: input.threadId,
        },
      })

      const notifications = []

      if (thread && thread.userId !== ctx.session.user.id) {
        const notification = await ctx.prisma.notification.create({
          data: {
            type: 'THREAD_COMMENT',
            senderId: ctx.session.user.id,
            receiverId: thread?.userId,
            threadId: input.threadId,
          },
          include: {
            sender: {
              select: {
                name: true,
              },
            },
            thread: {
              select: {
                title: true,
              },
            },
          },
        })

        notifications.push(notification)
      }

      return { comment, notifications: notifications }
    }),
  deleteComment: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.findUnique({
        where: {
          id: input.id,
        },
      })
      if (!comment) {
        throw new Error('comment not found')
      }

      if (comment.userId !== ctx.session.user.id) {
        throw new Error('you are not authorized to delete this comment')
      }

      return await ctx.prisma.comment.delete({
        where: {
          id: input.id,
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
      const text = await getCommentProfanityData(
        JSON.stringify({ content: input.content }),
      )

      const aiData = JSON.parse(text) as {
        isFlagged: boolean
        flagReason: string
      }

      if (aiData.isFlagged) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: aiData.flagReason,
        })
      }

      const comment = await ctx.prisma.comment.create({
        data: {
          content: input.content,
          threadId: input.threadId,
          userId: ctx.session.user.id,
          parentId: input.parentId,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      const parentComment = await ctx.prisma.comment.findUnique({
        where: {
          id: input.parentId,
        },
      })

      const thread = await ctx.prisma.thread.findUnique({
        where: {
          id: input.threadId,
        },
      })

      const notifications = []

      if (thread && thread.userId !== parentComment?.userId) {
        const notification1 = await ctx.prisma.notification.create({
          data: {
            type: 'THREAD_COMMENT',
            senderId: ctx.session.user.id,
            receiverId: thread?.userId,
            threadId: input.threadId,
            commentId: input.parentId,
          },
          include: {
            sender: {
              select: {
                name: true,
              },
            },
            thread: {
              select: {
                title: true,
              },
            },
          },
        })

        notifications.push(notification1)
      }

      if (parentComment) {
        const notification2 = await ctx.prisma.notification.create({
          data: {
            type: 'REPLY',
            senderId: ctx.session.user.id,
            receiverId: parentComment?.userId,
            threadId: input.threadId,
            commentId: input.parentId,
          },
          include: {
            sender: {
              select: {
                name: true,
              },
            },
            thread: {
              select: {
                title: true,
              },
            },
          },
        })

        notifications.push(notification2)
      }

      return { comment, notifications: notifications }
    }),
})
