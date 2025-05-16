import React from "react";
import HeroText from "../components/HeroText";
import ParallaxBackGround from "../components/ParallaxBackGround";

const Hero = () => {
  return (
    <section className="flex items-start justify-center md:items-center md:justify-start min-h-screen overflow-hidden c-space">
      <HeroText />
      <ParallaxBackGround/>
    </section>
  );
};

export default Hero;
