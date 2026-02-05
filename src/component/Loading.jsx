import React, { useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ onFinish }) => {
  const containerRef = useRef(null);
  const percentTextRef = useRef(null);
  const progressBarRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const gridRef = useRef(null);
  const codeRef = useRef(null);

  const codeSnippets = [
    "const app = express();",
    "await mongoose.connect(URI);",
    "export default function App()",
    "process.env.JWT_SECRET",
    "res.status(200).json({ success: true });",
    "npm run build",
    "git commit -m 'feat: optimized'",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // AGGRESSIVE EXIT: Split or Zoom out fast
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "expo.in", // Accelerate out
          onComplete: onFinish,
        });
      },
    });

    // 1. Initial Setups (Avoid Flash of Unstyled Content)
    gsap.set(titleRef.current, { y: 100, opacity: 0, rotateX: -20 });
    gsap.set(subTitleRef.current, { opacity: 0, letterSpacing: "0em" });
    gsap.set(progressBarRef.current, { scaleX: 0 });

    // 2. Cinematic Grid Movement (Infinite loop, separate from main TL)
    gsap.to(gridRef.current, {
      y: 100,
      duration: 2,
      repeat: -1,
      ease: "linear",
      force3D: true,
    });

    // 3. Floating Code Background (Slower, eerie)
    gsap.to(codeRef.current, {
      y: -200,
      duration: 10,
      repeat: -1,
      ease: "none",
      opacity: 0.1,
    });

    // --- MAIN TIMELINE (Aggressive Sequence) ---

    // Step A: Impact Entrance (0s - 0.5s)
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.8,
      ease: "back.out(1.7)", // "Slam" effect
    })
    .to(subTitleRef.current, {
      opacity: 1,
      letterSpacing: "1.5em", // Expansion effect
      duration: 1,
      ease: "power2.out",
    }, "-=0.6");

    // Step B: The Counter (Direct DOM manipulation for 60FPS)
    const counterObj = { value: 0 };
    
    tl.to(counterObj, {
      value: 100,
      duration: 1.8, // Fast load time
      ease: "expo.inOut", // Slow start, super fast middle, slow end
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        
        // Update Text
        if (percentTextRef.current) {
          percentTextRef.current.textContent = val;
        }
        
        // Update Bar (ScaleX is more performant than width)
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${val / 100})`;
        }

        // Add "Glitch/Shake" intensity based on speed
        if (val > 20 && val < 80) {
            gsap.set(percentTextRef.current, { 
                x: gsap.utils.random(-2, 2), 
                y: gsap.utils.random(-2, 2),
                filter: `blur(${gsap.utils.random(0, 1)}px)` 
            });
        } else {
            gsap.set(percentTextRef.current, { x: 0, y: 0, filter: "blur(0px)" });
        }
      },
    }, "-=0.5"); // Overlap with title entrance

    // Step C: Flash on Completion
    tl.to(containerRef.current, {
        backgroundColor: "#1a1a1a", // Slight flash
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "rough"
    }, "-=0.2");

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden text-white font-mono perspective-[1200px]"
    >
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Retro Grid Floor */}
      <div className="absolute bottom-0 w-[200%] h-[50%] left-[-50%] perspective-[500px] opacity-20 pointer-events-none">
         <div 
            ref={gridRef}
            className="w-full h-full bg-[linear-gradient(to_right,#4c1d95_1px,transparent_1px),linear-gradient(to_bottom,#4c1d95_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(60deg)] will-change-transform"
         />
      </div>

      {/* 2. Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)] pointer-events-none" />

      {/* 3. Code Rain (Background) */}
      <div ref={codeRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.05] pointer-events-none select-none text-[10px] leading-loose text-purple-300">
         {Array(10).fill([...codeSnippets]).flat().map((code, i) => (
             <div key={i} className="whitespace-nowrap">{code}</div>
         ))}
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Title Group */}
        <div className="mb-12 text-center transform-style-3d">
            <h1 ref={titleRef} className="text-7xl md:text-9xl font-black tracking-tighter will-change-transform"
                style={{ textShadow: "0 10px 30px rgba(124, 58, 237, 0.5)" }}>
                MERN
                <span className="text-transparent bg-clip-text bg-gradient-to-t from-purple-600 to-fuchsia-400">.DEV</span>
            </h1>
            <p ref={subTitleRef} className="mt-4 text-xs md:text-sm text-purple-300/60 uppercase font-bold tracking-[0em] will-change-[opacity,letter-spacing]">
                System Architecture Loading
            </p>
        </div>

        {/* Performance Bar & Counter */}
        <div className="w-[300px] md:w-[500px] relative">
            {/* Percentage */}
            <div className="absolute -top-16 right-0 text-5xl font-black italic tracking-tighter mix-blend-difference">
                <span ref={percentTextRef}>0</span>%
            </div>

            {/* Bar Container */}
            <div className="h-2 w-full bg-gray-900 rounded-none overflow-hidden border border-gray-800">
                <div 
                    ref={progressBarRef}
                    className="h-full w-full bg-white origin-left will-change-transform shadow-[0_0_20px_white]"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>

            {/* Bottom Meta Data */}
            <div className="flex justify-between mt-2 text-[9px] text-gray-500 font-medium uppercase tracking-widest">
                <span>Memory: Allocated</span>
                <span className="animate-pulse text-purple-500">Processing...</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default memo(Loading);
