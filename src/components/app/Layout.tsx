import type { ReactElement } from "react"
import { DM_Sans } from "next/font/google"
import { ListItem } from "../marketing/Navbar"
import { useTheme } from 'next-themes';
import Link from "next/link"
import { motion } from "framer-motion";
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
import { SunMoon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

const Layout = (props: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className={`${dmSans.className} min-h-screen`}>
      <Navbar />
      {props.children}
    </div>
  )
}

export default Layout

const Navbar = () => {
  const { data } = useSession()
  const { theme, setTheme } = useTheme()
  return (
    <motion.div
      className="w-full mx-auto border-b border-stone-200 dark:border-stone-700 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100 to-stone-100/75 dark:from-stone-800 dark:to-stone-900"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavigationMenu className="p-3 justify-between w-full">
        <NavigationMenuList className="max-w-xl mx-auto w-full gap-0.5 sm:gap-2">
          <Link href="/" className="flex items-center font-bold gap-1 sm:gap-2">
            {<Logo className="w-8 h-8 dark:fill-slate-100 fill-stone-900" fill="fill-logo" />}
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
                      <Logo className="w-8 h-8 dark:fill-stone-900 fill-slate-100" fill="fill-logo" />
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
        </NavigationMenuList>
        <div className="space-x-2 items-center flex">
          <Link href={"/app/user"}>
            <Avatar>
              <AvatarImage src={data?.user?.image || ""} />
              <AvatarFallback>{data?.user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <Button size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}><SunMoon /></Button>
        </div>
      </NavigationMenu>
    </motion.div>
  )
}
