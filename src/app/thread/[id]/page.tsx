'use client'

import CommentCard from '@/components/comment'
import CommentForm from '@/components/comment-form'
import ForumLayout from '@/components/forum-layout'
import MarkdownRenderer from '@/components/markdown-renderer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trpc } from '@/trpc/client'
import {
  ArrowLeft,
  EyeIcon,
  MessageCircleIcon,
  SparklesIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const Page = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = trpc.thread.getDetailsById.useQuery({
    id,
  })
  const { data: comments } =
    trpc.comment.topLevelComments.useQuery({
      threadId: id,
    })
  const [showSummary, setShowSummary] = useState(false)

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
              <h2 className="text-2xl font-bold">Comments</h2>
              <div className="mt-2">
                {comments?.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
            <div className="mt-10">
              <div>
                <CommentForm threadId={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </ForumLayout>
  )
}

export default Page
