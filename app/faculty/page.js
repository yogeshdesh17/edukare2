import Link from 'next/link';
import Avatar from '../../components/Avatar';
import FacultyGrid from '../../components/FacultyGrid';
import { FACULTY, INSTITUTE } from '../../lib/data';

export const metadata = { title: 'Faculty — Edukare Academy, Kharadi Pune' };

export default function FacultyPage() {
  const director = FACULTY.find(f => f.isDirector);
  const team = FACULTY.filter(f => !f.isDirector);
  const subjectColors = { Physics:'#1A3C8F', Mathematics:'#1A6B3A', Chemistry:'#E87B1A', Biology:'#2d9e5f', English:'#7B2D8F', Hindi:'#8F2D1A', 'Social Studies':'#2D6B8F', Accounting:'#C9960A', Marathi:'#6B4A1A', default:'#4A5568' };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{background:'rgba(255,255,255,0.15)',color:'white'}}>Our Educators</div>
          <h1>Meet Our Faculty</h1>
          <p>14 qualified, dedicated educators who genuinely invest in every student's success.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Faculty</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Director */}
          <div style={{background:'var(--gold-light)',border:'2px solid var(--gold)',borderRadius:24,padding:40,display:'grid',gridTemplateColumns:'200px 1fr',gap:40,alignItems:'center',marginBottom:64}}>
            <div>
              <div style={{display:'flex',justifyContent:'center'}}>
                <div style={{border:'4px solid var(--gold)',borderRadius:'50%',overflow:'hidden',flexShrink:0}}>
                  <Avatar name="Vijay Patil" size={160} localOnly />
                </div>
              </div>
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--gold)',marginBottom:8}}>Founder & Director</div>
              <h2 style={{fontSize:32,fontWeight:900,color:'var(--text)',marginBottom:4}}>{director.name}</h2>
              <div style={{fontSize:16,color:'var(--text-mid)',marginBottom:16}}>{director.qual}</div>
              <p style={{fontSize:15,color:'var(--text-mid)',lineHeight:1.7,marginBottom:20}}>
                Mr. Vijay Patil founded Edukare Academy in 2020 with a singular mission — <em>Education with Care</em>. With a background in B.Com and MBA (Marketing), he brings both academic rigour and a deep understanding of student needs to create an academy where every child is seen, heard, and supported. Under his leadership, Edukare has grown into Kharadi's most trusted coaching institute.
              </p>
              <blockquote style={{borderLeft:'4px solid var(--gold)',paddingLeft:20,fontStyle:'italic',color:'var(--text-mid)',fontSize:15}}>
                "At Edukare Academy, students don't just grow — they RISE."
              </blockquote>
            </div>
          </div>

          <h2 className="section-title">Our Teaching Team</h2>
          <p className="section-sub">Every faculty member is selected for both subject expertise and the ability to connect with students personally.</p>

          <FacultyGrid team={team} subjectColors={subjectColors} />

          <div style={{textAlign:'center',marginTop:48,padding:40,background:'var(--green-light)',borderRadius:20}}>
            <h3 style={{fontSize:22,fontWeight:800,color:'var(--green)',marginBottom:8}}>Want to Join Our Team?</h3>
            <p style={{color:'var(--text-mid)',marginBottom:20}}>We're always looking for passionate educators who put students first.</p>
            <a href={`mailto:${INSTITUTE.email}`} className="btn btn-green">✉️ Send Your Profile</a>
          </div>
        </div>
      </section>
    </>
  );
}
