import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const containerRef = useRef(null);
  const codeStreamUpRef = useRef(null);
  const codeStreamDownRef = useRef(null);
  const contentRef = useRef(null);
  const auraRef = useRef(null);
  const mainTitleRef = useRef(null);
  
  // Performance Refs (No State)
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);

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
    const totalDuration = 3.0; // Slightly faster for snappier feel

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: onFinish
        });
      }
    });

    // 1. Optimized Stream Animation (Linear & Light)
    gsap.to([codeStreamUpRef.current, codeStreamDownRef.current], {
      y: (i) => (i === 0 ? -1500 : 1500),
      duration: 35, // Slower duration for less jitter
      repeat: -1,
      ease: "none",
      force3D: true // Hardware Acceleration
    });

    // 2. Aura Pulse (Reduced Scale calculation)
    gsap.to(auraRef.current, {
      scale: 1.2,
      opacity: 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true
    });

    // 3. 3D Title Float
    gsap.to(mainTitleRef.current, {
      y: -10,
      rotateX: 5,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true
    });

    // 4. Optimized Counter Logic (Direct DOM Update - NO RE-RENDERS)
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: totalDuration,
      ease: "power2.inOut",
      onUpdate: () => {
        // Direct manipulation avoids React Reconciliation lag
        if (percentTextRef.current) {
          percentTextRef.current.textContent = Math.floor(counterObj.value);
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.floor(counterObj.value)}%`;
        }
      }
    });

    // 5. Entrance Animation
    tl.fromTo(contentRef.current, 
      { opacity: 0, scale: 0.95, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
      0.1
    );

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030105] overflow-hidden select-none perspective-[1000px] will-change-transform"
    >
      {/* OPTIMIZED GRADIENT LAYERS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a0b2e_0%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      
      {/* Optimized Aura Light */}
      <div 
        ref={auraRef} 
        className="absolute w-[600px] h-[600px] bg-purple-700/20 blur-[120px] rounded-full pointer-events-none will-change-[transform,opacity]" 
      />
      
      {/* CODE STREAMS */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none flex justify-between px-4 md:px-20 overflow-hidden">
        <div ref={codeStreamUpRef} className="will-change-transform flex flex-col gap-16 font-mono text-[10px] text-purple-300 uppercase tracking-[0.6em] italic">
          {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <div ref={codeStreamDownRef} className="will-change-transform flex flex-col gap-16 font-mono text-[10px] text-fuchsia-400 text-right uppercase tracking-[0.6em] italic">
          {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>

      {/* MAIN HUD CONTENT */}
      <div ref={contentRef} className="relative z-[60] flex flex-col items-center w-full max-w-5xl transform-style-3d will-change-[transform,opacity]">
        
        {/* Top Badge */}
        <div className="mb-14 flex items-center gap-3 font-mono text-[9px] text-purple-200 border border-purple-500/20 bg-white/[0.02] px-6 py-2 rounded-full tracking-[0.4em] uppercase backdrop-blur-md shadow-lg">
           <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]" />
           System.Init.v4
        </div>

        {/* 3D BRAND TITLE */}
        <div ref={mainTitleRef} className="relative text-center mb-20 transform-style-3d will-change-transform">
          <h1 
            className="text-white text-7xl md:text-[10rem] font-black tracking-tighter leading-none font-['Syne']"
            style={{
              textShadow: "0 1px 0 #4c1d95, 0 2px 0 #4c1d95, 0 3px 0 #4c1d95, 0 4px 0 #4c1d95, 0 10px 20px rgba(0,0,0,0.5)"
            }}
          >
            MERN <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 via-fuchsia-300 to-white italic drop-shadow-none">STACK</span>
          </h1>
          <p className="mt-8 text-white/30 font-mono text-[10px] uppercase tracking-[1.5em] font-medium">
            Architecting &nbsp; The &nbsp; Future
          </p>
        </div>

        {/* PERFORMANCE OPTIMIZED PROGRESS DISPLAY */}
        <div className="w-full max-w-[500px] p-8 relative">
          
          <div className="relative flex justify-between items-end mb-6 font-mono">
            <div className="flex flex-col gap-1">
                <span className="text-[9px] text-purple-400 font-bold tracking-[0.3em] uppercase">Status</span>
                <span className="text-[10px] text-zinc-500 tracking-widest uppercase">Fetching Modules...</span>
            </div>
            <div className="flex items-baseline">
                {/* Direct DOM Manipulation Target */}
                <span ref={percentTextRef} className="text-white font-black text-6xl tracking-tighter">0</span>
                <span className="text-purple-500 text-lg font-bold ml-1">%</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="h-[3px] w-full bg-zinc-900/80 rounded-full overflow-hidden relative border border-white/5">
            {/* Direct Style Update Target */}
            <div 
              ref={progressBarRef}
              className="h-full w-0 bg-gradient-to-r from-purple-800 via-fuchsia-500 to-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.8)] relative"
            >
                <div className="absolute top-0 right-0 h-full w-20 bg-white/40 blur-[4px]" />
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="mt-10 flex justify-between items-center opacity-60">
              <div className="flex gap-6">
                {["DB", "SRV", "CLI"].map((tag) => (
                    <span key={tag} className="text-[8px] font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded bg-black/20 tracking-widest">{tag}</span>
                ))}
              </div>
              <div className="text-[8px] font-mono text-purple-500/60 tracking-widest uppercase">
                Secure_v2026
              </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default memo(Loading);
