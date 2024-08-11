"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ButtonHookRouter() {
  const router = useRouter()
  const handleUseRouter = () => {
    router.push('/login')
  }

  return (
    <Button onClick={handleUseRouter}>Go to Login page</Button>
  )
}

