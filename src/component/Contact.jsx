import React, { useState, useRef, memo, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiSend, FiMail, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  // Config Constants
  const WHATSAPP_NUMBER = "+8801757288373";
  const SERVICE_ID = 'service_0mxeb79';
  const TEMPLATE_ID = 'template_bmpqdrk';
  const PUBLIC_KEY = '8ywpr-7h67rHdyQV5';

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const glowRef = useRef(null);
  const xTo = useRef();
  const yTo = useRef();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Form Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    gsap.to(".send-btn-inner", { y: -20, opacity: 0, duration: 0.3 });

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setIsSending(false);
      setIsSubmitted(true);
      
      const successTl = gsap.timeline();
      successTl.fromTo(".success-icon", 
        { scale: 0, rotate: -180 }, 
        { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.7)" }
      ).fromTo(".success-text", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.4"
      );

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
        gsap.set(".send-btn-inner", { y: 0, opacity: 1 });
      }, 5000);
    } catch (error) {
      setIsSending(false);
      gsap.to(".send-btn-inner", { y: 0, opacity: 1, duration: 0.3 });
      alert("Transmission Error.");
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Optimized Mouse Follower (Only for Desktop)
  const handleMouseMove = useCallback((e) => {
    if (!xTo.current || !yTo.current || window.innerWidth < 1024) return;
    
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) * 0.1;
    const y = (clientY - window.innerHeight / 2) * 0.1;
    
    xTo.current(x);
    yTo.current(y);
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Desktop only interactions
    mm.add("(min-width: 1024px)", () => {
      xTo.current = gsap.quickTo(glowRef.current, "x", { duration: 0.6, ease: "power3" });
      yTo.current = gsap.quickTo(glowRef.current, "y", { duration: 0.6, ease: "power3" });
    });

    // Global Entrance Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        fastScrollEnd: true, // Performance boost
      }
    });

    tl.from(".contact-tag", { opacity: 0, x: -20, duration: 0.6 })
      .from(".contact-title", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .from(".contact-info-item", { 
        opacity: 0, 
        y: 20, 
        stagger: 0.1, 
        duration: 0.6, 
        clearProps: "all" // Remove inline styles after animation
      }, "-=0.6")
      .from(".contact-form-box", { 
        opacity: 0, 
        scale: 0.98, 
        duration: 0.8 
      }, "-=0.8");

  }, { scope: containerRef });

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-20 overflow-hidden bg-[#020105] text-white"
      style={{ backfaceVisibility: "hidden" }} // Hardware acceleration
    >
      {/* BACKGROUND ELEMENTS - Optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: "60px 60px" }} 
        />
        <div 
          ref={glowRef} 
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform hidden lg:block" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: INFO */}
          <div className="space-y-8">
            <header>
              <h4 className="contact-tag font-mono text-emerald-400 tracking-widest mb-4 text-[10px] uppercase font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Connectivity_Hub
              </h4>
              <h2 className="contact-title text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                Let's <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white italic">Connect</span>
              </h2>
              <p className="contact-info-item text-slate-400 max-w-sm">
                Open for engineering collaborations. 
                <span className="block mt-2 text-slate-500 text-xs font-mono opacity-60">// Latency: &lt; 120min</span>
              </p>
            </header>

            <nav className="space-y-4">
              {[
                { icon: <FiMail />, label: "Direct_Line", value: "shihab.dev332@gmail.com", link: "mailto:shihab.dev332@gmail.com", color: "sky" },
                { icon: <FiMapPin />, label: "Base_Station", value: "Dhaka, Bangladesh", link: "#", color: "purple" },
              ].map((method, idx) => (
                <a key={idx} href={method.link} className="contact-info-item flex items-center gap-5 group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <div className={`w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center text-lg text-${method.color}-400 group-hover:scale-105 transition-transform`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{method.label}</p>
                    <p className="text-lg font-bold group-hover:text-purple-300 transition-colors">{method.value}</p>
                  </div>
                </a>
              ))}
            </nav>

            <div className="contact-info-item">
              <button
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`, "_blank")}
                className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-xl font-bold text-xs uppercase transition-all active:scale-95 cursor-pointer"
              >
                <FaWhatsapp size={20} />
                <span>Initialize_WhatsApp</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="contact-form-box">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative">
              {isSubmitted ? (
                <div className="flex flex-col items-center text-center py-16 space-y-4">
                  <div className="success-icon w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20">
                    <FiCheckCircle size={40} />
                  </div>
                  <div>
                    <h3 className="success-text text-2xl font-bold uppercase">Packet Received</h3>
                    <p className="success-text text-slate-400 font-mono text-xs">Route successful.</p>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                    <InputField label="Email" name="email" type="email" placeholder="shihab@dev.com" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase ml-1">Message_Payload</label>
                    <textarea 
                      required name="message" value={formData.message} onChange={handleChange} rows="4" 
                      placeholder="Describe requirements..." 
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none text-sm" 
                    />
                  </div>
                  <button 
                    type="submit" disabled={isSending} 
                    className="w-full group relative bg-white text-black py-5 rounded-xl font-black text-[10px] tracking-widest uppercase hover:bg-purple-50 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center"
                  >
                    <div className="send-btn-inner flex items-center gap-2 ">
                        {isSending ? (
                          <span className="flex gap-1">
                            {[0, 1, 2].map(i => <span key={i} className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
                          </span>
                        ) : (
                          <>Send_Message <FiSend /></>
                        )}
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InputField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-mono text-slate-500 uppercase ml-1">{label}</label>
    <input 
      required {...props} 
      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all text-sm" 
    />
  </div>
);

export default memo(Contact);
