import { toast } from "@/components/ui/use-toast"
import { EntityError } from "@/lib/http"
import { type ClassValue, clsx } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// optimize handle api error
export const handleErrorApi = ({ error, setError, duration }: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  }
  else {
    toast({
      title: 'Error',
      description: error?.payload?.message ?? 'Error indefinite',
      variant: 'destructive',
      duration: duration ?? 5000
    })
  }
}
