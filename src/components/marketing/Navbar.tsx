"use client"

import * as React from "react"
import { useTheme } from 'next-themes';
import Link from "next/link"
import { motion } from "framer-motion";

import { cn } from "@/src/utils/cn"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/src/components/ui/navigation-menu"
import { Logo } from "../logo"
import { Button, buttonVariants } from "../ui/button";
import { SunMoon, User } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

const courses: { title: string; href: string; description: string }[] = [
  {
    title: "Image Generator",
    href: "/courses/image-generator",
    description:
      "Learn how to use vercel/og and generate Open Graph images for your blog.",
  },
  {
    title: "Blog with CMS for client",
    href: "/courses/blog-with-cms-for-client",
    description:
      "Develop a blog with Next.js and Sanity.io production ready for a client.",
  },
  {
    title: "Learning Platform (like Enzan)",
    href: "/courses/learning-platform",
    description:
      "Use the T3 stack to build a learning platform like Enzan with authentication, payments, and more.",
  },
  {
    title: "Create a CRUD App with the MERN stack to manage your expenses",
    href: "/courses/create-a-crud-app",
    description: "Visually or semantically separates content.",
  }
]

const Navbar = ({ delay = 0 }) => {
  const { theme, setTheme } = useTheme()
  const { data } = useSession()

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <NavigationMenu className="absolute top-0 p-3 mx-auto max-w-7xl justify-between w-full">
        <NavigationMenuList className="max-w-xl mx-auto w-full gap-0.5 sm:gap-2">
          <Link href="/" className="flex items-center font-bold gap-1 sm:gap-2">
            <Logo className="w-8 h-8 fill-stone-900 dark:fill-slate-100" fill="fill-logo" />
          </Link>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-gray-700 to-slate-900 dark:from-white dark:to-stone-200 p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Logo className="w-8 h-8 dark:fill-stone-900 fill-slate-100" fill="fill-logo" />
                      <div className="mt-4 mb-2 text-lg font-medium text-white dark:text-black">
                        Enzan Learn
                      </div>
                      <p className="text-sm leading-tight text-white/90 dark:text-black/90">
                        Conviértete en un Full Stack dev
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/introduction" title="Introducción">
                  Descubre como funciona Enzan Learn y empieza a aprender.
                </ListItem>
                <ListItem href="/pricing" title="Pricing">
                  Precios? Qué es eso?
                </ListItem>
                <ListItem href="/roadmap" title="Roadmap">
                  Mira las próximas actualizaciones.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden sm:block">
            <NavigationMenuTrigger>Aprende</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {courses.map((course) => (
                  <ListItem
                    key={course.title}
                    title={course.title}
                    href={course.href}
                  >
                    {course.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-0">
            <Link href="https://github.com/kaitakami/" target="_blank" legacyBehavior passHref>
              <NavigationMenuLink>
                <span className="sm:block hidden">Github</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="space-x-2 items-center flex">
          {data?.user?.id ? (
            <Link className={buttonVariants({ size: "sm" })} href={`/user/${data?.user?.id}`}><User /></Link>
          )
            :
            <Button
              variant="link"
              size="sm"
              onClick={() => { signIn().catch(err => console.log(err)) }}>
              <span className="sm:block hidden">Inicia sesión</span>
              <User className="sm:hidden" />
            </Button>

          }
          <Button size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <SunMoon />
          </Button>
        </div>
      </NavigationMenu>
    </motion.div>
  )
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || ""}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-100 focus:bg-stone-100 dark:hover:bg-stone-700 dark:focus:bg-stone-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-stone-500 dark:text-stone-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Navbar
