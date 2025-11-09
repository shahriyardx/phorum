'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Bell, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import type { Notification, Thread, User } from '@/generated/zod'
import { useSocket } from '@/providers/socket-provider'
import type { SocketMessage } from '@/app/(main)/thread/[id]/page'
import moment from 'moment'
import { NotificationType } from '@/generated/prisma/enums'
import { trpc } from '@/trpc/client'

type SocketNotification = Notification & {
  sender: Pick<User, 'name'>
  thread: Pick<Thread, 'title'>
}

export function NotificationsDropdown({ user }: { user: Partial<User> }) {
  const [notificationsList, setNotificationsList] = useState<
    SocketNotification[]
  >([])

  const { data: notifications, refetch } =
    trpc.notif.userNotifications.useQuery()
  const { mutate: deleteNotification } =
    trpc.notif.deleteNotification.useMutation({
      onSuccess: () => {
        refetch()
      },
    })
  const { mutate: markAsRead } = trpc.notif.markAsRead.useMutation({
    onSuccess: () => {
      refetch()
    },
  })

  const { mutate: markAllAsRead } = trpc.notif.markAllAsRead.useMutation({
    onSuccess: () => {
      refetch()
    },
  })

  console.log(notifications)
  useEffect(() => {
    if (notifications) {
      setNotificationsList(notifications)
    }
  }, [notifications])

  const socket = useSocket()
  const userId = user?.id ?? null
  const joinedRef = useRef(false)

  const unreadCount = notificationsList.filter(
    (n) => n.status === 'UNREAD',
  ).length

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.THREAD_COMMENT:
        return '💬'
      case NotificationType.REPLY:
        return '↩️'
      default:
        return '📢'
    }
  }

  const handleMessage = useCallback(
    (message: SocketMessage & { message: SocketNotification }) => {
      if (message.type !== 'notification') return
      setNotificationsList((prev) => [message.message, ...prev])
    },
    [],
  )

  useEffect(() => {
    if (!userId) return
    const room = `notifications:${userId}`

    socket.emit('join', room)

    const join = () => {
      if (!joinedRef.current) {
        socket.emit('join', room)
        joinedRef.current = true
      }
    }

    join()

    socket.on('message', handleMessage)
  }, [socket, userId, handleMessage])

  console.log(notificationsList)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        {/* Header */}
        <div className="border-b px-4 py-3">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground">
              {unreadCount} unread
            </p>
          )}
        </div>

        {/* Notifications List */}
        {notificationsList.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No notifications yet
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notificationsList.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 transition-colors group border-b last:border-b-0 ${
                  notification.status === 'UNREAD'
                    ? 'bg-green-500/20 hover:bg-green-500/20'
                    : 'hover:bg-accent/50'
                }`}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className="shrink-0 text-xl mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {notification.sender.name}{' '}
                      {notification.type === 'REPLY'
                        ? 'replied to your comment on thread'
                        : 'commented on your thread'}{' '}
                      <span className="font-bold">
                        {notification.thread.title}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {moment(notification.createdAt).fromNow()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {notification.status === 'UNREAD' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead({ id: notification.id })}
                        className="h-6 w-6 p-0"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      title="Remove"
                      onClick={() =>
                        deleteNotification({ id: notification.id })
                      }
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {notificationsList.length > 0 && (
          <>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem
              onClick={() => markAllAsRead()}
              className="text-xs justify-center py-2"
            >
              Mark all as read
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
