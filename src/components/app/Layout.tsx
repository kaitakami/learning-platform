import type { ReactElement } from "react"

const Layout = (props: {children: ReactElement | ReactElement[]}) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Layout
