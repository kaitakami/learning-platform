import Layout from "@/src/components/app/Layout"
import { Separator } from "@/src/components/ui/separator"
import { H1 } from "@/src/components/ui/headings";

function Dashboard() {
  return (
    <Layout>
      <div className="lg:grid grid-cols-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-3 xl:col-span-2 hidden lg:block h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 shadow-xl py-16 border-r border-stone-200 dark:border-stone-700"
        >
          <H1 className="px-4">Your learning progress ✨</H1>
          <Separator className="mt-5 mb-10" />
          <div className="flex flex-col px-5 gap-4">
            <Course
              title="Build fullstack web3 application with nextjs"
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
              <div>
                <h2 className="text-3xl font-medium text-center text-stone-500 dark:text-stone-500">Enroll to a new course</h2>
              </div>
            </Link>
          </div>
        </motion.div>
        <div>
          <div>
            <h2>Welcome to the page</h2>
            <h3>User Name</h3>
          </div>
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
        <h2 className="text-xl font-medium">{title}</h2>
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
