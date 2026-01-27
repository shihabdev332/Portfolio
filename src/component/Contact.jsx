import React, { useState, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiSend, FiMail, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const whatsappNumber = "+8801757288373";
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const glowRef = useRef(null);
  
  // Performance Refs for Mouse Movement
  const xTo = useRef();
  const yTo = useRef();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Initial Button Animation
    gsap.to(".send-btn-inner", { y: -20, opacity: 0, duration: 0.3 });

    emailjs.sendForm(
      'service_0mxeb79', 
      'template_bmpqdrk', 
      formRef.current, 
      '8ywpr-7h67rHdyQV5'
    )
    .then((result) => {
      console.log("Transmission Success:", result.text);
      setIsSending(false);
      setIsSubmitted(true);
      
      const tl = gsap.timeline();
      tl.fromTo(".success-icon", 
        { scale: 0, rotate: -180, filter: "blur(10px)" }, 
        { scale: 1, rotate: 0, filter: "blur(0px)", duration: 0.8, ease: "back.out(2)" }
      )
      .fromTo(".success-text", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }, "-=0.3"
      );

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
        // Reset Button State
        gsap.set(".send-btn-inner", { y: 0, opacity: 1 });
      }, 5000);
    }, (error) => {
      console.log("Failed:", error.text);
      setIsSending(false);
      gsap.to(".send-btn-inner", { y: 0, opacity: 1, duration: 0.3 });
      alert("Transmission Error. Please check your connection.");
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useGSAP(() => {
    // 1. Setup QuickTo for Super Smooth Mouse Follower (High Performance)
    xTo.current = gsap.quickTo(glowRef.current, "x", { duration: 1.2, ease: "power3" });
    yTo.current = gsap.quickTo(glowRef.current, "y", { duration: 1.2, ease: "power3" });

    // 2. Entrance Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".contact-tag", { opacity: 0, x: -20, duration: 0.8, ease: "power2.out" })
      .from(".contact-title", { opacity: 0, y: 40, skewY: 2, duration: 1, ease: "expo.out" }, "-=0.4")
      .from(".contact-info-item", { 
        opacity: 0, 
        x: -20, 
        stagger: 0.1, 
        duration: 0.8,
        ease: "power2.out" 
      }, "-=0.6")
      .from(".contact-form-box", { 
        opacity: 0, 
        y: 60, 
        duration: 1.2, 
        ease: "power4.out",
        clearProps: "all" 
      }, "-=1");

  }, { scope: containerRef });

  // Optimized Mouse Move Handler
  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate position relative to center
    const x = (clientX - innerWidth / 2) * 0.15; // Reduced multiplier for subtler movement
    const y = (clientY - innerHeight / 2) * 0.15;
    
    // Direct GPU Update
    xTo.current(x);
    yTo.current(y);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-24 overflow-hidden bg-[#020105] text-white selection:bg-purple-500/30"
    >
      {/* OPTIMIZED BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Static Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", 
               backgroundSize: "40px 40px" 
             }} 
        />
        
        {/* Dynamic Glow - Hardware Accelerated */}
        <div 
          ref={glowRef} 
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform" 
        />
        
        {/* Noise Overlay for Texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start pt-10">
          
          {/* LEFT SIDE: INFO */}
          <div className="flex flex-col h-full justify-center">
            <h4 className="contact-tag font-mono text-emerald-400/80 tracking-[0.4em] mb-6 text-xs uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Connectivity_Hub
            </h4>
            
            <h2 className="contact-title text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              Let's <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-white italic pr-4">
                Connect
              </span>
            </h2>
            
            <p className="contact-info-item text-slate-400 text-lg max-w-md mb-12 leading-relaxed font-light">
              Currently architecting next-gen web solutions. Open for engineering collaborations. 
              <span className="block mt-2 text-slate-500 text-sm font-mono"> // Typical response time: &lt; 2 hours</span>
            </p>

            <div className="space-y-6 mb-12">
              {[
                { icon: <FiMail />, label: "Direct_Line", value: "shihab.dev332@gmail.com", color: "text-sky-400", link: "mailto:shihab.dev332@gmail.com" },
                { icon: <FiMapPin />, label: "Base_Station", value: "Dhaka, Bangladesh", color: "text-purple-400", link: "#" },
              ].map((method, idx) => (
                <a 
                  key={idx} 
                  href={method.link}
                  className="contact-info-item flex items-center gap-6 group p-4 rounded-2xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5"
                >
                  <div className={`w-14 h-14 rounded-xl bg-[#0a0a0f] border border-white/10 flex items-center justify-center text-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] ${method.color}`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-1">{method.label}</p>
                    <p className="text-xl text-white font-bold group-hover:text-purple-300 transition-colors">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`, "_blank")}
              className="contact-info-item whatsapp-btn w-fit relative group overflow-hidden bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-xl font-black tracking-widest text-xs flex items-center gap-3 transition-all active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]"
            >
              <FaWhatsapp size={20} />
              <span>INITIALIZE_WHATSAPP</span>
              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
            </button>
          </div>

          {/* RIGHT SIDE: PREMIUM FORM */}
          <div className="contact-form-box w-full">
            <div className="relative bg-[#0a0a0f] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl">
              
              {/* Decorative Corner Lights */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none" />

              {isSubmitted ? (
                <div className="flex flex-col items-center text-center py-20 min-h-[400px] justify-center">
                  <div className="success-icon w-24 h-24 bg-gradient-to-tr from-emerald-500/20 to-emerald-500/5 text-emerald-400 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <FiCheckCircle size={40} />
                  </div>
                  <h3 className="success-text text-3xl font-black text-white mb-3 uppercase tracking-tighter">Transmission Received</h3>
                  <p className="success-text text-slate-400 font-mono text-sm tracking-wide">Data packet routed successfully.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Identification</label>
                      <input 
                        required 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all placeholder:text-slate-700/50 text-sm font-medium" 
                      />
                    </div>
                    <div className="group space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Return_Path</label>
                      <input 
                        required 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        type="email" 
                        placeholder="email@example.com" 
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all placeholder:text-slate-700/50 text-sm font-medium" 
                      />
                    </div>
                  </div>
                  
                  <div className="group space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">Communication_Payload</label>
                    <textarea 
                      required 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows="5" 
                      placeholder="Describe your project requirements..." 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] transition-all resize-none placeholder:text-slate-700/50 text-sm font-medium" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSending} 
                    className="w-full group relative overflow-hidden bg-white text-black py-5 rounded-xl font-black text-xs tracking-[0.25em] flex items-center justify-center gap-3 transition-all hover:bg-purple-50 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <div className="send-btn-inner relative z-10 flex items-center gap-3">
                        {isSending ? (
                           <span className="flex items-center gap-2">
                             <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0s' }}/>
                             <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}/>
                             <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}/>
                           </span>
                        ) : (
                          <>
                            SEND_MESSAGE
                            <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </>
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

export default memo(Contact);
