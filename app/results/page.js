// Results Page
import Link from 'next/link';
import Avatar from '../../components/Avatar';
import { TOPPERS, INSTITUTE } from '../../lib/data';

export const metadata = { title: 'Results & Toppers — Edukare Academy, Kharadi Pune' };

export default function ResultsPage() {
  const boardToppers = TOPPERS.filter(t => t.category === 'boards');
  const cetToppers = TOPPERS.filter(t => t.category === 'cet');

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{background:'rgba(255,255,255,0.15)',color:'white'}}>Proven Results</div>
          <h1>Our Students RISE</h1>
          <p>Every result on this page is a real Edukare Academy student — real names, real scores, real achievements.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Results</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{display:'flex',gap:16,justifyContent:'center',marginBottom:48,flexWrap:'wrap'}}>
            <div style={{background:'var(--green-light)',border:'2px solid var(--green)',borderRadius:14,padding:'20px 40px',textAlign:'center'}}>
              <div style={{fontSize:40,fontWeight:900,color:'var(--green)'}}>{boardToppers.length}</div>
              <div style={{fontSize:14,color:'var(--text-mid)',fontWeight:600}}>Board Toppers</div>
            </div>
            <div style={{background:'var(--gold-light)',border:'2px solid var(--gold)',borderRadius:14,padding:'20px 40px',textAlign:'center'}}>
              <div style={{fontSize:40,fontWeight:900,color:'var(--gold)'}}>{cetToppers.length}</div>
              <div style={{fontSize:14,color:'var(--text-mid)',fontWeight:600}}>CET Toppers</div>
            </div>
            <div style={{background:'var(--blue-light)',border:'2px solid var(--blue)',borderRadius:14,padding:'20px 40px',textAlign:'center'}}>
              <div style={{fontSize:40,fontWeight:900,color:'var(--blue)'}}>98.27%</div>
              <div style={{fontSize:14,color:'var(--text-mid)',fontWeight:600}}>Highest CET Percentile</div>
            </div>
          </div>

          <h2 className="section-title">10th Board Toppers</h2>
          <p className="section-sub">SSC & CBSE</p>
          <div className="toppers-grid" style={{marginBottom:64}}>
            {boardToppers.map((t, i) => (
              <div key={t.name} className={`topper-card ${i < 2 ? 'gold' : ''}`}>
                {i === 0 && <div className="topper-rank">🥇 Highest</div>}
                <div className={`topper-avatar ${i < 2 ? 'gold-border' : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center',background:'none',border:'3px solid ' + (i < 2 ? 'var(--gold)' : 'var(--green-light)')}}>
                  <Avatar name={t.name} size={60} />
                </div>
                <div className="topper-name">{t.name}</div>
                <div className={`topper-score ${i < 2 ? 'gold' : ''}`}>{t.score}</div>
                <div className="topper-exam">{t.exam}</div>
              </div>
            ))}
          </div>

          <h2 className="section-title">MH-CET Toppers</h2>
          <p className="section-sub">Maharashtra Common Entrance Test</p>
          <div className="toppers-grid" style={{marginBottom:64}}>
            {cetToppers.map((t, i) => (
              <div key={t.name} className={`topper-card ${i < 2 ? 'gold' : ''}`}>
                {i === 0 && <div className="topper-rank">🥇 Highest</div>}
                <div className={`topper-avatar ${i < 2 ? 'gold-border' : ''}`} style={{display:'flex',alignItems:'center',justifyContent:'center',background:'none',border:'3px solid ' + (i < 2 ? 'var(--gold)' : 'var(--green-light)')}}>
                  <Avatar name={t.name} size={60} />
                </div>
                <div className="topper-name">{t.name}</div>
                <div className={`topper-score ${i < 2 ? 'gold' : ''}`}>{t.score}</div>
                <div className="topper-exam">{t.exam}</div>
              </div>
            ))}
          </div>

          <div style={{background:'var(--green-light)',border:'1px solid var(--green)',borderRadius:14,padding:'20px 28px',marginBottom:40}}>
            <p style={{fontSize:14,color:'var(--text-mid)'}}>
              <strong style={{color:'var(--green)'}}>Authenticity Statement:</strong> All results listed on this page are from actual Edukare Academy students. Student photos will be displayed upon receipt of permission from students/parents.
            </p>
          </div>

          <div style={{textAlign:'center'}}>
            <h3 style={{fontSize:22,fontWeight:800,color:'var(--text)',marginBottom:12}}>Will your child be next?</h3>
            <p style={{color:'var(--text-mid)',marginBottom:24}}>Enquire today and start the journey towards your child's best result.</p>
            <div style={{display:'flex',justifyContent:'center',gap:12,flexWrap:'wrap'}}>
              <a href={`tel:${INSTITUTE.phone}`} className="btn btn-green btn-lg">📞 {INSTITUTE.phone}</a>
              <Link href="/admissions" className="btn btn-primary btn-lg">📋 Admissions Info</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
