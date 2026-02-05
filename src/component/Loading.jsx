import React, { useRef, useState, useEffect, memo } from "react";
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

  // Dynamic "Terminal" Logs based on your profile
  const bootLogs = [
    "> Initializing MERN Stack Core...",
    "> Loading React Fiber Architecture...",
    "> Connecting to MongoDB Cluster...",
    "> Detected New Module: PHP 8.2",
    "> Installing Laravel Bridge...",
    "> Optimizing V8 Engine...",
    "> User Authentication: SHIHAB",
    "> System Ready.",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Cinema-style shutter exit
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
          onComplete: onFinish,
        });
      },
    });

    // 1. Scene Setup
    gsap.set(containerRef.current, { autoAlpha: 1 });
    gsap.set([titleRef.current, nameRef.current], { y: 50, opacity: 0, filter: "blur(10px)" });
    gsap.set(detailsRef.current.children, { x: -20, opacity: 0 });
    gsap.set(progressBarRef.current, { scaleX: 0 });

    // 2. Infinite 3D Grid Animation
    gsap.to(gridRef.current, {
      y: 60,
      duration: 2,
      repeat: -1,
      ease: "linear",
      force3D: true,
    });

    // --- MAIN CINEMATIC SEQUENCE ---

    // A. Identity Reveal
    tl.to(nameRef.current, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6")
    .to(detailsRef.current.children, {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5
    }, "-=0.5");

    // B. Terminal Log Simulation (Staggered Text)
    if(terminalRef.current) {
        gsap.fromTo(terminalRef.current.children, 
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0, stagger: 0.3, duration: 0.2, ease: "none" }
        );
    }

    // C. High-Performance Counter
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.8, // Allow time to read logs
      ease: "expo.inOut",
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        if (percentTextRef.current) percentTextRef.current.textContent = val;
        if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${val / 100})`;
        
        // Random Glitch on Name
        if (val > 50 && val % 15 === 0) {
            gsap.fromTo(nameRef.current, 
                { x: -2, color: "#a855f7" }, 
                { x: 0, color: "#ffffff", duration: 0.1 }
            );
        }
      },
    }, 0.2); // Start early

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#02010a] text-white font-sans overflow-hidden perspective-[1000px] cursor-wait"
    >
      {/* --- ENVIRONEMENT LAYERS --- */}
      
      {/* 1. Nebula Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,#000000_80%)] opacity-80" />
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      {/* 2. 3D Moving Floor */}
      <div className="absolute bottom-[-20%] left-[-50%] w-[200%] h-[60%] perspective-[500px] opacity-20 pointer-events-none mask-image-gradient">
         <div 
            ref={gridRef}
            className="w-full h-full bg-[linear-gradient(to_right,#6b21a8_1px,transparent_1px),linear-gradient(to_bottom,#6b21a8_1px,transparent_1px)] bg-[size:3rem_3rem] [transform:rotateX(60deg)]"
         />
      </div>

      {/* --- HUD CONTENT --- */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-20 md:pb-0">
        
        {/* LEFT: Info / Specs */}
        <div className="md:col-span-3 hidden md:flex flex-col gap-4 text-[10px] font-mono text-purple-300/60 uppercase tracking-widest border-l border-purple-500/20 pl-4" ref={detailsRef}>
            <div>
                <span className="block text-white font-bold">Role</span>
                MERN Developer
            </div>
            <div>
                <span className="block text-white font-bold">Current Task</span>
                Learning PHP/Laravel
            </div>
            <div>
                <span className="block text-white font-bold">Location</span>
                Localhost:3000
            </div>
        </div>

        {/* CENTER: Main Identity */}
        <div className="md:col-span-6 flex flex-col items-center text-center">
            {/* Top Badge */}
            <div className="mb-6 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-900/10 backdrop-blur-md text-[9px] uppercase tracking-[0.3em] text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                System Boot Sequence
            </div>

            {/* Name & Title */}
            <h1 ref={nameRef} className="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                SHIHAB
            </h1>
            <h2 ref={titleRef} className="mt-2 text-sm md:text-xl font-medium tracking-[0.5em] text-purple-400 uppercase mix-blend-plus-lighter">
                Full Stack Architect
            </h2>

            {/* Progress Bar */}
            <div className="w-full max-w-[400px] mt-12 relative">
                <div className="flex justify-between text-xs font-bold font-mono mb-2">
                    <span className="text-purple-300">LOADING RESOURCES</span>
                    <span className="text-white"><span ref={percentTextRef}>0</span>%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-none overflow-hidden relative">
                    <div 
                        ref={progressBarRef}
                        className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-400 shadow-[0_0_20px_#a855f7]"
                        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
                    />
                </div>
            </div>
        </div>

        {/* RIGHT: Live Terminal */}
        <div className="md:col-span-3 h-[120px] w-full flex flex-col justify-end overflow-hidden mask-image-top">
            <div ref={terminalRef} className="font-mono text-[10px] md:text-[11px] leading-relaxed text-left space-y-1 text-emerald-400/80">
                {bootLogs.map((log, i) => (
                    <div key={i} className="truncate">
                        <span className="opacity-50 mr-2">{(i * 142).toString(16).padStart(3, '0')}</span>
                        {log}
                    </div>
                ))}
            </div>
        </div>

      </div>

      <style jsx>{`
        .mask-image-gradient { mask-image: linear-gradient(to bottom, transparent 0%, black 40%); }
        .mask-image-top { mask-image: linear-gradient(to top, black 80%, transparent 100%); }
      `}</style>
    </div>
  );
};

export default memo(Loading);
