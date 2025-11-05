import type { Comment, User } from '@/generated/zod'
import moment from 'moment'
import Image from 'next/image'
import { useState } from 'react'
import CommentForm from './comment-form'
import { PlusCircle } from 'lucide-react'
import { trpc } from '@/trpc/client'

const CommentCard = ({
  comment,
}: {
  comment: Comment & { author: Pick<User, 'name' | 'email'> }
}) => {
  const [showForm, setShowForm] = useState(false)
  const { data: replies } = trpc.comment.commentReplies.useQuery({
    parentId: comment.id,
    threadId: comment.threadId,
  })

  return (
    <div className="flex items-start gap-3 border-l pl-5 pt-2">
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

            <button
              type="button"
              className="text-muted-foreground hover:text-primary cursor-pointer flex items-center gap-1"
            >
              <PlusCircle size={15} />
              View Replies
            </button>
          </div>
          {showForm && (
            <div className="mt-2">
              <CommentForm
                threadId={comment.threadId}
                parentId={comment.id}
                placeholder={`replying to @${comment.author.name}`}
                onSuccess={() => setShowForm(false)}
              />
            </div>
          )}

          <div className="mt-5">
            {replies?.map((reply) => (
              <CommentCard key={reply.id} comment={reply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentCard
