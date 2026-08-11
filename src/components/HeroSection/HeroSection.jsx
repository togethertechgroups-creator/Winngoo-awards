import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { MapPin, Calendar } from 'lucide-react';
import styles from './HeroSection.module.css';
import chiefGuestImg from '../../assets/cheif-guest.png';
import WinngooLogo from '../../assets/WinngooLogo';
import Trophy from '../../assets/Trophy';

const HeroSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const ruleRef = useRef(null);

  useEffect(() => {
    // Anime.js Entrance Timeline
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200
    });

    tl.add({
      targets: `.${styles.yearBg}`,
      opacity: [0, 0.15],
      scale: [0.8, 1],
      duration: 2000,
      easing: 'easeOutSine'
    })
    .add({
      targets: `.${styles.brandTitle}`,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000
    }, '-=1500')
    .add({
      targets: ruleRef.current,
      width: ['0%', '100%'],
      duration: 1200,
      easing: 'easeOutQuart'
    }, '-=800')
    .add({
      targets: `.${styles.tagline}`,
      opacity: [0, 1],
      translateY: [20, 0]
    }, '-=1000')
    .add({
      targets: imageRef.current,
      opacity: [0, 1],
      translateX: [50, 0],
      scale: [0.95, 1],
      duration: 1500,
      easing: 'easeOutElastic(1, .8)'
    }, '-=1200');

  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.container}>
        
        {/* Left side — Winngoo Brand Block */}
        <div className={styles.brandBlock} ref={textRef}>
          <div className={styles.trophyBg}>
            <Trophy size={500} />
          </div>
          <div className={styles.yearBg}>2026</div>
          <div className={styles.logoWrapper}>
            <WinngooLogo size={60} />
          </div>
          <h1 className={styles.brandTitle}>WINNGOO BUSINESS AWARDS</h1>
          <div className={styles.goldRule} ref={ruleRef}></div>
          <p className={styles.tagline}>Celebrating Excellence. Inspiring Achievement.</p>
        </div>

        {/* Editorial Image Composition */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper} ref={imageRef}>
            <div className={styles.spotlightLeft}></div>
            <div className={styles.spotlightRight}></div>
            <div className={styles.imageOverlay}></div>
            <img src={chiefGuestImg} alt="Pandiarajan" className={styles.heroImage} />
            
          </div>
          
          <div className={styles.guestLabel}>
            <span className={styles.guestRole}>Chief Guest</span>
            <span className={styles.guestName}>Pandiarajan</span>
            <span className={styles.guestTitle}>Actor & Director</span>

            <div className={styles.cardDivider}></div>

            <div className={styles.eventDetailsBox}>
              <div className={styles.eventDetailItem}>
                <MapPin size={16} className={styles.eventDetailIcon} />
                <span className={styles.eventDetailText}>Egmore Museum, Chennai</span>
              </div>
              <div className={styles.eventDetailItem}>
                <Calendar size={16} className={styles.eventDetailIcon} />
                <span className={styles.eventDetailText}>28-09-26</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
