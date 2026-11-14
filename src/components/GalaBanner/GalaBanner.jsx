import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import styles from './GalaBanner.module.css';

const GalaBanner = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.bannerCard}>
          <div className={styles.bannerOverlay}></div>
          
          <div className={styles.content}>
            <h2 className={styles.title}>
              Join Tamil Nadu's Premier Business Gathering
            </h2>

            <p className={styles.subtitle}>
              An unforgettable evening celebrating remarkable achievements, visionary entrepreneurship, 
              and leadership excellence.
            </p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>February 07</span>
              </div>
            </div>

            <a href="#nominate" className={styles.ctaBtn}>
              <span>Submit a Nomination Now</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalaBanner;
