import React from "react";
import { motion } from "framer-motion";
import { 
  FaExternalLinkAlt, FaCode, FaGithub, FaTerminal, 
  FaDatabase, FaLayerGroup, FaArrowRight, FaBolt 
} from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Agency Architecture V1",
    subtitle: "High-Performance Engineering Platform",
    description: "A cutting-edge construction and architectural platform engineered for maximum performance. This project focuses heavily on Core Web Vitals, ensuring near-instant load times and fluid transitions for premium business presentation.",
    image: "/2.png",
    link: "https://agency-weld-kappa.vercel.app/",
    code: "https://github.com/shihabdev332/Agency",
    tech: ["React 18", "Tailwind CSS", "Framer Motion", "Vite"],
    role: "Lead Frontend Engineer",
    outcome: "98% Lighthouse Score & Sub-2s Loading"
  },
  {
    id: 2,
    title: "Quantum E-Commerce",
    subtitle: "Scalable Full-Stack Retail Engine",
    description: "A robust e-commerce solution built to handle complex state management and high-volume transactions. Featuring a custom 'flicker-free' cart logic and dynamic server-side filtering to provide a seamless shopping experience.",
    image: "/e1.png",
    link: "https://online-shop-txm5.vercel.app/",
    code: "https://github.com/shihabdev332/online-Shop",
    tech: ["React", "Redux Toolkit", "Node.js", "Express"],
    role: "Full Stack Developer",
    outcome: "Reduced checkout latency by 40%"
  },
  {
    id: 3,
    title: "Digital Shop Ecosystem",
    subtitle: "Secure Marketplace with Stripe Integration",
    description: "An end-to-end digital marketplace ecosystem featuring secure payment processing and modular backend architecture. Designed to scale across multiple product categories with high-traffic stability and data integrity.",
    image: "/client.png",
    link: "https://digital-shop-front-end-ebkb.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-Shop-Front-end",
    tech: ["MERN Stack", "JWT Auth", "Stripe API", "MongoDB"],
    role: "Backend Architect",
    outcome: "256-bit Encrypted Transaction Pipeline"
  },
  {
    id: 4,
    title: "Enterprise Command Center",
    subtitle: "Real-time Data Visualization Dashboard",
    description: "A sophisticated administrative control panel designed for real-time inventory tracking and business intelligence. Implements Role-Based Access Control (RBAC) and interactive data charting for enterprise-level management.",
    image: "/admin.png",
    link: "https://digital-shop-admin-panel-6x1n.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-shop-admin-panel",
    tech: ["React Query", "Chart.js", "Express", "Mongoose"],
    role: "System Designer",
    outcome: "Real-time Monitoring & Sync Stability"
  },
];

const Work = () => {
  return (
    <section id="work" className="py-28 bg-[#020203] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-emerald-500 font-mono text-xs tracking-[0.5em] mb-6 uppercase"
          >
            <FaTerminal className="animate-pulse" /> System.log / Portfolio_Projects
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-tight">
            CASE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-500 to-blue-600 italic">STUDIES</span>
          </h2>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex flex-col bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/40 transition-all duration-700 shadow-2xl"
            >
              {/* VS Code / MacBook Display Vibe */}
              <div className="px-6 pt-6">
                <div className="bg-[#16161e] rounded-t-2xl border-t border-x border-white/10 overflow-hidden shadow-2xl">
                  {/* Mac Buttons & Tab Bar */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#1a1b26] border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-[#24283b] px-3 py-1 rounded-md border border-white/5">
                      <FaCode size={10} className="text-blue-400" />
                      <span className="text-[10px] font-mono text-slate-400">
                        {project.title.replace(/\s+/g, '_').toLowerCase()}.jsx
                      </span>
                    </div>
                    <div className="w-12" /> {/* Spacer */}
                  </div>
                  
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-10 relative z-10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-4xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sky-500 font-mono text-[10px] uppercase tracking-[0.2em] mt-1">{project.subtitle}</p>
                  </div>
                  <span className="font-mono text-[10px] text-slate-600 pt-2 tracking-widest">PROJ_00{project.id}</span>
                </div>

                <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium">
                  {project.description}
                </p>

                {/* Technical Specs Dashboard */}
                <div className="grid grid-cols-2 gap-6 mb-10 p-6 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm">
                  <div>
                    <h4 className="text-[10px] font-mono text-emerald-500 mb-3 uppercase tracking-tighter flex items-center gap-2">
                      <FaCode size={12}/> Technical Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] text-slate-300 bg-white/5 px-2 py-1 rounded-md">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-sky-500 mb-3 uppercase tracking-tighter flex items-center gap-2">
                      <FaBolt size={12}/> Business Outcome
                    </h4>
                    <p className="text-[11px] text-slate-300 font-medium leading-tight">{project.outcome}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.link} 
                    target="_blank"
                    className="flex-[2] bg-white text-black font-black text-xs tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 hover:text-white transition-all duration-500"
                  >
                    LIVE_INTERFACE <FaArrowRight size={12} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05, border: "1px solid #10b981" }}
                    href={project.code} 
                    target="_blank"
                    className="flex-1 bg-[#11111a] text-white border border-white/10 rounded-2xl flex items-center justify-center hover:text-emerald-500 transition-all"
                  >
                    <FaGithub size={24} />
                  </motion.a>
                </div>
              </div>

              {/* Role Badge - Floating */}
              <div className="absolute top-[4.5rem] left-10 z-20">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 text-[10px] font-mono text-emerald-400 tracking-wider">
                  <FaLayerGroup size={12} /> {project.role}
                </div>
              </div>

              {/* Animated Progress Line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-500 group-hover:w-full transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
