import React from 'react';
import { Trophy, Users, Award, ArrowRight } from 'lucide-react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section id="about-story" className={styles.section}>
      <div className={styles.container}>

        {/* Story / Mission */}
        <div className={styles.contentCol}>
          <span className={styles.eyebrow}>OUR MISSION</span>
          <h2 className={styles.heading}>
            Honoring Visionaries, Inspiring Greater Achievements
          </h2>
          <p className={styles.description}>
            At Winngoo Awards, we believe in the power of visionary entrepreneurship. 
            Our mission is dedicated to discovering and celebrating the remarkable leaders, 
            innovative founders, and enterprises whose relentless dedication transforms our economy 
            and uplifts our community.
          </p>
          <a href="#categories" className={styles.storyLink}>
            <span>Explore All Categories</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Right Side: 3 Vertical Stat Cards */}
        <div className={styles.statsCol}>
          <div className={styles.statCard}>
            <div className={styles.iconCircle}>
              <Trophy size={20} className={styles.icon} />
            </div>
            <div className={styles.statInfo}>
              <h4 className={styles.statNumber}>22+ Categories</h4>
              <p className={styles.statText}>Recognizing multi-sector excellence</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.iconCircle}>
              <Users size={20} className={styles.icon} />
            </div>
            <div className={styles.statInfo}>
              <h4 className={styles.statNumber}>500+ Attendees</h4>
              <p className={styles.statText}>Entrepreneurs, founders & leaders</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.iconCircle}>
              <Award size={20} className={styles.icon} />
            </div>
            <div className={styles.statInfo}>
              <h4 className={styles.statNumber}>10K+ Network</h4>
              <p className={styles.statText}>Statewide business community</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
