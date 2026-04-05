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
  const logRefs = useRef([]);

  const systemLogs = [
    "> ESTABLISHING_SECURE_CONNECTION...",
    "> BYPASSING_FIREWALL_PROTOCOLS...",
    "> ROOT_ACCESS_GRANTED",
    "> DECRYPTING_MERN_MODULES...",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          filter: "blur(20px)",
          scale: 1.05,
          duration: 0.6,
          ease: "power4.inOut",
          onComplete: onFinish,
        });
      },
    });

    // Name Glitch Reveal
    tl.fromTo(
      nameRef.current,
      { opacity: 0, scale: 0.8, filter: "blur(10px)", textShadow: "0px 0px 0px #10b981" },
      { opacity: 1, scale: 1, filter: "blur(0px)", textShadow: "0px 0px 20px #10b981", duration: 0.5, ease: "expo.out" }
    );

    // Continuous Hacker Glitch
    gsap.to(nameRef.current, {
      skewX: () => Math.random() * 10 - 5,
      x: () => Math.random() * 4 - 2,
      opacity: () => Math.random() * 0.5 + 0.5,
      duration: 0.05,
      repeat: -1,
      repeatRefresh: true,
      ease: "steps(1)",
    });

    // Terminal Logs Typing Effect
    logRefs.current.forEach((log, index) => {
      gsap.fromTo(
        log,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, delay: index * 0.3, ease: "power2.out" }
      );
    });

    // Loading Counter & Bar
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: 100,
        duration: 1.5,
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

    // Scanner Line
    gsap.to(scannerRef.current, {
      top: "100%",
      duration: 1.5,
      repeat: -1,
      ease: "linear",
    });

    // Matrix Particles
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        y: "100vh",
        opacity: 0,
        duration: "random(1, 3)",
        repeat: -1,
        delay: "random(0, 2)",
        ease: "linear",
      });
    });

    // Outer Ring
    gsap.to(cubeRef.current, {
      rotateZ: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-[#10b981] overflow-hidden font-mono select-none"
    >
      {/* Hacker Scanner Line */}
      <div
        ref={scannerRef}
        className="absolute top-[-10%] left-0 w-full h-[15vh] bg-gradient-to-b from-transparent via-[#10b981]/20 to-transparent z-0 pointer-events-none mix-blend-screen"
      />

      {/* Raining Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-[2px] h-[10px] bg-[#10b981]/40 shadow-[0_0_5px_#10b981]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Cybernetic Ring */}
      <div
        ref={cubeRef}
        className="absolute w-[600px] h-[600px] border border-[#10b981]/10 rounded-full z-0 border-dashed"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute inset-0 border-t-4 border-[#10b981]/30 rounded-full" />
        <div className="absolute inset-8 border-b-2 border-[#10b981]/20 rounded-full animate-pulse" />
      </div>

      {/* Center Display */}
      <div className="relative z-10 flex flex-col items-center">
        <h1
          ref={nameRef}
          className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none mb-2 text-[#10b981]"
        >
          SHIHAB
        </h1>

        <p className="text-[12px] tracking-[0.5em] uppercase text-[#10b981]/80 mb-2 font-bold">
          Full-Stack Web Developer
        </p>

        <p className="text-[10px] tracking-[0.8em] uppercase text-[#10b981]/50 mb-16 animate-pulse">
          _System.Override()
        </p>

        {/* Cyber Progress Bar */}
        <div className="w-80 md:w-[35rem]">
          <div className="flex justify-between items-end mb-3 font-bold">
            <span className="text-[10px] text-[#10b981]/80 tracking-widest animate-pulse">
              EXECUTING_PAYLOAD...
            </span>
            <span className="text-4xl text-[#10b981]">
              <span ref={percentTextRef}>0</span>%
            </span>
          </div>

          <div className="h-[3px] w-full bg-[#10b981]/10 relative overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left bg-[#10b981] shadow-[0_0_20px_#10b981]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>

          <p className="mt-3 text-[9px] tracking-widest uppercase text-[#10b981]/50 text-right">
            Decrypting Core Assets...
          </p>
        </div>
      </div>

      {/* Bottom Terminal HUD */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className="flex flex-col gap-1 text-[10px] text-[#10b981]/60 font-bold">
          {systemLogs.map((log, i) => (
            <div key={i} ref={(el) => (logRefs.current[i] = el)} className="opacity-0">
              {log}
            </div>
          ))}
        </div>

        {/* Signature */}
        <div className="text-right">
          <div className="text-[10px] text-[#10b981] animate-pulse font-bold bg-[#10b981]/10 px-2 py-1 rounded">
            SYS_ADMIN_ACTIVE
          </div>
          <div className="text-[9px] tracking-widest uppercase text-[#10b981]/40 mt-1">
            Terminal_v3.0.4
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Loading);
