import React, { useEffect, useRef, useState } from 'react';
import styles from './Preloader.module.css';
import videoSrc from '../../assets/Need_to_Generate_a_K_Cinemati.mp4';

const Preloader = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);
  const isEndingRef = useRef(false);

  const handleVideoEnd = () => {
    if (isEndingRef.current) return;
    isEndingRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 1000); // Match this with CSS transition duration
  };

  // Fallback timeout in case video fails to load
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 3) {
         handleVideoEnd();
      }
    }, 8000); // 8 seconds fallback

    return () => clearTimeout(fallbackTimeout);
  }, []);

  return (
    <div className={`${styles.preloaderContainer} ${isFadingOut ? styles.fadeOut : ''}`}>
      <video 
        ref={videoRef}
        className={styles.video}
        src={videoSrc}
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
