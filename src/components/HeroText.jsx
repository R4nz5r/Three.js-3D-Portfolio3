import React from "react";

const HeroText = () => {
  return (
    <div className="z-10 mt-20 text-center  md:mt-40 md:text-left rounded-3xl bg-clip-text">
      {/* desktop view */}
      <div className="flex-col hidden md:flex c-space">
        <h1 className="text-4xl font-medium">Hi I'm Ragib</h1>
        <div className="flex flex-col items-start">
          <p className="text-5xl font-medium text-neutral-300">
            A developer <br /> Dedicated to Crafting
          </p>
          {/* get flip word */}
          <p className="text-4xl font-medium text-neutral-300">Web Solutions</p>
        </div>
      </div>
      {/* mobile view */}
    </div>
  );
};

export default HeroText;
