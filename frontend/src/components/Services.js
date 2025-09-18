import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Mobile App Development',
    description: 'We build beautiful and intuitive mobile apps for both iOS & Android, putting your brand in the hands of your customers.',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', // Smartphone icon
  },
  {
    title: 'Custom Website Development',
    description: 'From stunning marketing sites to complex web applications, we build custom websites that drive results.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', // Code icon
  },
  {
    title: 'Modern & Intuitive UX/UI Design',
    description: 'We create user-centric designs that are not only beautiful but also easy to use, ensuring a seamless user experience.',
    icon: 'M3 10h18M3 14h18M4 6h16M4 18h16', // Design icon
  },
  {
    title: 'App Maintenance & Updates',
    description: 'We provide ongoing support and updates to ensure your app remains secure, up-to-date, and running smoothly.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', // Cog icon
  },
  {
    title: 'AI-Powered Chatbots & Virtual Assistants',
    description: 'Engage your customers 24/7 with intelligent chatbots and virtual assistants that provide instant support and automate tasks.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', // Chat icon
  },
  {
    title: 'Everything AI Driven',
    description: 'We leverage the power of AI to build intelligent solutions that automate processes, generate insights, and drive business growth.',
    icon: 'M5 13l4 4L19 7', // Check icon
  },
];

const Services = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="services" className="bg-gradient-to-b from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="text-xl text-gray-600 mt-4">What we can do for you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-indigo-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon}></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 text-lg">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;