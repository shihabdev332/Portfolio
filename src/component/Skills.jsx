import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
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
    // 1. Background Animation (Code Streams)
    gsap.to(".stream-up-skills", { y: -500, duration: 40, repeat: -1, ease: "none" });
    gsap.to(".stream-down-skills", { y: 500, duration: 35, repeat: -1, ease: "none" });

    // 2. Title & Header Animation
    gsap.from(".skills-header", {
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 90%",
        toggleActions: "restart pause resume reverse"
      },
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
      duration: 1.2,
      ease: "expo.out"
    });

    // 3. Luxury Grid Animation
    const cards = gsap.utils.toArray(".skill-item");
    cards.forEach((card, idx) => {
      // Create individual timelines for each card to handle re-animation properly
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "restart none none reverse", // Restart on scroll down, reverse on scroll up
        }
      });

      tl.from(card, {
        opacity: 0,
        scale: 0.9,
        y: 40,
        rotateX: -15,
        duration: 0.8,
        ease: "power4.out"
      });

      // Animate the counter value
      let target = { val: 0 };
      tl.to(target, {
        val: skills[idx].level,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          setCounters(prev => {
            const next = [...prev];
            next[idx] = Math.round(target.val);
            return next;
          });
        }
      }, "-=0.4");
    });

    // 4. Terminal Reveal
    gsap.from(".terminal-box", {
      scrollTrigger: {
        trigger: ".terminal-box",
        start: "top 95%",
        toggleActions: "restart none none reverse"
      },
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 1,
      ease: "back.out(1.2)"
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-[#020203]" id="skills">
      
      {/* --- BACKGROUND ANIMATION LAYER (Unchanged) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
        />
        <div className="absolute inset-0 opacity-[0.07] flex justify-around">
          <div className="stream-up-skills flex flex-col gap-12 font-mono text-[10px] text-purple-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
          <div className="stream-down-skills hidden md:flex flex-col gap-12 font-mono text-[10px] text-sky-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="skills-header text-center mb-20">
          <div className="inline-block mb-3 font-mono text-[10px] text-emerald-500 bg-emerald-500/10 px-4 py-1.5 border border-emerald-500/20 rounded tracking-[0.2em] uppercase">
            // system.initialize_skills()
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 italic">ARSENAL</span>
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <div 
              key={skill.name} 
              className="skill-item group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-500"
              style={{ perspective: "1000px" }}
            >
              {/* Luxury Glow Effect on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ boxShadow: `0 0 40px -10px ${skill.glow}` }}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-emerald-500/60 mb-1 tracking-widest">
                      MODULE_{idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight uppercase font-mono group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-[10px] text-slate-500 uppercase">Efficiency</span>
                    <span className="text-xl font-black text-white">{counters[idx]}%</span>
                  </div>
                </div>

                {/* Deluxe Progress Bar Container */}
                <div className="relative h-[6px] w-full bg-white/5 rounded-full overflow-hidden mb-6">
                  <div
                    style={{ width: `${counters[idx]}%` }}
                    className={`h-full bg-gradient-to-r ${skill.color} relative shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-150 ease-out`}
                  >
                    <div className="scan-line absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                </div>

                {/* Animated Data Particles */}
                <div className="flex justify-between items-center px-1">
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 h-1 rounded-full transition-all duration-500 ${i * 15 < counters[idx] ? 'bg-emerald-500' : 'bg-white/10'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-[9px] font-mono text-slate-600 group-hover:text-slate-400">
                    STATUS: {counters[idx] > 70 ? 'OPTIMIZED' : 'STABLE'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Luxury Terminal */}
        <div className="terminal-box mt-24 max-w-4xl mx-auto overflow-hidden rounded-xl border border-white/5 bg-[#050508] shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            </div>
            <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase italic">Core_Diagnostics_Log</span>
          </div>
          <div className="p-6 font-mono text-[11px] leading-relaxed">
            <div className="flex gap-3 mb-2">
              <span className="text-emerald-500 font-bold tracking-tighter">[SUCCESS]</span>
              <span className="text-slate-400">Deployment successful. {skills.length} modules loaded into global namespace.</span>
            </div>
            <div className="flex gap-3">
              <span className="text-sky-500 font-bold tracking-tighter">[READY]</span>
              <span className="text-slate-400 italic">Shihab is prepared for next-gen scalable development. System standing by.</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scan-line {
          animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes scan {
          from { transform: translateX(-100%); }
          to { transform: translateX(250%); }
        }
        .skill-item {
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.2, 0, 0.2, 1);
        }
        .skill-item:hover {
          transform: translateY(-5px) rotateX(5deg);
        }
      `}</style>
    </section>
  );
};

export default Skills;