import { useEffect } from "react";
import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  href,
  github,
  image,
  tags,
  closeModal,
}) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-hidden backdrop-blur-sm  ">
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto scrollbar-hide border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500"
        >
          <img src="assets/close.svg" alt="close icon" className="w-6 h-6" />
        </button>
        <img src={image} alt={title} className="w-full rounded-t-2xl" />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 font-normal text-neutral-400">
              {subDesc}
            </p>
          ))}
          <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) =>
                tag.path ? (
                  <img
                    src={tag.path}
                    key={tag.id || tag.name}
                    alt={tag.name}
                    title={tag.name}
                    className="rounded-lg size-10 hover-animation"
                  />
                ) : (
                  <span
                    key={tag.id || tag.name}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300 flex items-center border border-white/10"
                  >
                    {tag.name}
                  </span>
                )
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium cursor-pointer text-neutral-300 hover:text-white hover-animation shrink-0"
                >
                  <img
                    src="/assets/socials/github.svg"
                    alt="GitHub"
                    className="w-4 h-4"
                  />
                  <span>GitHub</span>
                </a>
              )}
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation shrink-0"
                >
                  View Project{" "}
                  <img
                    src="assets/arrow-up.svg"
                    alt="arrow up icon"
                    className="size-4"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
