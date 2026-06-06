import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Trophy from '../../assets/Trophy';
import styles from './CategoriesGrid.module.css';

const categories = [
  "சமூக சேவை விருது / Social Service Award",
  "தொழில்முனைவோர் விருது / Business Development Award",
  "பொழுதுபோக்கு கலைஞர் விருது / Entertainer Award",
  "அழகுக்கலை நிபுணர் விருது / Beautician Award",
  "இன்ஃப்ளூயன்சர் விருது / Influencer Award",
  "மகளிர் தொழில்முனைவோர் மற்றும் முன்னேற்ற விருது / Women Entrepreneur and Empowerment Award",
  "இளம் தொழில்முனைவோர் விருது / Young Entrepreneur Award",
  "விருந்தோம்பல் சேவை விருது / Hospitality Award",
  "ரியல் எஸ்டேட் நிறுவனம் விருது / Real Estate Company Award",
  "இளம் நடனக் கலைஞர் (ஆண்,பெண்) விருது / Young Dancer Award (Male & Female)",
  "சுற்றுலா நிறுவனம் விருது / Travel Agency Award",
  "சுற்றுலா ஏற்பாட்டாளர் விருது / Tour Operator Award",
  "பாரம்பரிய கலைகள் விருது / Traditional Arts Award",
  "பாடகர்,பாடகி விருது / Singer Award",
  "ஒளிப்பதிவாளர் விருது / Cameraman Award",
  "ஆடை வடிவமைப்பாளர் விருது / Fashion Designer Award",
  "வணிக விருது / Business Award",
  "புகைப்பட விருது / Photography Award",
  "விளையாட்டு விருது / Sports Award",
  "உணவு விருது / Food Award",
  "தாய்மையின் சக்தி விருது / Power of Motherhood Award",
  "பெருமைக்குரிய தந்தை விருது / Proud Father Award"
];

const CategoryCard = ({ cat, onClick }) => {
  const parts = cat.split(" / ");
  const tamilText = parts[0];
  const englishText = parts.length > 1 ? parts[1] : null;

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // For flashlight effect
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    // For 3D tilt (Stronger and smoother)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -35; 
    const rotateY = ((x - centerX) / centerX) * 35;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.05,
      y: -10, // lift up
      duration: 0.4,
      ease: 'power3.out',
      transformPerspective: 800
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: 'elastic.out(1.2, 0.3)' // Premium fluid bounce back
    });
  };

  return (
    <div 
      ref={cardRef}
      className={`glass-card ${styles.card}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick && onClick(cat)}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.cardGlow}></div>
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          <Trophy size={36} />
        </div>
        <h3 className={styles.categoryName}>
          {englishText && <span className={styles.englishText}>{englishText}</span>}
          <span className={styles.tamilText}>{tamilText}</span>
        </h3>
      </div>
    </div>
  );
};

const CategoriesGrid = ({ onCategoryClick }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
    
    // Intersection Observer to trigger animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(cards, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) observer.unobserve(gridRef.current);
    };
  }, []);

  return (
    <section className={styles.categoriesSection} id="categories">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.heading} section-heading`}>Award Categories</h2>
          <div className={styles.goldLine}></div>
        </div>
        
        <div className={styles.grid} ref={gridRef}>
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} cat={cat} onClick={onCategoryClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
