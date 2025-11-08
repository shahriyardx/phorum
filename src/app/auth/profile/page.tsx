'use client'

import ForumLayout from '@/components/forum-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import moment from 'moment'
import { CalendarIcon, MailIcon, PenIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import useSession from '@/hooks/useSession'
import { useState } from 'react'
import UserEditForm from '@/components/user-edit-form'

const Page = () => {
  const { user, isPending, refetch } = useSession()
  const router = useRouter()
  const { data: stats } = trpc.user.stats.useQuery()
  const [editing, setEditing] = useState(false)

  if (isPending) {
    return (
      <ForumLayout>
        <p>Loading...</p>
      </ForumLayout>
    )
  }

  if (!user) {
    router.push('/auth/signin')
  }

  return (
    <ForumLayout>
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
    </ForumLayout>
  )
}

export default Page
