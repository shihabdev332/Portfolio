import React, { useState, useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const codeStreamUpRef = useRef(null);
  const codeStreamDownRef = useRef(null);
  const contentRef = useRef(null);
  const auraRef = useRef(null);

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
    const totalDuration = 3.5; 

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 1,
          ease: "power4.inOut",
          onComplete: onFinish
        });
      }
    });

    // 1. Background Streams - Smooth Motion
    gsap.to(codeStreamUpRef.current, {
      y: -1000,
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    gsap.to(codeStreamDownRef.current, {
      y: 1000,
      duration: 28,
      repeat: -1,
      ease: "none",
    });

    // 2. Matt Purple Aura Pulse
    gsap.to(auraRef.current, {
      scale: 1.4,
      opacity: 0.3,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 3. Counter Logic
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: totalDuration,
      ease: "slow(0.7, 0.7, false)",
      onUpdate: () => {
        setPercent(Math.floor(counterObj.value));
      }
    });

    // 4. Content Reveal
    tl.fromTo(contentRef.current, 
      { opacity: 0, scale: 0.9, filter: "blur(15px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
      0.5
    );

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07030D] overflow-hidden select-none"
    >
      {/* PREMIUM MATT PURPLE BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1A0B2E_0%,#07030D_100%)]" />
      
      {/* Animated Aura */}
      <div 
        ref={auraRef} 
        className="absolute w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" 
      />
      
      {/* NOISE TEXTURE */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* DYNAMIC CODE STREAMS */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex justify-between px-20 overflow-hidden">
        <div ref={codeStreamUpRef} className="flex flex-col gap-12 font-mono text-[10px] text-purple-300 uppercase tracking-[0.5em] italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <div ref={codeStreamDownRef} className="flex flex-col gap-12 font-mono text-[10px] text-fuchsia-300 text-right uppercase tracking-[0.5em] italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div ref={contentRef} className="relative z-[60] flex flex-col items-center px-6 w-full max-w-5xl">
        
        {/* Subtitle Badge */}
        <div className="mb-10 flex items-center gap-3 font-mono text-[10px] text-purple-400 border border-purple-500/30 bg-purple-500/10 px-5 py-2 rounded-sm tracking-[0.5em] uppercase backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] animate-pulse" />
          System_Boot_Sequence
        </div>

        {/* Brand Title */}
        <div className="relative text-center mb-24">
          <h1 className="text-white text-7xl md:text-[9rem] font-black tracking-tighter leading-none font-['Syne']">
            MERN <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-800 italic">STACK</span>
          </h1>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mt-4" />
          <p className="mt-6 text-purple-200/40 font-mono text-[10px] uppercase tracking-[1.2em]">
            Developing Future Interfaces
          </p>
        </div>

        {/* PROGRESS AREA */}
        <div className="w-full max-w-xl bg-white/[0.02] border border-white/[0.05] p-10 rounded-2xl backdrop-blur-sm">
          <div className="flex justify-between items-end mb-8 font-mono">
            <div className="flex flex-col gap-2">
                <span className="text-[9px] text-purple-500 uppercase tracking-[0.4em] font-bold">Process_Identity</span>
                <span className="text-xs text-slate-400 tracking-widest uppercase">
                    {percent < 100 ? "Fetching Components..." : "Environment Ready"}
                </span>
            </div>
            <div className="flex items-baseline">
                <span className="text-white font-medium text-6xl tracking-tighter">{percent}</span>
                <span className="text-purple-500 text-lg font-bold ml-1">%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
            <div 
              style={{ width: `${percent}%` }}
              className="h-full bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all duration-200 ease-out shadow-[0_0_20px_rgba(168,85,247,0.5)]"
            />
          </div>

          {/* Footer Badges */}
          <div className="mt-12 flex justify-between items-center opacity-50">
              <div className="flex gap-10">
                {["MONGODB", "EXPRESS", "REACT", "NODE"].map((tech) => (
                    <div key={tech} className="flex items-center gap-2">
                        <div className={`w-1 h-1 rounded-full ${percent > 80 ? 'bg-purple-400' : 'bg-zinc-700'}`} />
                        <span className="text-[8px] font-mono text-zinc-400 tracking-widest">{tech}</span>
                    </div>
                ))}
              </div>
          </div>
        </div>
      </div>

      {/* CORNER DECOR */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/10" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/10" />
      
    </div>
  );
};

export default memo(Loading);
