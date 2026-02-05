import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const containerRef = useRef(null);
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const nameRef = useRef(null);
  const gridRef = useRef(null);
  const leftHudRef = useRef(null);
  const rightHudRef = useRef(null);

  // Your actual professional identity logs
  const systemLogs = [
    "> DEV: SHIHAB_V4",
    "> STACK: MERN_FULLSTACK",
    "> BRIDGE: PHP_8.2_LARAVEL",
    "> CORE: V8_ENGINE_OPT",
    "> STATUS: DEPLOY_READY",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // High-speed Cinematic Exit: Explosion & Blur
        gsap.to(containerRef.current, {
          scale: 3,
          opacity: 0,
          filter: "blur(50px) brightness(2)",
          duration: 0.6,
          ease: "expo.in",
          onComplete: onFinish,
        });
      },
    });

    // 1. Initial 3D Prep
    gsap.set(nameRef.current, { opacity: 0, z: 600, rotateX: 60, scale: 0.8 });
    gsap.set([leftHudRef.current, rightHudRef.current], { opacity: 0, x: (i) => i === 0 ? -40 : 40 });
    gsap.set(progressBarRef.current, { scaleX: 0 });

    // 2. High-Impact Entrance (0.8s)
    tl.to(nameRef.current, {
      opacity: 1,
      z: 0,
      rotateX: 0,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.7)",
    })
    .to([leftHudRef.current, rightHudRef.current], {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power4.out"
    }, "-=0.8");

    // 3. Super-Fast Logic Engine (Total 2.2s sync)
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 1.4, // Optimized for 2.2s total flow
      ease: "power2.inOut",
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        if (percentTextRef.current) percentTextRef.current.textContent = val;
        if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${val / 100})`;
        
        // Random Digital Glitch at final stage
        if (val > 85 && Math.random() > 0.8) {
            gsap.to(nameRef.current, { 
                skewX: "random(-15, 15)", 
                filter: "hue-rotate(180deg)", 
                duration: 0.05, 
                yoyo: true, 
                repeat: 1 
            });
        }
      }
    }, "-=0.4");

    // Continuous 3D Grid Motion
    gsap.to(gridRef.current, { y: 60, duration: 0.6, repeat: -1, ease: "none" });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] text-white font-sans overflow-hidden perspective-[1200px]"
    >
      {/* Visual Overlay: Grain & Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_3px,3px_100%]" />

      {/* 3D Moving Floor Grid */}
      <div className="absolute bottom-[-15%] w-[200vw] h-[60vh] perspective-[600px] opacity-20">
        <div 
          ref={gridRef}
          className="w-full h-full bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(75deg)]"
        />
      </div>

      {/* LEFT HUD: Personal Metrics */}
      <div ref={leftHudRef} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 border-l border-indigo-600/40 pl-6 font-mono text-[9px] uppercase tracking-[0.2em]">
        <div className="space-y-1">
            <p className="text-white/30 text-[8px]">Operator</p>
            <p className="text-indigo-400 font-bold">Shihab_Dev</p>
        </div>
        <div className="space-y-1">
            <p className="text-white/30 text-[8px]">Primary_Stack</p>
            <p className="text-white/80">MERN / PHP</p>
        </div>
        <div className="space-y-1">
            <p className="text-white/30 text-[8px]">Location</p>
            <p className="text-emerald-500 font-bold">Bangladesh</p>
        </div>
      </div>

      {/* CENTER: Main Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
        
        <div className="mb-6 px-3 py-1 border border-indigo-500/30 bg-indigo-500/5 rounded text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-indigo-400 animate-pulse">
          Secure Link Established
        </div>

        {/* 3D Text Block */}
        <div className="relative transform-style-3d text-center">
          <h1 
            ref={nameRef}
            className="text-[clamp(4rem,18vw,11rem)] font-black tracking-tighter leading-none italic select-none"
            style={{
              color: '#ffffff',
              textShadow: `
                0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 
                0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 
                0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 
                0 5px 10px rgba(0,0,0,.25), 0 0 40px rgba(99, 102, 241, 0.5)
              `
            }}
          >
            SHIHAB
          </h1>
          <p className="mt-4 text-[2.5vw] md:text-sm font-bold tracking-[0.8em] text-white/40 uppercase opacity-80">
            Full Stack Architect
          </p>
        </div>

        {/* Aggressive Progress UI */}
        <div className="w-full max-w-[320px] md:max-w-[550px] mt-16 md:mt-24">
          <div className="flex justify-between items-end mb-4 font-mono italic">
            <div className="flex flex-col">
                <span className="text-[7px] md:text-[9px] text-indigo-500 uppercase font-black tracking-widest">System_Sync_Init</span>
                <span className="text-[10px] text-white/40">Ver_0.4.2_Build_2026</span>
            </div>
            <span className="text-4xl md:text-7xl font-black tracking-tighter italic"><span ref={percentTextRef}>0</span>%</span>
          </div>
          <div className="h-[2px] w-full bg-white/5 relative overflow-hidden ring-1 ring-white/10">
            <div 
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-indigo-600 via-fuchsia-400 to-white origin-left shadow-[0_0_20px_#6366f1]"
            />
          </div>
        </div>
      </div>

      {/* RIGHT HUD: Terminal Logs */}
      <div ref={rightHudRef} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col h-[180px] w-[200px] justify-end overflow-hidden border-r border-indigo-600/40 pr-6">
        <div className="font-mono text-[9px] text-right space-y-2 text-indigo-300/30">
            {systemLogs.map((log, i) => (
                <div key={i} className="truncate">{log}</div>
            ))}
            <div className="text-emerald-500/60 animate-pulse tracking-tighter italic">LINK_ACTIVE_...</div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default memo(Loading);
