"use client"

import * as React from "react"
import { useState } from "react";
import { useTheme } from 'next-themes';
import Link from "next/link"

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
import { Button } from "../ui/button";
import { Github, SunMoon, User } from "lucide-react";
import { signIn } from "next-auth/react";

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

const Navbar = () => {
  const { theme: themeSSR, setTheme: setThemeSSR } = useTheme()
  const [theme, setTheme] = useState<string | undefined>(undefined)

  React.useEffect(() => {
    setTheme(themeSSR)
  }, [themeSSR])

  return (
    <div className="w-full max-w-7xl mx-auto">
      <NavigationMenu className="absolute top-0 p-3 mx-auto max-w-7xl justify-between w-full">
        <NavigationMenuList className="max-w-xl mx-auto w-full gap-0.5 sm:gap-2">
          <Link href="/" className="flex items-center font-bold gap-1 sm:gap-2">
            <Logo className="w-8 h-8" fill={theme === "dark" ? "#EFEFEF" : undefined} />
            <span className="text-xl hidden sm:block">Enzan</span>
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
                      <Logo className="w-8 h-8" fill={theme === "dark" ? undefined : "#EFEFEF"} />
                      <div className="mt-4 mb-2 text-lg font-medium text-white dark:text-black">
                        Enzan Learn
                      </div>
                      <p className="text-sm leading-tight text-white/90 dark:text-black/90">
                        Become a full stack developer.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/introduction" title="Introduction">
                  Discover how to use Enzan and start learning.
                </ListItem>
                <ListItem href="/pricing" title="Pricing">
                  Learn about the pricing plans.
                </ListItem>
                <ListItem href="/roadmap" title="Roadmap">
                  See what&apos;s coming next.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden sm:block">
            <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
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
                <Button size="sm" className="sm:hidden"><Github /></Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="space-x-2 items-center flex">
          <Button variant="link" size="sm" onClick={() => { signIn().catch(err => console.log(err)) }}><span className="sm:block hidden">Sign in</span><User className="sm:hidden" /></Button>
          <Button size="sm" onClick={() => setThemeSSR(theme === "dark" ? "light" : "dark")}><SunMoon /></Button>
        </div>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Navbar
