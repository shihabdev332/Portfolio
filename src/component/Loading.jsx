import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const containerRef = useRef(null);
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const nameRef = useRef(null);
  const gridRef = useRef(null);
  const cubeRef = useRef(null);
  const hudElements = useRef([]);

  const systemLogs = [
    "> INIT_KERNEL_v3.0.4",
    "> MERN_STACK_VIRTUAL_CORE_LOADED",
    "> LARAVEL_BRIDGE_ACTIVE_SYNC",
    "> ENCRYPT_SESSION_RSA_4096",
    "> LOADING_DATABASE_SHARDS",
    "> BYPASSING_CACHE_LAYERS",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          filter: "blur(40px)",
          duration: 0.5,
          ease: "power4.in",
          onComplete: onFinish,
        });
      },
    });

    // 1. Aggressive Reveal with Glitch
    tl.fromTo(
      nameRef.current,
      { opacity: 0, scale: 0.8, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "back.out(1.7)" }
    );

    // Glitch loop for Name
    gsap.to(nameRef.current, {
      skewX: () => Math.random() * 20 - 10,
      x: () => Math.random() * 10 - 5,
      opacity: () => Math.random() * 0.5 + 0.5,
      duration: 0.1,
      repeat: -1,
      repeatRefresh: true,
      ease: "none",
    });

    // 2. 3D Cube Rotation
    gsap.to(cubeRef.current, {
      rotateY: 360,
      rotateX: 360,
      duration: 3,
      repeat: -1,
      ease: "none",
    });

    // 3. Fast & Aggressive Progress Logic
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 1.6,
      ease: "power4.inOut",
      onUpdate: () => {
        const v = Math.floor(counter.value);
        if (percentTextRef.current) percentTextRef.current.textContent = v;
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${v / 100})`;
          // Add shake effect when loading
          gsap.set(progressBarRef.current, { x: Math.random() * 2 });
        }
      },
    }, "-=0.2");

    // Background Grid Motion
    gsap.to(gridRef.current, {
      y: 80,
      duration: 0.5,
      repeat: -1,
      ease: "none",
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020202] text-white overflow-hidden font-mono select-none"
    >
      {/* 3D Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2)_0%,transparent_70%)]" />
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 perspective-[1000px] pointer-events-none">
        <div 
          ref={cubeRef}
          className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 border border-indigo-500/20 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
        >
           <div className="absolute inset-0 border border-indigo-500/10 rotate-45 scale-110" />
           <div className="absolute inset-0 border border-indigo-400/5 -rotate-12 scale-125" />
        </div>
      </div>

      {/* Moving Grid Floor */}
      <div className="absolute bottom-0 w-full h-[50vh] perspective-[800px] overflow-hidden opacity-30">
        <div
          ref={gridRef}
          className="w-full h-[200%] bg-[linear-gradient(to_right,#4338ca_1px,transparent_1px),linear-gradient(to_bottom,#4338ca_1px,transparent_1px)] bg-[size:50px_50px] [transform:rotateX(75deg)] origin-top"
        />
      </div>

      {/* Top Left HUD */}
      <div className="absolute top-10 left-10 hidden md:block border-l-2 border-indigo-600 pl-4 py-2">
        <div className="text-[10px] text-indigo-500 animate-pulse">SYSTEM_ACTIVE</div>
        <div className="text-xl font-black">X-001_CORE</div>
        <div className="text-[8px] opacity-50 mt-2 italic">LOC: 23.8103° N, 90.4125° E</div>
      </div>

      {/* Center Identity */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <h1
            ref={nameRef}
            className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white via-indigo-300 to-indigo-700"
            style={{ filter: "drop-shadow(0 0 30px rgba(79,70,229,0.6))" }}
          >
            SHIHAB
          </h1>
          {/* Ghost text for glitch depth */}
          <div className="absolute top-0 left-0 -z-10 text-7xl md:text-[10rem] font-black italic opacity-20 text-red-500 blur-sm translate-x-1">SHIHAB</div>
        </div>

        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] w-12 bg-indigo-500/50" />
          <p className="text-[10px] md:text-xs tracking-[1em] uppercase text-indigo-400 font-light">
            Architecting Logic
          </p>
          <div className="h-[1px] w-12 bg-indigo-500/50" />
        </div>

        {/* Loading Bar Section */}
        <div className="w-72 md:w-[30rem]">
          <div className="flex justify-between items-end mb-3">
            <div className="flex flex-col">
              <span className="text-[8px] text-indigo-500/70 mb-1">DATA_STREAM_LOAD</span>
              <span className="text-xs tracking-widest font-bold">INITIALIZING...</span>
            </div>
            <span className="text-4xl font-black italic leading-none">
              <span ref={percentTextRef}>0</span>%
            </span>
          </div>
          
          <div className="h-1 w-full bg-indigo-950/30 backdrop-blur-md relative overflow-hidden border border-white/5">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left bg-gradient-to-r from-indigo-600 to-white shadow-[0_0_20px_rgba(99,102,241,1)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom Technical Logs */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className="flex flex-col gap-1 text-[9px] text-indigo-400/60 uppercase">
          {systemLogs.map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-indigo-600">[{i}]</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
        
        <div className="text-right flex flex-col gap-1">
          <div className="text-[9px] text-indigo-500 animate-pulse font-bold tracking-widest">
            SECURE_CONNECTION_ESTABLISHED
          </div>
          <div className="text-[8px] opacity-30">© 2026 SHIHAB_LABS_ALL_RIGHTS_RESERVED</div>
        </div>
      </div>
    </div>
  );
};

export default memo(Loading);
