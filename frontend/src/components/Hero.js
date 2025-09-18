import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-6 py-32 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Codigo
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          We build beautiful and reliable software solutions.
        </motion.p>
        <motion.a
          href="#contact"
          className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Get in Touch
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
