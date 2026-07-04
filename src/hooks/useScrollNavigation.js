import { useState, useEffect } from "react";

export function useScrollNavigation(sections = []) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((id) => ({
        id,
        element: document.getElementById(id),
      }));

      let current = "";

      for (const section of sectionElements) {
        if (!section.element) continue;

        const rect = section.element.getBoundingClientRect();
        if (rect.top <= 150) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return activeSection;
}
