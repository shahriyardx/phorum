'use client'

import Link from 'next/link'
import ProfileMenu from './profile-menu'

const AuthHeader = () => {
  return (
    <div className="p-5 bg-zinc-900/50 backdrop-blur-md sticky w-full top-0 left-0 z-10 border-b">
      <div className="flex justify-between items-center">
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
              <ProfileMenu />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AuthHeader
