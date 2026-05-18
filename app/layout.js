'use client';
import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { INSTITUTE } from '../lib/data';

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/faculty', label: 'Faculty' },
    { href: '/results', label: 'Results' },
    { href: '/kyc', label: 'KYC' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/parent-portal', label: '🔐 Parent Portal', highlight: true },
  ];
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">📚</div>
            <div className="nav-logo-text">
              <strong>Edukare Academy</strong>
              <span>Education with Care</span>
            </div>
          </Link>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={l.highlight ? { color: 'var(--green)', fontWeight: 700 } : {}}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-cta">
            <a href={`tel:${INSTITUTE.phone}`} className="nav-phone">📞 {INSTITUTE.phone}</a>
            <Link href="/contact" className="btn btn-primary">Enquire Now</Link>
          </div>
          <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
        <div className={`nav-mobile ${open ? 'open' : ''}`}>
          {links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
          <a href={`tel:${INSTITUTE.phone}`} className="btn btn-green" style={{marginTop: 8}}>📞 Call {INSTITUTE.phone}</a>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const quickLinks = ['Home','Courses','Faculty','Results','KYC','Admissions','Fees','Contact'];
  const courses = ['8th–10th CBSE','8th–10th SSC','11th–12th Science','11th–12th Commerce','JEE / NEET','MH-CET Crash Course'];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">📚</div>
              <div>
                <strong>Edukare Academy</strong><br/>
                <span>Education with Care</span>
              </div>
            </div>
            <p className="footer-desc">Kharadi's trusted coaching institute since 2020. From Class 8 to JEE, NEET & CET — one academy for your child's entire journey.</p>
            <div className="footer-socials">
              <a href={INSTITUTE.social.instagram} target="_blank" className="footer-social" rel="noreferrer">📸</a>
              <a href={INSTITUTE.social.youtube} target="_blank" className="footer-social" rel="noreferrer">▶️</a>
              <a href={INSTITUTE.social.facebook} target="_blank" className="footer-social" rel="noreferrer">👍</a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map(l => <li key={l}><Link href={`/${l.toLowerCase().replace(/\s/g,'-').replace('home','')}`}>{l}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Our Courses</h4>
            <ul className="footer-links">
              {courses.map(c => <li key={c}><a href="/courses">{c}</a></li>)}
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div className="footer-contact-item"><span>📍</span><p>{INSTITUTE.address}</p></div>
            <div className="footer-contact-item"><span>📞</span><p><a href={`tel:${INSTITUTE.phone}`}>{INSTITUTE.phone}</a></p></div>
            <div className="footer-contact-item"><span>✉️</span><p><a href={`mailto:${INSTITUTE.email}`}>{INSTITUTE.email}</a></p></div>
            <div className="footer-contact-item"><span>🌐</span><p>{INSTITUTE.website}</p></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Edukare Academy. All Rights Reserved.</span>
          <div style={{display:'flex',gap:16}}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/fees">Fee & Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <>
      <a href={INSTITUTE.social.whatsapp} target="_blank" className="wa-float" title="Chat on WhatsApp" rel="noreferrer">💬</a>
      <div className="mobile-bottom-nav">
        <div className="mobile-nav-inner">
          <Link href="/" className="mobile-nav-item"><span className="icon">🏠</span>Home</Link>
          <Link href="/courses" className="mobile-nav-item"><span className="icon">📚</span>Courses</Link>
          <Link href="/results" className="mobile-nav-item"><span className="icon">⭐</span>Results</Link>
          <a href={`tel:${INSTITUTE.phone}`} className="mobile-nav-item call"><span className="icon">📞</span>Call</a>
          <a href={INSTITUTE.social.whatsapp} target="_blank" className="mobile-nav-item wa" rel="noreferrer"><span className="icon">💬</span>WhatsApp</a>
        </div>
      </div>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Edukare Academy — Education with Care | Kharadi, Pune</title>
        <meta name="description" content="Edukare Academy, Kharadi Pune — Expert coaching for Class 8–10 SSC/CBSE, 11–12 Science & Commerce, JEE, NEET, MH-CET. Education with Care since 2020." />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📚</text></svg>" />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A6B3A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Edukare" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
