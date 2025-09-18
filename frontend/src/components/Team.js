import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Christian Malonga',
    role: 'AI Developer & AI consultant',
    image: 'https://via.placeholder.com/150',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Samuel Ilunga',
    role: 'Full Stack Developer',
    image: 'https://via.placeholder.com/150',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Deogratias',
    role: 'Frontend Developer',
    image: 'https://via.placeholder.com/150',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
];

const Team = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="team" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Team</h2>
          <p className="text-lg text-gray-600 mt-2">The people behind the magic</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-lg shadow-lg text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
            >
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.social.twitter} className="text-gray-400 hover:text-indigo-600 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.27 0 .34.04.67.11.98-3.56-.18-6.72-1.88-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.48.75 2.79 1.9 3.55-.7-.02-1.36-.22-1.94-.54v.05c0 2.07 1.47 3.8 3.42 4.19-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.7 2.1 2.93 3.95 2.96-1.46 1.14-3.3 1.82-5.3 1.82-.34 0-.68-.02-1.02-.06 1.88 1.2 4.12 1.9 6.56 1.9 7.85 0 12.15-6.5 12.15-12.15 0-.18 0-.37-.01-.55.83-.6 1.56-1.35 2.14-2.22z"></path>
                  </svg>
                </a>
                <a href={member.social.linkedin} className="text-gray-400 hover:text-indigo-600 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a href={member.social.github} className="text-gray-400 hover:text-indigo-600 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;