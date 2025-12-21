import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "HTML", level: 90, color: "from-orange-500 to-red-600" },
  { name: "CSS", level: 95, color: "from-blue-500 to-indigo-600" },
  { name: "JavaScript", level: 80, color: "from-yellow-400 to-orange-500" },
  { name: "TypeScript", level: 60, color: "from-blue-600 to-sky-400" },
  { name: "React", level: 85, color: "from-sky-400 to-blue-500" },
  { name: "Next.js", level: 80, color: "from-white to-gray-400" },
  { name: "Tailwind CSS", level: 95, color: "from-teal-400 to-cyan-500" },
  { name: "Node.js", level: 80, color: "from-green-500 to-emerald-600" },
  { name: "Express.js", level: 80, color: "from-gray-300 to-gray-500" },
  { name: "MongoDB", level: 95, color: "from-emerald-500 to-green-700" },
  { name: "Mongoose", level: 90, color: "from-red-800 to-red-600" },
  { name: "Material UI", level: 75, color: "from-blue-400 to-blue-700" },
  { name: "Framer Motion", level: 90, color: "from-purple-500 to-pink-500" },
  { name: "Three.js", level: 30, color: "from-white to-purple-400" },
];

const codeSnippets = [
  "npm install @headlessui/react",
  "const [isLoading, setLoading] = useState(true);",
  "tailwind.config.js",
  "git commit -m 'feat: add skills'",
  "import { motion } from 'framer-motion';",
  "const stats = await db.collection('skills').find();",
  "export default function App() {",
  "api.get('/users', (req, res) => {",
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
    <section ref={ref} className="py-24 relative overflow-hidden bg-[#020203]" id="skills">
      
      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
        />
        <div className="absolute inset-0 opacity-[0.07] flex justify-around">
           <motion.div animate={{ y: [0, -500] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex flex-col gap-12 font-mono text-[10px] text-purple-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </motion.div>
          <motion.div animate={{ y: [-500, 0] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="hidden md:flex flex-col gap-12 font-mono text-[10px] text-sky-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="inline-block mb-3 font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 rounded tracking-tighter">
            $ execute --skill-audit
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 italic">CAPABILITIES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-6xl mx-auto">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={controls}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              className="group relative"
            >
              {/* Skill Info */}
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-3">
                   <span className="font-mono text-[9px] text-slate-600 group-hover:text-emerald-500 transition-colors">
                     [{idx < 9 ? `0${idx + 1}` : idx + 1}]
                   </span>
                   <h3 className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors tracking-widest uppercase font-mono">
                    {skill.name}
                  </h3>
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  LEVEL: <span className="text-emerald-400 font-bold">{counters[idx]}%</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-[8px] w-full bg-white/5 rounded-sm overflow-hidden border border-white/5 p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${counters[idx]}%` }}
                  className={`h-full bg-gradient-to-r ${skill.color} relative shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                >
                    {/* Scanning light effect on the bar */}
                    <motion.div 
                        animate={{ x: ['-100%', '200%'] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                </motion.div>
              </div>

              {/* Visual "Data Bits" decoration */}
              <div className="flex gap-1 mt-2">
                 {[...Array(20)].map((_, i) => (
                   <div 
                    key={i} 
                    className={`h-[1.5px] flex-1 rounded-full transition-all duration-500 ${i/20 * 100 < counters[idx] ? 'bg-emerald-500/40' : 'bg-slate-800'}`} 
                   />
                 ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Diagnostic Terminal */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="mt-20 p-6 rounded-lg bg-[#050508] border border-white/5 font-mono text-[11px] text-slate-400 max-w-3xl mx-auto shadow-2xl"
        >
          <div className="flex gap-2 mb-2 border-b border-white/5 pb-2">
             <div className="w-2 h-2 rounded-full bg-red-500/50" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
             <div className="w-2 h-2 rounded-full bg-green-500/50" />
             <span className="ml-2 text-[9px] text-slate-600">bash — stack-report.log</span>
          </div>
          <p className="flex gap-2 mb-1">
            <span className="text-emerald-500 font-bold">[READY]</span> All {skills.length} modules verified.
          </p>
          <p className="flex gap-2">
            <span className="text-sky-500 font-bold">[INFO]</span> Shihab is proficient in building scalable MERN applications with modern UI/UX patterns.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
