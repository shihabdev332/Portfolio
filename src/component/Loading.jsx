import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const containerRef = useRef(null);
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const nameRef = useRef(null);
  const gridRef = useRef(null);
  const hudElements = useRef([]);

  const systemLogs = [
    "> INIT_KERNEL",
    "> MERN_STACK_LOADED",
    "> LARAVEL_BRIDGE_ACTIVE",
    "> ENCRYPT_SESSION",
    "> AI_CORE_SYNC",
    "> SECURITY_LAYER_ENGAGED",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          filter: "blur(20px)",
          duration: 0.4,
          ease: "power4.in",
          onComplete: onFinish,
        });
      },
    });

    // Identity reveal
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 20, letterSpacing: "1em" },
      {
        opacity: 1,
        y: 0,
        letterSpacing: "0.2em",
        duration: 0.4,
        ease: "expo.out",
      }
    ).fromTo(
      hudElements.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 },
      "-=0.2"
    );

    // Progress (UNCHANGED)
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 1.4,
      ease: "power1.inOut",
      onUpdate: () => {
        const v = Math.floor(counter.value);
        if (percentTextRef.current) percentTextRef.current.textContent = v;
        if (progressBarRef.current)
          progressBarRef.current.style.transform = `scaleX(${v / 100})`;
      },
    });

    // Grid motion
    gsap.to(gridRef.current, {
      y: 64,
      duration: 0.8,
      repeat: -1,
      ease: "none",
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] text-white overflow-hidden font-sans"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2)_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Grid */}
      <div className="absolute bottom-0 w-full h-[40vh] perspective-[500px] overflow-hidden opacity-40">
        <div
          ref={gridRef}
          className="w-full h-[200%] bg-[linear-gradient(to_right,#312e81_1px,transparent_1px),linear-gradient(to_bottom,#312e81_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)] origin-top"
        />
      </div>

      {/* Top HUD */}
      <div className="absolute top-8 left-6 right-6 flex justify-between">
        <div
          ref={(el) => (hudElements.current[0] = el)}
          className="border-l-2 border-indigo-500 pl-3"
        >
          <div className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">
            Core Status
          </div>
          <div className="text-xs font-bold tracking-tight text-white">
            SYSTEM_ARMED
          </div>
        </div>

        <div
          ref={(el) => (hudElements.current[1] = el)}
          className="text-right"
        >
          <div className="flex gap-1 justify-end mb-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1 h-1 bg-indigo-500 animate-pulse" />
            ))}
          </div>
          <span className="text-[8px] font-mono text-indigo-400/60 uppercase">
            Node_V8 | AES-256
          </span>
        </div>
      </div>

      {/* Center */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          ref={nameRef}
          className="text-6xl md:text-9xl font-black italic tracking-[0.2em] leading-none mb-3 text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-500"
          style={{
            transform: "translateZ(40px)",
            textShadow: `
              0 1px 0 #4338ca,
              0 4px 10px rgba(99,102,241,0.6),
              0 10px 40px rgba(99,102,241,0.9)
            `,
          }}
        >
          SHIHAB
        </h1>

        <p className="text-[10px] md:text-xs tracking-[0.8em] uppercase text-indigo-400/80 mb-4">
          Full Stack Developer
        </p>

        <p className="text-[9px] font-mono uppercase tracking-widest text-indigo-500/70 mb-10 animate-pulse">
          SYSTEM CORE INITIALIZING
        </p>

        {/* Loading Bar */}
        <div className="w-64 md:w-96">
          <div className="flex justify-between mb-2">
            <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest">
              Boot Sequence
            </span>
            <span className="text-2xl font-black font-mono">
              <span ref={percentTextRef}>0</span>%
            </span>
          </div>

          <div className="h-[2px] w-full bg-white/5 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,1)]"
            />
          </div>
        </div>
      </div>

      {/* Logs */}
      <div
        ref={(el) => (hudElements.current[2] = el)}
        className="absolute bottom-10 left-6 font-mono text-[8px] md:text-[10px] text-indigo-400/40"
      >
        {systemLogs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>

      <div className="absolute bottom-10 right-6 text-indigo-500 text-[10px] font-mono animate-pulse">
        THREAT_LEVEL: NONE
      </div>
    </div>
  );
};

export default memo(Loading);
