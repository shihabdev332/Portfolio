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
  const mainTitleRef = useRef(null);

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
    const totalDuration = 3.3; 

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

    // 1. Smooth Vertical Code Streams
    gsap.to([codeStreamUpRef.current, codeStreamDownRef.current], {
      y: (i) => (i === 0 ? -1500 : 1500),
      duration: 30,
      repeat: -1,
      ease: "none",
      force3D: true
    });

    // 2. Aggressive Lighting Pulse
    gsap.to(auraRef.current, {
      scale: 1.8,
      opacity: 0.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 3. 3D Title Floating Animation
    gsap.to(mainTitleRef.current, {
      y: -15,
      rotateX: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // 4. Progress Logic
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: totalDuration,
      ease: "power2.inOut",
      onUpdate: () => {
        setPercent(Math.floor(counterObj.value));
      }
    });

    // 5. High-End Content Entry
    tl.fromTo(contentRef.current, 
      { opacity: 0, z: -500, filter: "blur(20px)" },
      { opacity: 1, z: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
      0.2
    );

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020104] overflow-hidden select-none perspective-[1000px]"
    >
      {/* DEEP AGGRESSIVE GRADIENT & OVERLAY */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#120524_0%,#020104_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1e0a3d_0%,transparent_50%)] opacity-40" />
      
      {/* 3D Aura Light */}
      <div 
        ref={auraRef} 
        className="absolute w-[1000px] h-[1000px] bg-purple-600/10 blur-[200px] rounded-full pointer-events-none will-change-transform" 
      />
      
      {/* DYNAMIC CODE STREAMS */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none flex justify-between px-10 overflow-hidden">
        <div ref={codeStreamUpRef} className="flex flex-col gap-16 font-mono text-[10px] text-purple-400/40 uppercase tracking-[0.8em] italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <div ref={codeStreamDownRef} className="flex flex-col gap-16 font-mono text-[10px] text-fuchsia-500/40 text-right uppercase tracking-[0.8em] italic">
          {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* MAIN HUD CONTENT */}
      <div ref={contentRef} className="relative z-[60] flex flex-col items-center px-6 w-full max-w-6xl transform-style-3d">
        
        {/* Top Badge */}
        <div className="mb-16 flex items-center gap-4 font-mono text-[10px] text-purple-300 border border-purple-500/30 bg-white/[0.03] px-8 py-3 rounded-sm tracking-[0.6em] uppercase backdrop-blur-3xl shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all">
           <span className="h-2 w-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_15px_#a855f7]" />
           Environment.Loading.Sequence
        </div>

        {/* 3D BRAND TITLE */}
        <div ref={mainTitleRef} className="relative text-center mb-28 transform-style-3d">
          <h1 
            className="text-white text-8xl md:text-[11rem] font-black tracking-tighter leading-none font-['Syne']"
            style={{
              textShadow: "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)"
            }}
          >
            MERN <span className="text-transparent bg-clip-text bg-gradient-to-t from-purple-600 via-fuchsia-400 to-white italic drop-shadow-none">STACK</span>
          </h1>
          <p className="mt-10 text-white/20 font-mono text-[11px] uppercase tracking-[1.8em] font-light">
            Architecting &nbsp; Digital &nbsp; Spheres
          </p>
        </div>

        {/* PROGRESS DISPLAY */}
        <div className="w-full max-w-2xl bg-white/[0.01] border border-white/[0.05] p-12 rounded-3xl backdrop-blur-2xl relative shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl" />
          
          <div className="relative flex justify-between items-end mb-8 font-mono">
            <div className="flex flex-col gap-2">
                <span className="text-[10px] text-purple-400 font-black tracking-[0.4em] uppercase italic">System_Link</span>
                <span className="text-sm text-zinc-400 tracking-widest">
                    {percent < 100 ? "Optimizing Assets..." : "Connection Stable"}
                </span>
            </div>
            <div className="flex items-baseline">
                <span className="text-white font-black text-7xl tracking-tighter transition-all">{percent}</span>
                <span className="text-purple-500 text-xl font-bold ml-2">%</span>
            </div>
          </div>

          {/* Premium Glass Progress Bar */}
          <div className="h-[4px] w-full bg-black/40 rounded-full overflow-hidden relative border border-white/5">
            <div 
              style={{ width: `${percent}%` }}
              className="h-full bg-gradient-to-r from-purple-700 via-fuchsia-500 to-purple-400 transition-all duration-300 ease-out shadow-[0_0_25px_rgba(168,85,247,0.6)] relative"
            >
                <div className="absolute top-0 right-0 h-full w-24 bg-white/20 blur-md animate-pulse" />
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-12 flex justify-between items-center">
              <div className="flex gap-10 opacity-40">
                {["DATABASE", "BACKEND", "FRONTEND"].map((tag) => (
                    <div key={tag} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${percent > 80 ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 'bg-zinc-800'}`} />
                        <span className="text-[9px] font-mono text-white tracking-[0.3em] font-bold">{tag}</span>
                    </div>
                ))}
              </div>
              <div className="text-[9px] font-mono text-purple-500/50 tracking-widest font-black uppercase italic">
                Secure_Handshake_2026
              </div>
          </div>
        </div>
      </div>

      {/* 3D CORNER ACCENTS */}
      <div className="absolute top-12 left-12 w-32 h-[1px] bg-gradient-to-r from-purple-500/50 to-transparent" />
      <div className="absolute top-12 left-12 w-[1px] h-32 bg-gradient-to-b from-purple-500/50 to-transparent" />
      <div className="absolute bottom-12 right-12 w-32 h-[1px] bg-gradient-to-l from-fuchsia-500/50 to-transparent" />
      <div className="absolute bottom-12 right-12 w-[1px] h-32 bg-gradient-to-t from-fuchsia-500/50 to-transparent" />

      <style jsx>{`
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default memo(Loading);
