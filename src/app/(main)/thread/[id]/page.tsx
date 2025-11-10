'use client'

import CommentCard from '@/components/comment'
import CommentForm from '@/components/comment-form'
import MarkdownRenderer from '@/components/markdown-renderer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trpc } from '@/trpc/client'
import type { Comment, Thread, User } from '@/generated/zod'
import {
  ArrowLeft,
  Loader2,
  MessageCircleIcon,
  RefreshCcw,
  SparklesIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSocket } from '@/providers/socket-provider'

export type SocketMessage = {
  room: string
} & (
  | {
      type: 'comment'
      message: Comment & { author: Pick<User, 'name' | 'email' | 'id'> }
    }
  | { type: 'deleteComment'; message: Pick<Comment, 'id' | 'parentId'> }
  | {
      type: 'notification'
      message: Notification & {
        sender: Pick<User, 'name'>
        thread: Pick<Thread, 'title'>
      }
    }
)

const Page = () => {
  const socket = useSocket()
  const { id } = useParams<{ id: string }>()
  const {
    data,
    isLoading,
    refetch: refetchThread,
  } = trpc.thread.getDetailsById.useQuery({
    id,
  })
  const { data: commentsData } = trpc.comment.topLevelComments.useQuery({
    threadId: id,
  })

  const { mutate, isPending } = trpc.thread.getAiSummary.useMutation({
    onSuccess: (data) => {
      setShowSummary(true)
      setSummary(data.summary)
    },
  })

  const [showSummary, setShowSummary] = useState(false)
  const [comments, setComments] = useState(commentsData || [])
  const [summary, setSummary] = useState<string | null>(null)

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData)
    }
  }, [commentsData])

  useEffect(() => {
    socket.emit('join', id)

    socket.on('message', ({ room, type, message }: SocketMessage) => {
      if (room !== id) return
      if (type === 'comment') {
        if (message.threadId === id) {
          console.log('refetching')
          refetchThread()
        }

        if (!message.parentId) {
          setComments((prev) => [
            ...prev,
            {
              ...message,
              _count: {
                replies: 0,
              },
            },
          ])
        } else {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === message.parentId
                ? {
                    ...comment,
                    _count: { replies: comment._count.replies + 1 },
                  }
                : comment,
            ),
          )
        }
      }

      if (type === 'deleteComment') {
        setComments((prev) => prev.filter((c) => c.id !== message.id))
      }
    })

    return () => {
      socket.emit('leave', id)
    }
  }, [id, refetchThread, socket])

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {data && (
        <div>
          {data.isFlagged && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex gap-3">
                <div className="shrink-0 text-xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive">
                    This thread has been flagged
                  </h3>
                  <p className="text-sm text-destructive/80 mt-1">
                    {data.flagReason}
                  </p>
                </div>
              </div>
            </div>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 text-accent-foreground"
          >
            <ArrowLeft /> Back to forum
          </Link>

          <div className="mt-5">
            <div className="flex items-start gap-5">
              <h1 className="text-3xl font-bold">{data.title}</h1>
              <Badge>
                {data.Category.emoji} {data.Category.name}
              </Badge>
            </div>

            <p className="text-muted-foreground mt-2">{data.brief}</p>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-5">
                <div className="text-muted-foreground">
                  Started By{' '}
                  <span className="text-primary">{data.author.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircleIcon
                    size={18}
                    className="text-muted-foreground"
                  />
                  <span>{data._count.comments} Replies</span>
                </div>
              </div>
            </div>

            <div className="py-5">
              {!summary && (
                <Button disabled={isPending} onClick={() => mutate({ id })}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <SparklesIcon />
                  )}{' '}
                  Generate AI Summary
                </Button>
              )}

              {showSummary && (
                <div>
                  <div className="mt-4 p-4 bg-secondary/10 border border-secondary/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex gap-3">
                      <div className="shrink-0 text-xl">🤖</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground">
                            AI Thread Summary
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="cursor-pointer text-sm mt-2 text-muted-foreground flex items-center gap-2 hover:text-white"
                      type="button"
                      onClick={() => mutate({ id })}
                    >
                      {isPending ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <RefreshCcw size={13} />
                      )}
                      regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5">
              <MarkdownRenderer content={data.content} />
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-primary">Replies</h2>
              <div className="mt-2">
                {!comments.length && (
                  <p className="text-muted-foreground">
                    No replies yet, be the first to make a reply
                  </p>
                )}

                {comments?.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    socket={socket}
                  />
                ))}
              </div>
            </div>
            <div className="mt-10">
              <div>
                <CommentForm socket={socket} threadId={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page
