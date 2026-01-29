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
      "AI-driven marketplace featuring smart personalization, automated fraud detection, and scalable modular architecture for high-traffic stability and predictive growth.",
    image: "/client.png",
    link: "https://digital-store-rj52.vercel.app",
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
      "Advanced AI-driven admin panel featuring real-time predictive inventory analytics and automated business intelligence with RBAC security.",
    image: "/admin.png",
    link: "https://admin-panel-zeta-two-83.vercel.app/",
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
      // Optimized Header Animation with Stagger
      gsap.from(".work-header-content > *", {
        scrollTrigger: {
          trigger: ".work-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        stagger: 0.1, // Staggering creates a wave effect
        duration: 1.2,
        ease: "power4.out",
      });

      // Optimized Card Reveal - Aggressive Pop-up
      gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 95%", // Triggers slightly earlier for smoothness
            toggleActions: "play none none reverse",
          },
          y: 100,
          scale: 0.9, // Adds depth pop
          opacity: 0,
          duration: 1.2,
          ease: "expo.out", // Snappier easing
          force3D: true, // Hardware acceleration
          clearProps: "scale", // Cleanup to prevent blurry text
        });
      });

      // Ambient Background Motion (Reduced calculation load)
      gsap.to(".bg-glow-work", {
        x: "20vw",
        y: "10vh",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });
    },
    { scope: containerRef }
  );

  // Performance Optimized Hover Handlers
  const handleEnter = ({ currentTarget }) => {
    // Aggressive Lift
    gsap.to(currentTarget, {
      y: -15,
      scale: 1.02,
      borderColor: "rgba(16,185,129,0.5)",
      boxShadow: "0 25px 50px -12px rgba(16,185,129,0.15)",
      duration: 0.4,
      ease: "back.out(1.7)", // Aggressive bounce effect
      overwrite: "auto", // Prevents conflict
      force3D: true,
    });

    // Image Zoom
    gsap.to(currentTarget.querySelector(".project-img"), {
      scale: 1.15,
      rotate: -2,
      duration: 0.8,
      ease: "expo.out",
      overwrite: "auto",
    });

    // Inner Glow
    gsap.to(currentTarget.querySelector(".card-inner-glow"), {
      opacity: 0.6,
      duration: 0.4,
      overwrite: "auto",
    });

    // Button Activation
    gsap.to(currentTarget.querySelector(".gsap-btn"), {
      backgroundColor: "#10b981",
      color: "#fff",
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLeave = ({ currentTarget }) => {
    // Reset to Neutral
    gsap.to(currentTarget, {
      y: 0,
      scale: 1,
      borderColor: "rgba(255,255,255,0.05)",
      boxShadow: "none",
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
      force3D: true,
    });

    // Image Reset
    gsap.to(currentTarget.querySelector(".project-img"), {
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Glow Reset
    gsap.to(currentTarget.querySelector(".card-inner-glow"), {
      opacity: 0,
      duration: 0.5,
      overwrite: "auto",
    });

    // Button Reset
    gsap.to(currentTarget.querySelector(".gsap-btn"), {
      backgroundColor: "#fff",
      color: "#000",
      scale: 1,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative overflow-hidden bg-[#010103] py-40 text-white will-change-transform"
      style={{ perspective: "2000px" }}
    >
      {/* Background Glow - Optimized Filter */}
      <div className="bg-glow-work pointer-events-none absolute left-0 top-0 -z-0 h-[600px] w-[600px] rounded-full bg-emerald-600/5 blur-[100px] will-change-transform" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="work-header mb-32 max-w-5xl">
          <div className="work-header-content flex flex-col items-start">
            <div className="mb-8 flex w-fit items-center gap-3 rounded-full border border-emerald-400/10 bg-emerald-400/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.7em] text-emerald-400 backdrop-blur-md">
              <FaTerminal className="animate-pulse" />
              portfolio.execute_case_studies()
            </div>

            <h2 className="text-5xl font-black leading-[0.8] tracking-tighter md:text-[10rem] drop-shadow-2xl">
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
              className="project-card group relative flex flex-col overflow-hidden rounded-[3rem] border border-white/5 bg-[#0a0a0f] backdrop-blur-xl will-change-transform"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Optimized Inner Glow */}
              <div className="card-inner-glow pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 transition-opacity duration-700" />

              <div className="px-8 pt-8 md:px-10 md:pt-10">
                <div className="relative overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#020205] shadow-2xl">
                  {/* Browser Header */}
                  <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-4 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 opacity-70">
                      {p.title.toLowerCase().split(' ')[0]}.shihab.dev
                    </span>
                    <div className="w-8" />
                  </div>

                  {/* Image Container - Hardware Accelerated */}
                  <div className="relative h-72 overflow-hidden md:h-[380px]">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="project-img h-full w-full object-cover will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-1 flex-col p-10 md:p-12">
                <h3 className="mb-4 text-3xl font-black tracking-tighter text-white transition-colors duration-300 group-hover:text-emerald-400 md:text-5xl">
                  {p.title}
                </h3>

                <p className="mb-10 text-base font-light leading-relaxed text-slate-400 md:text-lg">
                  {p.description}
                </p>

                <div className="mt-auto flex gap-4 md:gap-6">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="gsap-btn flex flex-[3] items-center justify-center gap-3 rounded-xl bg-white py-5 text-[10px] font-black uppercase tracking-[0.25em] text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
                  >
                    View Project <FaArrowRight />
                  </a>

                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-400"
                  >
                    <FaGithub size={22} />
                  </a>
                </div>
              </div>

              {/* Floating Role Badge */}
              <div className="pointer-events-none absolute left-14 top-[6.5rem] z-20 md:top-[7.5rem]">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-400 backdrop-blur-xl shadow-lg">
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
