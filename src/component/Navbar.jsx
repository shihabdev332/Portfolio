import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose, IoHomeOutline } from "react-icons/io5";
import { Link } from "react-scroll";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { id: 1, text: "ABOUT", to: "about" },
    { id: 2, text: "SERVICES", to: "services" },
    { id: 3, text: "WORK", to: "work" },
    { id: 4, text: "CONTACT", to: "contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "bg-[#0a0a0c]/90 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl" : "bg-transparent py-7"
    }`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* --- LOGO / HOME --- */}
        <Link to="home" smooth={true} duration={500} className="cursor-pointer group flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <IoHomeOutline size={20} className="text-white" />
          </motion.div>
          <div className="text-xl lg:text-2xl font-black tracking-tighter">
            <span className="text-white">PRO</span>
            <span className="text-purple-500 italic">CODER</span>
          </div>
        </Link>

        {/* --- DESKTOP NAV WITH AUTO-FIX UNDERLINE --- */}
        <ul className="hidden md:flex items-center gap-10">
          {items.map(({ id, text, to }) => (
            <li key={id} className="relative">
              <Link
                to={to}
                smooth={true}
                spy={true} 
                offset={-100} 
                duration={500}
                activeClass="nav-active" 
                className="text-[11px] font-mono font-bold tracking-[0.3em] text-slate-400 hover:text-white cursor-pointer transition-all py-2 block"
              >
                {text}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 underline-indicator" />
              </Link>
            </li>
          ))}
        </ul>

        {/* --- HIRE ME CTA --- */}
        <div className="hidden md:block">
          <Link
            to="contact"
            smooth={true}
            className="group relative px-8 py-3 overflow-hidden rounded-full bg-white text-black text-[11px] font-black tracking-[0.2em] transition-all hover:text-white inline-block cursor-pointer"
          >
            <span className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">HIRE_ME</span>
          </Link>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button onClick={() => setMenu(true)} className="md:hidden p-2 text-white bg-white/5 border border-white/10 rounded-lg">
          <HiMenuAlt3 size={26} />
        </button>

        {/* --- MOBILE OVERLAY --- */}
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 bg-[#050507] z-[120] flex flex-col p-10"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="text-xl font-black text-white">PRO<span className="text-purple-500 italic">CODER</span></div>
                <button onClick={() => setMenu(false)} className="p-2 text-white bg-white/5 rounded-full hover:bg-white/10 transition-all">
                  <IoClose size={30} />
                </button>
              </div>
              <ul className="space-y-8">
                {items.map(({ id, text, to }) => (
                  <li key={id}>
                    <Link
                      to={to}
                      smooth={true}
                      spy={true}
                      onClick={() => setMenu(false)}
                      className="text-5xl font-black text-white tracking-tighter hover:text-purple-500 transition-colors block uppercase"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link to="contact" onClick={() => setMenu(false)} className="w-full block text-center py-5 bg-purple-600 text-white font-black tracking-widest rounded-2xl shadow-xl shadow-purple-500/20">HIRE_ME</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .nav-active {
          color: white !important;
        }
        .nav-active .underline-indicator {
          width: 100% !important;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
