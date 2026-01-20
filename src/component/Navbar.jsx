import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-scroll";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const tl = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- GSAP PREMIUM ANIMATION ---
  useGSAP(() => {
    // Hidden initially
    gsap.set(mobileMenuRef.current, { xPercent: 100 });

    tl.current = gsap.timeline({ paused: true })
      .to(mobileMenuRef.current, {
        xPercent: 0,
        duration: 0.6,
        ease: "expo.out",
      })
      .from(menuLinksRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      }, "-=0.3");
  }, []);

  useEffect(() => {
    if (menuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [menuOpen]);

  const items = [
    { id: 1, text: "ABOUT", to: "about" },
    { id: 2, text: "SERVICES", to: "services" },
    { id: 3, text: "WORK", to: "work" },
    { id: 4, text: "CONTACT", to: "contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        scrolled
          ? "bg-[#0a0a0c]/80 backdrop-blur-xl py-4 border-b border-white/5"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* LOGO */}
        <Link to="home" smooth={true} duration={500} className="cursor-pointer z-[160]">
          <img src="/logo.png" alt="Logo" className="h-9 w-auto hover:brightness-125 transition-all" />
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-12">
          {items.map(({ id, text, to }) => (
            <li key={id} className="relative group overflow-hidden">
              <Link
                to={to}
                smooth={true}
                spy={true}
                offset={-100}
                duration={500}
                activeClass="text-white"
                className="text-[10px] font-mono font-bold tracking-[0.5em] text-slate-400 hover:text-white cursor-pointer transition-colors py-2 block"
              >
                {text}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CV DOWNLOAD (DESKTOP) */}
        <div className="hidden md:block">
          <a
            href="/cv.pdf"
            download
            className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black text-[10px] font-bold tracking-widest transition-all duration-500 uppercase"
          >
            Download_CV
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col gap-1.5 items-end group z-[110]"
        >
          <span className="w-8 h-[2px] bg-white transition-all group-hover:w-5" />
          <span className="w-5 h-[2px] bg-white" />
        </button>

        {/* --- OVERLAY (To close menu when clicking outside) --- */}
        {menuOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[140] md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* --- PREMIUM MOBILE SIDEBAR (40% Width) --- */}
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 w-[80%] sm:w-[50%] md:w-[40%] h-screen bg-[#050507] z-[150] flex flex-col p-8 border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Close Button Area */}
          <div className="flex justify-end mb-12">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-3 bg-white/5 rounded-full border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <ul className="flex flex-col space-y-8">
            {items.map(({ id, text, to }, index) => (
              <li 
                key={id} 
                ref={(el) => (menuLinksRef.current[index] = el)}
              >
                <Link
                  to={to}
                  smooth={true}
                  spy={true}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-bold text-white/80 hover:text-white hover:pl-2 transition-all duration-300 block uppercase tracking-tighter"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Footer */}
          <div className="mt-auto pt-10 border-t border-white/5">
              <a
                href="/cv.pdf"
                download
                className="text-[10px] font-bold tracking-[0.2em] text-white/50 hover:text-white transition-colors"
              >
                RESUME_PDF
              </a>
              <p className="text-[8px] text-white/20 mt-2 font-mono uppercase">© 2026 Shihab</p>
          </div>

          {/* Background Decor */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;