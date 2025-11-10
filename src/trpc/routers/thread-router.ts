import z from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../init'
import { ThreadSchema } from '@/schema/thread'
import { TRPCError } from '@trpc/server'
import { getAiResponse, getThreadProfanityData } from '@/lib/ai'

export const threadRouter = createTRPCRouter({
  topics: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany()
  }),
  create: protectedProcedure
    .input(ThreadSchema)
    .mutation(async ({ ctx, input }) => {
      const text = await getThreadProfanityData(
        JSON.stringify(
          { title: input.title, content: input.content, brief: input.brief },
          null,
          2,
        ),
      )

      const aiData = JSON.parse(text) as {
        isFlagged: boolean
        flagReason: string
      }

      return await ctx.prisma.thread.create({
        data: {
          ...input,
          ...aiData,
          userId: ctx.session.user.id,
        },
      })
    }),
  allThreads: publicProcedure
    .input(
      z.object({
        query: z.string().nullable(),
        topic: z.string().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log(input)

      return await ctx.prisma.thread.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          AND: [
            input.query
              ? {
                  title: {
                    contains: input.query,
                    mode: 'insensitive',
                  },
                }
              : {},
            input.topic
              ? {
                  categoryId: input.topic,
                }
              : {},
            {
              isFlagged: false,
            },
          ],
        },
        include: {
          Category: true,
          author: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              comments: true,
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
  getDetailsById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.thread.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Category: true,
          author: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      })
    }),

  updateThreadById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: ThreadSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const thread = await ctx.prisma.thread.findFirst({
        where: {
          id: input.id,
        },
      })

      if (!thread)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'thread not found' })

      if (thread.userId !== ctx.session.user.id)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'you are not allowed to edit this thread',
        })

      const text = await getThreadProfanityData(
        JSON.stringify(
          {
            title: input.data.title,
            content: input.data.content,
            brief: input.data.brief,
          },
          null,
          2,
        ),
      )

      const aiData = JSON.parse(text) as {
        isFlagged: boolean
        flagReason: string
      }

      return await ctx.prisma.thread.update({
        where: {
          id: input.id,
        },
        data: {
          ...input.data,
          ...aiData,
        },
      })
    }),

  getAiSummary: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const thread = await ctx.prisma.thread.findUnique({
        where: {
          id: input.id,
        },
        include: {
          comments: true,
        },
      })

      if (!thread)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Thread not found',
        })

      const text = await getAiResponse(
        `
          You are a helpful summarizer.

          You will be given a forum thread as JSON.
          The JSON contains fields like: title, body, author, category, comments, createdAt, etc.

          Your task:
          1) Understand the thread’s topic and context.
          2) Write a short summary of the main discussion.
          3) Ignore irrelevant details.
          4) DO NOT mention "JSON" or metadata in the summary.
          5) The summary must be concise (2–4 sentences).
 
          THREAD_JSON:
          ${JSON.stringify(thread, null, 2)}

          Respond with ONLY the summary text.
        `,
      )

      return { summary: text }
    }),
  userThreads: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.thread.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        Category: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    })
  }),
  deleteUserThreadById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.thread.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      })
    }),
})
