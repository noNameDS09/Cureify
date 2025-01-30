import React from 'react'
import { doLogin } from '@/app/actions'
const LoginForm = () => {
  return (
    <div>
      <form action={doLogin}>
        <button 
        name='action'
        type='submit'
        value='google'
        >
            Google
        </button>
      </form>
    </div>
  )
}

export default LoginForm
