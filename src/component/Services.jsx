import { motion } from "framer-motion";
import React from "react";
import {
  HiUserGroup,
  HiOutlineServer,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { LiaPagerSolid } from "react-icons/lia";
import { MdProductionQuantityLimits } from "react-icons/md";
import { PiBaseballHelmetDuotone } from "react-icons/pi";
import { RiProfileLine } from "react-icons/ri";
import { SiFigma, SiMongodb } from "react-icons/si";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.12,
  });

  const services = [
    {
      icon: <RiProfileLine />,
      title: "Portfolio Website Development",
      description:
        "Modern, responsive, and performance-optimized portfolio websites built with React.",
    },
    {
      icon: <LiaPagerSolid />,
      title: "Landing Page Development",
      description:
        "High-converting landing pages with smooth animations and clean UI.",
    },
    {
      icon: <HiUserGroup />,
      title: "Agency & Business Websites",
      description:
        "Professional websites that build trust and convert visitors into clients.",
    },
    {
      icon: <HiOutlineServer />,
      title: "Full-Stack MERN Development",
      description:
        "Scalable MERN applications with clean architecture and secure APIs.",
    },
    {
      icon: <SiMongodb />,
      title: "REST API & Backend Development",
      description:
        "Secure and efficient REST APIs using Node.js, Express, and MongoDB.",
    },
    {
      icon: <HiOutlineShieldCheck />,
      title: "Authentication & Authorization",
      description:
        "JWT-based authentication and role-based access systems.",
    },
    {
      icon: <MdProductionQuantityLimits />,
      title: "E-commerce Front-end & Dashboard",
      description:
        "Interactive e-commerce UI and admin dashboards.",
    },
    {
      icon: <SiFigma />,
      title: "Figma to React Conversion",
      description:
        "Pixel-perfect conversion from Figma to responsive React components.",
    },
    {
      icon: <PiBaseballHelmetDuotone />,
      title: "Construction & Corporate Websites",
      description:
        "Modern corporate and construction websites with strong branding.",
    },
  ];

  return (
    <section id="services" ref={ref} className="py-24 text-white">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          My Service Types
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="text-gray-300 font-semibold mb-16 max-w-2xl mx-auto"
        >
          Design-focused MERN stack solutions built for performance, scalability,
          and modern user experience.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="
                relative group
                rounded-2xl p-7
                bg-[#12121c]
                border border-white/5
                hover:border-purple-500/40
                transition-all duration-300
              "
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* icon */}
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-xl bg-purple-500/10 text-purple-400 text-2xl mb-6 mx-auto">
                {service.icon}
              </div>

              <h3 className="relative z-10 text-xl font-semibold mb-3 text-white">
                {service.title}
              </h3>

              <p className="relative z-10 text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
