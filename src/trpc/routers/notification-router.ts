import z from 'zod'
import { createTRPCRouter, protectedProcedure } from '../init'

export const notifRouter = createTRPCRouter({
  userNotifications: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.notification.findMany({
      where: {
        receiverId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
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
  }),
  deleteNotification: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.notification.delete({
        where: {
          id: input.id,
        },
      })
    }),
  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.notification.update({
        where: {
          id: input.id,
        },
        data: {
          status: 'READ',
        },
      })
    }),
  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.notification.updateMany({
      where: {
        receiverId: ctx.session.user.id,
      },
      data: {
        status: 'READ',
      },
    })
  }),
})
