import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.section
      id="about"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="min-h-screen flex flex-col justify-center  px-6 sm:px-12 py-16"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          variants={fadeLeft}
          className="flex justify-center lg:justify-start"
        >
          <img
            src="gg.png"
            alt="Profile"
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl shadow-lg object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={fadeRight}
          transition={{ delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-500 mb-6 underline underline-offset-4">
            About Me
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-lg lg:text-xl mb-4 leading-relaxed">
            I am a Full Stack (MERN) developer with expertise in MongoDB,
            Express.js, React, and Node.js, building scalable and
            high-performance web applications. I create responsive,
            user-friendly interfaces while implementing robust backend logic,
            database management, and APIs. Focused on clean, maintainable code
            and performance optimization, I deliver end-to-end digital solutions
            that transform complex requirements into fully functional
            applications with exceptional user experiences.
          </p>
          <p className="text-gray-400 text-base sm:text-lg md:text-lg lg:text-xl mb-8 leading-relaxed">
            My goal is to turn ideas into stunning websites that provide a
            smooth user experience across all devices. I continually learn new
            tools and technologies to enhance my skill set and deliver
            high-quality projects.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 cursor-pointer"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {[
          { number: "2+", text: "Years of Experience" },
          { number: "50+", text: "Global Customers" },
          { number: "50+", text: "Projects Completed" },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            transition={{ delay: 0.3 + index * 0.2 }}
          >
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold my-4 bg-purple-500 px-6 py-3 rounded-lg shadow-lg text-white">
              {item.number}
            </h3>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default About;
