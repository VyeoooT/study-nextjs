import RegisterForm from "@/app/(auth)/register/registerForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold">Form Dang Ky</h1>
      <RegisterForm />
    </div>
  )
}
