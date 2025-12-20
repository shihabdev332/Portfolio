import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "HTML", level: 90, color: "from-orange-500 to-red-500" },
  { name: "CSS", level: 85, color: "from-blue-500 to-sky-500" },
  { name: "JavaScript", level: 80, color: "from-yellow-400 to-orange-500" },
  { name: "TypeScript", level: 60, color: "from-blue-600 to-indigo-500" },
  { name: "React", level: 85, color: "from-sky-400 to-blue-500" },
  { name: "Node.js", level: 70, color: "from-green-500 to-emerald-600" },
  { name: "MongoDB", level: 65, color: "from-emerald-500 to-green-700" },
  { name: "Framer Motion", level: 75, color: "from-purple-500 to-pink-500" },
];

const codeSnippets = [
  "npm install @headlessui/react",
  "const [isLoading, setLoading] = useState(true);",
  "tailwind.config.js",
  "git commit -m 'feat: add skills'",
  "import { motion } from 'framer-motion';",
  "const stats = await db.collection('skills').find();",
];

const Skills = () => {
  const [counters, setCounters] = useState(skills.map(() => 0));
  const controls = useAnimation();

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    let intervals = skills.map((skill, idx) =>
      setInterval(() => {
        setCounters((prev) => {
          const next = [...prev];
          if (inView && next[idx] < skill.level) next[idx] += 1;
          if (!inView) next[idx] = 0;
          return next;
        });
      }, 15)
    );
    return () => intervals.forEach(clearInterval);
  }, [inView]);

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden bg-[#020203]"
      id="skills"
    >
      {/* --- SHARED TECH BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '50px 50px' 
          }} 
        />
        {/* Only one column of code here to keep it cleaner than Hero */}
        <div className="absolute inset-0 opacity-[0.07] flex justify-center">
           <motion.div 
            animate={{ y: [0, -400] }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-12 font-mono text-[10px] text-purple-500/40"
          >
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 rounded uppercase tracking-tighter">
            $ system --check-capabilities
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 italic">SKILLS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, x: idx % 2 === 0 ? -20 : 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="group"
            >
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                   <span className="font-mono text-[10px] text-slate-500">0{idx + 1}</span>
                   <h3 className="text-sm font-bold text-slate-200 tracking-widest uppercase">
                    {skill.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  {counters[idx]}%
                </span>
              </div>

              {/* Terminal Style Progress Bar */}
              <div className="relative h-[6px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${counters[idx]}%` }}
                  className={`h-full bg-gradient-to-r ${skill.color} shadow-[0_0_10px_rgba(16,185,129,0.3)]`}
                />
              </div>
              
              {/* Bit-indicator aesthetic */}
              <div className="flex gap-1 mt-2 opacity-20 group-hover:opacity-50 transition-opacity">
                 {[...Array(15)].map((_, i) => (
                   <div key={i} className={`h-[2px] w-[6px] rounded-full ${i/15 * 100 < counters[idx] ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                 ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Console-style footer */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="mt-20 p-4 rounded bg-white/[0.02] border border-white/5 font-mono text-[10px] text-slate-500 max-w-2xl mx-auto"
        >
          <p className="flex gap-2">
            <span className="text-emerald-500">✔</span> All modules loaded successfully.
          </p>
          <p className="flex gap-2">
            <span className="text-sky-500">ℹ</span> Specialized in building interactive MERN stack interfaces with 60FPS animations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
