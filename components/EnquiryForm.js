'use client';
import { useState } from 'react';
import { INSTITUTE } from '../lib/data';

export default function EnquiryForm({ compact = false, preselectedCourse = '' }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('name');
    const phone = data.get('phone');
    const cls = data.get('class');
    const course = data.get('course') || preselectedCourse;
    // WhatsApp notification
    const waMsg = encodeURIComponent(
      `New Enquiry from Edukare Website:\nName: ${name}\nPhone: ${phone}\nClass: ${cls}\nCourse: ${course}`
    );
    window.open(`https://wa.me/91${INSTITUTE.phone}?text=${waMsg}`, '_blank');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px', background: 'var(--green-light)', borderRadius: 12 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
        <h4 style={{ fontSize: 18, fontWeight: 800, color: 'var(--green)', marginBottom: 8 }}>Thank You!</h4>
        <p style={{ fontSize: 14, color: 'var(--text-mid)', marginBottom: 16 }}>
          Your enquiry has been sent. Our counsellor will call you back within 1 hour.
        </p>
        <a href={INSTITUTE.social.whatsapp} target="_blank" rel="noreferrer" className="btn btn-green">
          💬 Also Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <select className="form-control" name="class" required>
          <option value="">Select class</option>
          {['8th', '9th', '10th', '11th', '12th', 'Dropper'].map(c => (
            <option key={c} value={c}>Class {c}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Course Interest</label>
        <select className="form-control" name="course" defaultValue={preselectedCourse}>
          <option value="">Select course</option>
          <option>8th–10th CBSE</option>
          <option>8th–10th SSC</option>
          <option>11th–12th Science (Boards + JEE/NEET)</option>
          <option>11th–12th Science (Boards + CET)</option>
          <option>11th–12th Commerce</option>
          <option>MH-CET Crash Course</option>
        </select>
      </div>
      {!compact && (
        <div className="form-group">
          <label>Message (Optional)</label>
          <textarea className="form-control" name="message" rows={3} placeholder="Any specific queries?" style={{ resize: 'vertical' }} />
        </div>
      )}
      <button type="submit" className="btn btn-green btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
        📩 Send Enquiry
      </button>
      <p style={{ fontSize: 12, color: 'var(--text-light)', textAlign: 'center', marginTop: 10 }}>
        We'll reach out on WhatsApp + email within 1 hour.
      </p>
    </form>
  );
}
