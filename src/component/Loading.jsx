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

  // Expanded logs for premium feel
  const systemLogs = [
    "> KERNEL: V8_ENGINE_ACTIVE",
    "> STACK: MERN_PHP_LARAVEL",
    "> MEMORY: 128GB_VIRTUAL",
    "> USER: SHIHAB_DEV",
    "> STATUS: OPTIMIZING",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Aggressive exit: Zoom into screen
        gsap.to(containerRef.current, {
          scale: 2,
          opacity: 0,
          filter: "blur(20px)",
          duration: 0.7,
          ease: "expo.in",
          onComplete: onFinish,
        });
      },
    });

    // 1. Initial 3D & Opacity Setup
    gsap.set(nameRef.current, { opacity: 0, z: 500, rotateX: 45, scale: 0.5 });
    gsap.set([leftHudRef.current, rightHudRef.current], { opacity: 0, x: (i) => i === 0 ? -50 : 50 });
    gsap.set(progressBarRef.current, { scaleX: 0 });

    // 2. Main Entrance: The "Slam" Effect
    tl.to(nameRef.current, {
      opacity: 1,
      z: 0,
      rotateX: 0,
      scale: 1,
      duration: 1.2,
      ease: "elastic.out(1, 0.75)",
    })
    .to([leftHudRef.current, rightHudRef.current], {
      opacity: 1,
      x: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.8");

    // 3. High-Speed Progress Logic
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: "none",
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        if (percentTextRef.current) percentTextRef.current.textContent = val;
        if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${val / 100})`;
        
        // Intensity Glitch at 80%
        if (val > 80 && Math.random() > 0.7) {
            gsap.to(nameRef.current, { 
                skewX: "random(-10, 10)", 
                filter: "hue-rotate(90deg)", 
                duration: 0.1, 
                yoyo: true, 
                repeat: 1 
            });
        }
      }
    }, "-=0.5");

    // 4. Background Grid Infinite Motion
    gsap.to(gridRef.current, {
      y: 80,
      duration: 0.8,
      repeat: -1,
      ease: "none",
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] text-white font-sans overflow-hidden perspective-[1200px]"
    >
      {/* Visual FX: Scanlines & Vignette */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,4px_100%]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,black_100%)] z-40" />

      {/* 3D Animated Grid Floor */}
      <div className="absolute bottom-[-15%] w-[200%] h-[60%] perspective-[500px] opacity-30">
        <div 
          ref={gridRef}
          className="w-full h-full bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:60px_60px] [transform:rotateX(75deg)]"
        />
      </div>

      {/* Side HUD: Left Metrics */}
      <div ref={leftHudRef} className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 border-l border-indigo-500/30 pl-6 font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-400">
        <div><p className="text-white/40">Cpu_Load</p><p className="text-lg font-black">98.2%</p></div>
        <div><p className="text-white/40">Core_Temp</p><p className="text-lg font-black">42°C</p></div>
        <div><p className="text-white/40">Network</p><p className="text-lg font-black text-emerald-500">Encrypted</p></div>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center">
        
        {/* Top Floating Badge */}
        <div className="mb-8 px-4 py-1 border border-indigo-500/50 bg-indigo-500/10 rounded-full text-[9px] uppercase tracking-[0.5em] text-indigo-300 animate-pulse">
          Initialization in Progress
        </div>

        {/* Deep 3D Text Effect */}
        <div className="relative transform-style-3d">
          <h1 
            ref={nameRef}
            className="text-[20vw] md:text-[12rem] font-black tracking-tighter leading-none italic select-none"
            style={{
              color: '#ffffff',
              textShadow: `
                0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 
                0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 
                0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 
                0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 
                0 0 40px rgba(79, 70, 229, 0.6)
              `
            }}
          >
            SHIHAB
          </h1>
        </div>

        {/* Tech Stack Info */}
        <div className="mt-6 flex gap-4 text-[8px] md:text-xs font-bold tracking-[0.4em] text-indigo-400/60 uppercase">
            <span>MERN</span> • <span>Laravel</span> • <span>FullStack</span>
        </div>

        {/* Aggressive Progress Bar */}
        <div className="w-full max-w-[320px] md:max-w-[600px] mt-16 md:mt-24 relative">
          <div className="flex justify-between items-end mb-4 font-mono italic">
            <div className="flex flex-col">
                <span className="text-[8px] text-indigo-500 uppercase font-black">Memory_Write_Sector</span>
                <span className="text-[10px] text-white/50">0x004F21 - 0x00FF99</span>
            </div>
            <span className="text-5xl md:text-7xl font-black tracking-tighter"><span ref={percentTextRef}>0</span>%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-none overflow-hidden border border-white/10 p-[2px]">
            <div 
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-white origin-left shadow-[0_0_20px_#6366f1]"
            />
          </div>
        </div>
      </div>

      {/* Side HUD: Right Terminal */}
      <div ref={rightHudRef} className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col h-[200px] w-[180px] justify-end overflow-hidden border-r border-indigo-500/30 pr-6">
        <div className="font-mono text-[9px] text-right space-y-2 text-indigo-300/40">
            {systemLogs.map((log, i) => (
                <div key={i}>{log}</div>
            ))}
            <div className="text-emerald-500 animate-pulse">TERMINAL_READY_</div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default memo(Loading);
