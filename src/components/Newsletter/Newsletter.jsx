import React, { useState } from 'react';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import styles from './Newsletter.module.css';

const RECIPIENT_EMAIL = 'winngooawards@gmail.com';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mailtoLink, setMailtoLink] = useState('');

  const buildMailFormat = (subscriberEmail) => {
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const subject = `New Newsletter Subscription - ${subscriberEmail} - Winngoo Awards 2027`;
    const body = 
`🏆 WINNGOO AWARDS 2027 - NEWSLETTER SUBSCRIPTION
==================================================

A new subscriber has registered for Winngoo Awards ceremony updates and announcements.

📋 SUBSCRIBER INFORMATION:
--------------------------------------------------
• Email Address: ${subscriberEmail}
• Subscription Date: ${timestamp}
• Event: Winngoo Awards 2027
• Source: Official Website (Newsletter Banner)
• Requested Updates: Ceremony passes, jury announcements, & event schedules.

--------------------------------------------------
Please add this email address to the Winngoo Awards mailing list.
`;

    return { subject, body };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    const { subject, body } = buildMailFormat(email);
    const mailto = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailtoLink(mailto);

    try {
      // 1. Direct background dispatch to winngooawards@gmail.com
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
          Subscription_Date: new Date().toLocaleString(),
          Source: 'Winngoo Awards Website Newsletter Subscription',
          Mail_Format: body
        })
      });
    } catch (err) {
      console.log('Direct submission notification:', err);
    } finally {
      // 2. Trigger native mail client with prefilled mail format
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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.capsuleCard}>
          
          <div className={styles.textSide}>
            <span className={styles.eyebrow}>STAY CONNECTED</span>
            <h3 className={styles.title}>Subscribe to Winngoo Awards Updates</h3>
            <p className={styles.subtitle}>
              Get the latest updates, jury announcements, and ceremony passes directly to your inbox.
            </p>
          </div>

          <div className={styles.formSide}>
            {subscribed ? (
              <div className={styles.successMsg}>
                <CheckCircle2 size={24} className={styles.checkIcon} />
                <div className={styles.mailSuccessDetails}>
                  <span><strong>Thank you!</strong> Subscription sent to <code>{RECIPIENT_EMAIL}</code>.</span>
                  {mailtoLink && (
                    <a href={mailtoLink} className={styles.openMailLink}>
                      <Mail size={14} /> Open in Email App
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className={styles.input}
                  required
                  disabled={isSubmitting}
                />
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className={styles.spinner} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
