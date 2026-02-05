import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const containerRef = useRef(null);
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const nameRef = useRef(null);
  const scannerRef = useRef(null);
  const particlesRef = useRef([]);
  const cubeRef = useRef(null);

  // Added more technical logs for a premium feel
  const systemLogs = [
    "> INITIALIZING_KERNEL_CORE",
    "> MERN_STACK_VIRTUAL_ENV_LOADED",
    "> LARAVEL_BRIDGE_ACTIVE_SYNC",
    "> SHIFTING_TO_HIGH_PERFORMANCE_MODE",
    "> ENCRYPTING_SESSION_RSA_4096",
    "> READY_FOR_DEPLOYMENT",
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

    // 1. Initial Reveal
    tl.fromTo(
      nameRef.current,
      { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "expo.out" }
    );

    // Glitch loop for Name
    gsap.to(nameRef.current, {
      skewX: () => Math.random() * 10 - 5,
      x: () => Math.random() * 6 - 3,
      duration: 0.1,
      repeat: -1,
      repeatRefresh: true,
    });

    // 2. Optimized Progress Logic
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.floor(counter.value);
        if (percentTextRef.current) percentTextRef.current.textContent = v;
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${v / 100})`;
        }
      },
    }, "-=0.2");

    // 3. Background Animations
    gsap.to(scannerRef.current, {
      top: "100%",
      duration: 2,
      repeat: -1,
      ease: "none",
    });

    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        y: "-=100",
        opacity: 0,
        duration: "random(2, 4)",
        repeat: -1,
        delay: "random(0, 2)",
        ease: "none",
      });
    });

    gsap.to(cubeRef.current, {
      rotateZ: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020202] text-white overflow-hidden font-mono select-none"
    >
      {/* Top Header Information */}
      <div className="absolute top-10 left-10 right-10 flex justify-between items-start text-[9px] tracking-widest text-indigo-500/50 uppercase">
        <div>System: Online<br />Location: 23.8103° N, 90.4125° E</div>
        <div className="text-right">Digital Architecture<br />Protocol_v7.0</div>
      </div>

      {/* Background: Scanning Line */}
      <div 
        ref={scannerRef}
        className="absolute top-[-10%] left-0 w-full h-[20vh] bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent z-0 pointer-events-none"
      />

      {/* Floating Data Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-1 h-1 bg-indigo-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 3D Decorative Ring */}
      <div 
        ref={cubeRef}
        className="absolute w-[500px] h-[500px] border border-indigo-500/5 rounded-full z-0"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute inset-0 border-t-2 border-indigo-500/20 rounded-full animate-spin-slow" />
      </div>

      {/* Center Identity */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <h1
            ref={nameRef}
            className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white via-indigo-300 to-indigo-700"
            style={{ filter: "drop-shadow(0 0 30px rgba(79,70,229,0.4))" }}
          >
            SHIHAB
          </h1>
        </div>

        {/* Enhanced Subtext */}
        <p className="text-[10px] md:text-xs tracking-[1.2em] uppercase text-indigo-400/60 mb-16 flex items-center">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse mr-4" />
          Full-Stack Logic & Beyond
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse ml-4" />
        </p>

        {/* Progress Bar Container */}
        <div className="w-72 md:w-[30rem]">
          <div className="flex justify-between items-end mb-3 font-bold">
            <span className="text-[9px] text-indigo-500 tracking-[0.3em]">ESTABLISHING_CONNECTION</span>
            <span className="text-4xl italic">
              <span ref={percentTextRef}>0</span>%
            </span>
          </div>
          
          <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)]"
            />
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className="flex flex-col gap-1 text-[8px] text-indigo-400/40 uppercase font-medium">
          {systemLogs.map((log, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-indigo-500/40 rounded-full" />
              {log}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-[9px] text-indigo-500/50 animate-pulse font-bold tracking-widest">
            CORE_V3.0.4_STABLE
          </div>
          <div className="text-[7px] text-white/20">© 2026 SHIHAB_DEV</div>
        </div>
      </div>
    </div>
  );
};

export default memo(Loading);
