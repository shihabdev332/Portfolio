import React, { useState, useEffect, useRef } from "react";
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
  "const data = await res.json();",
  "export const dynamic = 'force-dynamic';",
];

const Hero = () => {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const profileOverlayRef = useRef(null);
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  // --- GSAP PREMIUM ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // 1. Hero content entrance
    tl.from(
      ".hero-content > div, .hero-content h1, .hero-content h3, .hero-content p, .hero-btns",
      {
        y: 80,
        opacity: 0,
        filter: "blur(15px)",
        stagger: 0.15,
        duration: 1.8,
      }
    );

    // 2. Rotating outer dashed ring
    gsap.to(ringRef.current, {
      rotate: 360,
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    // 3. Floating image effect
    gsap.to(".floating-target", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // 4. Infinite code streams
    gsap.fromTo(
      ".stream-up",
      { y: 0 },
      { y: "-50%", duration: 35, repeat: -1, ease: "none" }
    );
    gsap.fromTo(
      ".stream-down",
      { y: "-50%" },
      { y: 0, duration: 45, repeat: -1, ease: "none" }
    );

    // 5. Pulsing background orbs
    gsap.to(".light-orb", {
      scale: 1.2,
      opacity: 0.4,
      duration: 5,
      repeat: -1,
      yoyo: true,
      stagger: 1,
    });
  }, { scope: containerRef });

  // Profile hover
  const handleMouseEnter = () => {
    gsap.to(profileOverlayRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "expo.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(profileOverlayRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  // Typing logic
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
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative text-white min-h-screen flex flex-col justify-center overflow-hidden bg-[#020205] font-['Space_Grotesk',_sans-serif]"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Radial Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Code streams */}
        <div className="absolute inset-0 opacity-[0.06] flex justify-between px-10">
          <div className="stream-up font-['Fira_Code'] text-[10px] text-purple-500 space-y-20 py-10">
            {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i} className="block tracking-widest">{s}</span>
            ))}
          </div>
          <div className="stream-down font-['Fira_Code'] text-[10px] text-sky-500 space-y-20 py-10 text-right">
            {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i} className="block tracking-widest">{s}</span>
            ))}
          </div>
        </div>

        {/* Background Orbs */}
        <div className="light-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="light-orb absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 container mx-auto px-6 hero-content flex flex-col items-center">
        
        {/* Profile Section */}
        <div className="floating-target relative w-[240px] h-[240px] md:w-[320px] md:h-[320px] mb-12 flex items-center justify-center">
          {/* Rotating Dashed Ring */}
          <div ref={ringRef} className="absolute inset-0 rounded-full border border-dashed border-white/10 p-4" />

          {/* Static Image */}
          <div
            className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full p-[2px] bg-gradient-to-tr from-purple-600 via-sky-400 to-emerald-400 animate-gradient-xy shadow-[0_0_50px_rgba(168,85,247,0.2)] z-10 cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full h-full rounded-full bg-[#020205] overflow-hidden border-[6px] border-[#020205]">
              <img
                src="this.png"
                alt="Shihab"
                className="w-full h-full object-cover mt-[25px] scale-110 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Hover Overlay */}
            <div
              ref={profileOverlayRef}
              className="absolute inset-0 bg-[#0a0a0c]/90 backdrop-blur-md rounded-full flex flex-col items-center justify-center border border-white/10 opacity-0 scale-85 pointer-events-none z-20"
            >
              <span className="text-[10px] tracking-[0.5em] text-white/40 mb-2 font-mono uppercase">System Ready</span>
              <p className="font-['Fira_Code'] text-xs font-black tracking-widest text-purple-400 uppercase">
                MERN_ENGINEER
              </p>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 min-h-[1.2em] uppercase">
            <span
              style={{ color: typingTexts[currentText].color }}
              className="transition-colors duration-1000"
            >
              {displayText}
            </span>
            <span className="text-white font-thin ml-2 animate-pulse">
              {cursorVisible ? "|" : " "}
            </span>
          </h1>

          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-light text-slate-400 tracking-[0.2em] uppercase">
              Full-Stack <span className="text-white font-bold italic border-b-2 border-purple-500/50 cursor-default">Architect</span> & Digital Craftsman
            </h3>
          </div>

          <div className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-12">
            <p className="text-slate-400 font-['Fira_Code'] text-xs md:text-sm tracking-tighter">
              <span className="text-purple-400">const</span> status = <span className="text-sky-400">"{`Building scalable systems`}"</span>;
            </p>
          </div>
        </div>

        {/* About Me Section */}
        <div className="text-center max-w-3xl mb-12 px-4">
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            I’m a passionate Full Stack Developer specializing in building high-performance web applications with MERN stack. I enjoy creating interactive UI, seamless UX, and bringing complex systems to life with clean, maintainable code. Always exploring new tech to deliver the best solutions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="hero-btns flex flex-col sm:flex-row justify-center items-center gap-6 w-full">
          <button
            onClick={() => scrollToSection("work")}
            className="group relative w-full sm:w-auto px-12 py-5 bg-white text-black rounded-full font-black tracking-widest text-[10px] uppercase overflow-hidden transition-all duration-500 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="w-full sm:w-auto px-12 py-5 border border-white/10 bg-white/5 rounded-full font-black tracking-widest text-[10px] uppercase text-slate-300 hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm active:scale-95 cursor-pointer"
          >
            Initialize Contact
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
        <span className="text-[8px] font-mono tracking-[0.5em] uppercase rotate-90 mb-4">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 5s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
