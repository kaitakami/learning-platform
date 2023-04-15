import { useEffect } from 'react';
import { type NextPage } from "next";
import { motion } from "framer-motion"
import Layout from "../components/marketing/Layout";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { Button } from "../components/ui/button";
import { Github, ArrowRight, Briefcase, Gamepad, Keyboard, PiggyBank, Ship, Timer } from "lucide-react"
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data } = useSession()
  useEffect(() => {
    function githubStarToast() {
      toast(<>If you like Enzan Learn, please star it on Github! <Link href="https://github.com/kaitakami" target="_blank" className={buttonVariants()}><Github /></Link></>, { duration: 4000, position: "bottom-center", icon: "✨" })
    }

    setTimeout(() => {
      githubStarToast()
    }, 4000)
  }, [])
  return (
    <Layout navDelay={2}>
      <>
        <HeroSection />
      </>
    </Layout>
  );
};

export default Home;

import { useRef, useState } from "react";
import { signIn } from 'next-auth/react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = ev

      heroRef.current.style.setProperty("--x", `${clientX}px`)
      heroRef.current.style.setProperty("--y", `${clientY}px`)
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])
  return (
    <>
      <style jsx>
        {`
        .gradient-follow {
          background-image: radial-gradient(
            circle farthest-side at var(--x) var(--y),
            #4c94ff33 0%,
            #4c94ff1c 20%,
            transparent 100%
          )
        }
      `}
      </style>
      <div className="grid-pattern">
        <section ref={heroRef} className='mx-auto min-h-screen flex items-center gradient-follow'>
          <div className="grid max-w-screen-xl px-4 py-24 mx-auto lg:gap-8 md:py-20 xl:gap-16 lg:grid-cols-12">
            <div className="max-w-4xl mr-auto place-self-center lg:col-span-7 xl:col-span-8 md:col-span-6">
              <motion.h1
                className="mb-4 text-3xl xs:text-4xl sm:text-5xl font-extrabold tracking-tight leading-none xl:text-6xl bg-gradient-to-tr dark:from-gray-100 dark:to-slate-300 from-slate-700 to-slate-900 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Conviértete en Full Stack dev:<span className="sm:block hidden">Aprende programando</span>
              </motion.h1>
              <motion.p
                className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Sube al siguiente nivel con Enzan Learn! Nuestros cursos te permiten aprender a tu ritmo y con una metodología <span className="dark:text-white text-zinc-800">aprende creando</span> para que puedas construir proyectos impresionantes en <span className="dark:text-white text-zinc-800">tiempo record</span> ✨
              </motion.p>
              <motion.div
                className="flex gap-4 flex-col xs:flex-row"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: "easeOut", duration: 0.7, delay: 1.6 }}
              >
                <Link className={`${buttonVariants({ variant: "colored" })}`} href="/pricing">
                  Cursos
                </Link>
                <Button className="dark:hover:shadow-white/75 hover:shadow-sm hover:shadow-black/25 group" size="lg" onClick={() => { signIn().catch(err => console.log(err)) }}>
                  Empieza a aprender<ArrowRight className="group-hover:translate-x-3 transition-transform" />
                </Button>
              </motion.div>
            </div>
            <div className="lg:mt-0 lg:col-span-4 lg:flex md:col-span-6 pt-12 lg:pt-0">
              <div className="box"></div>
              <AnimatedCard />
            </div>
          </div>
        </section>
      </div>
    </>
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
      initial={{ opacity: 0, willChange: "opacity" }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 2 }}
      ref={ref}
      onMouseMove={mouseMove}
      onMouseOver={() => setMouseOverCard(true)}
      onMouseOut={() => setMouseOverCard(false)}
      className="md:h-[30rem] md:w-[23rem] sm:w-80 h-96 w-full transition-all shadow-xl hover:shadow-2xl shadow-stone-300/30 hover:shadow-stone-300 bg-stone-200/90 dark:bg-zinc-900 dark:shadow-stone-900/70 dark:hover:shadow-stone-900/80 flex flex-col mx-auto border-gradient"
      style={{
        transform: mouseOverCard ? `perspective(500px) scale(1.1) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)` : "perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)",
        willChange: "opacity, transform"
      }}
    >
      <ul className="flex flex-col justify-between h-full py-10 px-8">
        <li className="flex gap-2 my-auto md:text-xl"><Gamepad />Gamificación</li>
        <li className="flex gap-2 my-auto md:text-xl"><PiggyBank />Gratis y becas</li>
        <li className="flex gap-2 my-auto md:text-xl"><Keyboard />Aprendizaje activo</li>
        <li className="flex gap-2 my-auto md:text-xl"><Timer />Dividido en clases cortas</li>
        <li className="flex gap-2 my-auto md:text-xl"><Briefcase />Construye tu portfolio</li>
        <li className="flex gap-2 my-auto md:text-xl"><Ship />Crea con otros devs</li>
      </ul>
    </motion.div>
  )
}
