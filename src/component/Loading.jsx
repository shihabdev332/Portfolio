import React, { useRef, useState } from "react";
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
    // Highly optimized total duration (2 seconds)
    const totalDuration = 2;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          onComplete: onFinish
        });
      }
    });

    // 1. Dynamic Background Streams
    gsap.to(codeStreamUpRef.current, {
      y: -700,
      duration: 15,
      repeat: -1,
      ease: "none",
      force3D: true
    });

    gsap.to(codeStreamDownRef.current, {
      y: 700,
      duration: 17,
      repeat: -1,
      ease: "none",
      force3D: true
    });

    // 2. Aura Pulse Animation
    gsap.to(auraRef.current, {
      scale: 1.2,
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 3. Fast & Smooth Counter
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: totalDuration,
      ease: "expo.out",
      onUpdate: () => {
        setPercent(Math.floor(counterObj.value));
      }
    });

    // 4. Content Reveal
    tl.fromTo(contentRef.current, 
      { opacity: 0, scale: 0.9, filter: "blur(15px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out" },
      0
    );

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010102] overflow-hidden select-none"
    >
      {/* LUXURY BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a0a15_0%,#010102_100%)]" />
      <div ref={auraRef} className="absolute w-[500px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      {/* SCANLINES & GRAIN */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_2px] z-40" />

      {/* CODE STREAMS */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex justify-between px-12 overflow-hidden">
        <div ref={codeStreamUpRef} className="flex flex-col gap-12 font-mono text-[10px] text-sky-400/80 italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <div ref={codeStreamDownRef} className="flex flex-col gap-12 font-mono text-[10px] text-emerald-400/80 text-right italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div ref={contentRef} className="relative z-[60] flex flex-col items-center px-6 w-full max-w-3xl">
        
        {/* Terminal Indicator */}
        <div className="mb-12 flex items-center gap-3 font-mono text-[9px] text-sky-400 border border-sky-400/20 bg-sky-400/5 px-5 py-2 rounded-full tracking-[0.3em] uppercase backdrop-blur-xl">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          executing.portfolio_v2.bin
        </div>

        {/* Branding */}
        <div className="relative text-center mb-24">
          <h1 className="loading-brand text-white text-7xl md:text-[10rem] font-[800] tracking-tighter leading-none font-['Syne']">
            MERN <span className="text-transparent bg-clip-text bg-gradient-to-tr from-sky-400 via-indigo-500 to-emerald-400 italic">STACK</span>
          </h1>
          <p className="mt-6 text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.8em] font-light">
            Architecting &nbsp; Digital &nbsp; Excellence
          </p>
        </div>

        {/* PROGRESS SYSTEM */}
        <div className="w-full max-w-[350px] md:max-w-lg">
          <div className="flex justify-between items-end mb-5 font-mono">
            <div className="flex flex-col gap-1">
                <span className="text-[8px] text-sky-500/40 uppercase tracking-[0.4em] font-bold">System Status</span>
                <span className="text-[11px] text-slate-400 tracking-wider font-medium uppercase italic">
                    {percent < 100 ? "Syncing_Environment..." : "Ready_to_Deploy"}
                </span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-white font-[900] text-4xl tracking-tighter">{percent}</span>
                <span className="text-sky-500 text-xs font-bold">%</span>
            </div>
          </div>

          {/* Luxury Progress Bar */}
          <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-3xl relative">
            <div 
              style={{ width: `${percent}%` }}
              className="h-full bg-gradient-to-r from-sky-500 via-indigo-600 to-emerald-500 shadow-[0_0_30px_rgba(56,189,248,0.9)] transition-all duration-100 ease-out relative"
            >
                {/* Flowing Highlight */}
                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-md -skew-x-12 animate-[shimmer_1s_infinite]" />
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="mt-16 flex justify-between items-center opacity-30">
             <div className="flex gap-6">
                {["DATABASE", "SECURITY", "UX_CORE"].map((m) => (
                    <div key={m} className="flex items-center gap-2">
                        <div className={`w-1 h-1 rounded-full ${percent > 50 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                        <span className="text-[7px] font-mono text-white tracking-[0.2em]">{m}</span>
                    </div>
                ))}
             </div>
             <span className="text-[7px] font-mono text-white tracking-[0.3em] font-bold uppercase">Port: 3000</span>
          </div>
        </div>
      </div>

      {/* EDGE DECORATIONS */}
      <div className="absolute inset-10 border border-white/[0.03] pointer-events-none rounded-[3rem]" />
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;