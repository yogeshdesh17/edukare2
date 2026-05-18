import Link from 'next/link';
import { INSTITUTE, ACTIVITIES, WHY_US } from '../../lib/data';
import Avatar from '../../components/Avatar';

export const metadata = { title: 'About Us — Edukare Academy, Kharadi Pune | Founded 2020' };

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{background:'rgba(255,255,255,0.15)',color:'white'}}>Our Story</div>
          <h1>About Edukare Academy</h1>
          <p>Founded in 2020 with one belief — that every student deserves Education with Care.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>About</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Founder */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:64,alignItems:'center',marginBottom:80}}>
            <div style={{textAlign:'center'}}>
              <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
                <div style={{border:'4px solid var(--green)',borderRadius:'50%',overflow:'hidden'}}>
                  <Avatar name="Vijay Patil" size={200} />
                </div>
              </div>
              <h3 style={{fontSize:20,fontWeight:800,color:'var(--text)'}}>Mr. Vijay Patil</h3>
              <p style={{color:'var(--text-mid)',fontSize:14}}>B.Com, MBA (Marketing)</p>
              <div className="tag green" style={{marginTop:8}}>Founder & Director</div>
            </div>
            <div>
              <div className="tag">Our Story</div>
              <h2 className="section-title">Why Edukare Academy Was Born</h2>
              <p style={{fontSize:16,color:'var(--text-mid)',lineHeight:1.8,marginBottom:20}}>
                In 2020, Mr. Vijay Patil saw a gap in the coaching landscape of Kharadi, Pune. Students were enrolling in large coaching factories where they became just a number — no personal attention, no parent communication, no emotional support. Results suffered. Students burned out.
              </p>
              <p style={{fontSize:16,color:'var(--text-mid)',lineHeight:1.8,marginBottom:20}}>
                He founded Edukare Academy on a single, non-negotiable principle: <strong style={{color:'var(--green)'}}>Education with Care</strong>. Not just subject teaching, but mentoring. Not just test scores, but confidence. Not just admissions, but a lifelong partnership between parents, students, and educators.
              </p>
              <blockquote style={{borderLeft:'4px solid var(--orange)',paddingLeft:24,fontStyle:'italic',color:'var(--text)',fontSize:17,fontWeight:600,lineHeight:1.7}}>
                "At Edukare Academy, students don't just grow — they RISE."
              </blockquote>
            </div>
          </div>

          {/* Logo meaning */}
          <div style={{background:'var(--green)',borderRadius:24,padding:48,marginBottom:80,display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
            <div>
              <div className="kyc-eyebrow">Our Logo</div>
              <h2 style={{fontSize:30,fontWeight:800,color:'white',marginBottom:20}}>Every Symbol Has a Meaning</h2>
              {[
                ['☀️','The Rising Sun','A bright, confident future. Students at Edukare don\'t just grow — they rise.'],
                ['🤝','Two Hands','The strong partnership between parents and Edukare Academy, working together for every child.'],
                ['📖','Open Book with EA','Knowledge, discipline, and our promise of quality education.'],
              ].map(([icon,title,desc])=>(
                <div key={title} style={{display:'flex',gap:16,marginBottom:20}}>
                  <div style={{fontSize:28,flexShrink:0}}>{icon}</div>
                  <div>
                    <h4 style={{color:'white',fontWeight:700,fontSize:15,marginBottom:4}}>{title}</h4>
                    <p style={{color:'rgba(255,255,255,0.75)',fontSize:14,lineHeight:1.6}}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'white',borderRadius:16,padding:40,textAlign:'center'}}>
              <div style={{fontSize:80,marginBottom:16}}>📚</div>
              <div style={{fontSize:24,fontWeight:900,color:'var(--green)'}}>EDUKARE ACADEMY</div>
              <div style={{fontSize:16,color:'var(--text-mid)',fontStyle:'italic'}}>Education with Care</div>
              <small className="placeholder-note" style={{display:'block',marginTop:12}}>Replace with actual high-res logo SVG</small>
            </div>
          </div>

          {/* Mission & Vision */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:80}}>
            <div style={{background:'var(--green)',borderRadius:20,padding:36,color:'white'}}>
              <div style={{fontSize:36,marginBottom:12}}>🎯</div>
              <h3 style={{fontSize:22,fontWeight:800,marginBottom:12}}>Our Mission</h3>
              <p style={{fontSize:15,lineHeight:1.8,color:'rgba(255,255,255,0.85)'}}>
                To shape confident, successful students through Education with Care — providing personalised attention, expert guidance, and unwavering support from Class 8 all the way to JEE, NEET, and CET.
              </p>
            </div>
            <div style={{background:'var(--blue)',borderRadius:20,padding:36,color:'white'}}>
              <div style={{fontSize:36,marginBottom:12}}>🌟</div>
              <h3 style={{fontSize:22,fontWeight:800,marginBottom:12}}>Our Vision</h3>
              <p style={{fontSize:15,lineHeight:1.8,color:'rgba(255,255,255,0.85)'}}>
                To be Kharadi's most trusted coaching institute — where every student from the neighbourhood gets world-class academic guidance without leaving their community, and every parent feels like a partner in their child's education.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <h2 className="section-title">What We Stand For</h2>
          <div className="why-grid" style={{marginBottom:80}}>
            {WHY_US.map(w=>(
              <div key={w.title} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>

          {/* Activities */}
          <h2 className="section-title">Life at Edukare Academy</h2>
          <p className="section-sub">We celebrate every milestone — academic and personal. Because a happy student is a successful student.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:48}}>
            {ACTIVITIES.map(a=>(
              <div key={a.label} style={{background:'var(--green-light)',borderRadius:16,padding:24,textAlign:'center'}}>
                <div style={{fontSize:40,marginBottom:8}}>{a.emoji}</div>
                <div style={{fontSize:15,fontWeight:700,color:'var(--text)'}}>{a.label}</div>
                <small className="placeholder-note">Activity photo — {a.label}</small>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="cta-banner">
            <h2>Begin Your Child's Journey With Us</h2>
            <p>From Kharadi, for Kharadi. Education with Care — since 2020.</p>
            <div className="cta-banner-btns">
              <a href={`tel:${INSTITUTE.phone}`} className="btn btn-white btn-lg">📞 {INSTITUTE.phone}</a>
              <Link href="/admissions" className="btn btn-ghost btn-lg">📋 Admissions 2026–27</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
