import z from 'zod'

export const ThreadSchema = z.object({
  title: z.string().nonempty('title is required').min(1, 'title is required'),
  brief: z.string().nonempty('brief is required').min(1, 'brief is required'),
  content: z
    .string()
    .nonempty('content is required')
    .min(1, 'content is required'),
  categoryId: z.string('please select a topic'),
})

export type ThreadType = z.infer<typeof ThreadSchema>
