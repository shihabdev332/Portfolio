import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const whatsappNumber = "+8801757288373";
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "⚠ Name is required!";
    if (!formData.email.trim()) newErrors.email = "⚠ Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "⚠ Invalid email!";
    if (!formData.message.trim()) newErrors.message = "⚠ Message is required!";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) return setErrors(validationErrors);

    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 25px rgba(37,211,102,0.7)" },
    tap: { scale: 0.95 },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen py-20 px-6 sm:px-12 bg-gradient-to-br from-[#0F0F13] to-[#1a1a25] relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-purple-800/10 to-transparent -z-10"></div>

      <motion.div
        className="container mx-auto flex flex-col items-center gap-12"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {/* Intro Text */}
        <motion.div
          className="text-center max-w-2xl"
          variants={formVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl">
            Whether you want to discuss a project, collaborate, or just say hi, feel free to reach out. 
            I respond quickly and love connecting with people worldwide.
          </p>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-600 py-4 px-10 rounded-2xl text-white font-bold shadow-lg hover:shadow-green-400/50 transition-all duration-300 text-lg"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
          Message Me on WhatsApp
        </motion.a>

        {/* Email Form */}
        <motion.div
          className="bg-gray-800 p-10 rounded-3xl shadow-2xl border border-purple-700/30 w-full max-w-lg"
          variants={formVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          {isSubmitted && <p className="text-green-400 text-center mb-4">✅ Message Sent Successfully!</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-4 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500 transition shadow-md"
              />
              {errors.name && <p className="text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-4 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500 transition shadow-md"
              />
              {errors.email && <p className="text-red-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full p-4 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500 h-36 transition shadow-md"
              />
              {errors.message && <p className="text-red-400 mt-1">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
