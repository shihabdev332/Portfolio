import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    // 1. Optimized Background Animation
    gsap.to(".stream-up-about", { y: -500, duration: 40, repeat: -1, ease: "none", force3D: true });
    gsap.to(".stream-down-about", { y: 500, duration: 45, repeat: -1, ease: "none", force3D: true });

    // 2. Premium Entrance Animation
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        toggleActions: "play none none reverse",
      }
    });

    masterTl
      .fromTo(imageRef.current, 
        { scale: 0.9, opacity: 0, rotate: -3, filter: "blur(10px)" }, 
        { scale: 1, opacity: 1, rotate: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }
      )
      .from(".reveal-item", {
        y: 40,
        opacity: 0,
        filter: "blur(5px)",
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      }, "-=1.2");

    // 3. Stats Counter Logic
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 85%",
      onEnter: () => animateStats(),
    });

    const animateStats = () => {
      const counts = { exp: 0, cust: 0, proj: 0 };
      gsap.to(counts, {
        exp: 2.7,
        cust: 50,
        proj: 50,
        duration: 3,
        ease: "expo.inOut",
        onUpdate: () => {
          setExperience(counts.exp);
          setCustomers(Math.floor(counts.cust));
          setProjects(Math.floor(counts.proj));
        }
      });
    };

    // 4. Subtle Floating for Image (Luxury Feel)
    gsap.to(".floating-box", {
      y: -15,
      rotation: 1,
      duration: 5,
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
      className="relative min-h-screen py-32 px-6 sm:px-12 overflow-hidden bg-[#030305]"
    >
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&family=Syne:wght@700;800&display=swap');
        
        .stat-card {
          perspective: 1000px;
        }
        .stat-content {
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }
        .stat-card:hover .stat-content {
          transform: translateY(-10px) rotateX(5deg);
        }
      `}</style>

      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute inset-0 opacity-[0.07] flex justify-between px-12">
          <div className="stream-up-about flex flex-col gap-14 font-mono text-[9px] text-sky-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
          <div className="stream-down-about flex flex-col gap-14 font-mono text-[9px] text-emerald-500/40 text-right">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Image Section */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-start">
            <div className="absolute w-80 h-80 rounded-full bg-sky-500/10 blur-[120px] -z-10 animate-pulse"></div>
            <div className="floating-box relative p-3 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">
              <img
                src="gg.png" 
                alt="Shihab"
                className="w-64 h-80 sm:w-[400px] sm:h-[520px] rounded-[2rem] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#0a0a0c]/90 border border-white/10 p-7 rounded-[2rem] hidden md:block backdrop-blur-xl shadow-2xl">
                <p className="text-emerald-400 font-black text-3xl font-['Syne'] tracking-tighter">100%</p>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">Job Success Rate</p>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div ref={textRef} className="text-center lg:text-left">
            <div className="reveal-item inline-block mb-8 font-mono text-[10px] text-sky-400 bg-sky-400/10 px-5 py-2 border border-sky-400/20 rounded-full uppercase tracking-[0.3em]">
              ./System_Diagnostics/Who_is_Shihab?
            </div>

            <h2 className="reveal-item text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter font-['Syne'] leading-[0.9]">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 italic">Future</span> Logic.
            </h2>

            <div className="reveal-item space-y-8 text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light font-['Plus_Jakarta_Sans']">
              <p>
                I am a <span className="text-white font-semibold">Senior MERN Stack Engineer</span> with a passion for building scalable, high-performance web architectures. My mission is to bridge the gap between complex backend logic and pixel-perfect user interfaces.
              </p>
              
              <div className="flex flex-wrap gap-2.5 py-4 justify-center lg:justify-start">
                {['React', 'Node.js', 'Next.js', 'MongoDB', 'GSAP', 'Cloud Architecture'].map((tech) => (
                  <span key={tech} className="px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-[11px] text-gray-400 font-mono hover:bg-white/10 hover:text-white transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal-item mt-12 flex flex-wrap justify-center lg:justify-start gap-8 items-center">
              <a
                href="#contact"
                className="group relative overflow-hidden bg-white text-black font-black py-5 px-12 rounded-full transition-all duration-300 shadow-xl"
              >
                <span className="relative z-10 uppercase text-sm tracking-wider">Hire Me Now</span>
                <div className="absolute inset-0 bg-sky-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              <div className="flex items-center gap-4 px-6 py-3 border border-white/5 rounded-2xl bg-white/[0.02] font-mono text-[11px] text-emerald-400 uppercase tracking-widest">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Available for Global Projects
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mt-40 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {stats.map((item, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content relative p-12 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-sm text-center overflow-hidden group">
                {/* Subtle Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h3 className={`text-6xl md:text-8xl font-black mb-4 ${item.color} tracking-tighter font-['Syne']`}>
                  {item.number}
                </h3>
                <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] font-bold group-hover:text-gray-300 transition-colors">
                  {item.text}
                </p>
                
                {/* Decorative Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full group-hover:w-24 group-hover:bg-sky-500 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;