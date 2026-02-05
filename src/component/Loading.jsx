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

  const systemLogs = [
    "> INIT_KERNEL_v3.0.4",
    "> MERN_STACK_VIRTUAL_CORE_LOADED",
    "> LARAVEL_BRIDGE_ACTIVE_SYNC",
    "> ENCRYPT_SESSION_RSA_4096",
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

    tl.fromTo(
      nameRef.current,
      { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "expo.out" }
    );

    gsap.to(nameRef.current, {
      skewX: () => Math.random() * 10 - 5,
      x: () => Math.random() * 6 - 3,
      duration: 0.1,
      repeat: -1,
      repeatRefresh: true,
    });

    const counter = { value: 0 };
    tl.to(
      counter,
      {
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
      },
      "-=0.2"
    );

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
      {/* Scanner Line */}
      <div
        ref={scannerRef}
        className="absolute top-[-10%] left-0 w-full h-[20vh] bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent z-0 pointer-events-none"
      />

      {/* Particles */}
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

      {/* Ring */}
      <div
        ref={cubeRef}
        className="absolute w-[500px] h-[500px] border border-indigo-500/5 rounded-full z-0"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute inset-0 border-t-2 border-indigo-500/20 rounded-full animate-spin-slow" />
      </div>

      {/* Center */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          ref={nameRef}
          className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white via-indigo-300 to-indigo-700"
          style={{ filter: "drop-shadow(0 0 30px rgba(79,70,229,0.4))" }}
        >
          SHIHAB
        </h1>

        {/* NEW – Premium micro tagline */}
        <p className="text-[11px] tracking-[0.4em] uppercase text-indigo-300/70 mb-2">
          Full-Stack Systems Engineer
        </p>

        <p className="text-[10px] tracking-[1em] uppercase text-indigo-400/60 mb-16">
          Architecting Logic
        </p>

        {/* Loading Bar */}
        <div className="w-72 md:w-[30rem]">
          <div className="flex justify-between items-end mb-3 font-bold">
            <span className="text-[9px] text-indigo-500 tracking-widest">
              SYSTEM_BOOT
            </span>
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

          {/* NEW – Status text */}
          <p className="mt-3 text-[9px] tracking-widest uppercase text-indigo-400/50 text-right">
            Initializing Secure Runtime Environment
          </p>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className="flex flex-col gap-1 text-[8px] text-indigo-400/40 uppercase">
          {systemLogs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>

        {/* NEW – Signature */}
        <div className="text-right">
          <div className="text-[9px] text-indigo-500/50 animate-pulse font-bold">
            v3.0.4_STABLE
          </div>
          <div className="text-[8px] tracking-widest uppercase text-indigo-400/30">
            Crafted by Shihab
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Loading);
