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

  // MERN Stack context code for background
  const codeSnippets = [
    "const app = express();",
    "await mongoose.connect(process.env.DB);",
    "export default function Dashboard()",
    "jwt.sign(payload, secret, { expiresIn: '1h' })",
    "res.status(200).json({ success: true });",
    "npm run build && npm start",
    "git push origin main",
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Premium Exit: Slide up reveals content underneath
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: onFinish,
        });
      },
    });

    // 1. Initial States (Prevent FOUC)
    gsap.set(titleRef.current, { y: 60, opacity: 0, filter: "blur(10px)" });
    gsap.set(subTitleRef.current, { opacity: 0, y: 20 });
    gsap.set(progressBarRef.current, { scaleX: 0 });

    // 2. Infinite Grid Motion (Subtle & Slow)
    gsap.to(gridRef.current, {
      y: 120, // Move one grid unit
      duration: 3,
      repeat: -1,
      ease: "linear",
      force3D: true,
    });

    // 3. Floating Code Rain (Very subtle background texture)
    gsap.to(codeRef.current, {
      y: -100,
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    // --- MAIN SEQUENCE ---

    // A. Title Reveal (Cinematic Fade Up)
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
    })
    .to(subTitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.8");

    // B. Progress Counter (Direct DOM for Performance)
    const counterObj = { value: 0 };
    
    tl.to(counterObj, {
      value: 100,
      duration: 2.2, // Slightly longer for "Premium" feel
      ease: "expo.inOut",
      onUpdate: () => {
        const val = Math.floor(counterObj.value);
        
        // Update Text
        if (percentTextRef.current) {
          percentTextRef.current.textContent = val;
        }
        
        // Update Bar Width (ScaleX is GPU efficient)
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${val / 100})`;
        }

        // Glitch Effect (Only at high speeds)
        if (val > 30 && val < 85) {
             // Random subtle distinct shake
             const shake = gsap.utils.random(-1, 1);
             gsap.set(percentTextRef.current, { x: shake, opacity: gsap.utils.random(0.8, 1) });
        } else {
             gsap.set(percentTextRef.current, { x: 0, opacity: 1 });
        }
      },
    }, "-=1.0");

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden font-sans text-white"
    >
      {/* --- PREMIUM BACKGROUND LAYERS --- */}
      
      {/* 1. Base Gradient (Deep Void) */}
      <div className="absolute inset-0 bg-[#030005]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e1b4b_0%,#000000_100%)] opacity-60" />

      {/* 2. Noise Texture (Cinematic Grain) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* 3. Retro Perspective Grid (Floor) */}
      <div className="absolute bottom-0 left-[-50%] w-[200%] h-[40%] perspective-[600px] opacity-10 pointer-events-none mask-image-gradient">
          <div 
             ref={gridRef}
             className="w-full h-full bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(70deg)]"
          />
          {/* Fade grid at top edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#030005]" />
      </div>

      {/* 4. Code Rain (Atmosphere) */}
      <div ref={codeRef} className="absolute inset-0 flex flex-col justify-center items-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <div className="text-[10px] md:text-xs font-mono text-purple-300 space-y-8 text-center mix-blend-plus-lighter">
              {Array(6).fill([...codeSnippets]).flat().map((snippet, i) => (
                  <div key={i}>{snippet}</div>
              ))}
          </div>
      </div>

      {/* --- CONTENT HUD --- */}
      <div className="relative z-10 w-full max-w-[90%] md:max-w-3xl flex flex-col items-center">
        
        {/* Main Branding */}
        <div className="mb-10 md:mb-16 text-center">
            <h1 ref={titleRef} className="text-[12vw] md:text-8xl font-black tracking-tighter leading-none text-white mix-blend-screen will-change-[transform,opacity,filter]">
                MERN
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-purple-500 via-fuchsia-300 to-white">.DEV</span>
            </h1>
            <div ref={subTitleRef} className="mt-4 flex items-center justify-center gap-3">
                <span className="h-[1px] w-8 md:w-16 bg-purple-500/50" />
                <p className="text-[10px] md:text-xs font-mono text-purple-200/50 uppercase tracking-[0.4em]">
                    System Initialization
                </p>
                <span className="h-[1px] w-8 md:w-16 bg-purple-500/50" />
            </div>
        </div>

        {/* Loading Interface */}
        <div className="w-full max-w-[320px] md:max-w-[600px] relative">
            
            {/* Percentage Display */}
            <div className="absolute -top-10 md:-top-16 right-0 font-mono">
                <div className="flex items-baseline gap-1 text-white mix-blend-difference">
                    <span ref={percentTextRef} className="text-5xl md:text-7xl font-bold tracking-tighter">0</span>
                    <span className="text-lg md:text-2xl text-purple-400 font-light">%</span>
                </div>
            </div>

            {/* The Bar */}
            <div className="h-1.5 md:h-2 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                <div 
                    ref={progressBarRef}
                    className="h-full w-full bg-gradient-to-r from-purple-900 via-purple-500 to-white origin-left shadow-[0_0_30px_rgba(192,132,252,0.6)]"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>

            {/* Footer Status */}
            <div className="flex justify-between mt-3 text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-widest">
                <span>Secure Connection</span>
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    v2.4.0
                </span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default memo(Loading);
