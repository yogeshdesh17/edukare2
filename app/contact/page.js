'use client';
import Link from 'next/link';
import { INSTITUTE } from '../../lib/data';
import { useState } from 'react';

function ContactForm() {
  const [sent, setSent] = useState(false);
  function handle(e) {
    e.preventDefault();
    const d = new FormData(e.target);
    const msg = encodeURIComponent(`Website Contact Form\nName: ${d.get('sname')}\nPhone: ${d.get('phone')}\nQuery: ${d.get('qtype')}\nMessage: ${d.get('msg')}`);
    window.open(`https://wa.me/91${INSTITUTE.phone}?text=${msg}`, '_blank');
    setSent(true);
  }
  if (sent) return (
    <div style={{textAlign:'center',padding:'32px 16px',background:'var(--green-light)',borderRadius:12}}>
      <div style={{fontSize:48,marginBottom:8}}>✅</div>
      <h4 style={{fontSize:18,fontWeight:800,color:'var(--green)',marginBottom:4}}>Message Sent!</h4>
      <p style={{fontSize:14,color:'var(--text-mid)'}}>We'll get back to you within 1 hour on WhatsApp.</p>
    </div>
  );
  return (
    <form onSubmit={handle}>
      {[['sname','text','Student Name *','Student\'s full name'],['pname','text','Parent Name *','Parent\'s name'],['phone','tel','Phone Number *','10-digit mobile']].map(([name,type,label,ph])=>(
        <div className="form-group" key={name}><label>{label}</label><input className="form-control" name={name} type={type} placeholder={ph} required /></div>
      ))}
      <div className="form-group"><label>Query Type</label>
        <select className="form-control" name="qtype">
          {['Admissions Enquiry','Fee Query','Academic Query','CET Crash Course','General Query'].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="form-group"><label>Message *</label>
        <textarea className="form-control" name="msg" rows={4} placeholder="How can we help?" style={{resize:'vertical'}} required/>
      </div>
      <button type="submit" className="btn btn-green btn-lg" style={{width:'100%',justifyContent:'center'}}>📩 Send Message via WhatsApp</button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{background:'rgba(255,255,255,0.15)',color:'white'}}>Get in Touch</div>
          <h1>Contact Edukare Academy</h1>
          <p>We're right here in Kharadi. Come visit, call, or WhatsApp — we respond within the hour.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Contact</span></div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 className="section-title">Find Us</h2>
              {[
                {icon:'📍',title:'Address',content:INSTITUTE.address,link:null},
                {icon:'📞',title:'Phone',content:INSTITUTE.phone,link:`tel:${INSTITUTE.phone}`},
                {icon:'✉️',title:'Email',content:INSTITUTE.email,link:`mailto:${INSTITUTE.email}`},
                {icon:'🕐',title:'Office Hours',content:'Monday – Saturday: 9:00 AM – 7:00 PM',link:null},
              ].map(item=>(
                <div className="contact-info-item" key={item.title}>
                  <div className="contact-icon">{item.icon}</div>
                  <div><h4>{item.title}</h4>
                    {item.link ? <a href={item.link} style={{fontSize:15,color:'var(--green)',fontWeight:700}}>{item.content}</a> : <p>{item.content}</p>}
                  </div>
                </div>
              ))}
              <div style={{display:'flex',gap:12,marginTop:24,flexWrap:'wrap'}}>
                <a href={INSTITUTE.social.instagram} target="_blank" className="btn btn-secondary" rel="noreferrer">📸 Instagram</a>
                <a href={INSTITUTE.social.youtube} target="_blank" className="btn btn-secondary" rel="noreferrer">▶️ YouTube</a>
                <a href={INSTITUTE.social.facebook} target="_blank" className="btn btn-secondary" rel="noreferrer">👍 Facebook</a>
              </div>
              <div className="map-container" style={{marginTop:24}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4!2d73.9476!3d18.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVmVudXMgR2FyZGVuLCBLaGFyYWRpLCBQdW5l!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Edukare Academy Location"/>
              </div>
            </div>
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>
              <p style={{marginBottom:24}}>For admissions, fees, or any queries — we'll respond within 1 hour.</p>
              <ContactForm />
              <div style={{marginTop:20,background:'#25D366',borderRadius:10,padding:16,display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:28}}>💬</span>
                <div><div style={{fontWeight:700,color:'white',fontSize:14}}>Prefer WhatsApp?</div>
                  <a href={INSTITUTE.social.whatsapp} target="_blank" style={{color:'rgba(255,255,255,0.9)',fontSize:13}} rel="noreferrer">Click here to open a direct chat →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
