import Link from 'next/link';
import { COURSES, INSTITUTE } from '../../lib/data';

export const metadata = { title: 'Courses — Edukare Academy | Class 8 to JEE/NEET/CET, Kharadi Pune' };

export default function CoursesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{background:'rgba(255,255,255,0.15)',color:'white'}}>Our Programmes</div>
          <h1>Courses at Edukare Academy</h1>
          <p>From Class 8 to JEE, NEET & CET — one institute for your child's entire academic journey.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Courses</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Arjuna vs Chanakya callout */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:64}}>
            <div style={{background:'var(--green-light)',border:'2px solid var(--green)',borderRadius:16,padding:32}}>
              <div style={{fontSize:32,marginBottom:8}}>⚔️</div>
              <h3 style={{fontSize:22,fontWeight:800,color:'var(--green)',marginBottom:8}}>Arjuna Batch</h3>
              <p style={{fontSize:15,color:'var(--text-mid)',marginBottom:12}}>Core subjects (Math, Science, English). For students who want focussed preparation in key scoring subjects.</p>
              <div style={{fontSize:13,fontWeight:700,color:'var(--green)'}}>Lower fee, same quality teaching</div>
            </div>
            <div style={{background:'var(--orange-light)',border:'2px solid var(--orange)',borderRadius:16,padding:32}}>
              <div style={{fontSize:32,marginBottom:8}}>👑</div>
              <h3 style={{fontSize:22,fontWeight:800,color:'var(--orange)',marginBottom:8}}>Chanakya Batch</h3>
              <p style={{fontSize:15,color:'var(--text-mid)',marginBottom:12}}>All subjects (Math, Science, English, SST, Language). Complete board preparation under Edukare's guidance.</p>
              <div style={{fontSize:13,fontWeight:700,color:'var(--orange)'}}>Full coverage, best value</div>
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:40}}>
            {COURSES.map(c => (
              <div key={c.id} style={{background:'white',borderRadius:20,border:'1px solid var(--border)',overflow:'hidden',boxShadow:'var(--shadow)'}}>
                <div style={{background:c.color,padding:'24px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
                  <div style={{display:'flex',alignItems:'center',gap:16}}>
                    <span style={{fontSize:36}}>{c.icon}</span>
                    <div>
                      <h2 style={{fontSize:24,fontWeight:800,color:'white',marginBottom:2}}>{c.title}</h2>
                      <span style={{fontSize:14,color:'rgba(255,255,255,0.8)'}}>{c.subtitle} · {c.exam}</span>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:12,alignItems:'center'}}>
                    {c.id==='cet-crash' && <span style={{background:'var(--orange)',color:'white',padding:'6px 16px',borderRadius:50,fontSize:13,fontWeight:700}}>⚡ Batch Live Now</span>}
                    <Link href={`/courses/${c.id}`} className="btn btn-white" style={{background:'white',color:c.color,fontWeight:800}}>View Full Details →</Link>
                  </div>
                </div>
                <div style={{padding:32,display:'grid',gridTemplateColumns:'2fr 1fr',gap:32}}>
                  <div>
                    <p style={{fontSize:15,color:'var(--text-mid)',marginBottom:20,lineHeight:1.7}}>{c.desc}</p>
                    <div style={{display:'flex',gap:24,marginBottom:20,flexWrap:'wrap'}}>
                      <div><span style={{fontSize:12,color:'var(--text-light)',fontWeight:600}}>DURATION</span><br/><strong style={{fontSize:15,color:'var(--text)'}}>{c.duration}</strong></div>
                      <div><span style={{fontSize:12,color:'var(--text-light)',fontWeight:600}}>DAILY HOURS</span><br/><strong style={{fontSize:15,color:'var(--text)'}}>{c.dailyHours}</strong></div>
                    </div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                      {c.features.map(f=><span key={f} className="course-feat-tag">{f}</span>)}
                    </div>
                  </div>
                  <div>
                    <h4 style={{fontSize:14,fontWeight:700,color:'var(--text)',marginBottom:12}}>Fee Summary</h4>
                    <div style={{display:'flex',flexDirection:'column',gap:10}}>
                      {c.fees.slice(0,2).map(f=>(
                        <div key={f.batch} style={{background:'var(--green-light)',borderRadius:10,padding:'12px 16px'}}>
                          <div style={{fontSize:12,fontWeight:700,color:'var(--green)',marginBottom:4}}>{f.batch}</div>
                          <div style={{fontSize:13,color:'var(--text-mid)',marginBottom:4}}>{f.subjects}</div>
                          <div style={{fontSize:16,fontWeight:800,color:'var(--green)'}}>{f.total}</div>
                          {f.earlyBird !== f.total && <div style={{fontSize:12,color:'var(--orange)',fontWeight:700}}>Early bird: {f.earlyBird}</div>}
                        </div>
                      ))}
                    </div>
                    <Link href={`/courses/${c.id}`} className="btn btn-green" style={{width:'100%',justifyContent:'center',marginTop:16}}>
                      Full Details & Enrol
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{textAlign:'center',marginTop:64,padding:48,background:'var(--green-light)',borderRadius:20}}>
            <h2 style={{fontSize:28,fontWeight:800,color:'var(--green)',marginBottom:8}}>Not Sure Which Course?</h2>
            <p style={{color:'var(--text-mid)',marginBottom:24,fontSize:16}}>Talk to our academic counsellor — free, no pressure, just honest guidance for your child.</p>
            <div style={{display:'flex',justifyContent:'center',gap:12,flexWrap:'wrap'}}>
              <a href={`tel:${INSTITUTE.phone}`} className="btn btn-green btn-lg">📞 Call {INSTITUTE.phone}</a>
              <a href={INSTITUTE.social.whatsapp} target="_blank" className="btn btn-primary btn-lg" rel="noreferrer">💬 WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
