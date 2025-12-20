import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loading = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);

  // Optimized loading time: Reduced by 0.3s for a snappier response
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300); // Quick pause at 100%
          return 100;
        }
        // Slightly larger jumps to reach 100% faster
        const jump = Math.floor(Math.random() * 10) + 6; 
        return Math.min(prev + jump, 100);
      });
    }, 150); // Speed up interval from 180ms to 150ms
    return () => clearInterval(interval);
  }, [onFinish]);

  const codeSnippets = [
    "const app = express();",
    "mongoose.connect(DB_URI);",
    "app.use(cors());",
    "export default function Hero()",
    "useEffect(() => { ... }, []);",
    "const [user, setUser] = useState();",
    "api.post('/v1/auth/login')",
    "npm install framer-motion",
    "const data = await res.json();",
    "export const dynamic = 'force-dynamic';",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020203] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        clipPath: "inset(0 0 100% 0)", 
        transition: { duration: 0.5, ease: [0.7, 0, 0.3, 1] } 
      }}
    >
      {/* BACKGROUND CODE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.18] md:opacity-[0.25] pointer-events-none flex justify-between px-4">
        <motion.div 
          animate={{ y: [0, -400] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6 font-mono text-[9px] md:text-[11px] text-sky-400 whitespace-nowrap"
        >
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((snippet, i) => (
            <span key={i} className="block">{snippet}</span>
          ))}
        </motion.div>

        <motion.div 
          animate={{ y: [-400, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-6 font-mono text-[9px] md:text-[11px] text-emerald-400 text-right whitespace-nowrap"
        >
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((snippet, i) => (
            <span key={i} className="block">{snippet}</span>
          ))}
        </motion.div>
      </div>

      {/* VIRTUAL GRID LAYER */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }} 
      />

      {/* CENTER CONTENT */}
      <div className="relative z-50 flex flex-col items-center px-6 w-full max-w-lg">
        
        {/* CLI Terminal Tag */}
        <motion.div 
          className="mb-6 font-mono text-[10px] text-sky-500/90 bg-sky-500/10 px-3 py-1 border border-sky-500/30 rounded shadow-[0_0_15px_rgba(56,189,248,0.1)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          $ npx create-dev-env@latest
        </motion.div>

        {/* Branding Section */}
        <div className="relative text-center mb-12">
          <motion.h1 
            className="text-white text-4xl md:text-6xl font-black tracking-tighter"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            MERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500 italic">STACK</span>
          </motion.h1>
          
          <motion.div className="flex items-center justify-center gap-2 mt-4">
             <span className="text-slate-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em]">Fullstack_Architect</span>
             <motion.div 
               animate={{ opacity: [1, 0] }} 
               transition={{ repeat: Infinity, duration: 0.8 }}
               className="w-2.5 h-4 bg-emerald-500 shadow-[0_0_10px_#10b981]"
             />
          </motion.div>
        </div>

        {/* PROGRESS BOX */}
        <div className="w-full max-w-[280px] md:max-w-xs p-1">
          <div className="flex justify-between items-end mb-2 font-mono text-[10px]">
            <span className="text-slate-500 tracking-wider">BOOTING_SYSTEM...</span>
            <span className="text-sky-400 font-bold">{percent}%</span>
          </div>

          <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
              initial={{ width: "0%" }}
              animate={{ width: `${percent}%` }}
              transition={{ ease: "linear", duration: 0.15 }}
            />
          </div>

          <div className="mt-6 flex justify-between gap-2">
             {["REST_API", "JWT_AUTH", "REDUX"].map((tech) => (
               <span key={tech} className="text-[7px] md:text-[9px] font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded bg-white/5 tracking-tighter uppercase">
                {tech}
               </span>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loading;
