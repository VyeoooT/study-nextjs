'use client'

import accountApiRequest from "@/apiRequest/account"
import { useEffect } from "react"

export default function Profile() {
  // console.log(clientSessionToken.value)
  
  useEffect(() => {
    const fecthRequest = async () => {
      const result = await accountApiRequest.meClient()
      console.log(result)
    }
    fecthRequest()
  }, [])

  return (
    <div>profile</div>
  )
}
