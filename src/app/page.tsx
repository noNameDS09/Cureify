import LoginForm from '@/components/LoginForm'
import React from 'react'
import { auth } from '@/auth'
import Image from 'next/image';

const page = async () => {
  const session = await auth();

  return (
    <div>
        {session && (
          <>
          <div>{session.user?.name}</div>
          <Image src={session.user?.image} alt='profile image' width={72} height={72} className='rounded-full' />
          </>
        )}
      <LoginForm />
    </div>
  )
}

export default page
