import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const codeStreamUpRef = useRef(null);
  const codeStreamDownRef = useRef(null);
  const progressRef = useRef(null);
  const contentRef = useRef(null);

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

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit Animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete: onFinish
        });
      }
    });

    // 1. Background Code Streams
    gsap.to(codeStreamUpRef.current, {
      y: -500,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    gsap.to(codeStreamDownRef.current, {
      y: 500,
      duration: 22,
      repeat: -1,
      ease: "none",
    });

    // 2. Initial Content Reveal
    tl.from(contentRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power3.out"
    });

    // 3. Counter Animation (Real-time percentage)
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 3, // Total loading time
      ease: "power2.inOut",
      onUpdate: () => {
        setPercent(Math.floor(counterObj.value));
      }
    }, "-=0.5");

    // 4. Subtle Pulse on Branding
    gsap.to(".loading-brand", {
      opacity: 0.7,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power1.inOut"
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020203] overflow-hidden"
    >
      {/* BACKGROUND CODE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none flex justify-between px-4 overflow-hidden">
        <div 
          ref={codeStreamUpRef}
          className="flex flex-col gap-8 font-mono text-[10px] md:text-[12px] text-sky-500 whitespace-nowrap"
        >
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((snippet, i) => (
            <span key={i} className="block">{snippet}</span>
          ))}
        </div>

        <div 
          ref={codeStreamDownRef}
          className="flex flex-col gap-8 font-mono text-[10px] md:text-[12px] text-emerald-500 text-right whitespace-nowrap"
        >
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((snippet, i) => (
            <span key={i} className="block">{snippet}</span>
          ))}
        </div>
      </div>

      {/* VIRTUAL GRID LAYER */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }} 
      />

      {/* CENTER CONTENT */}
      <div ref={contentRef} className="relative z-50 flex flex-col items-center px-6 w-full max-w-lg">
        
        {/* CLI Terminal Tag */}
        <div className="mb-8 font-mono text-[10px] text-sky-400 bg-sky-400/10 px-4 py-1.5 border border-sky-400/20 rounded-full tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.1)]">
          $ system.initialize_mern_stack()
        </div>

        {/* Branding Section */}
        <div className="relative text-center mb-16">
          <h1 className="loading-brand text-white text-5xl md:text-7xl font-black tracking-tighter">
            MERN <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-500 italic">STACK</span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mt-6">
             <span className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">Architecting_Digital_Future</span>
             <div className="w-2 h-4 bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
          </div>
        </div>

        {/* PROGRESS BOX */}
        <div className="w-full max-w-[300px] md:max-w-sm">
          <div className="flex justify-between items-end mb-3 font-mono">
            <div className="flex flex-col">
                <span className="text-[8px] text-slate-600 uppercase tracking-widest">Status</span>
                <span className="text-[10px] text-slate-400 tracking-wider">
                    {percent < 100 ? "OPTIMIZING_RESOURCES..." : "SYSTEM_READY"}
                </span>
            </div>
            <span className="text-sky-400 font-bold text-xl">{percent}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm relative">
            {/* Animated Glow Track */}
            <div 
              ref={progressRef}
              style={{ width: `${percent}%` }}
              className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all duration-150 ease-linear"
            />
          </div>

          {/* Tech Badges */}
          <div className="mt-8 flex justify-center gap-3">
             {["MongoDB", "Express", "React", "Node"].map((tech) => (
               <span key={tech} className="text-[8px] font-mono text-slate-500 border border-white/5 px-2.5 py-1 rounded-sm bg-white/[0.02] tracking-widest uppercase">
                {tech}
               </span>
             ))}
          </div>
        </div>
      </div>

      {/* SCANLINE EFFECT */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[100]" />
    </div>
  );
};

export default Loading;