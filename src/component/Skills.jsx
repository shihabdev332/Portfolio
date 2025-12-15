// Skills.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

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

const Skills = () => {
  const [counters, setCounters] = useState(skills.map(() => 0));
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    let intervals = skills.map((skill, idx) =>
      setInterval(() => {
        setCounters((prev) => {
          const newCounters = [...prev];
          if (newCounters[idx] < skill.level) newCounters[idx] += 1;
          return newCounters;
        });
      }, 20)
    );

    return () => intervals.forEach((i) => clearInterval(i));
  }, []);

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#12111a" }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-purple-800/5 to-transparent -z-10"></div>

      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
          My Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative"
            >
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500">
                {skill.name}
              </h3>
              <div className="w-full h-6 bg-gray-800 rounded-3xl overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${counters[idx]}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-6 rounded-3xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg group-hover:scale-105 group-hover:shadow-purple-400/60 transition-transform duration-300 relative"
                >
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-semibold text-sm">
                    {counters[idx]}%
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
