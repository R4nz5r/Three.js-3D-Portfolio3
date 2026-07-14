import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";
const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <div
        className="flex-wrap items-center w-full py-10 justify-between space-y-14 sm:flex sm:space-y-0"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setPreview(image);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setPreview(null);
        }}
      >
        <div className="min-w-0">
          <p className="text-2xl break-words">{title}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id} className="break-words">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            setPreview(null);
            setIsHidden(true);
          }}
          className="flex items-center gap-1 cursor-pointer hover-animation shrink-0"
        >
          Read More
          <img src="assets/arrow-right.svg" className="w-5" alt="" />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
