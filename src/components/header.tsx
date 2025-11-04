'use client'

import Link from 'next/link'
import { BellIcon, Book, Loader2, LogOut, User2Icon } from 'lucide-react'
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

const Header = () => {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  return (
    <div className="p-5 bg-zinc-900/50 backdrop-blur-md sticky w-full top-0 left-0 z-10 border-b">
      <div className="grid grid-cols-3">
        <Link href={'/'} className="font-bold">
          <span className="text-purple-500">PH</span>
          <span className="font-normal">orum</span>
        </Link>

        <div>
          <ul className="flex items-center gap-5 justify-center">
            <li>
              <Link href="/">Forum</Link>
            </li>
            <li>
              <Link href="/thread/create">Create</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-5">
          <BellIcon />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <User2Icon className="cursor-pointer" />
            </DropdownMenuTrigger>
            {isPending ? (
              <DropdownMenuContent>
                <DropdownMenuItem className="justify-center">
                  <Loader2 className="animate-spin" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : session ? (
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p className="flex flex-col">
                    <span className="font-bold">{session.user.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {session.user.email}
                    </span>
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
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
                  <DropdownMenuItem
                    onSelect={() => router.push('/auth/signin')}
                  >
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => router.push('/auth/signup')}
                  >
                    Register
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Header
