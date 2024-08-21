import LoginForm from "@/app/(auth)/login/loginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold">Form Login</h1>
      <LoginForm />
    </div>
  )
}
