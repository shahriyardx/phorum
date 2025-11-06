'use client'

import CommentCard from '@/components/comment'
import CommentForm from '@/components/comment-form'
import ForumLayout from '@/components/forum-layout'
import MarkdownRenderer from '@/components/markdown-renderer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { socket } from '@/lib/socket'
import { trpc } from '@/trpc/client'
import type { Comment, User } from '@/generated/zod'
import {
  ArrowLeft,
  EyeIcon,
  MessageCircleIcon,
  SparklesIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export type SocketMessage = {
  room: string
} & (
  | {
      type: 'comment'
      message: Comment & { author: Pick<User, 'name' | 'email' | 'id'> }
    }
  | { type: 'deleteComment'; message: Pick<Comment, 'id' | 'parentId'> }
)

const Page = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = trpc.thread.getDetailsById.useQuery({
    id,
  })
  const { data: commentsData } = trpc.comment.topLevelComments.useQuery({
    threadId: id,
  })
  const [showSummary, setShowSummary] = useState(false)
  const [comments, setComments] = useState(commentsData || [])

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData)
    }
  }, [commentsData])

  useEffect(() => {
    socket.connect()

    socket.on('connect', () => {
      socket.emit('join', id)
    })

    socket.on('message', ({ room, type, message }: SocketMessage) => {
      if (room !== id) return
      if (type === 'comment') {
        if (!message.parentId) {
          const newComments = [
            ...comments,
            {
              ...message,
              _count: {
                replies: 0,
              },
            },
          ]
          setComments(newComments)
        } else {
          const newComments = comments.map((comment) =>
            comment.id === message.parentId
              ? {
                  ...comment,
                  _count: { replies: comment._count.replies + 1 },
                }
              : comment,
          )

          setComments(newComments)
        }
      }

      if (type === 'deleteComment') {
        const oldComments = [...comments]
        const newComments = oldComments.filter(
          (comment) => comment.id !== message.id,
        )

        setComments(newComments)
      }
    })

    return () => {
      socket.disconnect()
    }
  }, [id, comments])

  return (
    <ForumLayout>
      {isLoading && <p>Loading...</p>}

      {data && (
        <div>
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
                  <span>24 Replies</span>
                </div>

                <div className="flex items-center gap-2">
                  <EyeIcon size={20} className="text-muted-foreground" />
                  <span>2500 Views</span>
                </div>
              </div>
            </div>

            <div className="py-5">
              <Button
                disabled={showSummary}
                onClick={() => setShowSummary(true)}
              >
                <SparklesIcon /> Generate AI Summary
              </Button>

              {showSummary && (
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
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Delectus odit hic numquam rem omnis aliquam,
                        consectetur exercitationem labore recusandae iste
                        necessitatibus tempore a facilis, cum id fugiat est
                        nesciunt eius tenetur ad odio? Maxime eos et quasi.
                        Minus autem eos error veritatis vitae repellat
                        quibusdam. Ducimus ullam praesentium et consequatur.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5">
              <MarkdownRenderer content={data.content} />
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold text-muted-foreground">
                Comments
              </h2>
              <div className="mt-2">
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
                <CommentForm
                  socket={socket}
                  threadId={id}
                  onSuccess={(data) => {
                    socket.emit('message', {
                      room: id,
                      message: data,
                    })
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </ForumLayout>
  )
}

export default Page
