import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Trophy as TrophyIcon } from 'lucide-react';
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

  return (
    <div 
      className={styles.card}
      onClick={() => onClick && onClick(cat)}
    >
      <div className={styles.cardLeft}>
        <div className={styles.iconCircle}>
          <TrophyIcon size={20} className={styles.trophyIcon} />
        </div>
        <div className={styles.textContainer}>
          {englishText && <h4 className={styles.englishText}>{englishText}</h4>}
          <span className={styles.tamilText}>{tamilText}</span>
        </div>
      </div>

      <div className={styles.actionBtn}>
        <ArrowRight size={16} className={styles.actionArrow} />
      </div>
    </div>
  );
};

const CategoriesGrid = ({ onCategoryClick }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current ? gridRef.current.querySelectorAll(`.${styles.card}`) : [];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(cards, 
            { y: 35, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'power2.out' }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

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
        
        {/* Centered Award Recognitions & Heading */}
        <div className={styles.headerCenter}>
          <span className={styles.eyebrow}>AWARD RECOGNITIONS</span>
          <h2 className={styles.heading}>Explore Award Categories</h2>
        </div>
        
        {/* Clean 3-Column Grid */}
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
