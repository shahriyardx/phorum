'use client'

import ForumLayout from '@/components/forum-layout'
import ThreadForm from '@/components/thread-form'
import { Form } from '@/components/ui/form'
import { ThreadSchema, type ThreadType } from '@/schema/thread'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Page = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = trpc.thread.getById.useQuery({ id })

  const { mutate } = trpc.thread.update.useMutation({
    onSuccess: () => {
      toast.success('Thread has been updated')
    },
    onError: (e) => {
      toast.error(e.message)
    },
  })
  const form = useForm<ThreadType>({
    resolver: zodResolver(ThreadSchema),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        content: data.content,
        brief: data.brief,
        categoryId: data.categoryId,
      })
    }
  }, [data, form])

  const handleSubmit = (values: ThreadType) => {
    mutate({ data: values, id })
  }

  return (
    <ForumLayout>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link
            href="/profile/threads"
            className="flex items-center gap-2 text-accent-foreground"
          >
            <ArrowLeft /> My Threads
          </Link>

          <h1 className="text-2xl font-bold mt-3">Edit Thread</h1>

          <div className="mt-5">
            <Form {...form}>
              <ThreadForm form={form} handleSubmit={handleSubmit} update />
            </Form>
          </div>
        </>
      )}
    </ForumLayout>
  )
}

export default Page
