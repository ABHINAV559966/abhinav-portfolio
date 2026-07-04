import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCode,
  FiLayout,
  FiDatabase,
  FiBarChart2,
  FiTool,
  FiLayers,
} from "react-icons/fi";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase";

const categoryConfig = {
  Programming: {
    key: "Programming",
    label: "Programming",
    icon: FiCode,
  },
  "Web Development": {
    key: "Web Development",
    label: "Web Development",
    icon: FiLayout,
  },
  Database: {
    key: "Database",
    label: "Database",
    icon: FiDatabase,
  },
  "Data & Analytics": {
    key: "Data & Analytics",
    label: "Data & Analytics",
    icon: FiBarChart2,
  },
  "Tools & Platforms": {
    key: "Tools & Platforms",
    label: "Tools & Platforms",
    icon: FiTool,
  },
  Other: {
    key: "Other",
    label: "Other",
    icon: FiLayers,
  },
};

function Skills() {
  const [activeCategory, setActiveCategory] = useState("Programming");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const skillsQuery = query(
      collection(db, "skills"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      skillsQuery,
      (snapshot) => {
        const firebaseSkills = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setSkills(firebaseSkills);
        setLoading(false);
      },
      (error) => {
        console.error("Could not load skills:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const groupedSkills = useMemo(() => {
    const groups = {};

    Object.keys(categoryConfig).forEach((category) => {
      groups[category] = [];
    });

    skills.forEach((skill) => {
      const category = categoryConfig[skill.category]
        ? skill.category
        : "Other";

      groups[category].push({
        id: skill.id,
        name: skill.name || "Untitled Skill",
        proficiency: Number(skill.percentage ?? skill.proficiency ?? 0),
      });
    });

    return groups;
  }, [skills]);

  const availableCategories = Object.keys(categoryConfig).filter(
    (category) => groupedSkills[category].length > 0
  );

  useEffect(() => {
    if (
      availableCategories.length > 0 &&
      !availableCategories.includes(activeCategory)
    ) {
      setActiveCategory(availableCategories[0]);
    }
  }, [availableCategories, activeCategory]);

  const activeSkills = groupedSkills[activeCategory] || [];

  const handleKeyDown = (event) => {
    if (
      event.key !== "ArrowLeft" ||
      event.key !== "ArrowRight" ||
      availableCategories.length === 0
    ) {
      return;
    }

    event.preventDefault();

    const currentIndex = availableCategories.indexOf(activeCategory);
    const nextIndex =
      event.key === "ArrowRight"
        ? (currentIndex + 1) % availableCategories.length
        : (currentIndex - 1 + availableCategories.length) %
          availableCategories.length;

    setActiveCategory(availableCategories[nextIndex]);
  };

  return (
    <section id="skills" className="relative px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            My <span className="text-cyan-400">Skills</span>
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-gradient-to-r from-cyan-400 to-transparent" />
        </motion.div>

        {loading ? (
          <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-8 text-center text-slate-400">
            Loading skills...
          </div>
        ) : availableCategories.length === 0 ? (
          <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-8 text-center text-slate-400">
            Skills will appear here after you add them from the admin dashboard.
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-3"
              role="tablist"
              aria-label="Skill categories"
            >
              {availableCategories.map((category) => {
                const CategoryIcon = categoryConfig[category].icon;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    onKeyDown={handleKeyDown}
                    role="tab"
                    aria-selected={activeCategory === category}
                    aria-controls={`tabpanel-${category}`}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400 sm:px-4 sm:py-3 ${
                      activeCategory === category
                        ? "border border-cyan-400 bg-cyan-400/10 text-cyan-300"
                        : "border border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                    }`}
                  >
                    <CategoryIcon size={18} aria-hidden="true" />
                    <span className="text-sm">{categoryConfig[category].label}</span>
                  </button>
                );
              })}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                id={`tabpanel-${activeCategory}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {activeSkills.map((skill, index) => (
                  <motion.article
                    key={skill.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 backdrop-blur transition hover:border-cyan-400/50 hover:bg-slate-900/70"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <span className="text-sm font-bold text-cyan-400">
                        {skill.proficiency}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(
                            100,
                            Math.max(0, skill.proficiency)
                          )}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300"
                      />
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}

export default Skills;