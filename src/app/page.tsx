import ButtonHookRouter from "@/app/components/hookRouter";
import Link from "next/link";
import { redirect } from "next/navigation";

const isAuth = false

export default function Home() {
  if (!isAuth) {
    redirect('/login')
  }

  return (
    <main>
      {/* <Link> component */}
      <ul>
        <li>
          <Link href={'/login'}>
            - Login
          </Link>
        </li>
        <li>
          <Link href={'/register'}>
            - Register
          </Link>
        </li>
      </ul>

      <ButtonHookRouter />
    </main>
  );
}
