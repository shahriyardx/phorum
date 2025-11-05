import { createTRPCRouter } from '../init'
import { categoryRouter } from './category-router'
import { commentRouter } from './comment-router'
import { threadRouter } from './thread-router'

export const appRouter = createTRPCRouter({
  category: categoryRouter,
  thread: threadRouter,
  comment: commentRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
