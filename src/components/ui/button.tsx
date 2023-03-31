import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/src/utils/cn"

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md font-medium transition-colors dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 text-sm sm:text-base",
  {
    variants: {
      variant: {
        default:
          "border dark:border-gray-600 dark:text-white text-gray-900 bg-light border-gray-300 dark:bg-zinc-900 dark:hover:bg-zinc-800 hover:bg-zinc-100",
        colored:
          "bg-primary-500 text-white dark:text-white hover:text-primary-300 hover:dark:text-primary-500 hover:bg-slate-800 dark:hover:bg-white",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-800",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-12 py-3 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-12 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
