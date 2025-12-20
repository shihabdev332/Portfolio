import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const codeSnippets = [
  "const [data, setData] = useState([]);",
  "router.get('/api/projects', getProjects);",
  "className='hover:scale-105 transition';",
  "const res = await axios.post(url, body);",
  "useEffect(() => { window.scrollTo(0,0) });",
  "export const metadata = { title: 'Shihab' };",
  "npm run build && firebase deploy",
  "console.log('Backend connected...');",
];

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [experience, setExperience] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [projects, setProjects] = useState(0);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setExperience((prev) => Math.min(prev + 0.05, 2.7));
        setCustomers((prev) => Math.min(prev + 1, 50));
        setProjects((prev) => Math.min(prev + 1, 50));
      }, 30);
      setTimeout(() => clearInterval(interval), 2000);
    }
  }, [inView]);

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const fadeLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
  const fadeRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };

  const stats = [
    { number: `${experience.toFixed(1)}+`, text: "Years of Experience", color: "text-sky-400" },
    { number: `${customers}+`, text: "Global Customers", color: "text-emerald-400" },
    { number: `${projects}+`, text: "Projects Completed", color: "text-purple-400" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen py-24 px-6 sm:px-12 overflow-hidden bg-[#020203]"
    >
      {/* --- BACKGROUND ANIMATION LAYER (Same as Hero) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        <div className="absolute inset-0 opacity-[0.1] flex justify-between px-10">
          <motion.div 
            animate={{ y: [0, -500] }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-10 font-mono text-[10px] text-sky-500/50"
          >
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </motion.div>
          <motion.div 
            animate={{ y: [-500, 0] }} 
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex flex-col gap-10 font-mono text-[10px] text-emerald-500/50 text-right"
          >
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Section */}
          <motion.div variants={fadeLeft} initial="hidden" animate={inView ? "visible" : "hidden"} className="relative flex justify-center lg:justify-start">
            {/* The "Glow" behind the image */}
            <div className="absolute w-64 h-64 rounded-full bg-purple-600/20 blur-[80px] -z-10 animate-pulse"></div>
            
            <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-purple-500 to-sky-500 shadow-2xl">
              <motion.img
                src="gg.png"
                alt="Profile"
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl object-cover bg-black"
              />
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div variants={fadeRight} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center lg:text-left">
            <div className="inline-block mb-4 font-mono text-[11px] text-sky-400 bg-sky-400/10 px-3 py-1 border border-sky-400/20 rounded uppercase tracking-widest">
              System.Profile_Info
            </div>
            
            <motion.h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 italic">ME</span>
            </motion.h2>

            <motion.div className="space-y-6 text-gray-400 text-lg leading-relaxed max-w-2xl">
              <p>
                I am a <span className="text-white font-semibold">Full Stack (MERN)</span> developer specialized in crafting the architecture of modern web experiences. My workflow revolves around turning complex problems into elegant, high-performance code.
              </p>
              <p>
                Whether it's a robust backend with Node.js or a fluid, animated interface with Framer Motion, I ensure every line of code serves a purpose. My goal is to bridge the gap between heavy-duty logic and pixel-perfect design.
              </p>
            </motion.div>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-sky-400 hover:text-white transition-all duration-300"
              >
                Let's Talk
              </motion.a>
              <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 font-mono text-xs text-emerald-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                Available for Projects
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-500 text-center">
                <h3 className={`text-5xl md:text-6xl font-black mb-2 ${item.color} tracking-tighter`}>
                  {item.number}
                </h3>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
