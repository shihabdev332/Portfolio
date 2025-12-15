import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

const Company = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const companies = [
    "YEllo Amber It",
    "Bruaracia",
    "My Captain",
    "Umion Living",
    "Accenture",
  ];
  const companiesList = [...companies, ...companies];

  const scrollVarient1 = {
    animate: {
      x: [0, -500],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        },
      },
    },
  };

  const scrollVarient2 = {
    animate: {
      x: [-500, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        },
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#11101a" }}
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-purple-800/5 to-transparent -z-10"></div>

      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
          Companies I've worked with
        </h2>

        {/* First scrolling row */}
        <div className="overflow-hidden relative w-full mt-5">
          <motion.div
            variants={scrollVarient1}
            animate="animate"
            className="whitespace-nowrap flex space-x-6"
          >
            {companiesList.map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139,92,246,0.6)" }}
                className="text-lg px-6 py-3 rounded-full inline-block bg-gradient-to-r from-purple-700 to-purple-500 text-white shadow-lg cursor-pointer transition-transform duration-300"
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second scrolling row (opposite direction) */}
        <div className="overflow-hidden relative w-full mt-5">
          <motion.div
            variants={scrollVarient2}
            animate="animate"
            className="whitespace-nowrap flex space-x-6"
          >
            {companiesList.map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139,92,246,0.6)" }}
                className="text-lg px-6 py-3 rounded-full inline-block bg-gradient-to-r from-purple-700 to-purple-500 text-white shadow-lg cursor-pointer transition-transform duration-300"
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Company;
