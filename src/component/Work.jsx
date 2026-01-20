import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  FaCode, FaGithub, FaTerminal, 
  FaLayerGroup, FaArrowRight, FaBolt 
} from "react-icons/fa";

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
    gsap.from(".work-header-content", {
      scrollTrigger: {
        trigger: ".work-header",
        start: "top 85%",
      },
      opacity: 0,
      y: 60,
      filter: "blur(20px)",
      duration: 1.8,
      ease: "expo.out"
    });

    // 2. Project Cards staggered 3D entrance
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        rotateX: -10,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        clearProps: "all",
        force3D: true
      });
    });

    // 3. Persistent Background Glow Movement
    gsap.to(".bg-glow-work", {
      x: "30vw",
      y: "20vh",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  const onMouseEnter = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".project-img");
    const glow = card.querySelector(".card-inner-glow");
    const btn = card.querySelector(".gsap-btn");

    gsap.to(card, { 
      y: -20, 
      borderColor: "rgba(16, 185, 129, 0.4)", 
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.7)",
      duration: 0.6, 
      ease: "power3.out" 
    });
    gsap.to(img, { scale: 1.1, duration: 1.5, ease: "power2.out" });
    gsap.to(glow, { opacity: 1, duration: 0.6 });
    gsap.to(btn, { backgroundColor: "#10b981", color: "#fff", y: -2, duration: 0.3 });
  };

  const onMouseLeave = (e) => {
    const card = e.currentTarget;
    const img = card.querySelector(".project-img");
    const glow = card.querySelector(".card-inner-glow");
    const btn = card.querySelector(".gsap-btn");

    gsap.to(card, { y: 0, borderColor: "rgba(255, 255, 255, 0.05)", boxShadow: "none", duration: 0.6 });
    gsap.to(img, { scale: 1, duration: 1.5, ease: "power2.out" });
    gsap.to(glow, { opacity: 0, duration: 0.6 });
    gsap.to(btn, { backgroundColor: "#fff", color: "#000", y: 0, duration: 0.3 });
  };

  return (
    <section id="work" ref={containerRef} className="py-40 bg-[#010103] text-white overflow-hidden relative" style={{ perspective: "2000px" }}>
      
      {/* Background Ambience */}
      <div className="bg-glow-work absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[180px] -z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="work-header max-w-5xl mb-32">
          <div className="work-header-content">
            <div className="flex items-center gap-3 text-emerald-400 font-mono text-[10px] tracking-[0.7em] mb-8 uppercase bg-emerald-400/5 w-fit px-4 py-2 rounded-full border border-emerald-400/10">
              <FaTerminal className="animate-pulse" /> portfolio.execute_case_studies()
            </div>
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-6">
              SELECTED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 italic">WORKS</span>
            </h2>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative flex flex-col bg-[#0a0a0f]/80 border border-white/5 rounded-[3.5rem] overflow-hidden backdrop-blur-3xl transition-all"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Internal Dynamic Glow */}
              <div className="card-inner-glow absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 pointer-events-none transition-opacity duration-700" />

              {/* Browser-Like Top Bar */}
              <div className="px-10 pt-10">
                <div className="relative rounded-t-[2.5rem] border-t border-x border-white/10 overflow-hidden shadow-2xl bg-[#020205]">
                  <div className="flex items-center justify-between px-8 py-5 bg-white/[0.03] border-b border-white/5">
                    <div className="flex gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]/40" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]/40" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]/40" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-medium">
                      {project.title.toLowerCase().replace(/\s+/g, "-")}.shihab.dev
                    </span>
                    <div className="w-10" />
                  </div>
                  
                  {/* Image Container */}
                  <div className="relative h-80 md:h-[400px] w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-img w-full h-full object-cover transition-all duration-1000 will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-12 md:p-14 relative z-10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3 group-hover:text-emerald-400 transition-colors duration-500">
                      {project.title}
                    </h3>
                    <p className="text-sky-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">{project.subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-lg leading-relaxed mb-12 font-light">
                  {project.description}
                </p>

                {/* Performance Metrics & Tech */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem] backdrop-blur-xl group-hover:bg-white/[0.03] transition-all duration-500">
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-3 font-black">
                      <FaCode className="text-sm" /> Stack_Configuration
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-bold text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-5">
                    <h4 className="text-[10px] font-mono text-sky-400 uppercase tracking-[0.3em] flex items-center gap-3 font-black">
                      <FaBolt className="text-sm" /> Optimization_Result
                    </h4>
                    <p className="text-sm text-slate-100 font-bold tracking-wide italic leading-snug">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-6">
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noreferrer"
                    className="gsap-btn flex-[3] bg-white text-black font-black text-xs tracking-[0.3em] py-6 rounded-2xl flex items-center justify-center gap-4 transition-all duration-500 uppercase shadow-2xl"
                  >
                    Launch Case Study <FaArrowRight size={12} />
                  </a>
                  <a 
                    href={project.code} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-white/5 text-white border border-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-500/10 hover:border-emerald-500 transition-all duration-500 group/git"
                  >
                    <FaGithub size={26} className="group-hover/git:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-[6.5rem] left-16 z-20 pointer-events-none">
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-2xl px-6 py-2.5 rounded-full border border-white/10 text-[10px] font-black text-emerald-400 tracking-[0.2em] uppercase shadow-2xl">
                  <FaLayerGroup className="text-xs" /> {project.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .project-card {
          will-change: transform, border-color;
        }
        .project-img {
          filter: saturate(0.8) contrast(1.1);
        }
        .group:hover .project-img {
          filter: saturate(1) contrast(1);
        }
      `}</style>
    </section>
  );
};

export default Work;