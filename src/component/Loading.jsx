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
  const subtitleRef = useRef(null);

  const systemLogs = [
    "> BOOT_SEQUENCE_START",
    "> ENGINE: NODE_V8",
    "> STACK: MERN + LARAVEL",
    "> SECURITY: AES_256",
    "> MODE: PRODUCTION",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.to(containerRef.current, {
          scale: 1.6,
          opacity: 0,
          filter: "blur(18px)",
          duration: 0.45,
          ease: "expo.in",
          onComplete: onFinish,
        });
      },
    });

    // Initial state
    gsap.set(nameRef.current, {
      opacity: 0,
      z: 300,
      rotateX: 25,
      scale: 0.85,
    });

    gsap.set(subtitleRef.current, {
      opacity: 0,
      y: 10,
    });

    gsap.set([leftHudRef.current, rightHudRef.current], {
      opacity: 0,
      x: (i) => (i === 0 ? -40 : 40),
    });

    gsap.set(progressBarRef.current, { scaleX: 0 });

    // Entrance
    tl.to(nameRef.current, {
      opacity: 1,
      z: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        "-=0.3"
      )
      .to(
        [leftHudRef.current, rightHudRef.current],
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
        },
        "-=0.4"
      );

    // Progress (≈ 1.4s)
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 1.4,
      ease: "none",
      onUpdate: () => {
        const v = Math.floor(counter.value);
        percentTextRef.current.textContent = v;
        progressBarRef.current.style.transform = `scaleX(${v / 100})`;

        // Subtle glow pulse after 70%
        if (v > 70) {
          gsap.to(nameRef.current, {
            textShadow:
              "0 0 30px rgba(99,102,241,0.9), 0 0 60px rgba(139,92,246,0.6)",
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          });
        }
      },
    });

    // Grid motion
    gsap.to(gridRef.current, {
      y: 90,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden perspective-[1200px]"
    >
      {/* Scanlines + vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_3px] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,black_100%)]" />

      {/* Grid */}
      <div className="absolute bottom-[-20%] w-[200%] h-[60%] opacity-30">
        <div
          ref={gridRef}
          className="w-full h-full bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] bg-[size:64px_64px] [transform:rotateX(72deg)]"
        />
      </div>

      {/* Left HUD */}
      <div
        ref={leftHudRef}
        className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-6 border-l border-indigo-500/30 pl-5 font-mono text-[10px] uppercase text-indigo-400"
      >
        <div>
          <p className="text-white/40">CPU Load</p>
          <p className="text-lg font-black">96.8%</p>
        </div>
        <div>
          <p className="text-white/40">Latency</p>
          <p className="text-lg font-black">12ms</p>
        </div>
        <div>
          <p className="text-white/40">Security</p>
          <p className="text-emerald-500 font-black">ACTIVE</p>
        </div>
      </div>

      {/* Center */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <div className="mb-6 px-4 py-1 border border-indigo-500/40 rounded-full text-[9px] tracking-[0.4em] uppercase text-indigo-300">
          System Initialization
        </div>

        <h1
          ref={nameRef}
          className="text-[22vw] md:text-[10rem] font-black italic tracking-tighter leading-none select-none"
          style={{
            textShadow:
              "0 0 20px rgba(99,102,241,0.6), 0 0 60px rgba(139,92,246,0.4)",
          }}
        >
          SHIHAB
        </h1>

        <p
          ref={subtitleRef}
          className="mt-3 text-[10px] md:text-xs tracking-[0.5em] uppercase text-indigo-400/70"
        >
          Full-Stack Systems • High Performance Web
        </p>

        <div className="w-[280px] md:w-[520px] mt-14">
          <div className="flex justify-between items-end mb-3 font-mono">
            <span className="text-[9px] text-indigo-400">
              Compiling Assets
            </span>
            <span className="text-5xl md:text-6xl font-black">
              <span ref={percentTextRef}>0</span>%
            </span>
          </div>

          <div className="h-2 w-full bg-white/10 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left bg-gradient-to-r from-indigo-600 via-purple-500 to-white shadow-[0_0_25px_#6366f1]"
            />
          </div>
        </div>
      </div>

      {/* Right HUD */}
      <div
        ref={rightHudRef}
        className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-2 font-mono text-[9px] text-indigo-400/50 text-right"
      >
        {systemLogs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
        <div className="text-emerald-500 animate-pulse">
          READY_
        </div>
      </div>
    </div>
  );
};

export default memo(Loading);
