'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { SendIcon } from 'lucide-react'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import type { Comment, Notification } from '@/generated/zod'
import type { Socket } from 'socket.io-client'

const CommentSchema = z.object({
  content: z
    .string('please type your comment')
    .nonempty('please type your comment')
    .min(1, 'plese type your comment'),
})

const CommentForm = ({
  threadId,
  parentId,
  placeholder,
  onSuccess,
  socket,
  shrink,
}: {
  threadId: string
  parentId?: string
  placeholder?: string
  onSuccess?: ({
    comment,
    notifications,
  }: {
    comment: Comment
    notifications: Notification[]
  }) => void
  socket: Socket
  shrink?: boolean
}) => {
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
  })

  const { mutate: comment, isPending: commentIsPending } =
    trpc.comment.createComment.useMutation({
      onSuccess: (data) => {
        form.reset({ content: '' })

        onSuccess?.(data)

        socket.emit('message', {
          room: data.comment.threadId,
          type: 'comment',
          message: data.comment,
        })

        data.notifications.forEach((notification) => {
          socket.emit('message', {
            type: 'notification',
            room: `notifications:${notification.receiverId}`,
            message: notification,
          })
        })
      },
      onError: (e) => {
        form.setError('content', {
          message: e.message,
          type: 'validate',
        })
        toast.error(e.message)
      },
    })
  const { mutate: reply, isPending: replyIsPending } =
    trpc.comment.createReply.useMutation({
      onSuccess: (data) => {
        form.reset({ content: '' })
        if (onSuccess) {
          onSuccess(data)
        }

        socket.emit('message', {
          room: data.comment.threadId,
          type: 'comment',
          message: data.comment,
        })

        data.notifications.forEach((notification) => {
          socket.emit('message', {
            type: 'notification',
            room: `notifications:${notification.receiverId}`,
            message: notification,
          })
        })
      },
      onError: (e) => {
        toast.error(e.message)
      },
    })

  const handleComment = (values: z.infer<typeof CommentSchema>) => {
    if (parentId) {
      reply({
        content: values.content,
        parentId,
        threadId,
      })
    } else {
      comment({
        threadId,
        content: values.content,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleComment)}>
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    className={shrink ? 'h-auto' : 'h-64'}
                    placeholder={placeholder || 'write something cool here...'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {!shrink && (
                  <FormDescription>
                    Comments are being moderated by AI
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <Button disabled={commentIsPending || replyIsPending} size={'icon'}>
            <SendIcon />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CommentForm
