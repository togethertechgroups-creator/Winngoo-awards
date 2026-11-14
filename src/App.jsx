import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BokehBackground from './components/BokehBackground';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';
import GalaBanner from './components/GalaBanner/GalaBanner';
import NominationForm from './components/NominationForm/NominationForm';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import HeaderTrophy from './assets/HeaderTrophy';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const nominateSection = document.getElementById('nominate');
    if (nominateSection) {
      nominateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // 1. Disable browser scroll restoration so it never restores previous scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Clear any anchor hash on reload so browser doesn't jump to #nominate or other sections
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // 3. Immediately scroll to the top (Hero Section)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div className="app-container">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      
      {/* Subtle organic ambient bokeh */}
      <BokehBackground />

      {/* Top Header — Displaying "Winngoo Awards" flanked by Classic Gold Trophies */}
      <header className="top-header">
        <div className="header-container">
          <div className="header-title-wrapper">
            <HeaderTrophy size={32} className="header-trophy-svg header-trophy-left" />
            <h1 className="header-single-title">
              Winngoo Awards
            </h1>
            <HeaderTrophy size={32} className="header-trophy-svg header-trophy-right" />
          </div>
        </div>
      </header>

      {/* Main Page Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <CategoriesGrid onCategoryClick={handleCategoryClick} />
        <GalaBanner />
        <div id="nominate">
          <NominationForm preSelectedCategory={selectedCategory} />
        </div>
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default App;
