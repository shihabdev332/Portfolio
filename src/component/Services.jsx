import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  HiUserGroup,
  HiOutlineServer,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { LiaPagerSolid } from "react-icons/lia";
import { MdProductionQuantityLimits } from "react-icons/md";
import { PiBaseballHelmetDuotone } from "react-icons/pi";
import { RiProfileLine } from "react-icons/ri";
import { SiFigma, SiMongodb } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const codeSnippets = [
  "service.init({ mode: 'production' })",
  "const UI = new Framework('React')",
  "Database.connect(cluster0)",
  "Auth.verify(JWT_SECRET)",
  "SEO.optimize({ speed: '100ms' })",
];

const Services = () => {
  const containerRef = useRef(null);

  const services = useMemo(
    () => [
      { icon: <RiProfileLine />, title: "Portfolio Development", stack: "GSAP / React / Three.js", desc: "Performance-optimized personal brands built with premium motion physics." },
      { icon: <LiaPagerSolid />, title: "Landing Pages", stack: "Tailwind / Framer / Vite", desc: "High-converting single-page applications with scroll-triggered engagement." },
      { icon: <HiUserGroup />, title: "Agency Solutions", stack: "Next.js / TypeScript", desc: "Scalable professional architectures that establish market authority." },
      { icon: <HiOutlineServer />, title: "Full-Stack MERN", stack: "Node / Express / Mongo", desc: "End-to-end applications with modular server logic and database clusters." },
      { icon: <SiMongodb />, title: "RESTful Backend", stack: "Redis / Mongoose / API", desc: "Complex API design focusing on low latency and high availability." },
      { icon: <HiOutlineShieldCheck />, title: "Security & Auth", stack: "JWT / OAuth / bcrypt", desc: "Identity management with role-based access control (RBAC) protocols." },
      { icon: <MdProductionQuantityLimits />, title: "E-commerce UI", stack: "Redux / Stripe / CMS", desc: "Seamless shopping flows with state-managed carts and secure payments." },
      { icon: <SiFigma />, title: "Figma to React", stack: "Design Tokens / Clean Code", desc: "Precise translation of design tokens into reusable Tailwind components." },
      { icon: <PiBaseballHelmetDuotone />, title: "Corporate Systems", stack: "Dashboard / Chart.js", desc: "Internal tools and corporate portals with robust data visualization." },
    ],
    []
  );

  useGSAP(
    () => {
      /* -------- Background Streams -------- */
      gsap.to(".code-stream-up", {
        y: -500,
        duration: 35,
        repeat: -1,
        ease: "none",
        force3D: true,
      });

      gsap.to(".code-stream-down", {
        y: 500,
        duration: 30,
        repeat: -1,
        ease: "none",
        force3D: true,
      });

      /* -------- Header -------- */
      gsap.from(".srv-header-item", {
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 95%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
      });

      /* -------- Cards -------- */
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.08,
        duration: 1.4,
        ease: "expo.out",
        clearProps: "all",
      });

      /* -------- CTA -------- */
      gsap.from(".cta-box", {
        scrollTrigger: {
          trigger: ".cta-box",
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  /* ---------- Hover (GPU SAFE) ---------- */
  const onEnter = (e) => {
    if (window.matchMedia("(hover: none)").matches) return;

    const card = e.currentTarget;
    gsap.killTweensOf(card);

    gsap.to(card, {
      y: -12,
      borderColor: "rgba(168,85,247,.5)",
      backgroundColor: "rgba(12,12,18,1)",
      duration: 0.35,
      ease: "power2.out",
      force3D: true,
    });

    gsap.to(card.querySelector(".icon-box"), {
      rotateY: 180,
      scale: 1.1,
      backgroundColor: "#a855f7",
      color: "#fff",
      duration: 0.6,
      ease: "expo.out",
    });

    gsap.to(card.querySelector(".glow-layer"), {
      opacity: 0.6,
      scale: 1.8,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const onLeave = (e) => {
    const card = e.currentTarget;

    gsap.to(card, {
      y: 0,
      borderColor: "rgba(255,255,255,.05)",
      backgroundColor: "rgba(8,8,12,.8)",
      duration: 0.35,
    });

    gsap.to(card.querySelector(".icon-box"), {
      rotateY: 0,
      scale: 1,
      backgroundColor: "rgba(255,255,255,.03)",
      color: "#a855f7",
      duration: 0.5,
    });

    gsap.to(card.querySelector(".glow-layer"), {
      opacity: 0,
      scale: 1,
      duration: 0.5,
    });
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-40 overflow-hidden bg-[#010103]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute inset-0 opacity-[0.07] flex justify-between px-10 md:px-24">
          <div className="code-stream-up flex flex-col gap-24 font-mono text-[10px] text-purple-500/60 uppercase tracking-widest">
            {[...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i} className="whitespace-nowrap italic">{s}</span>
            ))}
          </div>
          <div className="code-stream-down hidden md:flex flex-col gap-24 font-mono text-[10px] text-emerald-500/60 text-right uppercase tracking-widest">
            {[...codeSnippets, ...codeSnippets].map((s, i) => (
              <span key={i} className="whitespace-nowrap italic">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="services-header max-w-5xl mb-32">
          <div className="srv-header-item inline-flex gap-3 mb-8 font-mono text-[10px] text-purple-400 bg-purple-400/5 px-5 py-2 border border-purple-400/20 rounded-full uppercase tracking-[0.4em]">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            System.Services_Architecture
          </div>

          <h2 className="srv-header-item text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-10">
            ELITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-emerald-400 italic">
              SOLUTIONS
            </span>
          </h2>

          <p className="srv-header-item text-slate-400 text-xl md:text-3xl font-light max-w-3xl">
            Architecting high-performance digital environments where{" "}
            <span className="text-white">luxury design</span> meets{" "}
            <span className="text-purple-400 italic font-mono">technical excellence</span>.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((item, i) => (
            <div
              key={i}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="service-card relative p-12 rounded-[2.5rem] bg-[#08080c]/80 border border-white/5 backdrop-blur-2xl overflow-hidden will-change-transform"
            >
              <div className="glow-layer absolute -top-24 -right-24 w-56 h-56 bg-purple-600/20 blur-[100px] opacity-0" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between mb-12">
                  <div className="icon-box w-16 h-16 rounded-[1.25rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-4xl text-purple-400 shadow-xl">
                    {item.icon}
                  </div>
                  <p className="text-lg font-black text-white/10 italic font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>

                <h3 className="text-3xl font-bold text-white mb-6">{item.title}</h3>
                <p className="text-slate-500 flex-grow mb-10">{item.desc}</p>

                <div className="pt-8 border-t border-white/5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-600 mb-3">
                    Engine_Core
                  </p>
                  <p className="text-xs text-sky-400 font-bold uppercase">
                    {item.stack}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-purple-600 via-sky-500 to-emerald-400 group-hover:w-full transition-all duration-1000" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cta-box mt-40 text-center p-20 rounded-[4rem] border border-white/5">
          <h4 className="text-slate-500 font-mono text-xs uppercase tracking-[0.6em] mb-10">
            Initiating Connection Protocol...
          </h4>
          <a href="#contact" className="inline-flex items-center gap-6 text-white text-4xl font-black italic">
            Initialize_Project.sh
            <span className="w-16 h-1 bg-purple-500 rounded-full" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
