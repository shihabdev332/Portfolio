import React, { useState, useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const typingTexts = [
  { text: "Hello, I'm Shihab...", color: "#a855f7" },
  { text: "A Full Stack Developer...", color: "#0ea5e9" },
];

const codeSnippets = [
  "const app = express();",
  "mongoose.connect(DB_URI);",
  "app.use(cors());",
  "export default function Hero()",
  "useEffect(() => { ... }, []);",
  "const [user, setUser] = useState();",
  "api.post('/v1/auth/login')",
];

const Hero = () => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const profileOverlayRef = useRef(null);
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  // --- GSAP OPTIMIZED ANIMATIONS ---
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Premium effects for Desktop
      gsap.from(".hero-content-inner > *", {
        y: 60,
        opacity: 0,
        filter: "blur(15px)",
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.out",
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Lighter effects for Mobile (No blur)
      gsap.from(".hero-content-inner > *", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
      });
    });

    // Persistent animations with hardware acceleration
    const tl = gsap.timeline();

    // Rotating dashed ring
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 30,
      repeat: -1,
      ease: "none",
    });

    // Floating effect
    gsap.to(".floating-target", {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Infinite code streams (Performance Optimized)
    gsap.to(".stream-up", {
      y: "-50%",
      duration: 40,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".stream-down", {
      y: "0%",
      duration: 50,
      repeat: -1,
      ease: "none",
      startAt: { y: "-50%" }
    });

    // Pulsing orbs
    gsap.to(".light-orb", {
      scale: 1.1,
      opacity: 0.3,
      duration: 6,
      repeat: -1,
      yoyo: true,
      stagger: 2,
    });
  }, { scope: containerRef });

  // Profile hover handlers
  const handleMouseEnter = () => {
    gsap.to(profileOverlayRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
  };
  const handleMouseLeave = () => {
    gsap.to(profileOverlayRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: "power2.in" });
  };

  // Optimized Typing Logic
  useEffect(() => {
    let timeout;
    const fullText = typingTexts[currentText].text;

    if (typing) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setTyping(true);
        setCurrentText((prev) => (prev + 1) % typingTexts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, typing, currentText]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative text-white min-h-screen flex flex-col justify-center overflow-hidden bg-[#020205] font-['Space_Grotesk']"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
        />

        {/* Optimized Code streams (Hidden on small mobile) */}
        <div className="absolute inset-0 opacity-[0.05] flex justify-between px-6 md:px-12">
          <div className="stream-up font-['Fira_Code'] text-[9px] text-purple-500 space-y-24 py-10 will-change-transform">
            {[...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i} className="block tracking-widest whitespace-nowrap">{s}</span>
            ))}
          </div>
          <div className="stream-down font-['Fira_Code'] text-[9px] text-sky-500 space-y-24 py-10 text-right will-change-transform">
            {[...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i} className="block tracking-widest whitespace-nowrap">{s}</span>
            ))}
          </div>
        </div>

        {/* Optimized Orbs */}
        <div className="light-orb absolute top-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/10 blur-[80px] md:blur-[120px] rounded-full translate-z-0" />
        <div className="light-orb absolute bottom-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full translate-z-0" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
        
        {/* Profile Section */}
        <div className="floating-target relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] mb-10 flex items-center justify-center will-change-transform">
          <div ref={ringRef} className="absolute inset-0 rounded-full border border-dashed border-white/10" />

          <div
            className="relative w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full p-[2px] bg-gradient-to-tr from-purple-600 via-sky-400 to-emerald-400 animate-gradient-xy shadow-xl z-10 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full h-full rounded-full bg-[#020205] overflow-hidden border-[4px] md:border-[6px] border-[#020205]">
              <img src="this.png" alt="Shihab" className="w-full h-full object-cover scale-105" />
            </div>

            <div ref={profileOverlayRef} className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-full flex flex-col items-center justify-center opacity-0 scale-90 pointer-events-none z-20 transition-all">
              <span className="text-[9px] tracking-[0.4em] text-white/40 mb-1 font-mono uppercase">System Active</span>
              <p className="font-['Fira_Code'] text-[10px] md:text-xs font-black text-purple-400">MERN_ENGINEER</p>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="hero-content-inner text-center max-w-4xl">
          <h1 className="text-2xl md:text-5xl font-black tracking-tighter mb-4 min-h-[1.5em] uppercase">
            <span style={{ color: typingTexts[currentText].color }} className="transition-colors duration-700">
              {displayText}
            </span>
            <span className="text-white ml-1">{cursorVisible ? "|" : " "}</span>
          </h1>

          <div className="mb-6">
            <h3 className="text-sm md:text-xl font-light text-slate-400 tracking-[0.2em] uppercase">
              Full-Stack <span className="text-white font-bold italic border-b border-purple-500/50">Architect</span>
            </h3>
          </div>

          <div className="inline-block py-2 px-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <p className="text-slate-400 font-['Fira_Code'] text-[10px] md:text-sm">
              <span className="text-purple-400">const</span> status = <span className="text-sky-400">"Building Scalable Apps"</span>;
            </p>
          </div>

          <p className="text-slate-400 text-xs md:text-base leading-relaxed max-w-2xl mx-auto mb-10 px-4">
            I specialize in the MERN stack, crafting high-performance web applications with clean code and interactive user experiences.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-6">
            <button
              onClick={() => scrollToSection("work")}
              className="group relative w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-bold tracking-widest text-[10px] uppercase overflow-hidden transition-all active:scale-95"
            >
              <span className="relative z-10">Explore Work</span>
              <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto px-10 py-4 border border-white/10 bg-white/5 rounded-full font-bold tracking-widest text-[10px] uppercase text-slate-300 hover:bg-white hover:text-black transition-all active:scale-95"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20 hidden md:flex">
        <span className="text-[8px] font-mono tracking-widest uppercase rotate-90 mb-4">SCROLL</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 4s ease infinite;
        }
        .translate-z-0 { transform: translateZ(0); }
      `}</style>
    </section>
  );
};

export default memo(Hero);
