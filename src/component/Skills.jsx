import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", level: 90, color: "from-orange-500 to-red-600", glow: "rgba(234, 88, 12, 0.45)" },
  { name: "CSS", level: 85, color: "from-blue-500 to-indigo-600", glow: "rgba(37, 99, 235, 0.45)" },
  { name: "JavaScript", level: 80, color: "from-yellow-400 to-orange-500", glow: "rgba(250, 204, 21, 0.45)" },
  { name: "TypeScript", level: 60, color: "from-blue-600 to-sky-400", glow: "rgba(37, 99, 235, 0.45)" },
  { name: "React", level: 85, color: "from-sky-400 to-blue-500", glow: "rgba(56, 189, 248, 0.45)" },
  { name: "Next.js", level: 65, color: "from-white to-gray-400", glow: "rgba(255, 255, 255, 0.25)" },
  { name: "Tailwind CSS", level: 80, color: "from-teal-400 to-cyan-500", glow: "rgba(20, 184, 166, 0.45)" },
  { name: "Node.js", level: 70, color: "from-green-500 to-emerald-600", glow: "rgba(34, 197, 94, 0.45)" },
  { name: "Express.js", level: 70, color: "from-gray-300 to-gray-500", glow: "rgba(156, 163, 175, 0.45)" },
  { name: "MongoDB", level: 65, color: "from-emerald-500 to-green-700", glow: "rgba(16, 185, 129, 0.45)" },
  { name: "Framer Motion", level: 70, color: "from-purple-500 to-pink-500", glow: "rgba(168, 85, 247, 0.45)" },
  { name: "Three.js", level: 50, color: "from-white to-purple-400", glow: "rgba(192, 132, 252, 0.45)" },
];

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.set(".skill-item", { opacity: 0, y: 40, scale: 0.94 });

    ScrollTrigger.batch(".skill-item", {
      start: "top 90%",
      onEnter: (els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 1.2,
          ease: "expo.out",
          clearProps: "all",
        });

        els.forEach((el) => {
          const target = { val: 0 };
          const percent = el.querySelector(".skill-percent");
          const bar = el.querySelector(".skill-bar");

          gsap.to(target, {
            val: el.dataset.level,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => {
              const v = Math.round(target.val);
              percent.textContent = `${v}%`;
              bar.style.setProperty("--progress", `${v}%`);
            },
          });
        });
      },
    });
  }, { scope: sectionRef });

  const onEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -14,
      scale: 1.03,
      boxShadow: "0 40px 120px rgba(0,0,0,.8)",
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.45,
      ease: "power3.out",
    });
  };

  return (
    <section ref={sectionRef} className="py-32 bg-[#010103] relative" id="skills">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="skills-header text-center mb-28">
          <p className="font-mono text-xs tracking-[0.4em] text-emerald-400 mb-6">
            SYSTEM.PROFICIENCY
          </p>
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tight">
            TECH{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 italic">
              ARSENAL
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((s, i) => (
            <div
              key={s.name}
              data-level={s.level}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="skill-item group relative isolate p-12 rounded-[2.8rem]
              bg-gradient-to-b from-white/[0.06] to-white/[0.01]
              border border-white/10 overflow-hidden cursor-pointer"
            >
              {/* Luxury glow */}
              <div
                className="absolute -inset-24 opacity-0 group-hover:opacity-100 transition duration-1000 -z-10 blur-[120px]"
                style={{ background: s.glow }}
              />

              {/* Gradient border */}
              <div className="absolute inset-0 rounded-[2.8rem] pointer-events-none opacity-0 group-hover:opacity-100 transition duration-700">
                <div className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-30`} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <h3 className="text-2xl font-bold text-white font-mono tracking-tight">
                    {s.name}
                  </h3>
                  <span className="skill-percent text-4xl font-black text-white/90 font-mono">
                    0%
                  </span>
                </div>

                {/* Progress */}
                <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`skill-bar h-full bg-gradient-to-r ${s.color} relative`}
                    style={{ width: "var(--progress, 0%)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse opacity-60" />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-8 items-center">
                  <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em] uppercase">
                    Proficiency
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 tracking-[0.3em] uppercase italic">
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
