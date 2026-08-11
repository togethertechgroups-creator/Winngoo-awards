import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2, QrCode } from 'lucide-react';
import styles from './NominationForm.module.css';
import qrCodeImg from '../../assets/image (1).png';

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

const NominationForm = ({ preSelectedCategory }) => {
  const [activeTab, setActiveTab] = useState('participant');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (preSelectedCategory) {
      setValue("awardTitle", preSelectedCategory);
      setActiveTab('participant');
    }
  }, [preSelectedCategory, setValue]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      let message = "";
      
      if (activeTab === 'participant') {
        message = `🏆 *New Nomination - Winngoo Awards* 🏆\n` +
                  `-----------------------------------\n` +
                  `*Name:* ${data.name}\n` +
                  `*Organization:* ${data.organization}\n` +
                  `*WhatsApp:* ${data.whatsapp}\n` +
                  `*Email:* ${data.email}\n` +
                  `*Designation:* ${data.designation}\n` +
                  `*Applying For:* ${data.applyingFor}\n` +
                  `*Ownership:* ${data.ownership}\n` +
                  `*Award Title:* ${data.awardTitle}\n` +
                  `*Experience:* ${data.experience} Years\n` +
                  `*Social Links:* ${data.socialLinks || 'N/A'}\n` +
                  `-----------------------------------`;
      } else {
        message = `🌟 *New Sponsor Registration - Winngoo Awards* 🌟\n` +
                  `-----------------------------------\n` +
                  `*Sponsor Name:* ${data.sponsorName}\n` +
                  `*Brand/Company:* ${data.sponsorCompany}\n` +
                  `*WhatsApp:* ${data.sponsorWhatsapp}\n` +
                  `*Email:* ${data.sponsorEmail}\n` +
                  `*Sponsorship Amount:* ₹25,000\n` +
                  `-----------------------------------`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918015677018?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={`glass-card ${styles.successCard}`}>
            <div className={styles.successIconWrapper}>
              <CheckCircle2 size={80} className={styles.successIcon} />
            </div>
            <h2 className={styles.successHeading}>Thank You for Your Nomination!</h2>
            <p className={styles.successText}>
              Your nomination has been successfully submitted. Our executive will contact you shortly.
            </p>
            <div className={styles.qrSection}>
              <h3 className={styles.qrTitle}>Proceed to Payment Now ({activeTab === 'participant' ? '₹5,000' : '₹25,000'})</h3>
              <div className={styles.qrWrapper}>
                <img src={qrCodeImg} alt="Payment QR Code" className={styles.qrImage} />
              </div>
              <p className={styles.qrHelpText}>
                Or you can pay later after getting clarifications about the awards event.
              </p>
            </div>

            <div className={styles.contactInfo}>
              <p>WhatsApp: +91 97900 37452 / +91 80156 77018</p>
              <p>Email: admin@winngoo.com</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formSection} id="nominate">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`${styles.heading} section-heading`}>Winngoo Awards Registration</h2>
          <p className={styles.subtitle}>Select your registration type below</p>
          <div className={styles.goldLine}></div>
        </div>

        <div className={styles.tabsWrapper}>
          <div className={styles.tabsContainer}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'participant' ? styles.active : ''}`}
              onClick={() => setActiveTab('participant')}
            >
              Participant Nomination
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'sponsor' ? styles.active : ''}`}
              onClick={() => setActiveTab('sponsor')}
            >
              Sponsor Registration
            </button>
          </div>
        </div>

        <div className={styles.formAmbient}></div>
        <div className={`glass-card ${styles.formContainer}`}>
          {activeTab === 'participant' ? (
            <>
              <div className={styles.noteBox}>
                <p>உங்கள் நாமினேஷன் பதிவு செய்ய எந்த கட்டணமும் இல்லை மற்றும் நீங்கள் இந்த விருதிற்கு தேர்வு செய்யப்படும் பட்சத்தில் விருது வழங்கும் விழாவில் பங்கேற்பதற்காகவும் விருதின் நன்மைகளை அடைவதற்கும் 5000 ரூபாய் மட்டும் கட்டணமாக செலுத்தப்பட வேண்டும்.</p>
              </div>

          <form key="participant-form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            
            <div className={styles.formGroupFull}>
              <label>Your Name (உங்கள் பெயர்) <span className={styles.asterisk}>*</span></label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                {...register("name", { required: true })} 
                className={errors.name ? styles.inputError : ''}
              />
            </div>

            <div className={styles.formGroupFull}>
              <label>Name of Company / Institution / Organization (நிறுவனம்/ நிறுவனம் அமைப்பின் பெயர்) <span className={styles.asterisk}>*</span></label>
              <input 
                type="text" 
                placeholder="Enter organization name" 
                {...register("organization", { required: true })}
                className={errors.organization ? styles.inputError : ''}
              />
            </div>

            <div className={styles.formRow3}>
              <div className={styles.formGroup}>
                <label>WhatsApp Number (வாட்ஸ்அப் எண்) <span className={styles.asterisk}>*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. +91 9876543210" 
                  {...register("whatsapp", { required: true })}
                  className={errors.whatsapp ? styles.inputError : ''}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email (மின்னஞ்சல்) <span className={styles.asterisk}>*</span></label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  {...register("email", { required: true })}
                  className={errors.email ? styles.inputError : ''}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Your Designation / Post (உங்கள் பதவி) <span className={styles.asterisk}>*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. CEO, Founder" 
                  {...register("designation", { required: true })}
                  className={errors.designation ? styles.inputError : ''}
                />
              </div>
            </div>

            <div className={styles.formRow3}>
              <div className={styles.formGroup}>
                <label>Applying for (விண்ணப்பிக்கும் முறை) <span className={styles.asterisk}>*</span></label>
                <div className={styles.selectWrapper}>
                  <select {...register("applyingFor", { required: true })} className={errors.applyingFor ? styles.inputError : ''}>
                    <option value="">Select an option</option>
                    <option value="Individual">Individual</option>
                    <option value="Organization">Organization</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Ownership Pattern (உரிமை முறை) <span className={styles.asterisk}>*</span></label>
                <div className={styles.selectWrapper}>
                  <select {...register("ownership", { required: true })} className={errors.ownership ? styles.inputError : ''}>
                    <option value="">Select ownership</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="Public Limited">Public Limited</option>
                    <option value="Trust">Trust</option>
                    <option value="NGO">NGO</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Award Title (விருது தலைப்பு) <span className={styles.asterisk}>*</span></label>
                <div className={styles.selectWrapper}>
                  <select {...register("awardTitle", { required: true })} className={errors.awardTitle ? styles.inputError : ''}>
                    <option value="">Select category</option>
                    {categories.map(cat => {
                      const parts = cat.split(" / ");
                      const displayStr = parts.length > 1 ? `${parts[1]} / ${parts[0]}` : cat;
                      return <option key={cat} value={cat}>{displayStr}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formGroupFull}>
              <label>Years of Experience (அனுபவ ஆண்டுகள்) <span className={styles.asterisk}>*</span></label>
              <input 
                type="number" 
                placeholder="e.g. 5, 10" 
                {...register("experience", { required: true, min: 0 })}
                className={errors.experience ? styles.inputError : ''}
              />
            </div>

            <div className={styles.formGroupFull}>
              <label>Facebook & Instagram (முகநூல் பக்கம்)</label>
              <input 
                type="text" 
                placeholder="Links to your social media profiles (optional)" 
                {...register("socialLinks")}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className={styles.spinner} size={20} />
                  Submitting...
                </>
              ) : (
                "Submit Nomination Now"
              )}
            </button>
          </form>
          </>
          ) : (
            <>
              <div className={styles.noteBox}>
                <h4 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Title Sponsor Benefits</h4>
                <p>They will be the title sponsor for the Winngoo Awards event. We will display their brand ads in stage LED screen and honour awards will be provided. The Sponsor fee is <strong>₹25,000</strong>.</p>
              </div>

              <form key="sponsor-form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroupFull}>
                  <label>Sponsor Contact Name <span className={styles.asterisk}>*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    {...register("sponsorName", { required: true })} 
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label>Brand / Company Name <span className={styles.asterisk}>*</span></label>
                  <input 
                    type="text" 
                    placeholder="Enter the brand or company name to display" 
                    {...register("sponsorCompany", { required: true })}
                  />
                </div>

                <div className={styles.formRow3}>
                  <div className={styles.formGroup}>
                    <label>WhatsApp Number <span className={styles.asterisk}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="e.g. +91 9876543210" 
                      {...register("sponsorWhatsapp", { required: true })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email Address <span className={styles.asterisk}>*</span></label>
                    <input 
                      type="email" 
                      placeholder="you@company.com" 
                      {...register("sponsorEmail", { required: true })}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Sponsorship Amount</label>
                    <input 
                      type="text" 
                      value="₹50,000"
                      disabled
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--color-primary-highlight)', fontWeight: 'bold' }}
                    />
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className={styles.spinner} size={20} />
                      Submitting...
                    </>
                  ) : (
                    "Register as Sponsor"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NominationForm;
