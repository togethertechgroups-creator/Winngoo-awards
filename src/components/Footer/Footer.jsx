import React from 'react';
import styles from './Footer.module.css';
import WinngooLogo from '../../assets/WinngooLogo';
import FooterParticleCanvas from './FooterParticleCanvas';

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

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
          <p className={styles.addressText}>
            17, New no.45, Lattice Brg Rd, Padmanabha Street, Adyar, Chennai, Tamil Nadu 600020
          </p>
          
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

        {/* Social Links with Elegant Spring Bounces & Rings */}
        <div className={styles.socialRow}>
          <a href="#" className={styles.socialIcon} aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Twitter">
            <TwitterIcon />
          </a>
          <a href="#" className={styles.socialIcon} aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>© 2026 Winngoo Business Awards. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
