import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div>
      <Header ref={headerRef} />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
      <Chatbot headerHeight={headerHeight} />
    </div>
  );
}

export default App;