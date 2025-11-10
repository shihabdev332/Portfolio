
import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer"

const Company = () => {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const companies = [
    "YEllo Amber It",
    "Bruaracia",
    "My Captain",
    "Umion Living",
    "Accenture",
  ];

  const companiesList = [...companies, ...companies];


const scrollVarient1={
  animate:{
    x:[0, -500],
    transition:{
      x:{
        repeat:Infinity,
        repeatType:"loop",
        duration:15,
        ease:"linear",
      }
    }
  }
}

const scrollVarient2={
  animate:{
    x:[-500, 0],
    transition:
    {
      x:{
        repeat:Infinity,
        repeatType:"loop",
        duration:15,
        ease:"linear",
      }
    }
  }
}



  return (
 
   

<motion.div
 ref={ref}
 initial={{opacity:0, y:100}}
 animate={inView ?{opacity:1, y:0} : {}}
 transition={{delay:0.7, duration:0.5}}

    className="text-white py-1.5">
      <div className="container mx-auto text-center ">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Companies I've worked with
        </h2>
        <div className="overflow-hidden relative w-full mt-5">
        <motion.div
      variants={scrollVarient1}
      animate="animate"
        className="whitespace-nowrap flex space-x-10">
          {companiesList.map((companies, index) => (
              <div
                key={index}
                  className="text-lg bg-gray-800 px-6 py-3 rounded-full inline-block"
              >
                {companies}
              </div> 
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden relative w-full mt-5">
          <motion.div
          variants={scrollVarient2}
      animate="animate"

          className="whitespace-nowrap flex space-x-10">
            {companiesList.map((companies, index) => (
              <div
                key={index}
                className="text-lg bg-gray-800 px-6 py-3 rounded-full inline-block"
              >
                {companies}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Company;
