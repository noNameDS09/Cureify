import React from "react";
import Typewriter from 'typewriter-effect';
const Hero = () => {
  const arr = [
    "You Know the Symptoms",
    "We Know the Disease"
  ];

  return (
    <div className="mt-16">
      <div className="flex justify-center items-center flex-col">
        <div className="bg-black relative">
          <img
            src="/images/Stethoscopepaper.webp"
            alt="hero"
            className="w-[100vw] h-[50rem] opacity-30"
          />
        </div>
        <div className="absolute text-white text-9xl text-center">
          Cureify
            <span className="text-4xl">
              {arr.map((value, index) => (
                <div key={index}>
                  {value}
                </div>
              ))}
            </span>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
