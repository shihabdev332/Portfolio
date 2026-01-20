import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaCode,
  FaGithub,
  FaTerminal,
  FaLayerGroup,
  FaArrowRight,
  FaBolt,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Agency Architecture V1",
    subtitle: "High-Performance Engineering Platform",
    description:
      "A cutting-edge construction and architectural platform engineered for maximum performance. Focuses on Core Web Vitals and fluid business presentation.",
    image: "/2.png",
    link: "https://agency-weld-kappa.vercel.app/",
    code: "https://github.com/shihabdev332/Agency",
    tech: ["React 18", "Tailwind CSS", "GSAP", "Vite"],
    role: "Lead Frontend Engineer",
    outcome: "98% Lighthouse Score",
  },
  {
    id: 2,
    title: "Quantum E-Commerce",
    subtitle: "Scalable Full-Stack Retail Engine",
    description:
      "A robust retail engine built for complex state management and high-volume transactions with flicker-free cart logic.",
    image: "/e1.png",
    link: "https://online-shop-txm5.vercel.app/",
    code: "https://github.com/shihabdev332/online-Shop",
    tech: ["React", "Redux Toolkit", "Node.js", "Express"],
    role: "Full Stack Developer",
    outcome: "40% Lower Latency",
  },
  {
    id: 3,
    title: "Digital Shop Ecosystem",
    subtitle: "Secure Marketplace with Stripe",
    description:
      "End-to-end digital marketplace featuring secure payment processing and modular backend architecture for high-traffic stability.",
    image: "/client.png",
    link: "https://digital-shop-front-end-ebkb.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-Shop-Front-end",
    tech: ["MERN Stack", "JWT Auth", "Stripe API", "MongoDB"],
    role: "Backend Architect",
    outcome: "Encrypted Transaction Pipeline",
  },
  {
    id: 4,
    title: "Enterprise Command",
    subtitle: "Real-time Data Visualization",
    description:
      "Sophisticated administrative control panel for real-time inventory tracking and business intelligence with RBAC security.",
    image: "/admin.png",
    link: "https://digital-shop-admin-panel-6x1n.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-shop-admin-panel",
    tech: ["React Query", "Chart.js", "Express", "Mongoose"],
    role: "System Designer",
    outcome: "Real-time Sync Stability",
  },
];

const Work = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".work-header-content", {
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        filter: "blur(20px)",
        duration: 1.8,
        ease: "expo.out",
      });

      gsap.utils.toArray(".project-card").forEach((card) => {
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
          force3D: true,
          clearProps: "all",
        });
      });

      gsap.to(".bg-glow-work", {
        x: "30vw",
        y: "20vh",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  const handleEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      y: -20,
      borderColor: "rgba(16,185,129,0.4)",
      boxShadow: "0 30px 60px -15px rgba(0,0,0,.7)",
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.to(currentTarget.querySelector(".project-img"), {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(currentTarget.querySelector(".card-inner-glow"), {
      opacity: 1,
      duration: 0.6,
    });

    gsap.to(currentTarget.querySelector(".gsap-btn"), {
      backgroundColor: "#10b981",
      color: "#fff",
      y: -2,
      duration: 0.3,
    });
  };

  const handleLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      y: 0,
      borderColor: "rgba(255,255,255,0.05)",
      boxShadow: "none",
      duration: 0.6,
    });

    gsap.to(currentTarget.querySelector(".project-img"), {
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(currentTarget.querySelector(".card-inner-glow"), {
      opacity: 0,
      duration: 0.6,
    });

    gsap.to(currentTarget.querySelector(".gsap-btn"), {
      backgroundColor: "#fff",
      color: "#000",
      y: 0,
      duration: 0.3,
    });
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative overflow-hidden bg-[#010103] py-40 text-white"
      style={{ perspective: "2000px" }}
    >
      <div className="bg-glow-work pointer-events-none absolute left-0 top-0 -z-0 h-[500px] w-[500px] rounded-full bg-emerald-600/5 blur-[180px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="work-header mb-32 max-w-5xl">
          <div className="work-header-content">
            <div className="mb-8 flex w-fit items-center gap-3 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.7em] text-emerald-400">
              <FaTerminal className="animate-pulse" />
              portfolio.execute_case_studies()
            </div>

            <h2 className="text-5xl font-black leading-[0.8] tracking-tighter md:text-[10rem]">
              SELECTED <br />
              <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-500 bg-clip-text italic text-transparent">
                WORKS
              </span>
            </h2>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {projects.map((p) => (
            <div
              key={p.id}
              className="project-card group relative flex flex-col overflow-hidden rounded-[3.5rem] border border-white/5 bg-[#0a0a0f]/80 backdrop-blur-3xl"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="card-inner-glow pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 opacity-0 transition-opacity duration-700" />

              <div className="px-10 pt-10">
                <div className="overflow-hidden rounded-t-[2.5rem] border border-white/10 bg-[#020205] shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-8 py-5">
                    <div className="flex gap-2.5">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f57]/40" />
                      <span className="h-3 w-3 rounded-full bg-[#febc2e]/40" />
                      <span className="h-3 w-3 rounded-full bg-[#28c840]/40" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                      {p.title.toLowerCase().replace(/\s+/g, "-")}.shihab.dev
                    </span>
                    <div className="w-10" />
                  </div>

                  <div className="relative h-80 overflow-hidden md:h-[400px]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="project-img h-full w-full object-cover transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-1 flex-col p-12 md:p-14">
                <h3 className="mb-3 text-4xl font-black tracking-tighter transition-colors group-hover:text-emerald-400 md:text-5xl">
                  {p.title}
                </h3>

                <p className="mb-12 text-lg font-light leading-relaxed text-slate-400">
                  {p.description}
                </p>

                <div className="mt-auto flex gap-6">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="gsap-btn flex-[3] rounded-2xl bg-white py-6 text-xs font-black uppercase tracking-[0.3em] text-black shadow-2xl"
                  >
                    Launch Case Study <FaArrowRight />
                  </a>

                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:border-emerald-500 hover:bg-emerald-500/10"
                  >
                    <FaGithub size={26} />
                  </a>
                </div>
              </div>

              <div className="pointer-events-none absolute left-16 top-[6.5rem]">
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 backdrop-blur-2xl">
                  <FaLayerGroup /> {p.role}
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
