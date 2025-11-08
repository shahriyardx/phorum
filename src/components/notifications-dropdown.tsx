'use client'

import { useState } from 'react'
import { Bell, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export const notifications = [
  {
    id: 1,
    type: 'reply',
    message: 'Sarah replied to your post in "Real-time chat features"',
    timestamp: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'mention',
    message: 'Mike mentioned you in "Database scaling"',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'like',
    message: 'Your post got 5 new likes',
    timestamp: '3 hours ago',
    read: true,
  },
]
export function NotificationsDropdown() {
  const [notificationsList, setNotificationsList] = useState(notifications)

  const unreadCount = notificationsList.filter((n) => !n.read).length

  const handleMarkAsRead = (id: number) => {
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }

  const handleClearAll = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const handleRemoveNotification = (id: number) => {
    setNotificationsList((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reply':
        return '💬'
      case 'mention':
        return '👤'
      case 'like':
        return '❤️'
      default:
        return '📢'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
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
                className={`px-4 py-3 hover:bg-accent/50 transition-colors group border-b last:border-b-0 ${
                  !notification.read ? 'bg-accent/20' : ''
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
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.timestamp}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="h-6 w-6 p-0"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="h-6 w-6 p-0"
                      title="Remove"
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
              onClick={handleClearAll}
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
