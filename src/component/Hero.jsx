import { motion } from "framer-motion";
import React from "react";

const Hero = () => {
  return (
    <div className="text-white py-10 ">
      <div className="w-72 h-72 rounded-full overflow-hidden items-center mx-auto">
        <motion.img
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 1,
          }}
          src="this.png"
          className="w-full h-full object-cover "
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
        }}
        className="container mx-auto text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
          className="text-4xl text-[#ce83e3] md:text-5xl felx flex-col gap-4 font-bold "
        >
          Hello, This is Shihab. <br />
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
            className="text-purple-500 text-2xl"
          >
            Passionate about user-friendly full-Stack web development and design.
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.9,
          }}
          className="text-gray-500 text-lg mb-4"
        >
          I am a passionate Full Stack developer specializing in building
          user-friendly and responsive web applications. I create modern,
          interactive websites using React, Tailwind CSS, JavaScript, Node.js,
          Express, and MongoDB. Constantly expanding my skills, I also work with
          animations using Framer Motion and explore new technologies like
          Three.js to deliver complete end-to-end digital solutions.
        </motion.p>
      </motion.div>
      <div className="space-x-4 mx-auto text-center ">
        <motion.button
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 1,
            duration: 0.7,
          }}
          className="bg-purple-500 text-white hover:bg-purple-700 px-6 py-3 rounded-full transition duration-300 cursor-pointer"
        >
          About Me
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 1,
            duration: 0.7,
          }}
          className="0 text-white hover:bg-purple-700 px-6 py-3 rounded-full transition duration-300 cursor-pointer"
        >
          Hire Me
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;
