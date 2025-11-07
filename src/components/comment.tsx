import type { Comment, User } from '@/generated/zod'
import moment from 'moment'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CommentForm from './comment-form'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { trpc } from '@/trpc/client'
import useSession from '@/hooks/useSession'
import type { Socket } from 'socket.io-client'
import * as motion from 'motion/react-client'
import type { SocketMessage } from '@/app/thread/[id]/page'

type Props = {
  comment: Comment & {
    author: Pick<User, 'name' | 'email' | 'id'>
    _count: {
      replies: number
    }
  }
  socket: Socket
}

const CommentCard = ({ comment: commentData, socket }: Props) => {
  const { user } = useSession()
  const [showForm, setShowForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [comment, setComment] = useState(commentData)

  const { mutate: deleteComment } = trpc.comment.deleteComment.useMutation({
    onSuccess: () => {
      socket.emit('message', {
        room: comment.threadId,
        type: 'deleteComment',
        message: {
          id: comment.id,
          parentId: comment.parentId,
        },
      })
    },
  })
  const { data: repliesData, refetch } = trpc.comment.commentReplies.useQuery(
    {
      parentId: comment.id,
      threadId: comment.threadId,
    },
    { enabled: showReplies, initialData: [] },
  )

  const [replies, setReplies] = useState(repliesData || [])

  useEffect(() => {
    if (repliesData) {
      setReplies(repliesData)
    }
  }, [repliesData])

  useEffect(() => {
    const handler = ({ room, type, message }: SocketMessage) => {
      if (room !== comment.threadId) return

      if (type === 'comment') {
        if (!message.parentId) return
        if (message.parentId === comment.id) {
          setReplies((prev) => [
            ...prev,
            {
              ...message,
              _count: { replies: 0 },
            },
          ])

          setComment((prev) => ({
            ...prev,
            _count: {
              replies: prev._count.replies + 1,
            },
          }))
        }
      }

      if (type === 'deleteComment') {
        setReplies((prev) => prev.filter((c) => c.id !== message.id))
      }
    }

    socket.on('message', handler)

    return () => {
      socket.off('message', handler)
    }
  }, [socket, comment.threadId, comment.id])

  const handleShowReplies = () => {
    setShowReplies(!showReplies)
    refetch()
  }
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      className="flex items-start gap-3 border-l pl-5 pt-2"
    >
      <Image
        width={200}
        height={200}
        src={`https://robohash.org/${comment.userId}.png?size=200x200&set=set1`}
        alt={'avatar'}
        className="w-10 h-10 bg-secondary rounded-full overflow-hidden"
      />

      <div className="flex-1">
        <h3>{comment.author.name}</h3>

        <p className="mt-2">{comment.content}</p>

        <div className="mt-3 w-full">
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground">
              {moment(comment.createdAt).fromNow()}
            </p>
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="text-muted-foreground hover:text-primary cursor-pointer"
            >
              Reply
            </button>

            {comment._count.replies > 0 && (
              <button
                type="button"
                onClick={handleShowReplies}
                className="text-muted-foreground hover:text-primary cursor-pointer flex items-center gap-1"
              >
                {showReplies ? (
                  <MinusCircle size={15} />
                ) : (
                  <PlusCircle size={15} />
                )}
                {showReplies ? 'Hide Replies' : `View Replies`}
              </button>
            )}

            {user && user.id === comment.userId && (
              <button
                type="button"
                className="text-muted-foreground hover:text-red-500 cursor-pointer flex items-center gap-1"
                onClick={() => deleteComment({ id: comment.id })}
              >
                delete
              </button>
            )}
          </div>
          {showForm && (
            <div className="mt-2">
              <CommentForm
                threadId={comment.threadId}
                parentId={comment.id}
                placeholder={`replying to @${comment.author.name}`}
                onSuccess={() => {
                  setShowForm(false)
                  setShowReplies(true)
                  refetch()
                }}
                socket={socket}
                shrink
              />
            </div>
          )}

          {showReplies && (
            <div className="mt-2">
              {replies?.map((reply) => (
                <CommentCard key={reply.id} comment={reply} socket={socket} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default CommentCard
