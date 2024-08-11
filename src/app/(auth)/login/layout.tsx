import React from "react"

export default function Layoutlogin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>{children}</main>
  )
}
