import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", level: 90, color: "from-orange-500 to-red-600", glow: "rgba(234, 88, 12, 0.4)" },
  { name: "CSS", level: 85, color: "from-blue-500 to-indigo-600", glow: "rgba(37, 99, 235, 0.4)" },
  { name: "JavaScript", level: 80, color: "from-yellow-400 to-orange-500", glow: "rgba(250, 204, 21, 0.4)" },
  { name: "TypeScript", level: 60, color: "from-blue-600 to-sky-400", glow: "rgba(37, 99, 235, 0.4)" },
  { name: "React", level: 85, color: "from-sky-400 to-blue-500", glow: "rgba(56, 189, 248, 0.4)" },
  { name: "Next.js", level: 65, color: "from-white to-gray-400", glow: "rgba(255, 255, 255, 0.2)" },
  { name: "Tailwind CSS", level: 80, color: "from-teal-400 to-cyan-500", glow: "rgba(20, 184, 166, 0.4)" },
  { name: "Node.js", level: 70, color: "from-green-500 to-emerald-600", glow: "rgba(34, 197, 94, 0.4)" },
  { name: "Express.js", level: 70, color: "from-gray-300 to-gray-500", glow: "rgba(156, 163, 175, 0.4)" },
  { name: "MongoDB", level: 65, color: "from-emerald-500 to-green-700", glow: "rgba(16, 185, 129, 0.4)" },
  { name: "Framer Motion", level: 70, color: "from-purple-500 to-pink-500", glow: "rgba(168, 85, 247, 0.4)" },
  { name: "Three.js", level: 50, color: "from-white to-purple-400", glow: "rgba(192, 132, 252, 0.4)" },
];

const codeSnippets = [
  "npm install @headlessui/react",
  "const [isLoading, setLoading] = useState(true);",
  "tailwind.config.js",
  "git commit -m 'feat: add skills'",
  "import { gsap } from 'gsap';",
  "const stats = await db.collection('skills').find();",
];

const Skills = () => {
  const sectionRef = useRef(null);
  const [counters, setCounters] = useState(skills.map(() => 0));

  useGSAP(() => {
    // 1. Background Code Streams (Hardware Accelerated)
    gsap.to(".stream-up-skills", { y: -500, duration: 40, repeat: -1, ease: "none", force3D: true });
    gsap.to(".stream-down-skills", { y: 500, duration: 35, repeat: -1, ease: "none", force3D: true });

    // 2. Title Animation
    gsap.from(".skills-header", {
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: "power4.out"
    });

    // 3. Optimized Luxury Grid Animation
    const cards = gsap.utils.toArray(".skill-item");
    cards.forEach((card, idx) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          toggleActions: "play none none reverse",
        }
      });

      tl.from(card, {
        opacity: 0,
        scale: 0.96,
        y: 25,
        rotateX: -10,
        duration: 0.8,
        ease: "expo.out",
        force3D: true
      });

      let target = { val: 0 };
      tl.to(target, {
        val: skills[idx].level,
        duration: 1.5,
        ease: "power3.out",
        onUpdate: () => {
          setCounters(prev => {
            const next = [...prev];
            next[idx] = Math.round(target.val);
            return next;
          });
        }
      }, "-=0.5");
    });

    // 4. Terminal Reveal
    gsap.from(".terminal-box", {
      scrollTrigger: {
        trigger: ".terminal-box",
        start: "top 95%",
      },
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-[#050507]" id="skills">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
        />
        <div className="absolute inset-0 opacity-[0.05] flex justify-around">
          <div className="stream-up-skills flex flex-col gap-16 font-mono text-[9px] text-emerald-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
          <div className="stream-down-skills hidden md:flex flex-col gap-16 font-mono text-[9px] text-purple-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="skills-header text-center mb-20">
          <div className="inline-block mb-4 font-mono text-[10px] text-emerald-500 bg-emerald-500/5 px-4 py-1.5 border border-emerald-500/20 rounded-full tracking-[0.3em] uppercase">
            // Core_System_Initialize
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 italic">Arsenal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, idx) => (
            <div 
              key={skill.name} 
              className="skill-item group relative p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
              style={{ perspective: "1200px" }}
            >
              {/* Luxury Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${skill.glow} 0%, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] text-emerald-500/50 tracking-widest uppercase">
                      Module_{idx < 9 ? `0${idx + 1}` : idx + 1}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 font-mono tracking-tight">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white/90 font-mono tracking-tighter">
                      {counters[idx]}%
                    </span>
                  </div>
                </div>

                {/* Deluxe Progress Bar */}
                <div className="relative h-[3px] w-full bg-white/5 rounded-full mb-8">
                  <div
                    style={{ width: `${counters[idx]}%` }}
                    className={`h-full bg-gradient-to-r ${skill.color} relative transition-all duration-300 ease-out`}
                  >
                    <div className="scan-line absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${i * 20 < counters[idx] ? 'bg-emerald-500' : 'bg-white/10'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-emerald-500/70 transition-colors uppercase tracking-widest">
                    {counters[idx] > 80 ? 'Optimized' : 'Stable'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Terminal */}
        <div className="terminal-box mt-24 max-w-3xl mx-auto rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-3 bg-white/[0.02] border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <span className="font-mono text-[9px] text-slate-500 tracking-tighter uppercase italic">Shihab_Core_Log_v2.1</span>
          </div>
          <div className="p-8 font-mono text-[11px] leading-relaxed">
            <div className="flex gap-4 mb-3">
              <span className="text-emerald-500 font-bold">[SUCCESS]</span>
              <span className="text-slate-400">All modules synchronized. System running at peak capacity.</span>
            </div>
            <div className="flex gap-4">
              <span className="text-sky-500 font-bold">[READY]</span>
              <span className="text-slate-400 italic">Awaiting new challenge deployment. Standing by...</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scan-line {
          animation: scan 3s linear infinite;
        }
        @keyframes scan {
          from { transform: translateX(-100%); }
          to { transform: translateX(300%); }
        }
        .skill-item {
          will-change: transform, opacity;
          transform-style: preserve-3d;
        }
        .skill-item:hover {
          transform: translateY(-8px) rotateX(4deg);
        }
        @media (max-width: 768px) {
          .skill-item {
            backdrop-filter: none !important;
            background: rgba(15, 15, 20, 0.95) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;