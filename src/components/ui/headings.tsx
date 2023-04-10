import * as React from "react"

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <h1
        className={`text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
H1.displayName = "H1"

const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <h2
        className={`text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
H2.displayName = "H2"

export { H1, H2 }
