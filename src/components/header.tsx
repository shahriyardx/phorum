'use client'

import Link from 'next/link'
import ProfileMenu from './profile-menu'
import { NotificationsDropdown } from './notifications-dropdown'
import useSession from '@/hooks/useSession'

const Header = () => {
  const { user } = useSession()

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
          {user && <NotificationsDropdown user={user} />}
          <ProfileMenu />
        </div>
      </div>
    </div>
  )
}

export default Header
