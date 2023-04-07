import type { ReactElement } from "react"
import { DM_Sans } from "next/font/google"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const Layout = (props: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className={`${dmSans.className} min-h-screen`}>
      {props.children}
    </div>
  )
}

export default Layout
