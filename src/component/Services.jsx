import { motion } from 'framer-motion';
import React from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { LiaPagerSolid } from 'react-icons/lia';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { PiBaseballHelmetDuotone } from 'react-icons/pi';
import { RiProfileLine } from 'react-icons/ri';
import { SiFigma } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // This ensures the animation can be triggered both on scroll up and down
    threshold: 0.05,
  });

  const services = [
    {
      icon: <RiProfileLine className='text-purple-500 text-4xl sm:text-3xl lg:text-6xl mb-4 mx-auto' />,
      title: "Portfolio Design",
      description: "I create modern, responsive, and visually stunning portfolio websites to showcase your skills, projects, and achievements effectively."
    },
    {
      icon: <LiaPagerSolid className='text-purple-500 text-4xl sm:text-3xl lg:text-6xl mb-4 mx-auto' />,
      title: "Landing Page Design",
      description: "I design high-converting, visually appealing, and fully responsive landing pages that captivate visitors and drive engagement."
    },
    {
      icon: <HiUserGroup className='text-purple-500 text-4xl sm:text-3xl lg:text-6xl mb-4 mx-auto' />,
      title: "Agency Website Design",
      description: "I create professional, modern, and fully responsive agency websites that showcase your services, build credibility, and attract potential clients."
    },
    {
      icon: <PiBaseballHelmetDuotone className='text-purple-500 text-4xl sm:text-3xl lg:text-6xl mb-4 mx-auto' />,
      title: "Construction Website Design",
      description: "I design robust, modern, and responsive construction websites that effectively showcase your projects, build trust, and engage potential clients with a professional online presence."
    },
    {
      icon: <MdProductionQuantityLimits className='text-purple-500 text-4xl sm:text-3xl lg:text-6xl mb-4 mx-auto' />,
      title: "E-commerce Website Front-end Design",
      description: "Create an interactive and seamless shopping experience with a custom-designed, responsive e-commerce front-end that enhances usability and drives conversions."
    },
    {
      icon: <SiFigma className='text-purple-500 text-4xl sm:text-3xl lg:text-6xl mb-4 mx-auto' />,
      title: "Figma to React/HTML Conversion",
      description: "I convert Figma designs into pixel-perfect, responsive React components or HTML pages, ensuring high-quality front-end implementation with smooth interactions and seamless performance."
    }
  ];

  return (
    <motion.div
      id='services'
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className='text-white p-6'
    >
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl md:text-4xl font-bold underline mb-8'>
          Services
        </h2>
        <p className='mb-12 text-gray-400'>Here Is Some Of my Services List</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className='bg-[#1c1a2b] rounded-lg p-6 text-center hover:shadow-lg hover:shadow-purple-700 transition-shadow duration-300'
            >
              {service.icon}
              <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold text-purple-500'>{service.title}</h3>
              <p className='text-sm sm:text-base lg:text-lg text-gray-400'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
