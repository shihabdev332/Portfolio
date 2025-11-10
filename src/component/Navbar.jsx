import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-scroll";

const Navbar = () => {
  const variants = {
    open: { clipPath: "circle(1200px at 43px 43px)" },
    transition: { type: "spring", stiffness: 200, damping: 20 },
    closed: {
      clipPath: "circle(25px at 43px 37px)",
      transition: { type: "spring", duration: 0.5, stiffness: 200, damping: 20 },
    },
  };

  const [menu, setMenu] = useState(false);

  const items = [
    { id: 1, text: "About", to: "about" },
    { id: 2, text: "Services", to: "services" },
    { id: 3, text: "Work", to: "work" },
    { id: 4, text: "Contact", to: "contact" },
  ];

  const handleMobileLinkClick = () => {
    setMenu(false); // mobile menu close on click
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} // faster animation
        className="container mx-auto hidden md:flex justify-between items-center py-6 shadow-[0_4px_6px_-1px_rgba(156,163,175,0.3)]"
      >
        <div className="text-xl lg:text-2xl font-bold flex items-center gap-1 cursor-pointer">
          <span className="text-purple-500">PRO</span>
          <span className="text-purple-700 italic">CODER</span>
        </div>
        <div>
          <ul className="hidden md:flex items-center space-x-6 list-none lg:text-xl font-semibold md:text-base text-white cursor-pointer">
            {items.map(({ id, text, to }) => (
              <li key={id}>
                <Link to={to} smooth={true} duration={300} offset={-70} className="cursor-pointer">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <a
        href="#contact"
         className="md:text-base lg:text-lg bg-purple-500 hover:bg-purple-700 transition duration-200 py-2 text-white rounded-4xl cursor-pointer font-bold">
        Hire ME
        </a>
      </motion.div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between items-center">
        <motion.div animate={menu ? "open" : "closed"} className="relative">
          <motion.div
            variants={variants}
            onClick={() => setMenu((prev) => !prev)}
            className="bg-purple-300 w-2/3 h-screen text-black font-bold cursor-pointer fixed z-10"
          >
            <div className="px-7 py-6 cursor-pointer">
              {menu ? <IoCloseSharp size={30} /> : <AiOutlineMenu size={30} />}
            </div>
            {menu && (
              <div className="flex flex-col justify-center items-center mt-10 cursor-pointer">
                <ul className="space-y-6 text-black text-lg">
                  {items.map(({ id, text, to }) => (
                    <li
                      key={id}
                      className="hover:text-purple-500 duration-150 cursor-pointer"
                    >
                      <Link
                        to={to}
                        smooth={true}
                        duration={300}
                        offset={-70}
                        onClick={handleMobileLinkClick} // close menu on click
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
                <a 
                href="#contact"
                className="text-lg bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-4xl mt-6 cursor-pointer">
                  Hire ME
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.3 }} // faster animation
          className="text-xl font-bold items-center gap-2 py-6 px-4 cursor-pointer"
        >
          <span className="text-purple-500">PRO</span>
          <span className="text-purple-600 italic">CODER</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
