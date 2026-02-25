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

  const navItems = [
    { id: 1, text: "ABOUT", to: "about" },
    { id: 2, text: "SERVICES", to: "services" },
    { id: 3, text: "WORK", to: "work" },
    { id: 4, text: "CONTACT", to: "contact" },
  ];

  // --- Scroll Handler ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- GSAP Mobile Menu Animation ---
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    // Start hidden
    gsap.set(mobileMenuRef.current, { xPercent: 100 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(mobileMenuRef.current, {
        xPercent: 0,
        duration: 0.6,
        ease: "expo.out",
      })
      .from(
        menuLinksRef.current,
        {
          x: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.3"
      );
  }, []);

  // Play/reverse timeline on menu toggle
  useEffect(() => {
    if (tl.current) {
      menuOpen ? tl.current.play() : tl.current.reverse();
    }
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
        scrolled
          ? "bg-[#0a0a0c]/80 backdrop-blur-xl py-4 border-b border-white/5"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 md:px-12">
        {/* LOGO */}
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="z-[160] cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-9 w-auto transition-all hover:brightness-125"
          />
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-12">
          {navItems.map(({ id, text, to }) => (
            <li key={id} className="relative group overflow-hidden cursor-pointer">
              <Link
                to={to}
                smooth={true}
                spy={true}
                offset={-100}
                duration={500}
                activeClass="text-white"
                className="block py-2 text-[10px] font-mono font-bold tracking-[0.5em] text-slate-400 transition-colors hover:text-white"
              >
                {text}
                <span className="absolute bottom-0 left-0 w-full h-[1px] origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CV DOWNLOAD DESKTOP */}
        <div className="hidden md:block">
          <a
            href="/cv.pdf"
            download
            className="px-8 py-3 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 hover:bg-white hover:text-black"
          >
            Download_CV
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(true)}
          className="z-[110] flex flex-col items-end gap-1.5 md:hidden group"
        >
          <span className="w-8 h-[2px] bg-white transition-all group-hover:w-5" />
          <span className="w-5 h-[2px] bg-white" />
        </button>

        {/* MOBILE MENU OVERLAY */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-[140] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* MOBILE SIDEBAR */}
        <div
          ref={mobileMenuRef}
          className="fixed top-0 right-0 z-[150] flex h-[90%] w-[70%] flex-col border-l border-white/5 bg-[#050507] p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] sm:w-[50%] md:w-[40%]"
        >
          {/* CLOSE BUTTON */}
          <div className="mb-12 flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-colors hover:bg-white/10"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* MOBILE NAV LINKS */}
          <ul className="flex flex-col space-y-8">
            {navItems.map(({ id, text, to }, index) => (
              <li key={id} ref={(el) => (menuLinksRef.current[index] = el)}>
                <Link
                  to={to}
                  smooth={true}
                  spy={true}
                  offset={-100}
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                  className="block text-2xl font-bold uppercase tracking-tighter text-white/80 transition-all hover:pl-2 hover:text-white"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>

          {/* MOBILE FOOTER */}
          <div className="mt-auto border-t border-white/5 pt-10">
            <a
              href="/cv.pdf"
              download
              className="text-[15px] font-bold rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest transition-all duration-500 hover:bg-white hover:text-black"
            >
              Click Here To Download CV
            </a>
            <p className="mt-2 text-[8px] font-mono uppercase text-white/20">
              © 2026 Shihab
            </p>
          </div>

          {/* BACKGROUND DECOR */}
          <div
            className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
