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
    // লোডিং সময় ০.২ সেকেন্ড কমানো হয়েছে (৩.৫ -> ৩.৩)
    const totalDuration = 3.3; 

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
          onComplete: onFinish
        });
      }
    });

    // ১. ব্যাকগ্রাউন্ড অ্যানিমেশন আরও স্মুথ করা হয়েছে
    gsap.to(codeStreamUpRef.current, {
      y: -1200,
      duration: 20,
      repeat: -1,
      ease: "none",
      force3D: true
    });

    gsap.to(codeStreamDownRef.current, {
      y: 1200,
      duration: 22,
      repeat: -1,
      ease: "none",
      force3D: true
    });

    // ২. Aggressive Aura Pulse
    gsap.to(auraRef.current, {
      scale: 1.5,
      opacity: 0.4,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // ৩. অপ্টিমাইজড কাউন্টার লজিক
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: totalDuration,
      ease: "none",
      onUpdate: () => {
        setPercent(Math.floor(counterObj.value));
      }
    });

    // ৪. কন্টেন্ট রিভিল (স্মুথ ব্লাড ইফেক্ট)
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 20, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
      0.3
    );

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050208] overflow-hidden select-none"
    >
      {/* AGGRESSIVE DEEP GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a0b2e_0%,#0c0414_40%,#050208_100%)]" />
      
      {/* Primary Glow Aura */}
      <div 
        ref={auraRef} 
        className="absolute w-[900px] h-[900px] bg-purple-900/20 blur-[180px] rounded-full pointer-events-none will-change-transform" 
      />
      
      {/* Fine Noise Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* DYNAMIC CODE STREAMS */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex justify-between px-12 overflow-hidden">
        <div ref={codeStreamUpRef} className="flex flex-col gap-14 font-mono text-[9px] text-purple-400/50 uppercase tracking-[0.6em] italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <div ref={codeStreamDownRef} className="flex flex-col gap-14 font-mono text-[9px] text-fuchsia-500/50 text-right uppercase tracking-[0.6em] italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div ref={contentRef} className="relative z-[60] flex flex-col items-center px-6 w-full max-w-4xl">
        
        {/* Status Chip */}
        <div className="mb-12 flex items-center gap-3 font-mono text-[9px] text-purple-300 border border-purple-500/20 bg-purple-950/30 px-6 py-2 rounded-full tracking-[0.5em] uppercase backdrop-blur-xl shadow-2xl">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
          </span>
          Initializing_Mern_Stack_v2
        </div>

        {/* Hero Branding */}
        <div className="relative text-center mb-24">
          <h1 className="text-white text-7xl md:text-[10rem] font-black tracking-tighter leading-none font-['Syne'] drop-shadow-[0_0_40px_rgba(168,85,247,0.15)]">
            MERN <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-500 italic">STACK</span>
          </h1>
          <p className="mt-8 text-zinc-500 font-mono text-[10px] uppercase tracking-[1.4em] font-medium opacity-50">
            Beyond &nbsp; Digital &nbsp; Reality
          </p>
        </div>

        {/* PROGRESS DISPLAY */}
        <div className="w-full max-w-lg">
          <div className="flex justify-between items-end mb-5 font-mono">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] text-purple-500 font-bold tracking-widest uppercase italic">Kernel_Loading</span>
                <span className="text-[11px] text-zinc-400 tracking-wider">
                    {percent < 100 ? "Processing Data..." : "Ready to Deploy"}
                </span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-5xl tracking-tighter">{percent}</span>
                <span className="text-purple-500 text-sm font-black">%</span>
            </div>
          </div>

          {/* Aggressive Progress Bar */}
          <div className="h-[2px] w-full bg-white/[0.05] rounded-full overflow-hidden relative">
            <div 
              style={{ width: `${percent}%` }}
              className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 transition-all duration-100 ease-out shadow-[0_0_20px_#a855f7]"
            />
          </div>

          {/* Technical Badges */}
          <div className="mt-16 flex justify-between items-center opacity-40">
              <div className="flex gap-8">
                {["ENCRYPT", "SECURE", "OPTIMIZE"].map((tag) => (
                    <div key={tag} className="flex items-center gap-2">
                        <div className={`w-1 h-1 rotate-45 ${percent > 70 ? 'bg-purple-400' : 'bg-zinc-800'}`} />
                        <span className="text-[8px] font-mono text-white tracking-[0.3em] font-bold">{tag}</span>
                    </div>
                ))}
              </div>
              <span className="text-[8px] font-mono text-white tracking-widest font-black uppercase italic">Build_7.4.2</span>
          </div>
        </div>
      </div>

      {/* FRAME DECOR */}
      <div className="absolute inset-8 border border-white/[0.02] pointer-events-none rounded-[3rem]" />
    </div>
  );
};

export default memo(Loading);
