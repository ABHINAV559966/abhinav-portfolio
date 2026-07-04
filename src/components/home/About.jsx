import { motion } from "framer-motion";

function About() {
  const highlights = [
    {
      icon: "💻",
      title: "Web Development",
      description: "React, JavaScript, Tailwind CSS",
    },
    {
      icon: "🤖",
      title: "AI & Data Science",
      description: "Python, Machine Learning, Data Analysis",
    },
    {
      icon: "🚀",
      title: "Open to Opportunities",
      description: "Internships and Entry-Level Positions",
    },
    {
      icon: "📍",
      title: "Location",
      description: "Andhra Pradesh, India",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            About <span className="text-cyan-400">Me</span>
          </h2>

          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-cyan-400 to-transparent" />
        </motion.div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 p-1 shadow-2xl md:h-80 md:w-80">
              <img
                src="/profile.png"
                alt="Abhinav Adabala"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="mb-6 text-lg leading-relaxed text-slate-300">
              I am a Computer Science student specializing in Artificial
              Intelligence and Data Science. I enjoy building modern web
              applications, solving real-world problems, and exploring
              AI-powered solutions.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-slate-300">
              My focus is on creating clean, practical, and accessible digital
              experiences while continuously strengthening my technical and
              problem-solving skills.
            </p>

            {/* Highlights */}
            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group rounded-lg border border-slate-700 bg-slate-900/50 p-4 backdrop-blur transition hover:border-cyan-400/50 hover:bg-slate-900/70 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20"
                >
                  <div className="text-2xl">{item.icon}</div>

                  <h3 className="mt-2 font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;