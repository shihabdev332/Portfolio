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
    const totalDuration = 2.5; // Slightly slower for a more premium feel

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
          onComplete: onFinish
        });
      }
    });

    // 1. Smooth Background Streams
    gsap.to(codeStreamUpRef.current, {
      y: -800,
      duration: 20,
      repeat: -1,
      ease: "none",
      force3D: true
    });

    gsap.to(codeStreamDownRef.current, {
      y: 800,
      duration: 22,
      repeat: -1,
      ease: "none",
      force3D: true
    });

    // 2. Luxury Aura Pulse
    gsap.to(auraRef.current, {
      scale: 1.3,
      opacity: 0.4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 3. Realistic Counter Logic
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: totalDuration,
      ease: "power4.inOut",
      onUpdate: () => {
        setPercent(Math.floor(counterObj.value));
      }
    });

    // 4. Staggered Content Reveal
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 30, filter: "blur(20px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
      0.2
    );

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030306] overflow-hidden select-none"
    >
      {/* PREMIUM GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#08081a_0%,#030306_100%)]" />
      <div ref={auraRef} className="absolute w-[600px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none will-change-transform" />
      
      {/* NOISE & SCANLINES */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_3px] z-40" />

      {/* DYNAMIC CODE STREAMS */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none flex justify-between px-16 overflow-hidden">
        <div ref={codeStreamUpRef} className="flex flex-col gap-16 font-mono text-[9px] text-cyan-400/60 uppercase tracking-widest will-change-transform italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <div ref={codeStreamDownRef} className="flex flex-col gap-16 font-mono text-[9px] text-indigo-400/60 text-right uppercase tracking-widest will-change-transform italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* CENTER BRANDING & PROGRESS */}
      <div ref={contentRef} className="relative z-[60] flex flex-col items-center px-6 w-full max-w-4xl">
        
        {/* Terminal Header */}
        <div className="mb-14 flex items-center gap-4 font-mono text-[10px] text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 px-6 py-2.5 rounded-full tracking-[0.4em] uppercase backdrop-blur-2xl shadow-[0_0_20px_rgba(34,211,238,0.1)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
          </span>
          System.Initialization.v2
        </div>

        {/* Core Branding */}
        <div className="relative text-center mb-28">
          <h1 className="text-white text-8xl md:text-[11rem] font-[900] tracking-tighter leading-none font-['Syne'] drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            MERN <span className="text-transparent bg-clip-text bg-gradient-to-tr from-cyan-400 via-indigo-500 to-emerald-400 italic">STACK</span>
          </h1>
          <p className="mt-8 text-slate-500 font-mono text-[11px] md:text-xs uppercase tracking-[1em] font-medium opacity-60">
            Engineering &nbsp; Digital &nbsp; Intelligence
          </p>
        </div>

        {/* PROGRESS DISPLAY */}
        <div className="w-full max-w-[400px] md:max-w-xl">
          <div className="flex justify-between items-end mb-6 font-mono">
            <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-indigo-400 uppercase tracking-[0.5em] font-black italic">Core_Kernel</span>
                <span className="text-[12px] text-slate-300 tracking-widest font-semibold uppercase italic">
                    {percent < 100 ? "Syncing Resources..." : "Link Established"}
                </span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-white font-[1000] text-5xl tracking-tighter drop-shadow-md">{percent}</span>
                <span className="text-cyan-400 text-sm font-black">%</span>
            </div>
          </div>

          {/* Luxury Progress Bar Structure */}
          <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-3xl relative border border-white/5">
            <div 
              style={{ width: `${percent}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-emerald-500 shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-150 ease-out relative"
            >
                {/* High-speed Shimmer */}
                <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-xl -skew-x-12 animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>

          {/* Status Badges */}
          <div className="mt-20 flex justify-between items-center opacity-40">
              <div className="flex gap-8">
                {["D-BASE", "ENCRYPT", "CORE-UX"].map((badge) => (
                    <div key={badge} className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${percent > 60 ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-700'}`} />
                        <span className="text-[8px] font-mono text-white tracking-[0.3em] font-bold">{badge}</span>
                    </div>
                ))}
              </div>
              <span className="text-[8px] font-mono text-white tracking-[0.4em] font-black uppercase opacity-60 italic">Node: 18.x</span>
          </div>
        </div>
      </div>

      {/* HUD BORDER DECOR */}
      <div className="absolute inset-10 border-[0.5px] border-white/[0.04] pointer-events-none rounded-[4rem] shadow-inner" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
};

export default memo(Loading);