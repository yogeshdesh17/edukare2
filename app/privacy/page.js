import Link from 'next/link';
import { INSTITUTE } from '../../lib/data';

export const metadata = { title: 'Privacy Policy — Edukare Academy' };

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How Edukare Academy collects, uses, and protects your personal information.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Privacy Policy</span></div>
        </div>
      </div>
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          {[
            ['1. Information We Collect', 'We collect student name, parent name, phone number, email address, class, and course interest when you submit an enquiry form on this website. We also collect attendance and academic performance data for enrolled students as part of our KYC (Know Your Child) programme.'],
            ['2. How We Use Your Information', 'Your information is used solely to: (a) respond to your admissions enquiry, (b) communicate course information, batch schedules, and fee details, (c) generate monthly KYC reports for enrolled students and their parents, and (d) send important academic notifications.'],
            ['3. Data Sharing', 'We do not sell, trade, or rent your personal information to any third party. Your data is shared only with the Edukare Academy faculty and administrative staff on a need-to-know basis.'],
            ['4. Data Security', 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.'],
            ['5. Data Retention', 'Personal data of enquiries is retained for up to 12 months. Data of enrolled students is retained for the duration of the academic programme and for up to 2 years thereafter for record purposes.'],
            ['6. Your Rights', 'You have the right to request access to, correction of, or deletion of your personal data held by us. To exercise these rights, contact us at ' + INSTITUTE.email + ' or call ' + INSTITUTE.phone + '.'],
            ['7. Contact', 'For any privacy-related queries, contact: Edukare Academy, ' + INSTITUTE.address + '. Email: ' + INSTITUTE.email + '. Phone: ' + INSTITUTE.phone + '.'],
          ].map(([title, content]) => (
            <div key={title} style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--green)', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8 }}>{content}</p>
            </div>
          ))}
          <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            Last updated: March 2026. This policy is in accordance with the Digital Personal Data Protection Act, 2023 (India) and Government of India's 2024 Guidelines for Coaching Centres.
          </p>
        </div>
      </section>
    </>
  );
}
