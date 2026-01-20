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
  const statsRef = useRef(null);

  const [stats, setStats] = useState({
    experience: 0,
    customers: 0,
    projects: 0,
  });

  useGSAP(
    () => {
      /* ------------------ Background Streams ------------------ */
      gsap.to(".stream-up-about", {
        y: -500,
        duration: 40,
        repeat: -1,
        ease: "none",
        force3D: true,
      });

      gsap.to(".stream-down-about", {
        y: 500,
        duration: 45,
        repeat: -1,
        ease: "none",
        force3D: true,
      });

      /* ------------------ Main Entrance Timeline ------------------ */
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      intro
        .fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
            rotate: -3,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "expo.out",
          }
        )
        .from(
          ".reveal-item",
          {
            y: 40,
            opacity: 0,
            filter: "blur(6px)",
            stagger: 0.1,
            duration: 1,
            ease: "power4.out",
          },
          "-=1.2"
        );

      /* ------------------ Floating Image Motion ------------------ */
      gsap.to(".floating-box", {
        y: -15,
        rotation: 1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* ------------------ Stats Counter ------------------ */
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const values = { exp: 0, cust: 0, proj: 0 };

          gsap.to(values, {
            exp: 2.7,
            cust: 50,
            proj: 50,
            duration: 3,
            ease: "expo.inOut",
            onUpdate: () => {
              setStats({
                experience: values.exp,
                customers: Math.floor(values.cust),
                projects: Math.floor(values.proj),
              });
            },
          });
        },
      });
    },
    { scope: sectionRef }
  );

  const statCards = [
    {
      value: `${stats.experience.toFixed(1)}+`,
      label: "Years of Experience",
      color: "text-sky-400",
    },
    {
      value: `${stats.customers}+`,
      label: "Global Customers",
      color: "text-emerald-400",
    },
    {
      value: `${stats.projects}+`,
      label: "Projects Completed",
      color: "text-purple-400",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-32 px-6 sm:px-12 overflow-hidden bg-[#030305]"
    >
      {/* ------------------ Background ------------------ */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="absolute inset-0 opacity-[0.07] flex justify-between px-12">
          <div className="stream-up-about flex flex-col gap-14 font-mono text-[9px] text-sky-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
          <div className="stream-down-about flex flex-col gap-14 font-mono text-[9px] text-emerald-500/40 text-right">
            {[...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------ Content ------------------ */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-start">
            <div className="absolute w-80 h-80 rounded-full bg-sky-500/10 blur-[120px] -z-10 animate-pulse" />

            <div className="floating-box relative p-3 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">
              <img
                src="gg.png"
                alt="Shihab"
                className="w-64 h-80 sm:w-[400px] sm:h-[520px] rounded-[2rem] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />

              <div className="absolute -bottom-8 -right-8 hidden md:block bg-[#0a0a0c]/90 border border-white/10 p-7 rounded-[2rem] backdrop-blur-xl shadow-2xl">
                <p className="text-emerald-400 font-black text-3xl tracking-tighter">
                  100%
                </p>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Job Success Rate
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="reveal-item inline-block mb-8 font-mono text-[10px] text-sky-400 bg-sky-400/10 px-5 py-2 border border-sky-400/20 rounded-full uppercase tracking-[0.3em]">
              ./System_Diagnostics/Who_is_Shihab?
            </div>

            <h2 className="reveal-item text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
              Crafting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 italic">
                Future
              </span>{" "}
              Logic.
            </h2>

            <div className="reveal-item space-y-8 text-gray-400 text-lg md:text-xl max-w-2xl">
              <p>
                I am a{" "}
                <span className="text-white font-semibold">
                  Senior MERN Stack Engineer
                </span>{" "}
                with a passion for building scalable, high-performance web
                architectures that feel premium and future-proof.
              </p>

              <div className="flex flex-wrap gap-2.5 py-4 justify-center lg:justify-start">
                {[
                  "React",
                  "Node.js",
                  "Next.js",
                  "MongoDB",
                  "GSAP",
                  "Cloud Architecture",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg text-[11px] text-gray-400 font-mono hover:bg-white/10 hover:text-white transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ------------------ Stats ------------------ */}
        <div ref={statsRef} className="mt-40 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {statCards.map((s, i) => (
            <div key={i} className="relative p-12 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-sm text-center group">
              <h3 className={`text-6xl md:text-8xl font-black mb-4 ${s.color}`}>
                {s.value}
              </h3>
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.5em] font-bold group-hover:text-gray-300 transition">
                {s.label}
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full group-hover:w-24 group-hover:bg-sky-500 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
