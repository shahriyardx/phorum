'use client'

import { Book, Loader2, LogOut, User2Icon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useSession from '@/hooks/useSession'

const ProfileMenu = () => {
  const { user, isPending } = useSession()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Avatar className="rounded-lg">
            <AvatarImage
              src={user?.image as string}
              alt={user?.name}
            />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
        ) : (
          <User2Icon />
        )}
      </DropdownMenuTrigger>

      {isPending ? (
        <DropdownMenuContent>
          <DropdownMenuItem className="justify-center">
            <Loader2 className="animate-spin" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : user ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p className="flex flex-col">
              <span className="font-bold">{user.name}</span>
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
            </p>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => router.push('/auth/profile')}>
              <User2Icon /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Book /> My Threads
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => authClient.signOut()}>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent> /* if not logged in */
      ) : (
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => router.push('/auth/signin')}>
              Login
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push('/auth/signup')}>
              Register
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

export default ProfileMenu
