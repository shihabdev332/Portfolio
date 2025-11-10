// Skills.jsx
import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 85 },
  { name: "Tailwind CSS", level: 80 },
  { name: "Node.js", level: 70 },
  { name: "Express.js", level: 70 },
  { name: "MongoDB", level: 65 },
  { name: "Mongoose", level: 65 },
  { name: "Material UI", level: 75 },
  { name: "Framer Motion", level: 70 },
  { name: "Three.js", level: 50 },
];

// Parent variants (section load + stagger children)
const containerVariants = {
  hidden: { opacity: 0, y: 50 }, // section hidden initially
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // section fade-in duration
      delay: 0.3,    // delay after previous section
      staggerChildren: 0.2, // skill bars stagger
    },
  },
};

// Skill bar variants
const skillVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: (level) => ({
    width: `${level}%`,
    opacity: 1,
    transition: { duration: .5 },
  }),
  exit: { width: 0, opacity: 0, transition: { duration: 0.5 } },
};

const Skills = () => {
  return (
    <motion.section
      className="py-16 bg-gray-900 text-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">My Skills</h2>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-2">{skill.name}</h3>
              <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  custom={skill.level}
                  variants={skillVariants}
                  className="h-4 bg-purple-500 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-300 mt-1 block">{skill.level}%</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
