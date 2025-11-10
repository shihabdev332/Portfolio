import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    id: 1,
    title: "Construction Website",
    description:
      "A modern and responsive website for a construction company, showcasing services, projects, and contact information.",
    image: "/1.png",
    link: "https://construction-website-rose-two.vercel.app/",
    technologies: ["#React, ", "MUi, ", "framer-motion, ", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Agency Website",
    description:
      "A modern and responsive website for a construction company, showcasing services, projects, and contact information.",
    image: "/2.png",
    link: "https://agency-weld-kappa.vercel.app/",
    technologies: [
      "#HTML, ",
      "CSS, ",
      "JavaScript, ",
      "React, ",
      "Tailwind CSS",
    ],
  },
  {
    id: 3,
    title: "E-commerce Website",
    description:
      "A modern e-commerce website with React, featuring fast performance, dynamic UI, and responsive design.",
    image: "/e1.png",
    link: "https://project1-cyan-one.vercel.app/",
    technologies: [
      "#HTML, ",
      "CSS, ",
      "JavaScript, ",
      "React, ",
      "Tailwind CSS",
    ],
  },
    {
    id: 4,
    title: "E-commerce Website",
    description:
      "A fully responsive e-commerce website with modern UI, dynamic features, and seamless user experience.",
    image: "/client.png",
    link: "https://digital-shop-front-end-yk7p.vercel.app/",
    technologies: ["#React, ", "Tailwind Css, ",  "Express.Js,", "Mongoose"],
  },
    {
    id: 5,
    title: "Admin Panel",
    description:
      "A fully responsive e-commerce Admin Panel with modern UI, dynamic features, and seamless Admin experience.",
    image: "/admin.png",
    link: "https://digital-shop-admin-panel-6x1n.vercel.app/",
    technologies: ["#React, ", "Tailwind CSS, ", "Mongoose,", "Express"],
  },

];

const Work = () => {
  // Header animation
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  // Description animation
  const [descRef, descInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px",
  });

  return (
    <div id="work" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.h2
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-4xl text-white underline font-bold text-center mb-12"
        >
          My Work
        </motion.h2>

        {/* Description */}
        <motion.p
          ref={descRef}
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-gray-400 text-center"
        >
          A collection of my latest projects showcasing my skills in web development and UI/UX design.
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((project) => {
            
            const [projectRef, projectInView] = useInView({
              triggerOnce: false, 
              threshold: 0.1,
              rootMargin: "-50px 0px",
            });

            return (
              <motion.div
                ref={projectRef}
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={projectInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: project.id * 0.1,
                  ease: "easeInOut",
                }}
                className="bg-gray-900 shadow shadow-purple-300 rounded-lg overflow-hidden"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-auto sm:h-52 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl text-white font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{project.description}</p>
                  <h4 className="text-[20px] text-purple-500 mb-4">
                    {project.technologies}
                  </h4>
                  <div className="flex justify-center">
                    <button
                      onClick={() => window.open(project.link, "_blank")}
                      className="text-white bg-purple-400 hover:bg-purple-700 px-6 py-3 rounded-full transition duration-300 cursor-pointer"
                      aria-label={`Visit ${project.title} website`}
                    >
                      Visit Website
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
