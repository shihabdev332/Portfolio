import React, { useRef, useMemo, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiHexagon, FiStar } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  const testimonials = useMemo(() => [
    {
      name: "John Smith",
      role: "MERN Stack Developer",
      comment: "Their service is truly exceptional. The UI/UX integration was seamless and professional.",
      image: "https://i.pravatar.cc/150?u=shihab",
    },
    {
      name: "Alex Rivera",
      role: "Product Manager",
      comment: "The performance and attention to detail surpassed our expectations. Technical craft at its best.",
      image: "https://i.pravatar.cc/150?u=alex",
    },
    {
      name: "Sarah Chen",
      role: "Creative Director",
      comment: "Transformative results! Our conversion rate increased significantly after the redesign.",
      image: "https://i.pravatar.cc/150?u=sarah",
    },
  ], []);

  // ৪ বার ডুপ্লিকেট করা হয়েছে যাতে বড় স্ক্রিনে গ্যাপ না থাকে
  const list = useMemo(() => [...testimonials, ...testimonials, ...testimonials, ...testimonials], [testimonials]);

  useGSAP(() => {
    // 1. Seamless Infinite Marquee
    const marquee = marqueeRef.current;
    const totalWidth = marquee.scrollWidth / 2;

    gsap.to(marquee, {
      x: `-=${totalWidth}`,
      duration: 40,
      repeat: -1,
      ease: "none",
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
      }
    });

    // 2. Header & Section Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".testi-tag", { opacity: 0, scale: 0.8, duration: 0.6 })
      .from(".testi-title", { 
        opacity: 0, 
        y: 80, 
        clipPath: "inset(100% 0% 0% 0%)", 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=0.4");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 md:py-32 relative overflow-hidden bg-[#030303]">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -top-24 -left-24 w-64 md:w-[500px] h-64 md:h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-64 md:w-[400px] h-64 md:h-[400px] bg-purple-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <header className="text-center mb-16 md:mb-28">
          <div className="testi-tag inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.3em]">Client_Voices</span>
          </div>
          
          <h2 className="testi-title text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight">
            TRUSTED BY <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 italic">
              TOP LEADERS
            </span>
          </h2>
        </header>

        {/* Marquee with Masking */}
        <div className="relative -mx-6 py-10 overflow-hidden" 
             style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
          <div ref={marqueeRef} className="flex whitespace-nowrap gap-6 md:gap-10 will-change-transform">
            {list.map((item, index) => (
              <TestimonialCard key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ data }) => {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight movement
    gsap.to(spotlightRef.current, {
      opacity: 1,
      x: x - 200,
      y: y - 200,
      duration: 0.2,
    });

    // 3D Rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(innerRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(spotlightRef.current, { opacity: 0, duration: 0.5 });
    gsap.to(innerRef.current, { 
      rotateX: 0, 
      rotateY: 0, 
      duration: 0.8, 
      ease: "elastic.out(1, 0.3)" 
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative shrink-0 w-[320px] md:w-[580px] h-[350px] md:h-[420px] cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <div 
        ref={innerRef}
        className="relative w-full h-full p-[1px] rounded-4xl bg-linear-to-b from-white/10 to-transparent transition-colors duration-500 hover:from-cyan-500/40 overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative h-full px-8 py-10 md:px-12 md:py-14 rounded-4xl bg-[#0a0a0c] flex flex-col gap-6 border border-white/5 shadow-2xl">
          
          {/* Spotlight Layer */}
          <div ref={spotlightRef} className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[80px] opacity-0 z-0" />

          {/* User Info */}
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative shrink-0 p-0.5 rounded-2xl bg-linear-to-tr from-white/20 to-transparent">
                <img src={data.image} alt={data.name} className="w-14 h-14 md:w-20 md:h-20 rounded-2xl object-cover" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">{data.name}</h4>
                <p className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest">{data.role}</p>
              </div>
            </div>
            <FaQuoteLeft className="text-3xl md:text-5xl text-white/5" />
          </div>

          {/* Comment */}
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed italic z-10 line-clamp-4">
            "{data.comment}"
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5 z-10">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="text-cyan-500 w-4 h-4 fill-cyan-500/20 group-hover:fill-cyan-500 transition-all duration-500" />
              ))}
            </div>
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Verified</span>
                <FiHexagon className="text-cyan-500 w-4 h-4" />
            </div>
          </div>

          <FiHexagon className="absolute -bottom-12 -right-12 text-[200px] text-white/2 rotate-12 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default memo(Testimonials);