'use client';
import Link from 'next/link';
import { COURSES, INSTITUTE, TOPPERS, TESTIMONIALS } from '../../../lib/data';
import { useState } from 'react';
import Avatar from '../../../components/Avatar';

export default function CourseDetailClient({ id }) {
  const course = COURSES.find(c => c.id === id);
  const [submitted, setSubmitted] = useState(false);

  if (!course) return <div style={{padding:'200px 0',textAlign:'center'}}><h2>Course not found</h2><Link href="/courses">← Back to Courses</Link></div>;

  const relevantToppers = TOPPERS.filter(t => course.id.includes('cet') ? t.category === 'cet' : t.category === 'boards').slice(0, 5);
  const faqs = [
    { q: 'What is the batch size?', a: 'We strictly maintain limited batch sizes to ensure every student receives personal attention from the faculty.' },
    { q: 'Are there instalment options?', a: 'Yes. Pay in 2 or 4 instalments via post-dated cheques, or opt for lumpsum payment with an early-bird discount.' },
    { q: 'Is study material provided?', a: 'Yes. Edukare provides printed, customised notes for all subjects — updated every year per the latest exam pattern.' },
    { q: 'How are tests conducted?', a: 'Weekly tests in both Board pattern and CET/JEE/NEET pattern simultaneously, so students stay sharp for both.' },
    { q: 'What is the KYC report?', a: 'Every month, parents receive an individual KYC (Know Your Child) report with attendance, test scores, and personal teacher remarks.' },
  ];

  function handleSidebarSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name') || '';
    const phone = data.get('phone') || '';
    const cls = data.get('class') || '';
    const waMsg = encodeURIComponent(`New Enquiry — ${course.title}\nName: ${name}\nPhone: ${phone}\nClass: ${cls}`);
    window.open(`https://wa.me/91${INSTITUTE.phone}?text=${waMsg}`, '_blank');
    setSubmitted(true);
  }

  return (
    <>
      <div style={{ background: `linear-gradient(135deg, ${course.color}dd 0%, ${course.color} 100%)`, padding: '120px 0 56px', position: 'relative' }}>
        <div className="container">
          <Link href="/courses" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>← All Courses</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
            <span style={{ fontSize: 48 }}>{course.icon}</span>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 50, display: 'inline-block', marginBottom: 8 }}>{course.exam}</div>
              <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>{course.title}</h1>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginTop: 4 }}>{course.subtitle}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[{ label: 'Duration', val: course.duration }, { label: 'Daily Hours', val: course.dailyHours }, { label: 'Batches', val: course.batches.join(', ') }].map(i => (
              <div key={i.label} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', borderRadius: 10, padding: '10px 20px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{i.label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{i.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>Course Overview</h2>
              <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 32 }}>{course.desc}</p>

              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>What's Included</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
                {[...course.features, 'Monthly KYC Progress Report', 'Biometric Attendance', 'Career Counselling', 'Printed Study Notes'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--green-light)', borderRadius: 10 }}>
                    <span style={{ color: 'var(--green)', fontWeight: 800, fontSize: 14 }}>✓</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{f}</span>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Fee Structure</h3>
              <div className="fee-table-wrapper" style={{ marginBottom: 8 }}>
                <table className="fee-table">
                  <thead><tr><th>Batch</th><th>Subjects</th><th>Total Fee</th><th>Early Bird / Lumpsum</th></tr></thead>
                  <tbody>
                    {course.fees.map(f => (
                      <tr key={f.batch}>
                        <td><strong>{f.batch}</strong></td>
                        <td>{f.subjects}</td>
                        <td className="price">{f.total}</td>
                        <td className="early">{f.earlyBird}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 40 }}>Instalments via post-dated cheques. <Link href="/fees" style={{ color: 'var(--green)', fontWeight: 600 }}>Full instalment schedule →</Link></p>

              {relevantToppers.length > 0 && (
                <>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Results from This Stream</h3>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                    {relevantToppers.map(t => (
                      <div key={t.name} style={{ background: 'var(--gold-light)', border: '1px solid var(--gold)', borderRadius: 12, padding: '12px 16px', textAlign: 'center', minWidth: 100 }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--gold)' }}>{t.score}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{t.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-mid)' }}>{t.exam}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Student Experiences</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                {TESTIMONIALS.slice(0, 3).map(t => (
                  <div key={t.name} style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                    <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 12, fontStyle: 'italic' }}>"{t.quote}"</p>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{t.name} <span style={{ fontWeight: 400, color: 'var(--text-mid)' }}>· {t.cls}</span></div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Frequently Asked Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {faqs.map(f => (
                  <details key={f.q} style={{ border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', cursor: 'pointer' }}>
                    <summary style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                      {f.q} <span style={{ color: 'var(--green)' }}>+</span>
                    </summary>
                    <p style={{ fontSize: 14, color: 'var(--text-mid)', marginTop: 12, lineHeight: 1.7 }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div style={{ position: 'sticky', top: 96 }}>
              <div style={{ background: 'white', border: '2px solid var(--green)', borderRadius: 20, padding: 28, boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--green)', marginBottom: 4 }}>Enquire About This Course</h3>
                <p style={{ fontSize: 13, color: 'var(--text-mid)', marginBottom: 20 }}>Free counselling. No pressure.</p>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '24px 16px', background: 'var(--green-light)', borderRadius: 12 }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>Enquiry sent via WhatsApp!</p>
                    <p style={{ fontSize: 13, color: 'var(--text-mid)', marginTop: 4 }}>Our counsellor will call you within 1 hour.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSidebarSubmit}>
                    <div className="form-group"><input className="form-control" name="name" placeholder="Student Name *" required /></div>
                    <div className="form-group"><input className="form-control" name="phone" type="tel" placeholder="Parent Phone *" pattern="[0-9]{10}" required /></div>
                    <div className="form-group">
                      <select className="form-control" name="class">
                        <option value="">Select Class</option>
                        {['8th', '9th', '10th', '11th', '12th', 'Dropper'].map(c => <option key={c}>Class {c}</option>)}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-green" style={{ width: '100%', justifyContent: 'center', padding: 14, fontSize: 15 }}>
                      📩 Send Enquiry via WhatsApp
                    </button>
                  </form>
                )}
                <div style={{ marginTop: 16, padding: 16, background: 'var(--green-light)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-mid)', marginBottom: 6 }}>Or call us directly</div>
                  <a href={`tel:${INSTITUTE.phone}`} style={{ fontSize: 18, fontWeight: 800, color: 'var(--green)' }}>📞 {INSTITUTE.phone}</a>
                </div>
                <a href={INSTITUTE.social.whatsapp} target="_blank" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} rel="noreferrer">
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
