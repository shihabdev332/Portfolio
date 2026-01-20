import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  FaCode, FaGithub, FaTerminal, 
  FaLayerGroup, FaArrowRight, FaBolt 
} from "react-icons/fa";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Agency Architecture V1",
    subtitle: "High-Performance Engineering Platform",
    description: "A cutting-edge construction and architectural platform engineered for maximum performance. Focuses on Core Web Vitals and fluid business presentation.",
    image: "/2.png",
    link: "https://agency-weld-kappa.vercel.app/",
    code: "https://github.com/shihabdev332/Agency",
    tech: ["React 18", "Tailwind CSS", "GSAP", "Vite"],
    role: "Lead Frontend Engineer",
    outcome: "98% Lighthouse Score"
  },
  {
    id: 2,
    title: "Quantum E-Commerce",
    subtitle: "Scalable Full-Stack Retail Engine",
    description: "A robust retail engine built for complex state management and high-volume transactions with flicker-free cart logic.",
    image: "/e1.png",
    link: "https://online-shop-txm5.vercel.app/",
    code: "https://github.com/shihabdev332/online-Shop",
    tech: ["React", "Redux Toolkit", "Node.js", "Express"],
    role: "Full Stack Developer",
    outcome: "40% Lower Latency"
  },
  {
    id: 3,
    title: "Digital Shop Ecosystem",
    subtitle: "Secure Marketplace with Stripe",
    description: "End-to-end digital marketplace featuring secure payment processing and modular backend architecture for high-traffic stability.",
    image: "/client.png",
    link: "https://digital-shop-front-end-ebkb.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-Shop-Front-end",
    tech: ["MERN Stack", "JWT Auth", "Stripe API", "MongoDB"],
    role: "Backend Architect",
    outcome: "Encrypted Transaction Pipeline"
  },
  {
    id: 4,
    title: "Enterprise Command",
    subtitle: "Real-time Data Visualization",
    description: "Sophisticated administrative control panel for real-time inventory tracking and business intelligence with RBAC security.",
    image: "/admin.png",
    link: "https://digital-shop-admin-panel-6x1n.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-shop-admin-panel",
    tech: ["React Query", "Chart.js", "Express", "Mongoose"],
    role: "System Designer",
    outcome: "Real-time Sync Stability"
  },
];

const Work = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Header Luxury Entrance
    gsap.from(".work-header", {
      scrollTrigger: {
        trigger: ".work-header",
        start: "top 90%",
        toggleActions: "restart pause resume reverse"
      },
      opacity: 0,
      y: 50,
      filter: "blur(15px)",
      duration: 1.5,
      ease: "expo.out"
    });

    // 2. Project Cards staggered scroll animation
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "restart none none reverse",
        },
        y: 100,
        rotateX: -15,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power4.out",
        delay: i % 2 === 0 ? 0 : 0.1
      });
    });

    // 3. Background Glow pulse
    gsap.to(".bg-glow-work", {
      scale: 1.3,
      opacity: 0.6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  // Hover animations
  const onMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".project-img");
    const overlay = card.querySelector(".hover-overlay");
    const btn = card.querySelector(".gsap-btn");

    gsap.to(card, { y: -15, borderColor: "rgba(52, 211, 153, 0.3)", duration: 0.4 });
    gsap.to(img, { scale: 1.15, duration: 1.2, ease: "power2.out" });
    gsap.to(overlay, { opacity: 1, duration: 0.4 });
    gsap.to(btn, { backgroundColor: "#10b981", color: "#fff", scale: 1.05, duration: 0.3 });
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".project-img");
    const overlay = card.querySelector(".hover-overlay");
    const btn = card.querySelector(".gsap-btn");

    gsap.to(card, { y: 0, borderColor: "rgba(255, 255, 255, 0.05)", duration: 0.4 });
    gsap.to(img, { scale: 1, duration: 1.2, ease: "power2.out" });
    gsap.to(overlay, { opacity: 0, duration: 0.4 });
    gsap.to(btn, { backgroundColor: "#fff", color: "#000", scale: 1, duration: 0.3 });
  };

  return (
    <section id="work" ref={containerRef} className="py-32 bg-[#020203] text-white overflow-hidden" style={{ perspective: "1200px" }}>
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="work-header max-w-5xl mb-28 relative">
          <div className="flex items-center gap-3 text-emerald-500 font-mono text-[10px] tracking-[0.6em] mb-6 uppercase">
            <FaTerminal className="animate-pulse" /> portfolio.fetch_all_cases()
          </div>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9]">
            SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-600 italic">WORKS</span>
          </h2>
          <div className="bg-glow-work absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[150px] -z-10" />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative flex flex-col bg-[#08080c] border border-white/5 rounded-[3rem] overflow-hidden transition-colors duration-500"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {/* Browser Interface Decoration */}
              <div className="px-8 pt-8">
                <div className="relative rounded-t-[2rem] border-t border-x border-white/10 overflow-hidden shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between px-6 py-4 bg-[#11111a] border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest italic">
                      {project.title.toLowerCase().replace(" ", "-")}.dev
                    </span>
                    <div className="w-8" />
                  </div>
                  
                  {/* Image with Hover Overlay */}
                  <div className="relative h-72 md:h-80 w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-img w-full h-full object-cover transition-all"
                    />
                    <div className="hover-overlay absolute inset-0 bg-emerald-950/20 opacity-0 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Text Content Area */}
              <div className="p-10 md:p-12 relative z-10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-4xl font-bold tracking-tight text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sky-400 font-mono text-[10px] uppercase tracking-[0.3em] font-semibold">{project.subtitle}</p>
                  </div>
                  <span className="font-mono text-[9px] text-slate-700 pt-2 tracking-widest uppercase">Release v1.0</span>
                </div>

                <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                  {project.description}
                </p>

                {/* Dashboard-style Specs */}
                <div className="grid grid-cols-2 gap-8 mb-12 p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md">
                  <div>
                    <h4 className="text-[10px] font-mono text-emerald-500 mb-4 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                      <FaCode /> Technology
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[9px] font-bold text-slate-300 bg-white/5 px-2 py-1 rounded-md border border-white/5 italic">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-sky-500 mb-4 uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                      <FaBolt /> Impact
                    </h4>
                    <p className="text-[11px] text-slate-200 font-bold leading-tight tracking-wide">{project.outcome}</p>
                  </div>
                </div>

                {/* Interaction Row */}
                <div className="mt-auto flex gap-5">
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noreferrer"
                    className="gsap-btn flex-[2.5] bg-white text-black font-black text-[11px] tracking-[0.25em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 uppercase"
                  >
                    View Project <FaArrowRight size={10} />
                  </a>
                  <a 
                    href={project.code} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-white/5 text-white border border-white/10 rounded-2xl flex items-center justify-center hover:border-emerald-500 hover:text-emerald-500 transition-all duration-300"
                  >
                    <FaGithub size={22} />
                  </a>
                </div>
              </div>

              {/* Floating Role Badge */}
              <div className="absolute top-[5.5rem] left-14 z-20">
                <div className="flex items-center gap-2 bg-emerald-500/10 backdrop-blur-2xl px-5 py-2 rounded-full border border-emerald-500/20 text-[9px] font-bold text-emerald-400 tracking-[0.15em] uppercase shadow-xl">
                  <FaLayerGroup size={10} /> {project.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;