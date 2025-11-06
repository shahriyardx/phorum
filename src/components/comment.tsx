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

type Props = {
  comment: Comment & {
    author: Pick<User, 'name' | 'email'>
    _count: {
      replies: number
    }
  }
  socket: Socket
}

const CommentCard = ({ comment, socket }: Props) => {
  const { session: _session } = useSession()
  const [showForm, setShowForm] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
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
    socket.on(
      'message',
      ({
        room,
        message,
      }: {
        room: string
        message: Comment & { author: Pick<User, 'name' | 'email'> }
      }) => {
        if (
          room === comment.threadId &&
          message.parentId === comment.parentId
        ) {
          setReplies([...replies, { ...message, _count: { replies: 0 } }])
        }
      },
    )
  }, [socket, replies, comment])

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
                }}
                socket={socket}
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
