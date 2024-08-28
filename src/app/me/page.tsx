// server components

import accountApiRequest from '@/apiRequest/account'
import Profile from '@/app/me/profile'
import { cookies } from 'next/headers'

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  console.log(sessionToken)

  const result = await accountApiRequest.me(sessionToken?.value ?? "")

  // console.log(result)
  
  return (
    <div>
      <div>Profile</div>
      <div>Hello {`${result.payload.data.name }`}</div>
      <Profile />
    </div>
  )
}
