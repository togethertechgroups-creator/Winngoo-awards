import React from 'react';
import { Star } from 'lucide-react';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    quote: "Winngoo Awards provided our startup with immense industry credibility and opened invaluable doors for partnerships.",
    name: "Dr. K. Ravindran",
    role: "Founder, Zenith Healthcare Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    quote: "The evaluation process is thoroughly professional, transparent, and genuinely focused on recognizing ground-level impact.",
    name: "Meenakshi Sundaram",
    role: "Managing Director, Sri Krishna Exports",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    quote: "A magnificent gathering of Tamil Nadu's finest business minds. The recognition energized our entire team to aim higher.",
    name: "S. Venkatesh Kumar",
    role: "CEO, EcoGreen Sustainable Solutions",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <span className={styles.eyebrow}>VOICES OF EXCELLENCE</span>
          <h2 className={styles.heading}>Honoring Impact. Inspiring Success.</h2>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#C5A059" color="#C5A059" />
                ))}
              </div>
              <p className={styles.quote}>"{item.quote}"</p>
              
              <div className={styles.authorRow}>
                <img src={item.avatar} alt={item.name} className={styles.avatar} />
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{item.name}</h4>
                  <span className={styles.authorRole}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
