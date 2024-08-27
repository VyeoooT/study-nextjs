'use client'

import { useAppContext } from "@/app/appProvider"
import envConfig from "@/config"
import { useEffect } from "react"

export default function Profile() {
  const { IsSessionToken } = useAppContext()
  useEffect(() => {
    const fecthRequest = async () => {
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${IsSessionToken}`
    
        },
      }).then(async (res) => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload
        }
        
        if (!res.ok) {
          throw data
        }
        
        return data
      })
      console.log(result)
    }
    fecthRequest()
  }, [IsSessionToken])

  return (
    <div>profile</div>
  )
}
