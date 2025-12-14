import { motion, useAnimation } from "framer-motion";
import React, { useState, useEffect } from "react";

const typingTexts = [
  { text: "Hello, I'm Shihab...", color: "#ce83e3" },
  { text: "A  Full Stack Developer...", color: "#7dd3fc" },
];

const Hero = () => {
  const [hovered, setHovered] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);

  const controls = useAnimation();

  // Jelly-like animation loop
  useEffect(() => {
    controls.start({
      rotate: 360,
      scaleX: [1, 1.02, 0.98, 1, 1],
      scaleY: [1, 0.98, 1.02, 1, 1],
      transition: {
        rotate: { repeat: Infinity, duration: 6, ease: "linear" },
        scaleX: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        scaleY: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      },
    });
  }, [controls]);

  // Typewriter effect
  useEffect(() => {
    let timeout;
    const fullText = typingTexts[currentText].text;

    if (typing) {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 1000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, 50);
      } else {
        setTyping(true);
        setCurrentText((prev) => (prev + 1) % typingTexts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, currentText]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const section = document.getElementById("about");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const goToContact = () => {
    window.location.href = "#contact";
  };

  return (
    <div className="text-white py-10">

      {/* Profile Image with Thin Jelly-like Ring */}
      <div
        className="relative w-72 h-72 mx-auto flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/*Rotating Ring */}
        <motion.div
          animate={controls}
          className={`absolute inset-0 rounded-full p-[1px] 
            bg-[conic-gradient(from_0deg,#ff0080,#7928ca,#2afadf,#00ff88,#ff0080)]
            ${hovered ? "shadow-[0_0_25px_#ff00ff]" : ""}`}
        />

        {/* Inner Circle (Photo Holder) */}
        <div className="relative w-64 h-64 rounded-full bg-black overflow-hidden flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            src="this.png" // <-- Change to your photo path
            alt="Shihab"
            className="w-full h-full object-cover rounded-full"
          />

          {/* Hover Text */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute font-semibold mt-[-100px] text-white text-lg px-4 py-1 rounded"
              style={{
                textShadow: "0 0 8px #ff00ff, 0 0 12px #ff00ff",
              }}
            >
              MERN Stack Developer
            </motion.div>
          )}
        </div>
      </div>

      {/* Hero Animated Heading */}
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-3xl md:text-5xl font-bold flex justify-center">
          <span
            style={{ color: typingTexts[currentText].color }}
            className="mr-1"
          >
            {displayText}
          </span>
          <span className="text-white">{cursorVisible ? "|" : " "}</span>
        </h1>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto text-center mt-6"
      >
        <motion.h3
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-purple-400 text-[25px] font-semibold max-w-2xl mx-auto"
        >
          Passionate about user-friendly full-Stack web development and design.
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          I am a passionate Full Stack developer specializing in building
          user-friendly and responsive web applications. I create modern,
          interactive websites using React, Tailwind CSS, JavaScript, Node.js,
          Express, and MongoDB. Constantly expanding my skills, I also work with
          animations using Framer Motion and explore new technologies like
          Three.js to deliver complete end-to-end digital solutions.
        </motion.p>
      </motion.div>

      {/* Buttons */}
      <div className="space-x-4 mx-auto text-center mt-6">
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-purple-500 text-white hover:bg-purple-700 px-6 py-3 rounded-full transition duration-300 cursor-pointer"
        >
          About Me
        </motion.button>

        <motion.button
          onClick={goToContact}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-purple-500 text-white hover:bg-purple-700 px-6 py-3 rounded-full transition duration-300 cursor-pointer"
        >
          Hire Me
        </motion.button>
      </div>

    </div>
  );
};

export default Hero;
