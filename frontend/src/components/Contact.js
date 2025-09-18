import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('/api/contact/', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Error sending message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-lg text-gray-600 mt-2">We'd love to hear from you</p>
        </div>
        <motion.div
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <motion.button
                type="submit"
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </div>
          </form>
          {status && <p className="text-center mt-4">{status}</p>}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;