"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import authApiRequest from "@/apiRequest/auth"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { handleErrorApi } from "@/lib/utils"
import { useState } from "react"

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(values: RegisterBodyType) {
    if (isLoading) return
    setIsLoading(true)

    try {
      const result = await authApiRequest.register(values)
      toast({
        title: result.payload.message,
      })
      await authApiRequest.auth({ sessionToken: result.payload.data.token })

      // redirect after successful register
      router.push('/me')

    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full !mt-10">Register</Button>
      </form>
    </Form>
  )
}
function setIsSessionToken(token: string) {
  throw new Error("Function not implemented.")
}

