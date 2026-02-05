import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const containerRef = useRef(null);
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const nameRef = useRef(null);
  const gridRef = useRef(null);
  const hudRef = useRef(null);

  const logs = ["SYS_BOOT", "MERN_INIT", "PHP_LINK", "V8_READY"];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // High-end cinematic exit: Zoom + Blur
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.5,
          filter: "blur(40px) brightness(2)",
          duration: 0.6,
          ease: "expo.in",
          onComplete: onFinish,
        });
      },
    });

    // 1. Initial State
    gsap.set(nameRef.current, { opacity: 0, z: 800, rotateY: 30, skewX: 10 });
    gsap.set(".hud-item", { opacity: 0, y: 20 });

    // 2. Aggressive Entrance (0.4s)
    tl.to(nameRef.current, {
      opacity: 1,
      z: 0,
      rotateY: 0,
      skewX: 0,
      duration: 0.8,
      ease: "power4.out",
    })
    .to(".hud-item", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
    }, "-=0.6");

    // 3. Ultra-Fast Progress (Total duration approx 2.2s)
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        const p = Math.floor(counter.val);
        if (percentTextRef.current) percentTextRef.current.textContent = p;
        if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${p / 100})`;
        
        // Random Matrix-style glitch
        if (p > 70 && Math.random() > 0.8) {
          gsap.fromTo(nameRef.current, 
            { filter: "drop-shadow(4px 0px 0px #ff0000) drop-shadow(-4px 0px 0px #0000ff)" },
            { filter: "drop-shadow(0px 0px 0px #ff0000) drop-shadow(0px 0px 0px #0000ff)", duration: 0.1 }
          );
        }
      }
    }, "-=0.4");

    // Grid Motion
    gsap.to(gridRef.current, { y: 60, duration: 0.5, repeat: -1, ease: "none" });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303] text-white font-sans overflow-hidden perspective-[1500px] select-none"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1033_0%,#000_100%)] opacity-80" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* 3D Moving Floor */}
      <div className="absolute bottom-[-10%] w-[200vw] h-[50vh] perspective-[600px] opacity-20">
        <div ref={gridRef} className="w-full h-full bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:50px_50px] [transform:rotateX(70deg)]" />
      </div>

      {/* Main UI */}
      <div className="relative z-10 w-full max-w-[90%] md:max-w-7xl flex flex-col items-center">
        
        {/* Top HUD Stats */}
        <div ref={hudRef} className="w-full flex justify-between mb-12 font-mono text-[10px] tracking-[0.3em] text-indigo-400">
          <div className="hud-item flex gap-4">
            <span className="text-white/20 font-bold uppercase">Uptime_</span>
            <span>2.2s</span>
          </div>
          <div className="hud-item flex gap-4 text-right">
            <span>STK_MERN_PHP</span>
            <span className="text-white/20 font-bold uppercase">_Layer</span>
          </div>
        </div>

        {/* The 3D Name - Pro Clamp Scaling */}
        <div className="relative transform-style-3d">
          <h1 
            ref={nameRef}
            className="text-[clamp(4rem,18vw,14rem)] font-black tracking-tighter leading-none italic"
            style={{
              textShadow: `
                0 1px 0 #333, 0 3px 0 #222, 0 5px 0 #111,
                0 10px 20px rgba(0,0,0,0.8), 0 0 50px rgba(79, 70, 229, 0.4)
              `
            }}
          >
            SHIHAB
          </h1>
          <div className="hud-item absolute -bottom-4 right-0 text-[8px] md:text-xs tracking-[1.2em] text-indigo-500 font-bold uppercase opacity-50">
            FullStack_Architect
          </div>
        </div>

        {/* Aggressive Progress Bar */}
        <div className="w-full max-w-[500px] mt-24 px-6">
          <div className="flex justify-between items-end mb-3 font-mono">
            <div className="hud-item flex flex-col">
              <span className="text-[9px] text-indigo-500 font-black animate-pulse uppercase tracking-widest">Loading_Core_Resources</span>
              <div className="flex gap-2 text-[8px] text-white/30">
                {logs.map((l, i) => <span key={i}>[{l}]</span>)}
              </div>
            </div>
            <span className="text-4xl md:text-6xl font-black italic tracking-tighter"><span ref={percentTextRef}>0</span>%</span>
          </div>
          
          <div className="h-1.5 w-full bg-white/5 relative overflow-hidden ring-1 ring-white/10 p-[1px]">
            <div 
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-white origin-left shadow-[0_0_20px_#6366f1]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

      </div>

      {/* Screen Effects */}
      <div className="absolute inset-0 pointer-events-none z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_3px,3px_100%]" />
      
      <style jsx>{`
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default memo(Loading);
