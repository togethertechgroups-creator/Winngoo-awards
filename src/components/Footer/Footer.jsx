import React, { useState } from 'react';
import { CheckCircle2, Loader2, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';
import WinngooLogo from '../../assets/WinngooLogo';
import FooterParticleCanvas from './FooterParticleCanvas';

const RECIPIENT_EMAIL = 'winngooawards@gmail.com';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const subject = `New Newsletter Subscription - ${email} - Winngoo Awards`;
    const body = 
`🏆 WINNGOO AWARDS - NEWSLETTER SUBSCRIPTION
==================================================

A new user has subscribed to ceremony updates via the official footer loop!

📋 SUBSCRIBER INFORMATION:
--------------------------------------------------
• Email Address: ${email}
• Date & Time: ${timestamp}
• Source: Winngoo Awards Official Footer (Stay In The Loop)
• Status: Active Subscriber

--------------------------------------------------
Please add this email to the official Winngoo Awards broadcast list.
`;

    const mailto = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          _replyto: email,
          Subscriber_Email: email,
          Date: timestamp,
          Source: 'Footer Stay In The Loop',
          Message: body
        })
      });
    } catch (err) {
      console.log('Background subscription dispatch:', err);
    } finally {
      window.location.href = mailto;
      setIsSubmitting(false);
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 7000);
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Dynamic Award Gala Celebration Embers & Twinkling Sparkles */}
      <FooterParticleCanvas />

      {/* Subtle organic ambient radial glows */}
      <div className={styles.ambientTop}></div>
      <div className={styles.ambientBottom}></div>

      <div className={styles.container}>
        
        {/* Top Section: Navigation Columns on Left + "Stay In The Loop" Box on Right */}
        <div className={styles.topSection}>
          
          {/* 4 Link Columns */}
          <div className={styles.columnsGrid}>
            
            {/* Column 1: Award Categories */}
            <div className={styles.col}>
              <h4 className={styles.colHeading}>Award Categories</h4>
              <ul className={styles.linkList}>
                <li><a href="#categories">Social Service Award</a></li>
                <li><a href="#categories">Business Development</a></li>
                <li><a href="#categories">Women Entrepreneur</a></li>
                <li><a href="#categories">Young Entrepreneur</a></li>
                <li><a href="#categories">Hospitality & Tourism</a></li>
                <li><a href="#categories">Traditional Arts Award</a></li>
              </ul>
            </div>

            {/* Column 2: Ceremony Programs */}
            <div className={styles.col}>
              <h4 className={styles.colHeading}>Ceremony Programs</h4>
              <ul className={styles.linkList}>
                <li><a href="#chief-guest">Chief Guest Felicitation</a></li>
                <li><a href="#nominate">Gala Ceremony Passes</a></li>
                <li><a href="#nominate">Award Trophy Presentation</a></li>
                <li><a href="#about">Leadership Recognition</a></li>
                <li><a href="#about">Networking Reception</a></li>
                <li><a href="#nominate">Title Sponsorship</a></li>
              </ul>
            </div>

            {/* Column 3: Organization */}
            <div className={styles.col}>
              <h4 className={styles.colHeading}>Organization</h4>
              <ul className={styles.linkList}>
                <li><a href="#about">About Winngoo</a></li>
                <li>
                  <a href="#nominate" className={styles.badgeLink}>
                    <span>Nomination</span>
                    <span className={styles.hiringBadge}>OPEN</span>
                  </a>
                </li>
                <li><a href="#about">Jury Selection Process</a></li>
                <li><a href="#categories">Evaluation Criteria</a></li>
                <li><a href="#nominate">Event Schedule</a></li>
                <li><a href="#about">Past Honorees</a></li>
              </ul>
            </div>

            {/* Column 4: Contact & Support */}
            <div className={styles.col}>
              <h4 className={styles.colHeading}>Contact & Support</h4>
              <ul className={styles.linkList}>
                <li><a href="tel:+918015677018">+91 80156 77018</a></li>
                <li><a href="tel:+919087788345">+91 90877 88345</a></li>
                <li><a href="mailto:winngooawards@gmail.com">winngooawards@gmail.com</a></li>
                <li><a href="https://wa.me/918015677018" target="_blank" rel="noreferrer">WhatsApp Helpdesk</a></li>
                <li><a href="#nominate">Chennai Office</a></li>
                <li><a href="#nominate">Nominate a Leader</a></li>
              </ul>
            </div>

          </div>

          {/* Right Side: "Stay In The Loop" Box + Trust Ratings & Certified Badge */}
          <div className={styles.newsletterSide}>
            
            <div className={styles.loopCard}>
              <h4 className={styles.loopTitle}>Stay in the loop</h4>
              
              {subscribed ? (
                <div className={styles.loopSuccess}>
                  <CheckCircle2 size={18} className={styles.successIcon} />
                  <span>Subscribed! Notification sent to <code>{RECIPIENT_EMAIL}</code></span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className={styles.loopForm}>
                  <div className={styles.inputWrapper}>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email*" 
                      className={styles.loopInput}
                      required
                      disabled={isSubmitting}
                    />
                    <button type="submit" className={styles.loopBtn} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <Loader2 size={16} className={styles.spinner} />
                      ) : (
                        <span>Subscribe</span>
                      )}
                    </button>
                  </div>
                </form>
              )}

              <p className={styles.loopDisclaimer}>
                By signing up, I agree with the event participation & notification policy of Winngoo Awards.
              </p>
            </div>

            {/* Star Rating Badge (Based on 1,500+ Reviews) */}
            <div className={styles.ratingRow}>
              <div className={styles.starGroup}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className={styles.starIcon} fill="#EADBC0" />
                ))}
              </div>
              <span className={styles.ratingText}>Based on 1,500+ nominees & attendees</span>
            </div>

            {/* Certified Trust Shield Badge */}
            <div className={styles.trustBadge}>
              <div className={styles.shieldIconWrapper}>
                <ShieldCheck size={20} className={styles.shieldIcon} />
              </div>
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Winngoo Verified</span>
                <span className={styles.trustSubtitle}>Excellence Recognition</span>
              </div>
            </div>

          </div>

        </div>

        {/* Massive Brand Wordmark Row: Intertwined Gold "W" Logo + Giant "WINNGOO" */}
        <div className={styles.giantBrandRow}>
          <div className={styles.brandLogoWrap}>
            <div className={styles.logoAura}></div>
            <div className={styles.logoFloating}>
              <WinngooLogo size={64} />
            </div>
          </div>
          <h2 className={styles.giantWordmark}>WINNGOO</h2>
        </div>

        {/* Tamil Tagline Mission Statement */}
        <p className={styles.tagline}>
          தொழில்துறையில் சிறந்து விளங்கும் வணிகர்கள் மற்றும் நிறுவனங்களை கௌரவிக்கும் மாபெரும் விருது வழங்கும் விழா
        </p>

        {/* Bottom Sub-Footer Bar: Legal Links on Left, Copyright on Right */}
        <div className={styles.subFooter}>
          <div className={styles.legalLinks}>
            <a href="#about">Terms</a>
            <a href="#about">Privacy</a>
            <a href="#nominate">Nomination Guidelines</a>
            <a href="#about">Selection Criteria</a>
            <a href="#categories">Categories</a>
            <a href="tel:+918015677018">Contact Support</a>
          </div>
          <p className={styles.copyright}>
            © 2026 Winngoo Business Awards. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
