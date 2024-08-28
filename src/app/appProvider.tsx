'use client'

import { useState } from "react";
import { clientSessionToken } from "@/lib/http"

export default function AppProvider({
  children,
  initialSessionToken = ''
}: { 
  children:React.ReactNode
  initialSessionToken?: string
}) {

  // chay 1 lan duy nhat va chay truoc nhung thang khac
  useState(() => {
    // check o moi truong dev
    if (typeof window != 'undefined') {
      clientSessionToken.value = initialSessionToken
    }
  })

  return (
    <>
      {children}
    </>
  )
}
