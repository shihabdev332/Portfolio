import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import { FiHexagon } from "react-icons/fi";

const Company = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const companies = [
    "YEllo Amber It",
    "Bruaracia",
    "My Captain",
    "Umion Living",
    "Accenture",
  ];
  
  // Tripling the list ensures no gaps on ultra-wide monitors
  const companiesList = [...companies, ...companies, ...companies];

  const marqueeVariants = {
    animate: {
      x: [0, "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30, // Slower is more premium
          ease: "linear",
        },
      },
    },
  };

  const reverseMarqueeVariants = {
    animate: {
      x: ["-50%", 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden bg-[#020203]"
    >
      {/* --- TECH OVERLAY --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-3 py-1 border border-emerald-500/20 rounded uppercase tracking-[0.2em]"
          >
            <FiHexagon className="animate-spin-slow" /> Trusted_By_Industry_Leaders
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
            PROFESSIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-100 italic">NETWORK</span>
          </h2>
        </div>

        {/* First Row: Forward */}
        <div className="relative flex overflow-hidden py-4 mask-fade-edges">
          <motion.div
            variants={marqueeVariants}
            animate="animate"
            className="flex whitespace-nowrap gap-8"
          >
            {companiesList.map((company, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
                <span className="text-xl md:text-2xl font-bold text-slate-500 group-hover:text-white transition-colors tracking-tight">
                  {company}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row: Reverse */}
        <div className="relative flex overflow-hidden py-4 mt-4 mask-fade-edges">
          <motion.div
            variants={reverseMarqueeVariants}
            animate="animate"
            className="flex whitespace-nowrap gap-8"
          >
            {companiesList.map((company, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-8 py-4 rounded-xl bg-white/[0.03] border border-white/5 group hover:border-sky-500/30 transition-all duration-500"
              >
                <div className="w-2 h-2 rounded-full bg-sky-500/20 group-hover:bg-sky-500 transition-colors" />
                <span className="text-xl md:text-2xl font-bold text-slate-500 group-hover:text-white transition-colors tracking-tight">
                  {company}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CSS for edge fading */}
      <style jsx>{`
        .mask-fade-edges {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Company;
