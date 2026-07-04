import { motion } from "framer-motion";
import { FiDownload, FiEye, FiFileText } from "react-icons/fi";

const Resume = () => {
  return (
    <section id="resume" className="section-container">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">MY RESUME</p>

          <h2 className="section-title">
            Know more about my <span className="gradient-text">journey.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            View my latest resume to learn about my education, technical skills,
            projects, and career interests.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
              aria-label="View Abhinav Adabala resume"
            >
              <FiEye />
              View Resume
            </a>

            <a
              href="/resume.pdf"
              download
              className="btn-secondary inline-flex items-center justify-center gap-2"
              aria-label="Download Abhinav Adabala resume"
            >
              <FiDownload />
              Download Resume
            </a>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Replace <span className="font-medium text-cyan-400">public/resume.pdf</span> whenever you update your resume.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card relative overflow-hidden p-8 sm:p-10"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />

          <div className="relative flex items-start gap-5">
            <div className="rounded-2xl bg-cyan-500/10 p-4 text-3xl text-cyan-400">
              <FiFileText />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-400">
                Latest Resume
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">
                Abhinav Adabala
              </h3>

              <p className="mt-2 text-slate-400">
                B.Tech CSE (AI & Data Science)
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p>✓ Education, CGPA and academic details</p>
                <p>✓ Technical skills and projects</p>
                <p>✓ Contact details and professional links</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;