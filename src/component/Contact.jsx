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
  
  const xTo = useRef();
  const yTo = useRef();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    gsap.to(".send-btn-inner", { y: -20, opacity: 0, duration: 0.3 });

    emailjs.sendForm(
      'service_0mxeb79', 
      'template_bmpqdrk', 
      formRef.current, 
      '8ywpr-7h67rHdyQV5'
    )
    .then(() => {
      setIsSending(false);
      setIsSubmitted(true);
      
      const tl = gsap.timeline();
      tl.fromTo(".success-icon", 
        { scale: 0, rotate: -180, filter: "blur(10px)" }, 
        { scale: 1, rotate: 0, filter: "blur(0px)", duration: 0.8, ease: "back.out(2)" }
      )
      .fromTo(".success-text", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3"
      );

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
        gsap.set(".send-btn-inner", { y: 0, opacity: 1 });
      }, 5000);
    }, (error) => {
      console.error("Failed:", error.text);
      setIsSending(false);
      gsap.to(".send-btn-inner", { y: 0, opacity: 1, duration: 0.3 });
      alert("Transmission Error. Please check your connection.");
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useGSAP(() => {
    // Optimized Mouse Follower Setup
    xTo.current = gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power3" });
    yTo.current = gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power3" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(".contact-tag", { opacity: 0, x: -30, duration: 0.8 })
      .from(".contact-title", { opacity: 0, y: 50, skewY: 3, duration: 1, ease: "expo.out" }, "-=0.5")
      .from(".contact-info-item", { 
        opacity: 0, 
        x: -20, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.7")
      .from(".contact-form-box", { 
        opacity: 0, 
        scale: 0.95, 
        duration: 1.2, 
        ease: "expo.out" 
      }, "-=1");

  }, { scope: containerRef });

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) * 0.12;
    const y = (clientY - innerHeight / 2) * 0.12;
    xTo.current(x);
    yTo.current(y);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-24 overflow-hidden bg-[#020105] text-white selection:bg-purple-500/40"
    >
      {/* HIGH-PERFORMANCE BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" 
             style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: "50px 50px" }} 
        />
        <div ref={glowRef} className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-gradient-to-r from-purple-600/20 to-blue-600/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform" />
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT CONTENT */}
          <div className="space-y-10">
            <div>
              <h4 className="contact-tag font-mono text-emerald-400 tracking-[0.4em] mb-6 text-xs uppercase font-bold flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                Connectivity_Hub
              </h4>
              <h2 className="contact-title text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
                Let's <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-white italic">
                  Connect
                </span>
              </h2>
              <p className="contact-info-item text-slate-400 text-lg max-w-md leading-relaxed">
                Currently architecting next-gen web solutions. Open for engineering collaborations. 
                <span className="block mt-3 text-slate-500 text-sm font-mono opacity-70">// Response_Latency: &lt; 120min</span>
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <FiMail />, label: "Direct_Line", value: "shihab.dev332@gmail.com", link: "mailto:shihab.dev332@gmail.com", color: "sky" },
                { icon: <FiMapPin />, label: "Base_Station", value: "Dhaka, Bangladesh", link: "#", color: "purple" },
              ].map((method, idx) => (
                <a 
                  key={idx} 
                  href={method.link}
                  className="contact-info-item flex items-center gap-6 group p-4 rounded-2xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl bg-black border border-white/10 flex items-center justify-center text-xl transition-transform group-hover:scale-110 text-${method.color}-400`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{method.label}</p>
                    <p className="text-xl text-white font-bold group-hover:text-purple-300 transition-colors">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-info-item relative z-50">
              <button
                onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`, "_blank")}
                className="group relative flex items-center gap-4 bg-emerald-500 hover:bg-emerald-400 text-black px-10 py-5 rounded-2xl font-black tracking-widest text-xs transition-all active:scale-95 shadow-2xl overflow-hidden"
              >
                <FaWhatsapp size={22} className="relative z-10" />
                <span className="relative z-10 uppercase">Initialize_WhatsApp</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT: FORM */}
          <div className="contact-form-box relative h-full">
            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[60px] rounded-full" />
              
              {isSubmitted ? (
                <div className="flex flex-col items-center text-center py-20 min-h-[450px] justify-center space-y-6">
                  <div className="success-icon w-28 h-28 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-2xl">
                    <FiCheckCircle size={50} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="success-text text-3xl font-black uppercase tracking-tighter">Transmission Received</h3>
                    <p className="success-text text-slate-400 font-mono text-sm tracking-wide">Data packet routed successfully.</p>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1">Identification</label>
                      <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all text-sm outline-none" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1">Return_Path</label>
                      <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="shihab@dev.com" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all text-sm outline-none" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] ml-1">Communication_Payload</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Describe your project requirement..." className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.06] transition-all resize-none text-sm outline-none" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSending} 
                    className="w-full group relative bg-white text-black py-6 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-purple-50 active:scale-[0.98] disabled:opacity-50 shadow-2xl flex items-center justify-center overflow-hidden"
                  >
                    <div className="send-btn-inner relative z-10 flex items-center gap-3">
                        {isSending ? (
                          <span className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" />
                          </span>
                        ) : (
                          <>Send_Message <FiSend className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>
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
