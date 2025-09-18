import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-4">
          <a href="#" className="mx-4 hover:text-indigo-500 transition duration-300">Twitter</a>
          <a href="#" className="mx-4 hover:text-indigo-500 transition duration-300">LinkedIn</a>
          <a href="#" className="mx-4 hover:text-indigo-500 transition duration-300">Github</a>
        </div>
        <p>&copy; 2025 Codigo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
