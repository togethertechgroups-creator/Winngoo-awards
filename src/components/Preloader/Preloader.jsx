import React, { useEffect, useRef, useState } from 'react';
import styles from './Preloader.module.css';
import desktopVideoSrc from '../../assets/Need_to_Generate_a_K_Cinemati.mp4';
import mobileVideoSrc from '../../assets/redure_the_font_size_and_the_g.mp4';

const Preloader = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const videoRef = useRef(null);
  const isEndingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleVideoEnd = () => {
    if (isEndingRef.current) return;
    isEndingRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 1000); // Match this with CSS transition duration
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video failed to play:", err);
      });
    }

    // Fallback timeout in case video fails to load or play
    const fallbackTimeout = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 3) {
         handleVideoEnd();
      }
    }, 8000); // 8 seconds fallback

    return () => clearTimeout(fallbackTimeout);
  }, [isMobile]);

  return (
    <div className={`${styles.preloaderContainer} ${isFadingOut ? styles.fadeOut : ''}`}>
      <video 
        key={isMobile ? 'mobile' : 'desktop'}
        ref={videoRef}
        className={styles.video}
        src={isMobile ? mobileVideoSrc : desktopVideoSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
      <button className={styles.skipButton} onClick={handleVideoEnd}>
        Skip
      </button>
    </div>
  );
};

export default Preloader;
