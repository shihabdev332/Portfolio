import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiSend, FiPhone, FiMail, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const whatsappNumber = "+8801757288373";
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const contactMethods = [
    { icon: <FiMail />, label: "Email", value: "shihab.dev332@gmial.com", color: "text-blue-400" },
    { icon: <FiPhone />, label: "Phone", value: "+880 1757 288373", color: "text-emerald-400" },
    { icon: <FiMapPin />, label: "Location", value: "Dhaka, Bangladesh", color: "text-purple-400" },
  ];

  return (
    <section id="contact" ref={ref} className="relative min-h-screen py-24 overflow-hidden bg-[#020205]">
      
      {/* --- ADVANCED BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        
      
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: CONTENT --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-mono text-emerald-400 tracking-[0.3em] mb-4 text-sm uppercase italic">// Connectivity_Hub</h4>
            <h2 className="text-6xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 italic">Connect</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md mb-12 leading-relaxed">
              Currently open for new projects and engineering collaborations. I usually respond within 2 hours.
            </p>

            <div className="space-y-6 mb-10">
              {contactMethods.map((method, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-5 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl ${method.color} group-hover:scale-110 transition-transform`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{method.label}</p>
                    <p className="text-white font-bold">{method.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-emerald-500 text-black px-8 py-4 rounded-2xl font-black tracking-widest text-xs shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-emerald-500/50 transition-all"
            >
              <FaWhatsapp size={18} /> INITIALIZE_WHATSAPP
            </motion.a>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0a0f]/80 backdrop-blur-3xl border border-white/10 p-10 lg:p-14 rounded-[2.5rem] shadow-2xl">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                      <FiCheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
                    <p className="text-slate-400">Your message has been encrypted and sent to my terminal.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase">Identification</label>
                        <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase">Return_Path</label>
                        <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-slate-700" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-500 ml-1 uppercase">Communication_Payload</label>
                      <textarea required rows="4" placeholder="Your message details..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-slate-700 resize-none" />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-5 rounded-2xl text-white font-black text-xs tracking-[0.3em] shadow-xl hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                      SEND_MESSAGE <FiSend/>
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>

            
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                 <div className="w-8 h-8 border-t-2 border-r-2 border-purple-500 rounded-tr-xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
