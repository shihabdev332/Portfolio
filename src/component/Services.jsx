import React, { useRef } from "react";
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

const services = [
  { icon: <RiProfileLine />, title: "Portfolio Development", stack: "GSAP / React / Three.js", desc: "Performance-optimized personal brands built with premium motion physics." },
  { icon: <LiaPagerSolid />, title: "Landing Pages", stack: "Tailwind / Framer / Vite", desc: "High-converting single-page applications with scroll-triggered engagement." },
  { icon: <HiUserGroup />, title: "Agency Solutions", stack: "Next.js / TypeScript", desc: "Scalable professional architectures that establish market authority." },
  { icon: <HiOutlineServer />, title: "Full-Stack MERN", stack: "Node / Express / Mongo", desc: "End-to-end applications with modular server logic and database clusters." },
  { icon: <SiMongodb />, title: "RESTful Backend", stack: "Redis / Mongoose / API", desc: "Complex API design focusing on low latency and high availability." },
  { icon: <HiOutlineShieldCheck />, title: "Security & Auth", stack: "JWT / OAuth / bcrypt", desc: "Identity management with role-based access control (RBAC) protocols." },
  { icon: <MdProductionQuantityLimits />, title: "E-commerce UI", stack: "Redux / Stripe / CMS", desc: "Seamless shopping flows with state-managed carts and secure payments." },
  { icon: <SiFigma />, title: "Figma to React", stack: "Design Tokens / Clean Code", desc: "Precise translation of design tokens into reusable Tailwind components." },
  { icon: <PiBaseballHelmetDuotone />, title: "Corporate Systems", stack: "Dashboard / Chart.js", desc: "Internal tools and corporate portals with robust data visualization." },
];

const Services = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Background streams
    gsap.to(".code-stream-up", { y: -500, duration: 40, repeat: -1, ease: "none" });
    gsap.to(".code-stream-down", { y: 500, duration: 35, repeat: -1, ease: "none" });

    // Header Animation
    gsap.from(".srv-header-item", {
      scrollTrigger: {
        trigger: ".services-header",
        start: "top 90%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // Grid Cards Animation (Fixing the blank issue)
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 85%", // Trigger earlier
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      scale: 0.9,
      stagger: 0.1,
      duration: 1,
      ease: "expo.out",
      clearProps: "all" // এনিমেশন শেষ হলে সব প্রপার্টি ক্লিন করবে যাতে হোভার ইফেক্ট কাজ করে
    });
  }, { scope: containerRef });

  const onEnter = (e) => {
    const card = e.currentTarget;
    gsap.to(card, { borderColor: "rgba(168, 85, 247, 0.4)", y: -10, duration: 0.4 });
    gsap.to(card.querySelector(".icon-box"), { rotateY: 180, backgroundColor: "#a855f7", color: "#fff", duration: 0.5 });
    gsap.to(card.querySelector(".glow-layer"), { opacity: 1, scale: 1.5, duration: 0.5 });
  };

  const onLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, { borderColor: "rgba(255, 255, 255, 0.05)", y: 0, duration: 0.4 });
    gsap.to(card.querySelector(".icon-box"), { rotateY: 0, backgroundColor: "rgba(255, 255, 255, 0.03)", color: "#a855f7", duration: 0.5 });
    gsap.to(card.querySelector(".glow-layer"), { opacity: 0, scale: 1, duration: 0.5 });
  };

  return (
    <section id="services" ref={containerRef} className="relative py-32 overflow-hidden bg-[#020203]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="absolute inset-0 opacity-[0.05] flex justify-between px-16 overflow-hidden">
          <div className="code-stream-up flex flex-col gap-20 font-mono text-[9px] text-purple-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
          <div className="code-stream-down hidden md:flex flex-col gap-20 font-mono text-[9px] text-emerald-500/40">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="services-header max-w-4xl mb-24">
          <div className="srv-header-item inline-block mb-6 font-mono text-[10px] text-purple-400 bg-purple-400/5 px-4 py-1.5 border border-purple-400/20 rounded-full uppercase tracking-[0.3em]">
            System.Services_Overview
          </div>
          <h2 className="srv-header-item text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
            ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-sky-400 to-emerald-400 italic">SOLUTIONS</span>
          </h2>
          <p className="srv-header-item text-gray-400 text-lg md:text-2xl font-light max-w-2xl leading-relaxed">
            I architect high-performance digital environments where luxury design meets technical excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, i) => (
            <div
              key={i}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              className="service-card group relative p-10 rounded-3xl bg-[#08080c]/80 border border-white/5 backdrop-blur-xl overflow-hidden cursor-pointer"
            >
              <div className="glow-layer absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 blur-[80px] opacity-0 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="icon-box w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl text-purple-400 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-1">Index</p>
                    <p className="text-sm font-bold text-white/20 group-hover:text-purple-500 transition-colors italic">0{i + 1}</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>

                <div className="pt-6 border-t border-white/5">
                  <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-2">Technical Stack</p>
                  <p className="text-[11px] text-sky-400/80 font-medium">{item.stack}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-sky-500 w-0 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center p-12 rounded-[40px] bg-white/[0.02] border border-white/5">
          <h4 className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em] mb-6">Ready to scale your next project?</h4>
          <a href="#contact" className="group relative inline-flex items-center gap-4 text-white text-2xl font-black italic tracking-tighter">
            <span className="relative z-10 group-hover:pr-4 transition-all uppercase">Initialize_Collaboration.exe</span>
            <span className="w-12 h-0.5 bg-purple-500 group-hover:w-24 transition-all" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;