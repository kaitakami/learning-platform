import type { ReactElement } from "react"
import { Syne } from "next/font/google"

const syne = Syne(
  {
    subsets: ["latin"],
    variable: "--syne-font",
  }
)

const Layout = (props: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className={`${syne.className} font-sans`}>
      {props.children}
    </div>
  )
}

export default Layout
