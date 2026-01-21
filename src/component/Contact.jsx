import React, { useState, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiSend, FiMail, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser"; // EmailJS import

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const whatsappNumber = "+8801757288373";
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const glowRef = useRef(null);

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
      }, 5000);
    }, (error) => {
      console.log("Failed:", error.text);
      setIsSending(false);
      alert("Transmission Error. Please check your connection.");
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        }
      });

      tl.from(".contact-tag", { opacity: 0, x: -20, duration: 0.5 })
        .from(".contact-title", { opacity: 0, y: 50, skewY: 2, duration: 1, ease: "power4.out" }, "-=0.3")
        // Fixed GSAP Selector with :not(.whatsapp-btn)
        .from(".contact-info:not(.whatsapp-btn)", { 
          opacity: 0, 
          y: 20, 
          stagger: 0.1, 
          duration: 0.8 
        }, "-=0.6")
        .from(".contact-form-box", { opacity: 0, scale: 0.95, duration: 1, ease: "power3.out" }, "-=1");

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;
        gsap.to(glowRef.current, { x: xPos, y: yPos, duration: 2, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={containerRef} className="relative min-h-screen py-24 overflow-hidden bg-[#020205]">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div ref={glowRef} className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div>
            <h4 className="contact-tag font-mono text-emerald-400 tracking-[0.3em] mb-4 text-sm uppercase italic">// Connectivity_Hub</h4>
            <h2 className="contact-title text-6xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 italic">Connect</span>
            </h2>
            <p className="contact-info text-slate-400 text-lg max-w-md mb-12 leading-relaxed">
              Currently open for new projects and engineering collaborations. I usually respond within 2 hours.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: <FiMail />, label: "Email", value: "shihab.dev332@gmail.com", color: "text-blue-400" },
                { icon: <FiMapPin />, label: "Location", value: "Dhaka, Bangladesh", color: "text-purple-400" },
              ].map((method, idx) => (
                <div key={idx} className="contact-info flex items-center gap-5 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 ${method.color}`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{method.label}</p>
                    <p className="text-white font-bold group-hover:text-emerald-400 transition-colors">{method.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Button Fix: Added 'whatsapp-btn' class correctly */}
            <button
              onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`, "_blank")}
              className="contact-info whatsapp-btn relative z-20 cursor-pointer inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-2xl font-black tracking-widest text-xs transition-all active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <FaWhatsapp size={18} /> INITIALIZE_WHATSAPP
            </button>
          </div>

          {/* RIGHT SIDE: FORM */}
          <div className="contact-form-box relative">
            <div className="relative bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 p-10 lg:p-14 rounded-[2.5rem] shadow-2xl overflow-hidden">
              {isSubmitted ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="success-icon w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                    <FiCheckCircle size={40} />
                  </div>
                  <h3 className="success-text text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Transmission Received</h3>
                  <p className="success-text text-slate-400">The data has been routed to my local terminal.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase tracking-tighter">Identification</label>
                      <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-600 cursor-pointer" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase tracking-tighter">Return_Path</label>
                      <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-600 cursor-pointer" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase tracking-tighter">Communication_Payload</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Type your message..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-slate-600 cursor-pointer" />
                  </div>
                  <button type="submit" disabled={isSending} className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-5 rounded-2xl text-white font-black text-xs tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer">
                    <span className="send-btn-inner relative z-10 flex items-center gap-3">
                        {isSending ? "ENCRYPTING..." : "SEND_MESSAGE"} 
                        {!isSending && <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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