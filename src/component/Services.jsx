import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

const codeSnippets = [
  "service.init({ mode: 'production' })",
  "const UI = new Framework('React')",
  "Database.connect(cluster0)",
  "Auth.verify(JWT_SECRET)",
  "SEO.optimize({ speed: '100ms' })",
];

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const services = [
    { icon: <RiProfileLine />, title: "Portfolio Development", tag: "FRONTEND", desc: "Performance-optimized personal brands built with React & Framer Motion." },
    { icon: <LiaPagerSolid />, title: "Landing Pages", tag: "CONVERSION", desc: "High-converting single-page applications with scroll-triggered engagement." },
    { icon: <HiUserGroup />, title: "Agency Solutions", tag: "BUSINESS", desc: "Scalable professional architectures that establish market authority." },
    { icon: <HiOutlineServer />, title: "Full-Stack MERN", tag: "ARCHITECT", desc: "End-to-end applications with modular Node logic and MongoDB clusters." },
    { icon: <SiMongodb />, title: "RESTful Backend", tag: "DATABASE", desc: "Complex API design focusing on low latency and high availability." },
    { icon: <HiOutlineShieldCheck />, title: "Security & Auth", tag: "SECURITY", desc: "JWT-based identity management and role-based access control (RBAC)." },
    { icon: <MdProductionQuantityLimits />, title: "E-commerce UI", tag: "PRODUCT", desc: "Seamless shopping flows with state-managed carts and admin dashboards." },
    { icon: <SiFigma />, title: "Figma to React", tag: "UI/UX", desc: "Precise translation of design tokens into reusable Tailwind components." },
    { icon: <PiBaseballHelmetDuotone />, title: "Corporate Systems", tag: "ENTERPRISE", desc: "Internal tools and corporate portals with robust data visualization." },
  ];

  return (
    <section id="services" ref={ref} className="relative py-28 overflow-hidden bg-[#020203]">
      
      {/* --- INFRASTRUCTURE BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        {/* Floating Code Strings */}
        <div className="absolute inset-0 opacity-[0.08] flex justify-between px-12">
           <motion.div animate={{ y: [0, -400] }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="flex flex-col gap-16 font-mono text-[9px] text-purple-400">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </motion.div>
          <motion.div animate={{ y: [-400, 0] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="hidden md:flex flex-col gap-16 font-mono text-[9px] text-emerald-400">
            {[...codeSnippets, ...codeSnippets].map((s, i) => <span key={i}>{s}</span>)}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="inline-block mb-4 font-mono text-[10px] text-purple-400 bg-purple-400/10 px-3 py-1 border border-purple-400/20 rounded uppercase tracking-widest"
          >
            Capabilities.list_active()
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 italic">SOLUTIONS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-gray-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed"
          >
            Building high-performance modules designed for massive scale and perfect user interaction.
          </motion.p>
        </div>

        {/* Services Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-8 rounded-2xl bg-[#08080c] border border-white/5 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Animated Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500 rounded-full blur-xl" />
              
              {/* Header: Icon + Tag */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-inner">
                  {service.icon}
                </div>
                <span className="font-mono text-[9px] text-slate-500 group-hover:text-purple-400 tracking-[0.2em] pt-1">
                  {service.tag}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-sky-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {service.description || service.desc}
              </p>

              {/* Decorative "Status" bar */}
              <div className="mt-6 flex items-center gap-2">
                 <div className="h-[2px] w-8 bg-purple-500/50 group-hover:w-full transition-all duration-700" />
                 <span className="opacity-0 group-hover:opacity-100 font-mono text-[8px] text-purple-400 transition-opacity">READY</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center py-10 border-t border-white/5"
        >
          <p className="font-mono text-xs text-slate-600 uppercase tracking-[0.3em] mb-4">Need a custom stack built?</p>
          <a href="#contact" className="text-white hover:text-purple-400 font-bold text-lg underline underline-offset-8 decoration-purple-500 transition-colors">
            Initialize New Project →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
