import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt,FaCode, FaGithub, FaTerminal, FaDatabase, FaLayerGroup } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Agency Architecture V1",
    description: "Built a high-performance construction platform focusing on Core Web Vitals. Implemented custom hooks for fluid project transitions and optimized image delivery systems.",
    image: "/2.png",
    link: "https://agency-weld-kappa.vercel.app/",
    code: "https://github.com/shihabdev332/Agency",
    tech: ["React 18", "Tailwind CSS", "Framer Motion", "Vite"],
    role: "Lead Frontend Engineer",
    outcome: "98% Lighthouse Performance Score"
  },
  {
    id: 2,
    title: "Quantum E-Commerce",
    description: "Engineered a scalable retail engine with complex state management. Features a 'flicker-free' cart system and dynamic product filtering via custom Redux logic.",
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
    description: "Developed a secure marketplace with integrated Stripe payments. Orchestrated a modular backend architecture to support high-traffic product listings.",
    image: "/client.png",
    link: "https://digital-shop-front-end-ebkb.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-Shop-Front-end",
    tech: ["MERN Stack", "JWT Auth", "Stripe API", "MongoDB"],
    role: "Backend Architect",
    outcome: "Secure 256-bit Encrypted Transactions"
  },
  {
    id: 4,
    title: "Enterprise Command Center",
    description: "Designed a data-rich administrative dashboard for inventory tracking. Features real-time data visualization and role-based access control (RBAC).",
    image: "/admin.png",
    link: "https://digital-shop-admin-panel-6x1n.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-shop-admin-panel",
    tech: ["React Query", "Chart.js", "Express", "Mongoose"],
    role: "System Designer",
    outcome: "Real-time Monitoring & Data Sync"
  },
];

const Work = () => {
  return (
    <section id="work" className="py-24 bg-[#020203] text-white">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="max-w-4xl mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-emerald-500 font-mono text-[10px] tracking-[0.4em] mb-4 uppercase"
          >
            <FaTerminal /> System.log / Portfolio_Projects
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight">
            CASE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 italic">STUDIES</span>
          </h2>
        </div>

        {/* 2-Column Grid for Large Screens, 1-Column for Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative flex flex-col bg-[#08080c] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500 shadow-2xl"
            >
              {/* Image Section */}
              <div className="relative h-72 w-full overflow-hidden border-b border-white/5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent opacity-90" />
                
                {/* Visual Engineering Tags */}
                <div className="absolute bottom-4 left-6 flex gap-3">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-emerald-400">
                    <FaLayerGroup size={10} /> {project.role}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[9px] text-slate-500 pt-2 tracking-widest">PROJ_00{project.id}</span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium italic">
                  "{project.description}"
                </p>

                {/* Technical Specs Sidebar Style */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <div>
                    <h4 className="text-[10px] font-mono text-emerald-500 mb-2 uppercase tracking-tighter flex items-center gap-2">
                      <FaCode size={10}/> Stack
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="text-[9px] text-slate-400">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-sky-500 mb-2 uppercase tracking-tighter flex items-center gap-2">
                      <FaDatabase size={10}/> Outcome
                    </h4>
                    <p className="text-[9px] text-slate-400">{project.outcome}</p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-auto flex gap-4">
                  <motion.a 
                    whileTap={{ scale: 0.95 }}
                    href={project.link} 
                    target="_blank"
                    className="flex-1 bg-white text-black font-black text-[11px] tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                  >
                    LIVE_INTERFACE <FaExternalLinkAlt size={10} />
                  </motion.a>
                  <motion.a 
                    whileTap={{ scale: 0.95 }}
                    href={project.code} 
                    target="_blank"
                    className="px-6 bg-[#11111a] text-white border border-white/10 rounded-xl flex items-center justify-center hover:border-emerald-500 transition-all"
                  >
                    <FaGithub size={18} />
                  </motion.a>
                </div>
              </div>

              {/* Decorative Scanline */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
