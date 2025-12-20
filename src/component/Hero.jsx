import { motion, useAnimation, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

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
  "npm install framer-motion",
  "const data = await res.json();",
  "export const dynamic = 'force-dynamic';",
];

const Hero = () => {
  const [hovered, setHovered] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  const controls = useAnimation();

  // Profile ring rotation
  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { repeat: Infinity, duration: 10, ease: "linear" },
    });
  }, [controls]);

  // Typing logic
  useEffect(() => {
    let timeout;
    const fullText = typingTexts[currentText].text;
    if (typing) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 50);
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
      className="relative text-white min-h-screen flex flex-col justify-center overflow-hidden bg-[#020205] font-['Space_Grotesk',_sans-serif]"
    >
      {/* --- BACKGROUND ANIMATION LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Grid dots */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        {/* Animated Code Streams */}
        <div className="absolute inset-0 opacity-[0.08] flex justify-between px-10">
          <motion.div 
            animate={{ y: [0, -1000] }} 
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="font-['Fira_Code',_monospace] text-[10px] text-purple-500 space-y-12"
          >
            {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i} className="block">{s}</span>
            ))}
          </motion.div>
          
          <motion.div 
            animate={{ y: [-1000, 0] }} 
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="font-['Fira_Code',_monospace] text-[10px] text-sky-500 space-y-12 text-right"
          >
            {[...codeSnippets, ...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i} className="block">{s}</span>
            ))}
          </motion.div>
        </div>

        {/* Cinematic Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Profile Section */}
        <div 
          className="relative w-[280px] h-[280px] mx-auto mb-12 flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setHovered(true)} 
          onMouseLeave={() => setHovered(false)}
        >
          {/* Rotating Outer Ring */}
          <motion.div 
            animate={controls} 
            className="absolute inset-0 rounded-full border border-dashed border-purple-500/40 p-2" 
          />
          
          {/* Animated Gradient Border */}
          <div className="relative w-[240px] h-[240px] rounded-full p-[3px] bg-gradient-to-tr from-purple-600 via-sky-400 to-emerald-400 animate-gradient-xy shadow-[0_0_50px_rgba(139,92,246,0.2)]">
            <div className="w-full h-full rounded-full bg-[#020205] overflow-hidden border-4 border-[#020205]">
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }}
                src="this.png" // Ensure this path is correct
                alt="Shihab" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" 
              />
            </div>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-purple-500/30"
              >
                <p className="font-['Fira_Code'] text-xs font-bold tracking-widest text-purple-400 uppercase">MERN_ENGINEER</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Typography Section */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter leading-none mb-6 min-h-[1.2em]"
          >
            <span style={{ color: typingTexts[currentText].color }} className="transition-colors duration-500">
              {displayText}
            </span>
            <span className="text-white font-light ml-1">{cursorVisible ? "_" : " "}</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl md:text-3xl font-light text-slate-300 tracking-wide mb-8">
              Full-Stack <span className="text-white font-medium italic underline decoration-purple-500 underline-offset-8">Architect</span> & Digital Craftsman
            </h3>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.7 }}
            className="text-slate-500 font-['Fira_Code'] text-sm md:text-base max-w-xl mx-auto mb-12 bg-white/5 py-3 px-6 rounded-2xl border border-white/5 backdrop-blur-sm"
          >
            {`{ status: "Building scalable systems", core: ["React", "Node", "MongoDB"] }`}
          </motion.p>
        </div>

        {/* Button Action Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <motion.button 
            onClick={() => scrollToSection("about")}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-4 bg-purple-600 rounded-xl font-bold tracking-widest text-[10px] uppercase transition-all shadow-lg"
          >
            Explore My Work
          </motion.button>

          <motion.button 
            onClick={() => scrollToSection("contact")}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-10 py-4 border border-slate-700 rounded-xl font-bold tracking-widest text-[10px] uppercase text-slate-300 transition-all backdrop-blur-sm"
          >
            Initialize Contact
          </motion.button>
        </div>
      </div>

      {/* --- CSS FOR GRADIENT ANIMATION --- */}
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

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 opacity-50 hidden md:block"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-purple-500 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default Hero;
