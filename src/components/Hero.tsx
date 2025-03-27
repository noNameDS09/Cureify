import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white py-24 px-8 sm:px-40">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between space-y-12 md:space-y-0">
        {/* Left Side - Heading & Description */}
        <div className="text-center md:text-left max-w-lg space-y-6">
          <h1 className="text-5xl font-semibold leading-tight text-white mb-4">
            Personalized AI-Driven Medical Assistance
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Experience the future of healthcare with Cureify's AI-powered platform. Get personalized health
            recommendations, real-time medical assistance, and comprehensive support—all tailored to your needs.
          </p>
          <div className="flex justify-center md:justify-start">
            <a
              href="https://huggingface.co/spaces/AJ-ayushjha/Cureify"
              className="bg-white text-blue-600 hover:bg-blue-700 hover:text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </div>
        
        {/* Right Side - Image or Visual */}
        <div className="mt-12 md:mt-0">
          <img
            src="/images/medicalequipment.webp"
            alt="Medical Assistance"
            className="w-full md:w-96 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
