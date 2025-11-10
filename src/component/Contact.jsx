import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ContactForm = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "⚠ Name is required!";
    if (!formData.email.trim()) {
      newErrors.email = "⚠ Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "⚠ Invalid email format!";
    }
    if (!formData.message.trim()) newErrors.message = "⚠ Message is required!";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate form submission
    console.log("Form Data Submitted:", formData);
    setIsSubmitted(true);

    // Reset Form
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div id="contact"
    className="min-h-screen flex items-center justify-center bg-gray-900 px-6 overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg overflow-hidden" // Added overflow-hidden
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl font-bold text-white text-center mb-6"
        >
          Contact Me
        </motion.h2>

        {isSubmitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 text-center mb-4"
          >
            ✅ Message Sent Successfully!
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 overflow-hidden"> {/* Added overflow-hidden here */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-gray-300">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-400">{errors.name}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label className="block text-gray-300">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400">{errors.email}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <label className="block text-gray-300">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-500 h-32"
              placeholder="Write your message..."
            />
            {errors.message && <p className="text-red-400">{errors.message}</p>}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition cursor-pointer"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;
