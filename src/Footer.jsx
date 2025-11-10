import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gray-800 py-10 px-6 sm:px-12 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto text-white px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-hidden"
          >
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-gray-400">
              A passionate developer, building modern web solutions with
              cutting-edge technologies.
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="overflow-hidden"
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <span className="text-gray-400">Home</span>
              </li>
              <li>
                <span className="text-gray-400">About</span>
              </li>
              <li>
                <span className="text-gray-400">Contact</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="overflow-hidden"
          >
            <h3 className="text-xl font-bold mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <FaGithub size={30} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={30} />
              </a>
            </div>
          </motion.div>

          {/* Copyright Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="sm:col-span-2 lg:col-span-1 overflow-hidden"
          >
            <p className="text-gray-400 text-center sm:text-left">
              &copy; {new Date().getFullYear()} Your Website. All Rights Reserved.
            </p>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-gray-500">
          <p>&#169; Your Name or Business - 2025</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
