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

export { H1 }
