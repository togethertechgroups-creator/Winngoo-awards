import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BokehBackground from './components/BokehBackground';
import HeroSection from './components/HeroSection/HeroSection';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';
import NominationForm from './components/NominationForm/NominationForm';
import Footer from './components/Footer/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const nominateSection = document.getElementById('nominate');
    if (nominateSection) {
      nominateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    gsap.utils.toArray('.section-heading').forEach((heading) => {
      gsap.fromTo(heading, 
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { 
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 85%", once: true }
        }
      );
    });
  }, []);

  return (
    <div className="app-container">
      {/* New Bokeh Background Layer */}
      <BokehBackground />

      <header className="top-header">
        <div className="header-container">
          <div className="header-left">
          </div>
          <div className="header-center">
            <h2 className="header-text">WINNGOO AWARDS</h2>
          </div>
          <div className="header-right"></div> {/* For flexbox centering balance */}
        </div>
      </header>

      <main>
        <HeroSection />
        <CategoriesGrid onCategoryClick={handleCategoryClick} />
        <NominationForm preSelectedCategory={selectedCategory} />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
