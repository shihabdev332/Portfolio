import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const codeSnippets = [
  "const [data, setData] = useState([]);",
  "router.get('/api/projects', getProjects);",
  "className='hover:scale-105 transition';",
  "const res = await axios.post(url, body);",
  "useEffect(() => { window.scrollTo(0,0) });",
  "export const metadata = { title: 'Shihab' };",
  "npm run build && firebase deploy",
  "console.log('Backend connected...');",
];

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  const [experience, setExperience] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [projects, setProjects] = useState(0);

  useGSAP(() => {
    // 1. Background Anim (Kept Original)
    gsap.to(".stream-up-about", { y: -500, duration: 30, repeat: -1, ease: "none" });
    gsap.to(".stream-down-about", { y: 500, duration: 35, repeat: -1, ease: "none" });

    // 2. Premium Entrance Animation (Triggers on Scroll Up & Down)
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 20%",
        toggleActions: "restart pause resume reverse",
      }
    });

    masterTl
      .fromTo(imageRef.current, 
        { scale: 0.8, opacity: 0, rotate: -5 }, 
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "expo.out" }
      )
      .from(".reveal-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.8");

    // 3. Stats Counter Animation
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 85%",
      onEnter: () => animateStats(),
      onEnterBack: () => animateStats(), // Re-triggers on scroll up
    });

    const animateStats = () => {
      const counts = { exp: 0, cust: 0, proj: 0 };
      gsap.to(counts, {
        exp: 2.7,
        cust: 50,
        proj: 50,
        duration: 2.5,
        ease: "expo.inOut",
        onUpdate: () => {
          setExperience(counts.exp);
          setCustomers(Math.floor(counts.cust));
          setProjects(Math.floor(counts.proj));
        }
      });
    };

    // 4. Infinite Floating for Image
    gsap.to(".floating-box", {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: sectionRef });

  const stats = [
    { number: `${experience.toFixed(1)}+`, text: "Years of Experience", color: "text-sky-400" },
    { number: `${customers}+`, text: "Global Customers", color: "text-emerald-400" },
    { number: `${projects}+`, text: "Projects Completed", color: "text-purple-400" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 sm:px-12 overflow-hidden bg-[#020203] font-['Plus_Jakarta_Sans',_sans-serif]"
    >
      {/* Google Fonts Link */}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Syne:wght@700;800&display=swap');
      </style>

      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 opacity-[0.1] flex justify-between px-10">
          <div className="stream-up-about flex flex-col gap-10 font-mono text-[10px] text-sky-500/50">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
          <div className="stream-down-about flex flex-col gap-10 font-mono text-[10px] text-emerald-500/50 text-right">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Image Section */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-start">
            <div className="absolute w-72 h-72 rounded-full bg-sky-500/10 blur-[100px] -z-10 animate-pulse"></div>
            <div className="floating-box relative p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <img
                src="gg.png" 
                alt="Profile"
                className="w-64 h-80 sm:w-96 sm:h-[500px] rounded-[1.8rem] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#0a0a0c] border border-white/10 p-6 rounded-2xl hidden md:block backdrop-blur-md">
                <p className="text-emerald-400 font-bold text-2xl font-['Syne']">100%</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Job Success</p>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div ref={textRef} className="text-center lg:text-left">
            <div className="reveal-item inline-block mb-6 font-mono text-[11px] text-sky-400 bg-sky-400/5 px-4 py-1.5 border border-sky-400/20 rounded-full uppercase tracking-[0.2em]">
              ./Who_is_Shihab?
            </div>

            <h2 className="reveal-item text-2xl md:text-5xl font-[800] text-white mb-8 tracking-tighter font-['Syne'] leading-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 italic underline decoration-sky-500/30">Future</span> Logic.
            </h2>

            <div className="reveal-item space-y-6 text-gray-400 text-lg leading-relaxed max-w-2xl font-light">
              <p>
                I am a <span className="text-white font-semibold">Senior MERN Stack Engineer</span> with a passion for building scalable, high-performance web architectures. My mission is to bridge the gap between complex backend logic and pixel-perfect user interfaces.
              </p>
              
              {/* Added Tech Badges Area */}
              <div className="flex flex-wrap gap-3 py-4 justify-center lg:justify-start">
                {['React', 'Node.js', 'Next.js', 'MongoDB', 'GSAP', 'Cloud Architecture'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-gray-300 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal-item mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
              <a
                href="#contact"
                className="bg-white text-black font-bold py-4 px-10 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
              >
                Hire Me Now
              </a>
              <div className="flex items-center gap-3 px-5 py-2 border border-white/10 rounded-full bg-white/5 font-mono text-xs text-emerald-400 cursor-default">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                Available for Global Projects
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((item, index) => (
            <div key={index} className="stat-card group cursor-pointer">
              <div className="relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-sky-500/40 hover:bg-white/[0.04] transition-all duration-700 text-center overflow-hidden">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h3 className={`text-6xl md:text-7xl font-[800] mb-3 ${item.color} tracking-tighter font-['Syne']`}>
                  {item.number}
                </h3>
                <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-gray-300 transition-colors">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;