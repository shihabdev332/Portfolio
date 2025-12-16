import React, { useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Agency Website",
    description:
      "A modern and responsive website for a construction company, showcasing services and projects.",
    image: "/2.png",
    link: "https://agency-weld-kappa.vercel.app/",
    code: "https://github.com/shihabdev332/Agency",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
  },
  {
    id: 2,
    title: "E-commerce Website",
    description:
      "A modern e-commerce website with fast performance and dynamic UI.",
    image: "/e1.png",
    link: "https://online-shop-txm5.vercel.app/",
    code: "https://github.com/shihabdev332/online-Shop",
    technologies: ["React", "Tailwind", "JavaScript"],
  },
  {
    id: 3,
    title: "E-commerce Website",
    description:
      "A fully responsive e-commerce website with seamless user experience.",
    image: "/client.png",
    link: "https://digital-shop-front-end-ebkb.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-Shop-Front-end",
    technologies: ["React", "Tailwind", "Express", "MongoDB"],
  },
  {
    id: 4,
    title: "Admin Panel",
    description: "A modern admin panel with full control and clean UI.",
    image: "/admin.png",
    link: "https://digital-shop-admin-panel-6x1n.vercel.app/",
    code: "https://github.com/shihabdev332/Digital-shop-admin-panel",
    technologies: ["React", "Tailwind", "Express", "MongoDB"],
  },
];

const WorkCard = ({ project, controls, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-60, 60], [12, -12]);
  const rotateY = useTransform(x, [-60, 60], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      whileHover={{ scale: 1.06 }}
      className="relative rounded-xl perspective-[1200px]"
    >
      {/* Animated Gradient Border */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-2px] rounded-xl
        bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400
        bg-[length:300%_300%] blur-sm opacity-80"
      />

      {/* Card */}
      <motion.div
        whileHover={{
          boxShadow: "0 0 45px rgba(168,85,247,0.9)",
        }}
        className="relative z-10 bg-gray-900 rounded-xl overflow-hidden"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-52 object-cover"
        />

        <div className="p-6">
          <h3 className="text-xl text-white font-semibold mb-2">
            {project.title}
          </h3>

          <p className="text-gray-400 mb-3">{project.description}</p>

          <p className="text-purple-400 text-sm mb-4">
            {project.technologies.join(", ")}
          </p>

          <div className="flex justify-center gap-5">
            <button
              onClick={() => window.open(project.link, "_blank")}
              className="bg-purple-600 hover:bg-purple-800 px-6 py-2 rounded-full text-white transition flex gap-1 font-bold cursor-pointer"
            >
              Visit Website
              <FaExternalLinkAlt className="text-sm mt-1.5 text-black" />
            </button>

            <button
              onClick={() => window.open(project.code, "_blank")}
              className="bg-green-600 hover:bg-green-800 px-6 py-2 rounded-full text-white transition flex gap-1 font-bold cursor-pointer"
            >
              Source Code
              <FaExternalLinkAlt className="text-sm mt-1.5 text-black" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Top Hover Text */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute top-4 left-0 right-0 z-20
        text-center text-blue-500 text-xl font-bold pointer-events-none"
      >
        Code with Shihab
      </motion.div>
    </motion.div>
  );
};

const Work = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  return (
    <section id="work" ref={ref} className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-4xl text-white font-bold underline text-center mb-6"
      >
        My Work
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ delay: 0.15 }}
        className="text-gray-400 text-center mb-12"
      >
        A collection of my latest projects showcasing modern UI and smooth
        interactions.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-7xl mx-auto px-4">
        {projects.map((project, index) => (
          <WorkCard
            key={project.id}
            project={project}
            index={index}
            controls={controls}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
