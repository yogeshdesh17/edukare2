'use client';
import Link from 'next/link';
import { INSTITUTE } from '../../lib/data';
import { useState } from 'react';

function AdmissionsForm() {
  const [sent, setSent] = useState(false);
  function handle(e) {
    e.preventDefault();
    const d = new FormData(e.target);
    const msg = encodeURIComponent(`Admissions Enquiry\nStudent: ${d.get('sname')}\nParent: ${d.get('pname')}\nPhone: ${d.get('phone')}\nClass: ${d.get('cls')}\nTarget: ${d.get('target')}`);
    window.open(`https://wa.me/91${INSTITUTE.phone}?text=${msg}`, '_blank');
    setSent(true);
  }
  if (sent) return (
    <div style={{textAlign:'center',padding:'32px',background:'var(--green-light)',borderRadius:12}}>
      <div style={{fontSize:48,marginBottom:8}}>✅</div>
      <h4 style={{fontSize:18,fontWeight:800,color:'var(--green)'}}>Booking Confirmed!</h4>
      <p style={{fontSize:14,color:'var(--text-mid)',marginTop:4}}>Our counsellor will call you within 1 hour.</p>
    </div>
  );
  return (
    <form onSubmit={handle}>
      {[['sname','Student Name'],['pname','Parent Name'],['phone','Parent Phone']].map(([n,l])=>(
        <div className="form-group" key={n}><label>{l} *</label><input className="form-control" name={n} placeholder={`Enter ${l.toLowerCase()}`} required/></div>
      ))}
      <div className="form-group"><label>Current Class *</label>
        <select className="form-control" name="cls" required>
          <option value="">Select class</option>
          {['8th','9th','10th','11th','12th','Dropper'].map(c=><option key={c}>Class {c}</option>)}
        </select>
      </div>
      <div className="form-group"><label>Target Exam</label>
        <select className="form-control" name="target">
          {['Boards Only','Boards + MH-CET','Boards + JEE','Boards + NEET','MH-CET Crash Course'].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="form-group"><label>Message (Optional)</label>
        <textarea className="form-control" name="msg" rows={3} placeholder="Any questions?" style={{resize:'vertical'}}/>
      </div>
      <button type="submit" className="btn btn-green btn-lg" style={{width:'100%',justifyContent:'center'}}>📩 Book Free Counselling</button>
    </form>
  );
}

export default function AdmissionsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{background:'rgba(255,255,255,0.15)',color:'white'}}>🟢 Admissions Open 2026–27</div>
          <h1>Join Edukare Academy</h1>
          <p>Simple process. Expert counselling. Choose your course, pick your batch, start rising.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Admissions</span></div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Admission Process</h2>
          <p className="section-sub">4 simple steps to begin your child's journey.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:24,marginBottom:64}}>
            {[
              {s:1,i:'📞',t:'Call or WhatsApp',d:'Reach out on 8530180202. Tell us your child\'s class and goal.'},
              {s:2,i:'🤝',t:'Free Counselling',d:'Visit our Kharadi centre for a free, no-pressure academic counselling session.'},
              {s:3,i:'📋',t:'Choose Course & Batch',d:'Select the right batch (Arjuna or Chanakya) and fee plan.'},
              {s:4,i:'🚀',t:'Start Learning',d:'Receive your printed notes, academic calendar, and begin on day one.'},
            ].map(s=>(
              <div key={s.s} style={{background:'white',border:'1px solid var(--border)',borderRadius:16,padding:28,textAlign:'center'}}>
                <div style={{width:40,height:40,background:'var(--green)',color:'white',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:16,margin:'0 auto 16px'}}>{s.s}</div>
                <div style={{fontSize:36,marginBottom:12}}>{s.i}</div>
                <h4 style={{fontSize:16,fontWeight:700,marginBottom:8}}>{s.t}</h4>
                <p style={{fontSize:13,color:'var(--text-mid)',lineHeight:1.6}}>{s.d}</p>
              </div>
            ))}
          </div>

          <h2 className="section-title">Important Dates 2026–27</h2>
          <div className="fee-table-wrapper" style={{marginBottom:64}}>
            <table className="fee-table">
              <thead><tr><th>Event</th><th>Batch</th><th>Date</th></tr></thead>
              <tbody>
                <tr><td>Early Bird Discount</td><td>CBSE (8th–10th)</td><td className="early">4th May 2026</td></tr>
                <tr><td>Early Bird Discount</td><td>SSC (8th–10th)</td><td className="early">1st June 2026</td></tr>
                <tr><td>11th Batch Starts</td><td>JEE/NEET/CET</td><td className="price">4th May 2026</td></tr>
                <tr><td>⚡ CET Crash Course</td><td>Batch G</td><td style={{color:'var(--orange)',fontWeight:700}}>Batch Live Now!</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="section-title">Arjuna vs Chanakya — Which Batch?</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:64}}>
            {[
              {n:'Arjuna',i:'⚔️',c:'var(--green)',bg:'var(--green-light)',s:'Core subjects: Math, Science, English',d:'For students who want focused preparation in key scoring subjects with a lower fee investment.',pros:['Lower fee point','Core subject mastery','Ideal for self-study students']},
              {n:'Chanakya',i:'👑',c:'var(--orange)',bg:'var(--orange-light)',s:'All subjects: Math, Science, English, SST, Language',d:'For students who want complete board preparation with guidance across every subject.',pros:['Complete coverage','All subjects guided','Ideal for comprehensive prep']},
            ].map(b=>(
              <div key={b.n} style={{background:b.bg,border:`2px solid ${b.c}`,borderRadius:20,padding:32}}>
                <div style={{fontSize:40,marginBottom:12}}>{b.i}</div>
                <h3 style={{fontSize:24,fontWeight:800,color:b.c,marginBottom:8}}>{b.n} Batch</h3>
                <p style={{fontSize:15,fontWeight:600,color:'var(--text)',marginBottom:8}}>{b.s}</p>
                <p style={{fontSize:14,color:'var(--text-mid)',marginBottom:16,lineHeight:1.7}}>{b.d}</p>
                <ul style={{paddingLeft:20,display:'flex',flexDirection:'column',gap:6}}>
                  {b.pros.map(p=><li key={p} style={{fontSize:14,color:'var(--text-mid)'}}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48}}>
            <div>
              <h2 className="section-title">Book Free Counselling</h2>
              <p style={{color:'var(--text-mid)',marginBottom:24,fontSize:15}}>Our counsellor will call you back to help choose the right course for your child.</p>
              <AdmissionsForm />
            </div>
            <div>
              <h2 className="section-title">Contact for Admissions</h2>
              {[['📞','Call or WhatsApp',INSTITUTE.phone,`tel:${INSTITUTE.phone}`],
                ['✉️','Email',INSTITUTE.email,`mailto:${INSTITUTE.email}`],
                ['📍','Visit Us',INSTITUTE.address,null],
                ['💬','WhatsApp Direct','Open WhatsApp chat',INSTITUTE.social.whatsapp]
              ].map(([icon,label,val,href])=>(
                <div className="contact-info-item" key={label}>
                  <div className="contact-icon">{icon}</div>
                  <div><h4>{label}</h4>
                    {href ? <a href={href} style={{fontSize:15,color:'var(--green)',fontWeight:600}}>{val}</a> : <p style={{fontSize:14,color:'var(--text-mid)'}}>{val}</p>}
                  </div>
                </div>
              ))}
              <div style={{background:'var(--orange-light)',border:'1px solid var(--orange)',borderRadius:14,padding:20,marginTop:24}}>
                <div style={{fontSize:24,marginBottom:8}}>⚡</div>
                <h4 style={{fontSize:16,fontWeight:800,color:'var(--orange)',marginBottom:4}}>CET Crash Course — Batch Live!</h4>
                <p style={{fontSize:14,color:'var(--text-mid)',marginBottom:12}}>45 days · 4.5 hrs daily · ₹15,000. Limited seats.</p>
                <a href={`tel:${INSTITUTE.phone}`} className="btn btn-primary">📞 Call Now to Join</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
