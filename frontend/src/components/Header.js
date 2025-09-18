import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = React.forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header ref={ref} className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Codigo</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="text-gray-600 hover:text-indigo-600 transition duration-300">Home</a>
          <a href="#services" className="text-gray-600 hover:text-indigo-600 transition duration-300">Services</a>
          <a href="#about" className="text-gray-600 hover:text-indigo-600 transition duration-300">About</a>
          <a href="#team" className="text-gray-600 hover:text-indigo-600 transition duration-300">Team</a>
          <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition duration-300">Contact</a>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-indigo-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white px-6 pt-2 pb-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-600 hover:text-indigo-600 transition duration-300">Home</a>
              <a href="#services" className="text-gray-600 hover:text-indigo-600 transition duration-300">Services</a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600 transition duration-300">About</a>
              <a href="#team" className="text-gray-600 hover:text-indigo-600 transition duration-300">Team</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-600 transition duration-300">Contact</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

export default Header;
