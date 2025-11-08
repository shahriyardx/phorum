import { createTRPCRouter } from '../init'
import { categoryRouter } from './category-router'
import { commentRouter } from './comment-router'
import { threadRouter } from './thread-router'
import { userRouter } from './user-router'

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  thread: threadRouter,
  comment: commentRouter,
  user: userRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
