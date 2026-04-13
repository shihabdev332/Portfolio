import React, { useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const codeSnippets = [
  "const [data, setData] = useState([]);",
  "router.get('/api/projects', getProjects);",
  "className='hover:scale-105 transition';",
  "const res = await axios.post(url, body);",
  "useEffect(() => { window.scrollTo(0,0) });",
  "export const metadata = { title: 'Shihab' };",
  "npm run build && firebase deploy",
  "console.log('Backend connected...');",
];

// প্রতি রেন্ডারে নতুন অ্যারে তৈরি এড়াতে এটি বাইরে রাখা হলো
const duplicatedSnippets = [...codeSnippets, ...codeSnippets];

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);
  const videoRef = useRef(null); // ভিডিও কন্ট্রোল করার জন্য নতুন Ref

  // অ্যানিমেশনের সময় রি-রেন্ডার এড়াতে State-এর বদলে Refs ব্যবহার করা হলো
  const expRef = useRef(null);
  const custRef = useRef(null);
  const projRef = useRef(null);

  // ভিডিও ৭.৫০ সেকেন্ডে থামানোর লজিক
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 7.00) {
      videoRef.current.pause();
    }
  };

  useGSAP(
    () => {
      // 1. Background Streams Optimization (Using Will-Change for performance)
      gsap.to(".stream-up-about", {
        yPercent: -50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".stream-down-about", {
        yPercent: 50,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      // 2. Main Entrance Timeline
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      intro
        .fromTo(imageRef.current,
          { opacity: 0, scale: 0.9, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "expo.out" }
        )
        .from(".reveal-item", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.8");

      // 3. Stats Counter - Optimized with Snappy Ease and Direct DOM manipulation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 90%",
        onEnter: () => {
          const values = { exp: 0, cust: 0, proj: 0 };
          gsap.to(values, {
            exp: 2.7,
            cust: 50,
            proj: 50,
            duration: 2.5,
            ease: "power4.out",
            onUpdate: () => {
              // রি-রেন্ডার ছাড়া সরাসরি DOM আপডেট
              if (expRef.current) expRef.current.innerText = values.exp.toFixed(1) + "+";
              if (custRef.current) custRef.current.innerText = Math.floor(values.cust) + "+";
              if (projRef.current) projRef.current.innerText = Math.floor(values.proj) + "+";
            },
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-32 px-6 sm:px-12 overflow-hidden bg-[#030305] text-white"
    >
      {/* ------------------ Background Optimized ------------------ */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-0 flex justify-between px-10">
          <div className="stream-up-about flex flex-col gap-10 font-mono text-[10px] text-sky-500 will-change-transform">
            {duplicatedSnippets.map((s, i) => (
              <span key={`up-${i}`} className="whitespace-nowrap">{s}</span>
            ))}
          </div>
          <div className="stream-down-about flex flex-col gap-10 font-mono text-[10px] text-emerald-500 text-right will-change-transform">
            {duplicatedSnippets.map((s, i) => (
              <span key={`down-${i}`} className="whitespace-nowrap">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* VIDEO BLOCK (Replaced Image) */}
          <div ref={imageRef} className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-sky-500/20 to-purple-500/20 blur-[80px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative p-3 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/didqmq9xz/video/upload/v1776114678/video_evbxpo.mp4"
                autoPlay
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full aspect-[6/4] object-cover rounded-[2.5rem] grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.01] group-hover:scale-105 pointer-events-none"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-10 right-10 bg-black/60 border border-white/10 p-6 rounded-[2rem] backdrop-blur-2xl shadow-2xl transform group-hover:-translate-y-2 transition-transform pointer-events-none">
                <p className="text-emerald-400 font-black text-4xl tracking-tighter">100%</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Job Success</p>
              </div>
            </div>
          </div>

          {/* TEXT BLOCK */}
          <div className="text-left">
            <div className="reveal-item inline-flex items-center gap-2 mb-8 font-mono text-[10px] text-sky-400 bg-sky-400/5 px-4 py-2 border border-sky-400/20 rounded-full tracking-[0.2em]">
              <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              SYSTEM.IDENTITY_FILE
            </div>

            <h2 className="reveal-item text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85]">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 italic pr-2">
                Modern Web
              </span>
            </h2>

            <div className="reveal-item space-y-6 text-gray-400 text-lg md:text-xl max-w-xl font-light leading-relaxed">
              <p>
                Hello! I'm <span className="text-white font-bold">Shihab</span>, a Senior MERN Stack Engineer specializing in 
                high-performance ecosystems. I don't just write code; I design 
                <span className="text-sky-400"> scalable digital experiences </span> 
                that bridge the gap between complex logic and premium aesthetics.
              </p>
              
              <p className="text-sm border-l-2 border-sky-500/30 pl-6 italic text-gray-500">
                "My philosophy is simple: Build for the user, optimize for the future, and never settle for 'good enough'."
              </p>

              <div className="flex flex-wrap gap-2 pt-6">
                {["React 18", "Node.js", "Next.js", "MongoDB", "GSAP", "Microservices", "Clean Code"].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] text-gray-300 font-mono hover:bg-sky-500/10 hover:border-sky-500/40 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div ref={statsRef} className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          {/* Experience Card */}
          <div className="relative p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-md text-center group hover:bg-white/[0.03] transition-all duration-500">
            <h3 ref={expRef} className="text-6xl md:text-7xl font-black mb-3 tracking-tighter text-sky-400">
              0.0+
            </h3>
            <p className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.4em] font-bold group-hover:text-gray-300 transition-colors">
              Years Exp
            </p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent group-hover:w-1/2 transition-all duration-700" />
          </div>

          {/* Customers Card */}
          <div className="relative p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-md text-center group hover:bg-white/[0.03] transition-all duration-500">
            <h3 ref={custRef} className="text-6xl md:text-7xl font-black mb-3 tracking-tighter text-emerald-400">
              0+
            </h3>
            <p className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.4em] font-bold group-hover:text-gray-300 transition-colors">
              Global Clients
            </p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent group-hover:w-1/2 transition-all duration-700" />
          </div>

          {/* Projects Card */}
          <div className="relative p-10 rounded-[2.5rem] bg-white/[0.01] border border-white/5 backdrop-blur-md text-center group hover:bg-white/[0.03] transition-all duration-500">
            <h3 ref={projRef} className="text-6xl md:text-7xl font-black mb-3 tracking-tighter text-purple-400">
              0+
            </h3>
            <p className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.4em] font-bold group-hover:text-gray-300 transition-colors">
              Successful Projects
            </p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent group-hover:w-1/2 transition-all duration-700" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default memo(About);
