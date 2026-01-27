import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import { FiCpu, FiTerminal, FiGlobe } from "react-icons/fi";

const Footer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="relative bg-[#050508] pt-20 pb-10 overflow-hidden border-t border-white/5"
    >
      {/* --- BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-purple-600/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand/Identity Section (Column 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 text-white font-black text-2xl tracking-tighter">
               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-sky-500 rounded-xl flex items-center justify-center text-black">
                  <FiTerminal size={20} />
               </div>
               SHIHAB_DEV<span className="text-purple-500">.</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Engineering high-performance digital experiences with a focus on clean architecture, 
              fluid animations, and scalable full-stack solutions.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaGithub />, link: "https://github.com/shihabdev332" },
                { icon: <FaLinkedin />, link: "#" },
                { icon: <FaTwitter />, link: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  whileHover={{ y: -3, color: "#a855f7" }}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Terminal (Column 6-9) */}
          <div className="lg:col-span-4">
            <h3 className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <FiGlobe /> System_Navigation
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {[
                { name: "Root/Home", href: "#home" },
                { name: "Dev/About", href: "#about" },
                { name: "Bin/Work", href: "#work" },
                { name: "Src/Contact", href: "#contact" },
                { name: "Log/Blog", href: "#" },
                { name: "Etc/Resume", href: "#" }
              ].map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Status Section (Column 10-12) */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-mono text-sky-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <FiCpu /> Core_Status
            </h3>
            <div className="space-y-4">
               <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-slate-500 font-mono">AVAILABILITY</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-white text-xs font-bold uppercase tracking-widest">Open for Projects</p>
               </div>
               <button 
                  onClick={scrollToTop}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
               >
                  BACK_TO_TOP <FaArrowUp size={10} />
               </button>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
            © {currentYear} SHIHAB_DEV // ALL_SYSTEMS_OPERATIONAL
          </div>
          <div className="flex gap-8 text-[10px] font-mono text-slate-600 uppercase tracking-tighter">
            <span>Lat: 23.8103° N</span>
            <span>Long: 90.4125° E</span>
            <span className="text-purple-500/50 italic">Designed with precision</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
