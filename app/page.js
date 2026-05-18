'use client';
import Link from 'next/link';
import { useState } from 'react';
import { INSTITUTE, COURSES, FACULTY, TOPPERS, TESTIMONIALS, WHY_US, ACTIVITIES } from '../lib/data';
import Avatar from '../components/Avatar';

// Picsum photo seeds for consistent dummy images
const ACTIVITY_IMGS = [
  'https://picsum.photos/seed/sinhagad/800/500',
  'https://picsum.photos/seed/pawna/400/250',
  'https://picsum.photos/seed/diwali/400/250',
  'https://picsum.photos/seed/teachers/400/250',
  'https://picsum.photos/seed/birthday/400/250',
];

function EnquiryForm({ compact = false }) {
  const [sent, setSent] = useState(false);
  function handle(e) {
    e.preventDefault();
    const d = new FormData(e.target);
    const msg = encodeURIComponent(
      'New Enquiry\nName: ' + d.get('name') +
      '\nPhone: ' + d.get('phone') +
      '\nClass: ' + d.get('cls') +
      '\nCourse: ' + (d.get('course') || 'Not specified')
    );
    window.open('https://wa.me/91' + INSTITUTE.phone + '?text=' + msg, '_blank');
    setSent(true);
  }
  if (sent) return (
    <div style={{ textAlign: 'center', padding: '32px 16px', background: 'var(--green-light)', borderRadius: 12 }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
      <h4 style={{ fontSize: 18, fontWeight: 800, color: 'var(--green)', marginBottom: 4 }}>Thank You!</h4>
      <p style={{ fontSize: 14, color: 'var(--text-mid)' }}>Enquiry sent! We will call you within 1 hour.</p>
    </div>
  );
  return (
    <form onSubmit={handle}>
      <div className="form-group">
        <label>Student Name *</label>
        <input className="form-control" name="name" placeholder="Student's full name" required />
      </div>
      <div className="form-group">
        <label>Parent's Phone *</label>
        <input className="form-control" name="phone" type="tel" placeholder="10-digit mobile" pattern="[0-9]{10}" required />
      </div>
      <div className="form-group">
        <label>Current Class *</label>
        <select className="form-control" name="cls" required>
          <option value="">Select class</option>
          <option>Class 8th</option><option>Class 9th</option><option>Class 10th</option>
          <option>Class 11th</option><option>Class 12th</option><option>Dropper</option>
        </select>
      </div>
      <div className="form-group">
        <label>Course Interest</label>
        <select className="form-control" name="course">
          <option value="">Select course</option>
          <option>8th-10th CBSE</option><option>8th-10th SSC</option>
          <option>11th-12th Science (Boards + JEE/NEET)</option>
          <option>11th-12th Science (Boards + CET)</option>
          <option>11th-12th Commerce</option><option>MH-CET Crash Course</option>
        </select>
      </div>
      {!compact && (
        <div className="form-group">
          <label>Message</label>
          <textarea className="form-control" name="message" rows={3} placeholder="Any queries?" style={{ resize: 'vertical' }} />
        </div>
      )}
      <button type="submit" className="btn btn-green btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
        Send Enquiry via WhatsApp
      </button>
      <p style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center', marginTop: 10 }}>
        We will also follow up by call within 1 hour.
      </p>
    </form>
  );
}

export default function HomePage() {
  const topToppers = TOPPERS.slice(0, 10);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="fade-up">
              <div className="hero-badge">
                <span className="dot" />
                Admissions Open 2026-27
              </div>
              <h1>
                Kharadi's Most Trusted Academy for<br />
                <span>Boards, JEE, NEET &amp; CET</span>
              </h1>
              <p className="hero-sub">
                From Class 8 to your dream college — one academy, one family, one mission.{' '}
                <strong style={{ color: 'white' }}>Education with Care</strong> since 2020.
              </p>
              <div className="hero-btns">
                <Link href="/courses" className="btn btn-primary btn-lg">Explore Courses</Link>
                <a href={'tel:' + INSTITUTE.phone} className="btn btn-ghost btn-lg">📞 {INSTITUTE.phone}</a>
              </div>
              <div className="hero-chips">
                {['SSC & CBSE', '11th-12th Science', 'Commerce', 'JEE / NEET', 'MH-CET Crash Course'].map(c => (
                  <span key={c} className="hero-chip">{c}</span>
                ))}
              </div>
            </div>
            <div className="hero-visual fade-up fade-up-2">
              <div className="hero-img-main">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Gemini_Generated.png"
                  alt="Edukare Academy classroom — replace with actual photo"
                  className="hero-img-real"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="hero-cards">
                <div className="hero-card">
                  <div className="hero-card-val">18<span>+</span></div>
                  <div className="hero-card-label">Toppers in Boards &amp; CET</div>
                </div>
                <div className="hero-card">
                  <div className="hero-card-val" style={{ color: '#4ade80' }}>⚡ Live</div>
                  <div className="hero-card-label">CET Crash Course Batch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div style={{ background: 'var(--green)', marginTop: -2 }}>
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', transform: 'rotate(180deg)' }}>
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" fill="white" />
        </svg>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-grid">
            {INSTITUTE.stats.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-val">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave out of stats */}
      <div style={{ background: 'var(--green)', marginBottom: -2 }}>
        <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <path d="M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z" fill="white" />
        </svg>
      </div>

      {/* ── COURSES ── */}
      <section className="section">
        <div className="container">
          <div className="tag">What We Offer</div>
          <h2 className="section-title">Programmes at Edukare Academy</h2>
          <p className="section-sub">One institute, every stage. Class 8 through JEE/NEET/CET — no need to switch for 6 years.</p>
          <div className="courses-grid">
            {COURSES.map(c => (
              <div key={c.id} className="course-card">
                <div className="course-card-top">
                  <div className="course-icon" style={{ background: c.color + '18' }}>
                    <span style={{ fontSize: 24 }}>{c.icon}</span>
                  </div>
                  <div>
                    <h3>{c.title}</h3>
                    <div className="exam-badge">{c.exam}</div>
                    {c.id === 'cet-crash' && (
                      <span className="course-live-badge" style={{ marginTop: 6, display: 'inline-flex' }}>⚡ Live Batch</span>
                    )}
                  </div>
                </div>
                <p className="course-desc">{c.desc}</p>
                <div className="course-features">
                  {c.features.map(f => <span key={f} className="course-feat-tag">{f}</span>)}
                </div>
                <div className="course-footer">
                  <div className="course-price">From <strong>{c.fees[0]?.earlyBird || c.fees[0]?.total}</strong></div>
                  <Link href={'/courses/' + c.id} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/courses" className="btn btn-green btn-lg">View All Programmes</Link>
          </div>
        </div>
      </section>

      {/* ── KYC BLOCK ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="kyc-block">
            <div>
              <div className="kyc-eyebrow">Our Unique Advantage</div>
              <h2>We Report to You — Every Single Month</h2>
              <p>Our exclusive <strong style={{ color: 'white' }}>KYC (Know Your Child)</strong> system gives every parent a monthly individual report — attendance, test scores per subject, and personal teacher remarks. You are never in the dark.</p>
              <div className="kyc-features">
                {['Monthly attendance tracking per student', 'Test scores for every subject', 'Personal remarks from the teacher', 'Academic progress trend over time', 'Direct counselling for improvement'].map(f => (
                  <div key={f} className="kyc-feat">{f}</div>
                ))}
              </div>
              <Link href="/kyc" className="btn btn-lg" style={{ background: 'white', color: 'var(--green)', fontWeight: 800 }}>Learn About KYC →</Link>
            </div>
            <div className="kyc-mock">
              <div className="kyc-mock-header">
                <div className="kyc-mock-logo">📚</div>
                <div><strong>Edukare Academy</strong><span>Education with Care</span></div>
              </div>
              <div className="kyc-mock-title">KYC — Know Your Child</div>
              <div className="kyc-mock-student">
                <strong>Sample Student</strong> · Class 12th CET<br />
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>Overall Progress: Good ✓</span>
              </div>
              <div className="kyc-rows">
                {[['Physics CET Test', '42/50'], ['Chemistry CET Test', '46/50'], ['Maths CET Test', '48/50'], ['Attendance', '100%']].map(([l, v]) => (
                  <div key={l} className="kyc-row"><span className="kyc-row-label">{l}</span><span className="kyc-row-val">{v}</span></div>
                ))}
              </div>
              <div className="kyc-remark">Teacher's Remarks: Needs to improve paper presentation. Practice Math problems. Avoid spelling mistakes.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section">
        <div className="container">
          <div className="tag green">Why Edukare</div>
          <h2 className="section-title">Why 500+ Families Trust Edukare Academy</h2>
          <p className="section-sub">We do not just teach — we mentor, track, report, and celebrate every student's growth.</p>
          <div className="why-grid">
            {WHY_US.map(w => (
              <div key={w.title} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOPPERS ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="tag">Real Results</div>
          <h2 className="section-title">Our Students RISE</h2>
          <p className="section-sub">Every result on this page is a real Edukare Academy student — names and scores, not vague statistics.</p>
          <div className="toppers-grid">
            {topToppers.map((t, i) => (
              <div key={t.name} className={'topper-card' + (i < 2 ? ' gold' : '')}>
                {i < 3 && <div className="topper-rank">🏆 Top</div>}
                <div className={'topper-avatar' + (i < 2 ? ' gold-border' : '')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Avatar name={t.name} size={58} />
                </div>
                <div className="topper-name">{t.name}</div>
                <div className={'topper-score' + (i < 2 ? ' gold' : '')}>{t.score}</div>
                <div className="topper-exam">{t.exam}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/results" className="btn btn-green btn-lg">See All Results →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container">
          <div className="tag blue">Student Voices</div>
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-sub">Real words from real students — written by hand, from the heart.</p>
          <div className="testimonials-grid">
            {TESTIMONIALS.slice(0, 6).map(t => (
              <div key={t.name} className="testimonial-card">
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <Avatar name={t.name} size={44} />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-class">{t.cls}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="tag">Student Life</div>
          <h2 className="section-title">Because Learning Should Be Joyful</h2>
          <p className="section-sub">At Edukare, students do not just study — they thrive, explore, and celebrate together.</p>
          <div className="activities-strip">
            {ACTIVITIES.map(a => (
              <div key={a.label} className="activity-chip">{a.emoji} {a.label}</div>
            ))}
          </div>
          <div className="activities-photos">
            {ACTIVITY_IMGS.map((src, i) => (
              <div key={i} className="activity-photo" style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={ACTIVITIES[i]?.label || 'Activity'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '16px 12px 10px', color: 'white', fontSize: 12, fontWeight: 700 }}>
                  {ACTIVITIES[i]?.emoji} {ACTIVITIES[i]?.label}
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-light)', fontStyle: 'italic' }}>
            * Dummy images shown — replace with actual Edukare Academy activity photos
          </p>
        </div>
      </section>

      {/* ── FACULTY PREVIEW ── */}
      <section className="section">
        <div className="container">
          <div className="tag green">Our Educators</div>
          <h2 className="section-title">14 Expert Faculty Members</h2>
          <p className="section-sub">Qualified, dedicated, and genuinely invested in every student's success.</p>
          <div className="faculty-grid">
            {FACULTY.slice(0, 8).map(f => (
              <div key={f.id} className={'faculty-card' + (f.isDirector ? ' director' : '')}>
                <div className="faculty-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none' }}>
                  <Avatar name={f.name} size={76} />
                </div>
                <div className="faculty-name" style={{ marginTop: 12 }}>{f.name}</div>
                <span className="faculty-subject" style={{ background: f.isDirector ? 'var(--gold)' : 'var(--green)' }}>{f.subject}</span>
                <div className="faculty-qual">{f.qual}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/faculty" className="btn btn-secondary btn-lg">Meet All 14 Faculty →</Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="cta-banner">
            <div className="tag" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: 16 }}>Admissions Open 2026-27</div>
            <h2>Ready to Begin Your Child's Rise?</h2>
            <p>Talk to our counsellor today. Free, no-obligation discussion about the right course.</p>
            <div className="cta-banner-btns">
              <a href={'tel:' + INSTITUTE.phone} className="btn btn-white btn-lg">📞 {INSTITUTE.phone}</a>
              <a href={INSTITUTE.social.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg">💬 WhatsApp Us</a>
              <Link href="/admissions" className="btn btn-ghost btn-lg">📋 Admissions Info</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ENQUIRY + MAP ── */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="tag blue">Find Us</div>
              <h2 className="section-title">Visit Edukare Academy</h2>
              <div className="contact-info-item">
                <div className="contact-icon">📍</div>
                <div><h4>Address</h4><p>{INSTITUTE.address}</p></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">📞</div>
                <div><h4>Phone</h4><p><a href={'tel:' + INSTITUTE.phone} style={{ color: 'var(--green)', fontWeight: 700 }}>{INSTITUTE.phone}</a></p></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-icon">✉️</div>
                <div><h4>Email</h4><p>{INSTITUTE.email}</p></div>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4!2d73.9476!3d18.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmVudXMgR2FyZGVuLCBLaGFyYWRpLCBQdW5l!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Edukare Academy Location"
                />
              </div>
            </div>
            <div className="contact-form-card">
              <h3>Quick Enquiry</h3>
              <p>Fill in your details and we will get back within the hour.</p>
              <EnquiryForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
