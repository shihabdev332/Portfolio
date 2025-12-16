// Skills.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "TypeScript", level: 60 },
  { name: "React", level: 85 },
  { name: "Next.js", level: 65 },
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

  const { ref, inView } = useInView({
    triggerOnce: false, // 🔥 repeat animation
    threshold: 0.2,
  });

  // counter logic (unchanged)
  useEffect(() => {
    let intervals = skills.map((skill, idx) =>
      setInterval(() => {
        setCounters((prev) => {
          const next = [...prev];
          if (inView && next[idx] < skill.level) next[idx] += 1;
          if (!inView) next[idx] = 0; // reset when leaving
          return next;
        });
      }, 20)
    );

    return () => intervals.forEach(clearInterval);
  }, [inView]);

  // animation control
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "#12111a" }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-purple-800/5 to-transparent -z-10" />

      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
          My Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{
                delay: idx * 0.1, // 🔥 one by one
                duration: 0.1,
              }}
              className="group relative"
            >
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-500">
                {skill.name}
              </h3>

              <div className="w-full h-6 bg-gray-800 rounded-3xl overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${counters[idx]}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-6 rounded-3xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg relative"
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
