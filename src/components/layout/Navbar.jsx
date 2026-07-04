import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useScrollNavigation } from "../../hooks/useScrollNavigation";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useScrollNavigation(navLinks.map((link) => link.id));

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d1b]/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <a
          href="#home"
          className="text-xl font-bold tracking-wide text-white transition hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md px-2 py-1"
          aria-label="Abhinav - Home"
        >
          Abhinav<span className="text-cyan-400">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                activeSection === link.id
                  ? "text-cyan-400 bg-cyan-400/10"
                  : "text-slate-300 hover:text-cyan-400"
              }`}
              aria-current={activeSection === link.id ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            className="ml-2 rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#080d1b]"
            aria-label="Hire Me - Contact section"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-cyan-300 md:hidden transition hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-md p-1"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className="border-t border-white/10 bg-[#080d1b] px-6 py-4 md:hidden"
          role="navigation"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className={`px-3 py-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  activeSection === link.id
                    ? "text-cyan-400 bg-cyan-400/10 font-medium"
                    : "text-slate-300 hover:text-cyan-400"
                }`}
                aria-current={activeSection === link.id ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="mt-2 rounded-lg bg-cyan-500 px-4 py-2 text-center font-semibold text-slate-950 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;