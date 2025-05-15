import React from "react";
import HeroText from "../components/HeroText";

const Hero = () => {
  return (
    <section className="flex items-start justify-center md:items-center md:justify-start min-h-screen overflow-hidden c-space">
      <HeroText />
    </section>
  );
};

export default Hero;
