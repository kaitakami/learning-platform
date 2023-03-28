import { type NextPage } from "next";
import { motion } from "framer-motion"
import Layout from "../components/marketing/Layout";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { ArrowRight, Briefcase, Gamepad, Keyboard, PiggyBank, Ship, Timer } from "lucide-react"

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <HeroSection />
      </>
    </Layout>
  );
};

export default Home;

import { useRef, useState } from "react";

const HeroSection = () => {
  return (
    <section className="grid-pattern h-screen flex items-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-16 lg:py-16 lg:grid-cols-12">
        <div className="max-w-4xl mr-auto place-self-center lg:col-span-7 xl:col-span-8 md:col-span-6">
          <motion.h1
            className="mb-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl bg-gradient-to-tr dark:from-gray-100 dark:to-slate-300 from-slate-700 to-slate-900 bg-clip-text text-transparent capitalize"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Become a Full Stack Developer: Learn By Coding
          </motion.h1>
          <motion.p
            className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Level up your full stack skills with our platform! Our self-paced courses and <span className="dark:text-white text-zinc-800">learn-by-doing</span> approach will have you building impressive projects in no time. Get help from our supportive community, and access plenty of resources along the way. Plus, our beta stage means it&apos;s <span className="dark:text-white text-zinc-800">completely free</span> to join right now. Don&apos;t wait - sign up today and become a full stack dev ✨
          </motion.p>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.9 }}
          >

            <Link className={`${buttonVariants({ variant: "colored" })}`} href="/pricing">
              Free Just Now
            </Link>
            <Link className={`dark:hover:shadow-white/75 hover:shadow-sm hover:shadow-black/25  ${buttonVariants({ size: "lg" })} group`} href="signup">
              Start Learning<ArrowRight className="group-hover:translate-x-3 transition-transform" />
            </Link>
          </motion.div>
        </div>
        <div className="lg:mt-0 lg:col-span-4 lg:flex md:col-span-6 pt-12 lg:pt-0">
          <div className="box"></div>
          <AnimatedCard />
        </div>
      </div>
    </section>
  );
};

const AnimatedCard = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [mouseOverCard, setMouseOverCard] = useState(false)
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 })

  const mouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = event

    if (ref.current) {
      setCardRotation({
        x: ((clientY - ref.current.clientHeight) / ref.current.clientHeight) * 20,
        y: ((clientX - ref.current.clientWidth) / ref.current.clientWidth) * -3
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.1 }}
      ref={ref}
      onMouseMove={mouseMove}
      onMouseOver={() => setMouseOverCard(true)}
      onMouseOut={() => setMouseOverCard(false)}
      className="md:h-[30rem] md:w-[23rem] sm:w-80 h-96 w-full transition-all shadow-xl hover:shadow-2xl shadow-stone-300/30 hover:shadow-stone-300 bg-stone-200/90 dark:bg-zinc-900 dark:shadow-stone-900/70 dark:hover:shadow-stone-900/80 flex flex-col mx-auto border-gradient"
      style={{
        transform: mouseOverCard ? `perspective(500px) scale(1.1) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)` : "perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)"
      }}
    >
      <ul className="flex flex-col justify-between h-full py-10 px-8">
        <li className="flex gap-2 my-auto md:text-xl"><Gamepad />Gamified Experience</li>
        <li className="flex gap-2 my-auto md:text-xl"><PiggyBank />Free in Beta Version </li>
        <li className="flex gap-2 my-auto md:text-xl"><Keyboard />Learn by doing</li>
        <li className="flex gap-2 my-auto md:text-xl"><Timer />Divided in short classes</li>
        <li className="flex gap-2 my-auto md:text-xl"><Briefcase />Build your Portfolio</li>
        <li className="flex gap-2 my-auto md:text-xl"><Ship />Create with other Devs</li>
      </ul>
    </motion.div>
  )
}
