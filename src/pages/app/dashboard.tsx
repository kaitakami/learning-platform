import Layout from "@/src/components/app/Layout"
import { Separator } from "@/src/components/ui/separator"
import { H2 } from "@/src/components/ui/headings";
import { useSession } from "next-auth/react";

function Dashboard() {
  const { data } = useSession()
  return (
    <Layout>
      <div className="lg:grid grid-cols-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-3 xl:col-span-2 hidden lg:block h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 shadow-xl py-16 border-r border-stone-200 dark:border-stone-700"
        >
          <H2 className="px-4">Your learning progress ✨</H2>
          <Separator className="mt-5 mb-10" />
          <div className="flex flex-col px-5 gap-4">
            <Course
              title="Build fullstack web3 application withnextjs"
              tags={[{ value: "Nextjs", color: "stone" }, { value: "Solidity", color: "amber" }, { value: "Web3" }, { value: "Typescript", color: "sky" }]}
              startDate="2023-10-01"
              dueDate="2023-10-31"
              pointsLeft={128}
              completedLessons={2}
              totalLessons={3}
            />
            {/* ENROLL TO A NEW COURSE CTA */}
            <Link href="#" className="w-full px-3 py-5 rounded-lg hover:shadow-lg dark:hover:shadow-neutral-900 hover:shadow-neutral-200
            border-dashed border-2 dark:border-stone-700 border-stone-300 h-52 flex justify-center flex-col dark:hover:bg-stone-900 hover:bg-stone-100 transition-all">
              <p className="text-3xl font-medium text-center text-stone-500 dark:text-stone-500 ">Enroll to a new course</p>
            </Link>
          </div>
        </motion.div>
        <div className="col-span-7 xl:col-span-8 p-4 sm:p-8 md:p-14 max-w-6xl mx-auto w-full space-y-8">
          <Header name={data?.user?.name || ""} />
          <Cards />
          {/* Grid with contributions graph and CTA (lateral mini sidebar) to Enzan, create a project */}
          {/* Roadmap section emphasizing community driven / Open source, Contribution CTA (simple button with backlog and Roadmap linear) */}
          <Roadmap />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard
import { Calendar } from "lucide-react";
import Link from "next/link";

import { ProgressBar, Badge as Tag } from "@tremor/react"
interface Tag {
  size?: "sm" | "md" | "lg",
  color?: "gray" | "slate" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose" | undefined,
  value: string,
}
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";

const Course: React.FC<{
  title: string,
  tags: Tag[],
  startDate: string,
  dueDate: string,
  pointsLeft: number,
  totalLessons: number,
  completedLessons: number
}> = ({ title, tags, startDate, dueDate, pointsLeft, totalLessons, completedLessons }) => {

  const percentageValue = Number(((completedLessons / totalLessons) * 100).toFixed(1))

  return (
    <Link href="#" className="w-full px-3 py-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-100 to-gray-100 dark:from-stone-800 dark:to-stone-900 rounded-lg space-y-5 hover:shadow-lg dark:hover:shadow-neutral-900 hover:shadow-neutral-200 transition-shadow border dark:border-stone-700">
      <div className="space-y-1">
        <h3 className="text-xl font-medium">{title}</h3>
        <div className="flex gap-1.5 flex-wrap">
          {tags.map(({ size, color, value }) => (
            <Tag key={value} size={size || "sm"} color={color || "fuchsia"}>
              {value}
            </Tag>
          ))}
        </div>
      </div>
      <div className="dark:text-stone-400 space-y-2 text-stone-700">
        <div className="flex place-content-start space-x-2">
          <Calendar className="w-5 h-5" /><span>{startDate} - {dueDate}</span>
        </div>
        <p>{pointsLeft} points to get ✅</p>
        <div className="space-y-1">
          <span className="dark:text-stone-300/70 text-sm">{completedLessons} / {totalLessons} classes &bull; {percentageValue}% </span>
          <ProgressBar color="sky" className="pb-2" percentageValue={percentageValue} />
        </div>
      </div>
    </Link>
  )
}

// Calendar showing last day
// Progress graph
// Show courses in order of last day (in other words look for the latests lessons made and show the course without repeating)
// Updates?

const Header = ({ name }: { name: string }) => {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 p-8 flex rounded-md border dark:border-stone-700 border-stone-200 justify-between flex-wrap space-y-4">
      <div className="flex gap-3 flex-wrap">
        <H2>
          Welcome back <br /> {name}

          {/* Show personalized message depending on how many points the user got this week */}
          {/* Could add an illustration */}
        </H2>
        <div className="">
          {/* Show badges (each course has a badge that the user gets after completion) (early adopter badge) (scholarship badge) */}
          <div className="text-3xl">🃏</div> {/* Temporary */}
        </div>
      </div>
      <div className="my-auto">
        {/* Add button "share your progress" */}
        <Button>Share your progress</Button>
      </div>
    </div>
  )
}


import {
  Card,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  type DeltaType,
  type Color,
  Grid,
} from "@tremor/react";

const colors: { [key: string]: Color } = {
  increase: "emerald",
  moderateIncrease: "emerald",
  unchanged: "orange",
};

const categories: {
  title: string;
  metric: string;
  delta: string;
  deltaType: DeltaType;
  message: string;
}[] = [
    {
      title: "Points",
      metric: "12,699",
      delta: "Top 10%",
      deltaType: "increase",
      message: "You are doing great!"
    },
    {
      title: "Classes",
      metric: "28",
      delta: "top 22%",
      deltaType: "moderateIncrease",
      message: "Keep learning :)"

    },
    {
      title: "Courses",
      metric: "3",
      delta: "Active Learner",
      deltaType: "moderateIncrease",
      message: "More courses coming soon!"

    },
  ];


const Cards = () => {
  return (
    <Grid numColsSm={2} numColsLg={3} className="gap-8">
      {categories.map((item) => (
        <Card key={item.title} className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 border dark:border-stone-700 border-stone-200 ring-0">
          <Flex alignItems="start">
            <Text className="dark:text-white">{item.title}</Text>
            {item.delta && <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>}
          </Flex>
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="truncate space-x-3"
          >
            <Metric className="dark:text-white">{item.metric}</Metric>
            <Text className="truncate">{item.message}</Text>
          </Flex>
        </Card>
      ))}
    </Grid>
  )
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"

const Roadmap = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 border dark:border-stone-700 border-stone-200 rounded-md p-2">
        <AccordionTrigger className="text-xl hover:no-underline px-4">Roadmap</AccordionTrigger>
        <AccordionContent>

          <ol className="flex p-5 overflow-x-auto">
            <li className="relative min-w-[290px] mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </div>
                <div className="flex w-full bg-stone-200 h-0.5 dark:bg-stone-700"></div>
              </div>
              <div className="mt-3 pr-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2, 2021</time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
              </div>
            </li>
            <li className="relative min-w-[290px] mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </div>
                <div className="flex w-full bg-stone-200 h-0.5 dark:bg-stone-700"></div>
              </div>
              <div className="mt-3 pr-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.2.0</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 23, 2021</time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
              </div>
            </li>
            <li className="relative min-w-[290px] mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </div>
                <div className="flex w-full bg-stone-200 h-0.5 dark:bg-stone-700"></div>
              </div>
              <div className="mt-3 pr-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.4.0</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 5, 2023</time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
              </div>
            </li>
            <li className="relative min-w-[290px] mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                  <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </div>
                <div className="flex w-full bg-stone-200 h-0.5 dark:bg-stone-700"></div>
              </div>
              <div className="mt-3 pr-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.3.0</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 5, 2022</time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
              </div>
            </li>
          </ol>
          <div className="flex justify-center">
            <Button size="lg">Start Contributing</Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
