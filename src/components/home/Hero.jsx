import { motion } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden px-6 py-12"
      role="region"
      aria-label="Hero section"
    >
      <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-5xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="mb-5 text-sm font-semibold tracking-[0.3em] text-cyan-400"
        >
          WELCOME TO MY PORTFOLIO
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl">
          Abhinav <span className="text-cyan-400">Adabala</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-slate-200 md:text-2xl">
          B.Tech CSE (AI & Data Science) Student{" "}
          <span className="text-cyan-400">|</span> Aspiring Software Developer
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
          I build practical, user-focused web applications and intelligent
          technology solutions.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#080d1b]"
          >
            View Projects
          </a>

          <a
            href="/resume"
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-300 transition hover:-translate-y-1 hover:border-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            View Resume
          </a>

          <a
            href="#contact"
            className="rounded-xl border border-cyan-400 px-6 py-3 font-semibold text-cyan-300 transition hover:-translate-y-1 hover:bg-cyan-400 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#080d1b]"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex justify-center gap-5">
          <a
            href="https://github.com/ABHINAV559966"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="rounded-lg p-2 text-xl text-slate-400 transition hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FiGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/abhinav-adabala/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="rounded-lg p-2 text-xl text-slate-400 transition hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FiLinkedin />
          </a>

          <a
            href="mailto:abhinavadabala.99@gmail.com"
            aria-label="Send email"
            className="rounded-lg p-2 text-xl text-slate-400 transition hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FiMail />
          </a>
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll to about section"
          className="mx-auto mt-14 flex w-fit items-center gap-2 rounded-lg p-2 text-sm text-slate-400 transition hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore <FiArrowDown />
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Hero;