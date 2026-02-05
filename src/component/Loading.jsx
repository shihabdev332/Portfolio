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
    "> CORE_INIT: SUCCESS",
    "> MERN_STACK: LOADED",
    "> PHP_LARAVEL: READY",
    "> AUTH_USER: SHIHAB",
    "> SYSTEM: STABLE",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // High-speed exit animation
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 0.5,
          ease: "power4.in",
          onComplete: onFinish,
        });
      },
    });

    // 1. Reset states with 3D transforms
    gsap.set([nameRef.current, titleRef.current], { 
      opacity: 0, 
      y: 80, 
      rotateX: -90, 
      z: -200 
    });
    gsap.set(progressBarRef.current, { scaleX: 0 });

    // 2. Aggressive Entrance Sequence
    tl.to(nameRef.current, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      duration: 0.8,
      ease: "back.out(2)", // Slamming effect
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.4")
    .to(detailsRef.current.children, {
      opacity: 1,
      x: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2");

    // 3. Glitch effect during counter
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2,
      ease: "expo.inOut",
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        if (percentTextRef.current) percentTextRef.current.textContent = val;
        if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${val / 100})`;
        
        // Random glitch shakes
        if (val > 40 && val < 90 && Math.random() > 0.8) {
          gsap.to(nameRef.current, { x: "random(-5, 5)", y: "random(-2, 2)", duration: 0.1, yoyo: true, repeat: 1 });
        }
      }
    }, 0.3);

    // 4. Grid floor movement (optimized for mobile)
    gsap.to(gridRef.current, {
      y: 48,
      duration: 1,
      repeat: -1,
      ease: "none",
      force3D: true
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010103] text-white font-sans overflow-hidden perspective-[1000px]"
    >
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#000_100%)] opacity-70" />
      
      {/* 3D Grid - visible on all devices */}
      <div className="absolute bottom-[-10%] w-[150%] h-[40%] perspective-[400px] opacity-20">
        <div 
          ref={gridRef}
          className="w-full h-full bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(65deg)] will-change-transform"
        />
      </div>

      {/* Main UI Container */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        
        {/* Top Info (Responsive Grid) */}
        <div ref={detailsRef} className="w-full flex justify-between items-center mb-8 text-[8px] md:text-[10px] font-mono tracking-widest text-indigo-400">
          <div className="opacity-0 -translate-x-10 italic font-bold uppercase">Dev_Mode: Enabled</div>
          <div className="opacity-0 translate-x-10 text-right">LOC: 23.8° N, 90.4° E</div>
        </div>

        {/* The 3D Name */}
        <div className="relative transform-style-3d text-center">
          <h1 
            ref={nameRef}
            className="text-[18vw] md:text-[10rem] font-black tracking-tighter leading-none italic will-change-transform"
            style={{
              textShadow: '0 10px 30px rgba(99, 102, 241, 0.4), 0 20px 50px rgba(0,0,0,0.9)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)'
            }}
          >
            SHIHAB
          </h1>
          <p ref={titleRef} className="mt-4 text-[3vw] md:text-sm font-bold tracking-[0.6em] md:tracking-[1em] text-white/30 uppercase will-change-transform">
            Full Stack Architect
          </p>
        </div>

        {/* Aggressive Progress Bar */}
        <div className="w-full max-w-[300px] md:max-w-[500px] mt-12 md:mt-20">
          <div className="flex justify-between items-end mb-2 font-mono italic">
            <span className="text-[10px] text-indigo-500 animate-pulse">SYSTEM_LOADING...</span>
            <span className="text-3xl md:text-5xl font-black"><span ref={percentTextRef}>0</span>%</span>
          </div>
          <div className="h-[4px] md:h-[6px] w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div 
              ref={progressBarRef}
              className="h-full w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-white origin-left will-change-transform shadow-[0_0_20px_#6366f1]"
            />
          </div>
        </div>

        {/* Mobile-Friendly Terminal (Small version) */}
        <div ref={terminalRef} className="mt-8 h-10 overflow-hidden font-mono text-[8px] md:text-[10px] text-white/20">
          {bootLogs.map((log, i) => (
            <div key={i} className="leading-tight">{log}</div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default memo(Loading);
