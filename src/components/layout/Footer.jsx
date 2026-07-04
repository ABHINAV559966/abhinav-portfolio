import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ];

  const socials = [
    { label: "GitHub", href: "https://github.com/ABHINAV559966", icon: FiGithub },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abhinav-adabala/", icon: FiLinkedin },
    { label: "Email", href: "mailto:abhinavadabala.99@gmail.com", icon: FiMail },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <footer
      className="relative border-t border-slate-700 bg-slate-950 px-6 py-12 md:py-16"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 grid gap-8 md:grid-cols-3"
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                <span className="text-xs font-bold text-slate-950">AA</span>
              </div>
              <span className="font-bold text-white">Abhinav</span>
            </div>
            <p className="text-sm text-slate-400">
              B.Tech CSE (AI & Data Science) student building modern web applications and AI solutions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded px-2 py-1 text-sm text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:text-cyan-400"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Connect
            </h3>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                  aria-label={label}
                  className="rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-8 h-px bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
        />

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-slate-400">
            © {currentYear} Abhinav Adabala. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Designed with <span className="text-cyan-400">React</span> & love 🚀
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
