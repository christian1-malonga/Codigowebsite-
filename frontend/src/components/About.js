import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">About us</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A team of passionate developers</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                At Codigo, we believe in the power of pure creation. In a digital world often dominated by off-the-shelf solutions and pre-configured templates, we have chosen the path of artisanal excellence: everything, absolutely everything, is thoughtfully designed and built from the ground up. This philosophy of "code, with everything made from scratch" is not merely a methodology; it is the very soul of our company, the ultimate guarantee that every solution we deliver is perfectly aligned with the unique DNA of your business, without compromise or limitation.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our team of passionate developers does more than just assemble existing blocks. We are the architects who draft the blueprints, the engineers who forge the materials, and the artisans who sculpt every detail. This complete mastery of the development process allows us to bring to life bespoke applications of unparalleled robustness, security, and performance, whether for complex web platforms, enterprise-grade management systems, or elegant mobile applications.
              </p>
            </div>
          </div>
          <img src="/assets/about.png" alt="About Us" className="w-full rounded-2xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442"/>
        </div>
      </div>
    </section>
  );
};

export default About;