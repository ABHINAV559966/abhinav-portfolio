import { motion } from "framer-motion";
import { FiAward, FiBookOpen } from "react-icons/fi";

function Education() {
  const educationData = [
    {
      degree: "B.Tech Computer Science Engineering",
      specialization: "Artificial Intelligence and Data Science",
      institution: "Vel Tech Rangarajan Dr. Sagunthala R & D Institute",
      location: "Chennai",
      year: "2023 – 2027",
      cgpa: "7.1",
      icon: FiBookOpen,
    },
    {
      degree: "Class 12",
      specialization: "Senior Secondary Education",
      institution: "Tirumala Educational Institutes",
      location: "Andhra Pradesh",
      year: "2021 – 2023",
      percentage: "87.9%",
      icon: FiAward,
    },
    {
      degree: "Class 10",
      specialization: "Secondary Education",
      institution: "Viswabharati English Medium High School",
      location: "Gudivada",
      year: "2008 – 2021",
      percentage: "100%",
      icon: FiAward,
    },
  ];

  return (
    <section id="education" className="relative px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            My <span className="text-cyan-400">Education</span>
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-cyan-400 to-transparent" />
        </motion.div>

        <div className="space-y-6">
          {educationData.map((edu, index) => {
            const IconComponent = edu.icon;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900/50 p-6 backdrop-blur transition hover:border-cyan-400/50 hover:bg-slate-900/70 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 md:p-8"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400/0 to-cyan-400/0 transition group-hover:from-cyan-400/5 group-hover:to-cyan-400/10" />

                <div className="flex gap-4 md:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 md:h-14 md:w-14">
                      <IconComponent size={24} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white md:text-xl">
                          {edu.degree}
                        </h3>
                        <p className="mt-1 text-sm text-cyan-400">
                          {edu.specialization}
                        </p>
                        <p className="mt-2 truncate text-slate-400 text-sm md:text-base">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-slate-500">{edu.location}</p>
                      </div>

                      <div className="flex flex-col gap-2 text-right md:gap-3 flex-shrink-0">
                        <span className="inline-block rounded-lg bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300">
                          {edu.year}
                        </span>
                        {edu.cgpa && (
                          <span className="text-sm font-semibold text-slate-300">
                            CGPA: <span className="text-cyan-400">{edu.cgpa}</span>
                          </span>
                        )}
                        {edu.percentage && (
                          <span className="text-sm font-semibold text-slate-300">
                            Score: <span className="text-cyan-400">{edu.percentage}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;
