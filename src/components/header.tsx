import { SwitchTheme } from "@/components/switchTheme";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <SwitchTheme />
      <ul>
        <li>
          <Link href={"/login"}>Dang nhap</Link>
        </li>
        <li>
          <Link href={"/register"}>Dang ky</Link>
        </li>
      </ul>
    </div>
  )
}
