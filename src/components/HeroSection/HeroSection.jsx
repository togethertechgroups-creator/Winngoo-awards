import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { 
  Trophy as TrophyIcon, 
  Handshake, 
  Users, 
  Award as AwardIcon, 
  ArrowRight
} from 'lucide-react';
import styles from './HeroSection.module.css';
import chiefGuestImg from '../../assets/cheif-guest-perarasu.png';
import awardTrophyImg from '../../assets/award-trophy.png';
import HeroParticleCanvas from './HeroParticleCanvas';

const FEATURE_BADGES = [
  { icon: TrophyIcon, label: "Recognized\nExcellence" },
  { icon: Handshake, label: "Valuable\nConnections" },
  { icon: Users, label: "Inspiring\nLeadership" },
  { icon: AwardIcon, label: "Grand\nCeremony" }
];

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1100
    });

    tl.add({
      targets: `.${styles.eyebrowTag}`,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800
    })
    .add({
      targets: `.${styles.mainHeading}`,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 900
    }, '-=600')
    .add({
      targets: `.${styles.tagline}`,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800
    }, '-=700')
    .add({
      targets: `.${styles.ctaRow}`,
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 700
    }, '-=600')
    .add({
      targets: `.${styles.featureBadgeItem}`,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(80),
      duration: 700
    }, '-=500')
    .add({
      targets: `.${styles.guestCardWrapper}`,
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.96, 1],
      duration: 1100,
      easing: 'easeOutCubic'
    }, '-=1000')
    .add({
      targets: `.${styles.trophyWrapper}`,
      opacity: [0, 1],
      translateX: [35, 0],
      scale: [0.92, 1],
      duration: 1000,
      easing: 'easeOutCubic'
    }, '-=800');
  }, []);

  const handleExploreClick = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroSection} ref={containerRef}>
      
      {/* Award Show Theme Animation: Sweeping Spotlights, Floating Golden Dust & Sparkle Stars */}
      <HeroParticleCanvas />

      {/* Gentle ambient background glows */}
      <div className={styles.ambientTopRight}></div>
      <div className={styles.ambientBottomLeft}></div>

      <div className={styles.container}>
        
        {/* Left Column — Editorial Heading & Intro */}
        <div className={styles.leftColumn}>
          
          <div className={styles.eyebrowTag}>
            <span className={styles.eyebrowDot}></span>
            <span>ANNUAL PRESTIGE &nbsp;|&nbsp; RECOGNITION &nbsp;|&nbsp; EXCELLENCE</span>
          </div>

          <h1 className={styles.mainHeading}>
            Honoring Excellence for a Greater Future
          </h1>

          <p className={styles.tagline}>
            Celebrating Tamil Nadu's most visionary entrepreneurs, innovators, and transformative business leaders shaping the future of industries.
          </p>

          <div className={styles.ctaRow}>
            <button 
              type="button" 
              className={styles.primaryBtn} 
              onClick={handleExploreClick}
            >
              <span>Explore Categories</span>
              <ArrowRight size={18} />
            </button>
            <a href="#nominate" className={styles.secondaryLink}>
              <span>Nominate a Leader</span>
            </a>
          </div>

          {/* 4 Feature Badges (Value Pillars) */}
          <div className={styles.featureBadgesRow}>
            {FEATURE_BADGES.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div key={idx} className={styles.featureBadgeItem}>
                  <div className={styles.badgeCircle}>
                    <IconComp size={18} className={styles.badgeIcon} />
                  </div>
                  <span className={styles.badgeText}>{badge.label}</span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column — Chief Guest Square Card (1:1 Ratio, No Tags) */}
        <div className={styles.rightColumn} id="chief-guest">
          
          <div className={styles.guestCardWrapper}>
            
            {/* Square Photo Frame (1:1 Aspect Ratio) */}
            <div className={styles.guestFrame}>
              <img 
                src={chiefGuestImg} 
                alt="Chief Guest Perarasu" 
                className={styles.chiefGuestImg} 
              />
            </div>

            {/* Guest Name & Role */}
            <div className={styles.guestBadge}>
              <h3 className={styles.guestName}>Perarasu</h3>
              <span className={styles.guestRole}>Renowned Film Director</span>
            </div>

            {/* Golden Statuette Award Trophy (Positioned with Breathing Space to the Right) */}
            <div className={styles.trophyWrapper}>
              <img 
                src={awardTrophyImg} 
                alt="Winngoo Golden Award Trophy" 
                className={styles.trophyImg} 
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;
