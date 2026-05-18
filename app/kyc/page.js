import Link from 'next/link';
import { INSTITUTE } from '../../lib/data';

export const metadata = { title: 'KYC — Know Your Child | Edukare Academy, Kharadi Pune' };

export default function KYCPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{background:'rgba(255,255,255,0.15)',color:'white'}}>Our Unique Advantage</div>
          <h1>KYC — Know Your Child</h1>
          <p>A monthly individual progress report that keeps every parent fully informed. No surprises. No waiting for exams to know where your child stands.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>KYC</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Intro */}
          <div style={{maxWidth:720,margin:'0 auto',textAlign:'center',marginBottom:64}}>
            <div className="tag green">What is KYC?</div>
            <h2 className="section-title">We Report to You Every Single Month</h2>
            <p style={{fontSize:16,color:'var(--text-mid)',lineHeight:1.8}}>
              Most coaching institutes give you a result at the end of the year. At Edukare Academy, we give you a detailed, personalised report <strong>every month</strong> — so you can course-correct early, not too late. This is our <em>KYC (Know Your Child)</em> system, and it's exclusive to Edukare Academy.
            </p>
          </div>

          {/* What's inside */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,marginBottom:64}}>
            {[
              {icon:'📅',title:'Monthly Attendance',desc:'Exact number of days present, absent, and attendance percentage — tracked every month.'},
              {icon:'📊',title:'Test Scores Per Subject',desc:'Every weekly test score recorded and shared. Physics, Chemistry, Maths, Biology — subject by subject.'},
              {icon:'💬',title:'Teacher\'s Personal Remarks',desc:'Your child\'s teacher writes personal, specific feedback — not a generic comment, but real observations.'},
              {icon:'📈',title:'Progress Trend',desc:'Month-on-month improvement visible at a glance. Parents can see the trajectory clearly.'},
              {icon:'🎯',title:'Academic Completion %',desc:'How much of the planned syllabus has been covered and how well the student has absorbed it.'},
              {icon:'📋',title:'Action Points',desc:'Specific, actionable suggestions from the teacher: practice areas, habits to build, topics to revisit.'},
            ].map(item=>(
              <div key={item.title} style={{background:'white',border:'1px solid var(--border)',borderRadius:16,padding:28}}>
                <div style={{fontSize:36,marginBottom:12}}>{item.icon}</div>
                <h4 style={{fontSize:16,fontWeight:700,color:'var(--text)',marginBottom:8}}>{item.title}</h4>
                <p style={{fontSize:14,color:'var(--text-mid)',lineHeight:1.6}}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Sample Report */}
          <div style={{background:'var(--green)',borderRadius:24,padding:48,marginBottom:64}}>
            <h2 style={{fontSize:28,fontWeight:800,color:'white',textAlign:'center',marginBottom:32}}>Sample KYC Report</h2>
            <div style={{maxWidth:600,margin:'0 auto',background:'white',borderRadius:16,padding:32,boxShadow:'0 8px 40px rgba(0,0,0,0.2)'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20,paddingBottom:16,borderBottom:'2px solid var(--green-light)'}}>
                <div style={{width:40,height:40,background:'var(--green)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>📚</div>
                <div>
                  <strong style={{display:'block',fontSize:15,fontWeight:800,color:'var(--green)'}}>Edukare Academy</strong>
                  <span style={{fontSize:12,color:'var(--text-mid)'}}>Education with Care</span>
                </div>
              </div>
              <h3 style={{textAlign:'center',fontSize:18,fontWeight:800,color:'var(--text)',marginBottom:4}}>KYC : Know Your Child</h3>
              <p style={{textAlign:'center',fontSize:13,color:'var(--text-mid)',marginBottom:20}}>Student: <strong>Sample Student</strong> · Std: 12th CET · Month: April 2026</p>

              <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:20}}>
                {[['Physics CET Test','42/50'],['Chemistry CET Test','46/50'],['Maths CET Test','48/50'],['Physics Theory Test','28/30'],['Chemistry Theory Test','29/30'],['Maths Theory Test','30/30']].map(([label,val])=>(
                  <div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'var(--green-light)',padding:'10px 16px',borderRadius:8}}>
                    <span style={{fontSize:14,fontWeight:600,color:'var(--text-mid)'}}>{label}</span>
                    <span style={{fontSize:16,fontWeight:900,color:'var(--green)'}}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
                {[['Days Present','26/30'],['Attendance','100%'],['Tests Conducted','6'],['Tests Submitted','6']].map(([k,v])=>(
                  <div key={k} style={{background:'var(--blue-light)',borderRadius:8,padding:'10px 14px'}}>
                    <div style={{fontSize:11,color:'var(--text-mid)',fontWeight:600}}>{k}</div>
                    <div style={{fontSize:18,fontWeight:900,color:'var(--blue)'}}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{background:'var(--orange-light)',borderLeft:'4px solid var(--orange)',borderRadius:'0 8px 8px 0',padding:'12px 16px'}}>
                <strong style={{fontSize:13,color:'var(--orange)'}}>Teacher's Remarks:</strong>
                <ol style={{marginTop:6,paddingLeft:16,fontSize:13,color:'var(--text-mid)',lineHeight:1.8}}>
                  <li>Needs to improve Paper Presentation.</li>
                  <li>Practice Math Problems regularly.</li>
                  <li>Avoid Spelling Mistakes in theory.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* How parents receive it */}
          <h2 className="section-title">How You'll Receive Your KYC Report</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,marginBottom:64}}>
            {[{icon:'📱',title:'WhatsApp',desc:'Report shared directly on parent\'s WhatsApp every month-end.'},
              {icon:'📧',title:'Email',desc:'Digital copy sent to the registered parent email ID.'},
              {icon:'🤝',title:'Counselling Session',desc:'Monthly parent-teacher discussion available for any concerns.'}].map(i=>(
              <div key={i.title} style={{background:'var(--green-light)',borderRadius:16,padding:28,textAlign:'center'}}>
                <div style={{fontSize:40,marginBottom:12}}>{i.icon}</div>
                <h4 style={{fontSize:16,fontWeight:700,color:'var(--green)',marginBottom:8}}>{i.title}</h4>
                <p style={{fontSize:14,color:'var(--text-mid)'}}>{i.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="cta-banner">
            <h2>Want Real-Time Insight into Your Child's Progress?</h2>
            <p>Enrol at Edukare Academy and receive your first KYC report within 30 days.</p>
            <div className="cta-banner-btns">
              <a href={`tel:${INSTITUTE.phone}`} className="btn btn-white btn-lg">📞 {INSTITUTE.phone}</a>
              <Link href="/admissions" className="btn btn-ghost btn-lg">📋 Admissions Info</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
