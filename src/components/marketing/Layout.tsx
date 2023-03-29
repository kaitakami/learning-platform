import type { ReactElement } from "react"
import Navbar from "./Navbar"

import { Syne } from "next/font/google"

const syne = Syne(
  {
    subsets: ["latin"],
    variable: "--syne-font",
    weight: ["400", "500", "600", "700", "800"]
  }
)

const Layout = (props: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className={`${syne.className} font-sans`}>
      <Navbar />
      {props.children}
    </div>
  )
}

export default Layout
