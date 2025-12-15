import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Optional: Animated counting numbers
  const [experience, setExperience] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [projects, setProjects] = useState(0);

  useEffect(() => {
    if (inView) {
      let exp = 0,
        cus = 0,
        pro = 0;
      const interval = setInterval(() => {
        if (exp < 2) setExperience((prev) => prev + 0.1);
        if (cus < 50) setCustomers((prev) => prev + 1);
        if (pro < 50) setProjects((prev) => prev + 1);
      }, 30);
      setTimeout(() => clearInterval(interval), 1600);
    }
  }, [inView]);

  // Variants
  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const fadeLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const fadeRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  const stats = [
    { number: `${experience.toFixed(1)}+`, text: "Years of Experience" },
    { number: `${customers}+`, text: "Global Customers" },
    { number: `${projects}+`, text: "Projects Completed" },
  ];

  return (
    <section ref={ref} id="about" className="min-h-screen py-20 px-6 sm:px-12 relative overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-purple-800/10 pointer-events-none -z-10"></div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center lg:justify-start relative"
        >
          {/* Glow Ring */}
          <div className="absolute w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl bg-gradient-to-br from-purple-500/30 to-transparent blur-2xl -z-10 animate-pulse"></div>
          <motion.img
            src="gg.png"
            alt="Profile"
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl shadow-xl object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-6 underline underline-offset-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-gray-300 text-base sm:text-lg md:text-lg lg:text-xl mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            I am a Full Stack (MERN) developer with expertise in MongoDB, Express.js, React, and Node.js, building scalable and high-performance web applications. I create responsive, user-friendly interfaces while implementing robust backend logic, database management, and APIs. Focused on clean, maintainable code and performance optimization, I deliver end-to-end digital solutions that transform complex requirements into fully functional applications with exceptional user experiences.
          </motion.p>
          <motion.p
            className="text-gray-300 text-base sm:text-lg md:text-lg lg:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            My goal is to turn ideas into stunning websites that provide a smooth user experience across all devices. I continually learn new tools and technologies to enhance my skill set and deliver high-quality projects.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139,92,246,0.6)" }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 cursor-pointer"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.3 + index * 0.2 }}
            className="relative group"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-800/40 via-purple-900/20 to-purple-800/10 shadow-lg hover:shadow-purple-700/40 transition-all duration-300">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold my-4 text-white">{item.number}</h3>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
