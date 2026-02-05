import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const containerRef = useRef(null);
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const gridRef = useRef(null);
  const terminalRef = useRef(null);
  const detailsRef = useRef(null);

  const bootLogs = [
    "> Initializing MERN Stack Core...",
    "> Loading React Fiber Architecture...",
    "> Connecting to MongoDB Cluster...",
    "> Detected New Module: PHP 8.2",
    "> Installing Laravel Bridge...",
    "> User Authentication: SHIHAB",
    "> Optimizing V8 Engine...",
    "> System Ready.",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          onComplete: onFinish,
        });
      },
    });

    // 1. Initial Setup
    gsap.set([titleRef.current, nameRef.current], { 
      y: 100, 
      opacity: 0, 
      rotateX: -45, 
      scale: 0.8,
      transformOrigin: "center top"
    });
    gsap.set(detailsRef.current.children, { x: -30, opacity: 0 });
    gsap.set(progressBarRef.current, { scaleX: 0 });

    // 2. Continuous 3D Grid Animation
    gsap.to(gridRef.current, {
      y: 48,
      duration: 1.5,
      repeat: -1,
      ease: "none",
    });

    // --- MAIN TIMELINE ---

    // A. 3D Name Slam Entrance
    tl.to(nameRef.current, {
      y: 0,
      opacity: 1,
      rotateX: -15, // Slight 3D tilt
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.8")
    .to(detailsRef.current.children, {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6
    }, "-=0.4");

    // B. Terminal Animation
    if(terminalRef.current) {
        gsap.fromTo(terminalRef.current.children, 
            { opacity: 0, y: 5 },
            { opacity: 1, y: 0, stagger: 0.2, duration: 0.3 }
        );
    }

    // C. Logic Counter
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: "power4.inOut",
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        if (percentTextRef.current) percentTextRef.current.textContent = val;
        if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${val / 100})`;
      },
    }, 0.5);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020205] text-white font-sans overflow-hidden perspective-[1500px]"
    >
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1a0b2e_0%,#000000_70%)] opacity-80" />
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
      </div>

      {/* 3D Grid Floor */}
      <div className="absolute bottom-[-10%] left-[-20%] w-[140%] h-[50%] perspective-[600px] opacity-20 pointer-events-none">
         <div 
            ref={gridRef}
            className="w-full h-full bg-[linear-gradient(to_right,#7c3aed_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed_1px,transparent_1px)] bg-[size:3rem_3rem] [transform:rotateX(70deg)]"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent" />
      </div>

      {/* HUD Content */}
      <div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* LEFT: Stats */}
        <div className="md:col-span-3 hidden md:flex flex-col gap-6 text-[10px] font-mono tracking-[0.2em] uppercase" ref={detailsRef}>
            <div className="space-y-1">
                <span className="text-purple-500 font-black">Operator</span>
                <span className="block text-white/80">Shihab_Dev.v4</span>
            </div>
            <div className="space-y-1">
                <span className="text-purple-500 font-black">Environment</span>
                <span className="block text-white/80">MERN / Laravel</span>
            </div>
            <div className="space-y-1">
                <span className="text-purple-500 font-black">Status</span>
                <span className="block text-emerald-400 animate-pulse">Establishing Link...</span>
            </div>
        </div>

        {/* CENTER: 3D Name & Progress */}
        <div className="md:col-span-6 flex flex-col items-center">
            <div className="mb-4 text-[10px] uppercase tracking-[0.5em] text-purple-400/70 font-bold">
                Accessing Core Identity
            </div>

            {/* 3D TEXT BLOCK */}
            <div ref={nameRef} className="relative group select-none will-change-transform transform-style-3d">
                <h1 
                  className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none text-white italic"
                  style={{
                    textShadow: `
                      0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 
                      0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 
                      0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 
                      0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 
                      0 20px 20px rgba(0,0,0,.15), 0 0 30px rgba(139, 92, 246, 0.4)
                    `
                  }}
                >
                    SHIHAB
                </h1>
            </div>

            <h2 ref={titleRef} className="mt-6 text-xs md:text-sm font-bold tracking-[0.8em] text-white/40 uppercase">
                Full Stack Architect
            </h2>

            {/* Progress UI */}
            <div className="w-full max-w-[450px] mt-16 space-y-3">
                <div className="flex justify-between items-end font-mono">
                    <span className="text-[9px] text-purple-400 tracking-widest">System_Boot_Init</span>
                    <span className="text-4xl font-black italic"><span ref={percentTextRef}>0</span>%</span>
                </div>
                <div className="h-[3px] w-full bg-white/5 relative overflow-hidden">
                    <div 
                        ref={progressBarRef}
                        className="h-full w-full bg-gradient-to-r from-purple-600 via-fuchsia-400 to-white origin-left shadow-[0_0_15px_#a855f7]"
                    />
                </div>
            </div>
        </div>

        {/* RIGHT: Terminal */}
        <div className="md:col-span-3 h-[150px] hidden md:flex flex-col justify-end overflow-hidden">
            <div ref={terminalRef} className="font-mono text-[9px] leading-relaxed text-left text-purple-300/40 space-y-1">
                {bootLogs.map((log, i) => (
                    <div key={i} className="truncate">
                        <span className="text-purple-600 mr-2">HEX_{i.toString(16)}:</span> {log}
                    </div>
                ))}
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
