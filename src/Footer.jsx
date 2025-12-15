import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
  });

  const socialHover = {
    hover: { scale: 1.2, color: "#8B5CF6", transition: { duration: 0.3 } },
  };

  return (
    <motion.footer
      ref={ref}
      variants={footerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-gray-900 py-14 px-6 sm:px-12 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* About Section */}
        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            About
          </h3>
          <p className="text-gray-400">
            Passionate Full Stack developer, building modern, responsive web solutions with MERN stack and creative UI/UX design.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><a href="#home" className="text-gray-400 hover:text-white transition">Home</a></li>
            <li><a href="#about" className="text-gray-400 hover:text-white transition">About</a></li>
            <li><a href="#projects" className="text-gray-400 hover:text-white transition">Projects</a></li>
            <li><a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          variants={fadeUp(0.6)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Follow Me
          </h3>
          <div className="flex space-x-5">
            <motion.a
              href="https://github.com/shihabdev332?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialHover}
              whileHover="hover"
              className="text-gray-400 transition-colors"
            >
              <FaGithub size={30} />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialHover}
              whileHover="hover"
              className="text-gray-400 transition-colors"
            >
              <FaLinkedin size={30} />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialHover}
              whileHover="hover"
              className="text-gray-400 transition-colors"
            >
              <FaTwitter size={30} />
            </motion.a>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={fadeUp(0.8)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col justify-center items-center sm:items-start"
        >
          <p className="text-gray-400 mb-2 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ShihabDev. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-sm text-center sm:text-left">
            Designed & Developed by Me
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
