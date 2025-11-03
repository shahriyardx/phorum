'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'

const GoogleSignIn = () => {
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() =>
        authClient.signIn.social({
          provider: 'google',
          callbackURL: '/',
        })
      }
    >
      Sign up with Google
    </Button>
  )
}

export default GoogleSignIn
