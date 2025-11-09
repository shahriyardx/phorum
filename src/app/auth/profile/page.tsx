'use client'

import ForumLayout from '@/components/forum-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import moment from 'moment'
import {
  CalendarIcon,
  Edit2,
  MailIcon,
  MessageSquare,
  PenIcon,
  Trash2,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { trpc } from '@/trpc/client'
import useSession from '@/hooks/useSession'
import { useState } from 'react'
import UserEditForm from '@/components/user-edit-form'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

const Page = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [threadToDelete, setThreadToDelete] = useState<string | null>(null)
  const { user, refetch } = useSession()
  const { data: stats, refetch: refetchStats } = trpc.user.stats.useQuery()
  const { data: threads, refetch: refetchThreads } =
    trpc.thread.userThreads.useQuery()

  const refetchUserData = () => {
    refetchStats()
    refetchThreads()
    setDeleteDialogOpen(false)
  }
  const { mutate } = trpc.thread.deleteUserThreadById.useMutation({
    onSuccess: () => {
      refetchUserData()
    },
    onError: (err) => {
      toast.error(err.message)
      setDeleteDialogOpen(false)
    },
  })

  const confirmDelete = () => {
    if (threadToDelete) {
      mutate({ id: threadToDelete })
    }
  }
  const userThreads = threads ?? []

  const [editing, setEditing] = useState(false)

  const handleDeleteThread = (threadId: string) => {
    setThreadToDelete(threadId)
    setDeleteDialogOpen(true)
  }

  return (
    <ForumLayout>
      {user && (
        <Card>
          <CardContent>
            <div className="flex justify-start gap-5">
              <Avatar className="rounded-lg w-20 h-20">
                <AvatarImage src={user.image as string} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                {editing ? (
                  <UserEditForm
                    onSuccess={() => {
                      setEditing(false)
                      refetch()
                    }}
                    onCancel={() => setEditing(false)}
                  />
                ) : (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-2xl font-bold">{user.name}</span>
                      <Button onClick={() => setEditing(true)}>
                        <PenIcon /> Edit Profile
                      </Button>
                    </div>

                    <p className="text-muted-foreground flex items-center gap-2">
                      <MailIcon size={15} />
                      {user.email}
                    </p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <CalendarIcon size={15} />
                      Joined{' '}
                      {moment(user.createdAt).toDate().toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
            </div>

            <Separator className="my-10" />

            <div className="grid grid-cols-3 gap-5">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">{stats?.threads}</span>
                <span className="text-muted-foreground text-sm">Threads</span>
              </div>

              <div className="flex items-center justify-center">
                <Separator orientation="vertical" />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold">{stats?.comments}</span>
                <span className="text-muted-foreground text-sm">Replies</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-card border rounded-lg mt-10">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            My Threads ({userThreads.length})
          </h2>
        </div>

        <div className="divide-y">
          {userThreads.length > 0 ? (
            userThreads.map((thread) => (
              <div
                key={thread.id}
                className="p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {thread.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {thread.brief}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded capitalize">
                        {thread.Category.name}
                      </span>
                      <span>{thread._count.comments} replies</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/thread/${thread.id}`}>
                    <Button variant="outline" size="sm">
                      View Thread
                    </Button>
                  </Link>
                  <Link href={`/thread/edit/${thread.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent"
                    onClick={() => handleDeleteThread(thread.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't created any threads yet.
              </p>
              <Link href="/thread/create">
                <Button>Create Your First Thread</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Thread</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this thread? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </ForumLayout>
  )
}

export default Page
