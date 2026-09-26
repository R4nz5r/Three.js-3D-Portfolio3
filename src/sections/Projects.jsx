import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

const INITIAL_PROJECT_COUNT = 5;

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [preview, setPreview] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 10, stiffness: 50 });
  const springY = useSpring(y, { damping: 10, stiffness: 50 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  const initialProjects = myProjects.slice(0, INITIAL_PROJECT_COUNT);
  const extraProjects = myProjects.slice(INITIAL_PROJECT_COUNT);
  const hasMore = extraProjects.length > 0;

  const toggleShowAll = () => {
    if (showAll) {
      const workSection = document.getElementById("work");
      if (workSection) {
        const yOffset = -80;
        const targetY = workSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section
      id="work"
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
    >
      <div id="projects" className="absolute -top-24 pointer-events-none" />
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-heading">My Selected Projects</h2>
          <p className="mt-2 text-sm text-neutral-400">
            A curated showcase of full-stack platforms, AI systems, and interactive experiences.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 self-start sm:self-end">
          {showAll ? `${myProjects.length} Projects` : `5 of ${myProjects.length} Projects`}
        </span>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-10 h-[1px] w-full" />

      {/* Initial 5 Flagship Projects */}
      {initialProjects.map((project) => (
        <Project key={project.id} {...project} setPreview={setPreview} />
      ))}

      {/* Expandable Remaining Projects */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {extraProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
              >
                <Project {...project} setPreview={setPreview} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show More / Show Less Toggle Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={toggleShowAll}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-white transition-all duration-300 rounded-full bg-gradient-to-r from-midnight via-navy to-indigo border border-white/10 hover:border-white/25 hover:shadow-[0_0_25px_rgba(122,87,219,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>
              {showAll
                ? "Show Less"
                : `View All Projects (${myProjects.length})`}
            </span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      )}

      {/* Floating Hover Preview */}
      {preview && (
        <motion.img
          style={{ x: springX, y: springY }}
          src={preview}
          alt=""
          className="fixed top-0 left-0 z-50 object-cover h-56 shadow-lg rounded-lg pointer-events-none w-80 hidden md:block"
        />
      )}
    </section>
  );
};

export default Projects;
