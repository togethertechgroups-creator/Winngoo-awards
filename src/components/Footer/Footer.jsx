import React from 'react';
import styles from './Footer.module.css';
import WinngooLogo from '../../assets/WinngooLogo';
import FooterParticleCanvas from './FooterParticleCanvas';

const PhoneIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Dynamic Award Gala Celebration Embers & Twinkling Sparkles */}
      <FooterParticleCanvas />

      {/* Subtle organic ambient radial glows */}
      <div className={styles.ambientTop}></div>
      <div className={styles.ambientBottom}></div>

      <div className={styles.container}>
        
        {/* Animated Brand Logo with Ambient Aura */}
        <div className={styles.logoWrapper}>
          <div className={styles.logoAura}></div>
          <div className={styles.logoFloating}>
            <WinngooLogo size={68} />
          </div>
        </div> 
        
        {/* Tamil Tagline */}
        <p className={styles.tagline}>
          தொழில்துறையில் சிறந்து விளங்கும் வணிகர்கள் மற்றும் நிறுவனங்களை கௌரவிக்கும் மாபெரும் விருது வழங்கும் விழா
        </p>

        {/* Shimmer Gold Line */}
        <div className={styles.goldShimmerLine}></div>

        <div className={styles.contactDetails}>
          <div className={styles.phoneNumbers}>
            <a href="tel:+918015677018" className={styles.phoneItem} title="Call +91 80156 77018">
              <div className={styles.phoneIconCircle}>
                <PhoneIcon size={14} />
              </div>
              <span>+91 80156 77018</span>
            </a>
            
            <span className={styles.phoneDivider}>|</span>
            
            <a href="tel:+919087788345" className={styles.phoneItem} title="Call +91 90877 88345">
              <div className={styles.phoneIconCircle}>
                <PhoneIcon size={14} />
              </div>
              <span>+91 90877 88345</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2026 Winngoo Business Awards. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
