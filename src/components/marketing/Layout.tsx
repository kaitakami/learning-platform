import type { ReactElement } from "react"
import Navbar from "./Navbar"
import { Toaster } from "react-hot-toast"

import { Syne } from "next/font/google"

const syne = Syne(
  {
    subsets: ["latin"],
    variable: "--syne-font",
    weight: ["400", "500", "600", "700", "800"],
  }
)

const Layout = ({ children, navDelay = 0 }: { children: ReactElement | ReactElement[], navDelay?: number }) => {
  return (
    <>
      <div className={`${syne.className} font-sans`}>
        <Navbar delay={navDelay} />
        {children}
      </div>
      <Toaster containerClassName={`${syne.className}`} />
    </>
  )
}

export default Layout
