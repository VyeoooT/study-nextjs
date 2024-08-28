'use client'

import accountApiRequest from "@/apiRequest/account"
import { useAppContext } from "@/app/appProvider"
import envConfig from "@/config"
import { useEffect } from "react"

export default function Profile() {
  const { IsSessionToken } = useAppContext()
  useEffect(() => {
    const fecthRequest = async () => {
      const result = await accountApiRequest.me(IsSessionToken)
      console.log(result)
    }
    fecthRequest()
  }, [IsSessionToken])

  return (
    <div>profile</div>
  )
}
