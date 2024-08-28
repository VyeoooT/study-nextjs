'use client'

import accountApiRequest from "@/apiRequest/account"
import { handleErrorApi } from "@/lib/utils"
import { useEffect } from "react"

export default function Profile() {
  // console.log(clientSessionToken.value)
  
  useEffect(() => {
    const fecthRequest = async () => {
      try {
        const result = await accountApiRequest.meClient()
        console.log(result)
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
    fecthRequest()
  }, [])

  return (
    <div>profile</div>
  )
}
