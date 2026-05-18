import Link from 'next/link';
import { INSTITUTE } from '../../lib/data';

export const metadata = { title: 'Fee Structure 2026-27 — Edukare Academy, Kharadi Pune' };

export default function FeesPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{background:'rgba(255,255,255,0.15)',color:'white'}}>Transparent Pricing</div>
          <h1>Fee Structure 2026–27</h1>
          <p>Complete, transparent fee information. No hidden charges. Instalment options available.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Fees</span></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{background:'var(--green-light)',border:'1px solid var(--green)',borderRadius:14,padding:'16px 24px',marginBottom:48,display:'flex',gap:12,alignItems:'flex-start'}}>
            <span style={{fontSize:20}}>ℹ️</span>
            <p style={{fontSize:14,color:'var(--text-mid)',lineHeight:1.7}}>
              <strong style={{color:'var(--green)'}}>Early Bird Discounts:</strong> CBSE batches (8th–10th) — pay full fees by 4th May 2026. SSC batches — pay by 1st June 2026. Instalments available via post-dated cheques. Contact us for instalment schedule.
            </p>
          </div>

          {/* 11th-12th Fees */}
          <h2 className="section-title">11th–12th Boards + JEE / NEET / CET</h2>
          <p className="section-sub">PCM (Physics, Chemistry, Maths) and PCB (Physics, Chemistry, Biology) streams.</p>
          <div className="fee-table-wrapper" style={{marginBottom:48}}>
            <table className="fee-table">
              <thead><tr><th>Batch</th><th>Course</th><th>Subjects</th><th>Regular Fee (4 inst.)</th><th>Lumpsum (Plan 1)</th><th>2-Inst. (Plan 2)</th></tr></thead>
              <tbody>
                {[
                  ['A','11th–12th Boards + JEE/NEET','PCM / PCB','₹1,80,000','₹1,50,000','₹1,62,000'],
                  ['B','12th Boards + JEE/NEET','PCM / PCB','₹1,00,000','₹85,000','₹90,000'],
                  ['C','11th–12th Boards + CET','PCM / PCB','₹1,50,000','₹1,26,000','₹1,35,000'],
                  ['D','11th–12th Boards Only','PCM / PCB','₹1,30,000','₹1,10,000','₹1,16,000'],
                  ['E','12th Boards + CET','PCM / PCB','₹90,000','₹75,000','₹81,000'],
                  ['F','11th OR 12th Boards Only','PCM / PCB','₹75,000','₹63,000','₹68,000'],
                  ['G','CET Crash Course','PCM / PCB','₹15,000','—','—'],
                ].map(([b,c,s,r,l,i])=>(
                  <tr key={b}><td><strong style={{color:'var(--blue)'}}>{b}</strong></td><td>{c}</td><td>{s}</td><td className="price">{r}</td><td className="early">{l}</td><td>{i}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 8-10 CBSE */}
          <h2 className="section-title">8th–10th CBSE Batch</h2>
          <div className="fee-table-wrapper" style={{marginBottom:48}}>
            <table className="fee-table">
              <thead><tr><th>Standard</th><th>Batch</th><th>Subjects</th><th>Total Fees</th><th>Early Bird (by 4th May)</th></tr></thead>
              <tbody>
                {[
                  ['8th','Arjuna','Math, Science','₹30,000','₹27,000'],
                  ['8th','Chanakya','All Subjects','₹40,000','₹36,000'],
                  ['9th','Arjuna','Math, Science','₹35,000','₹31,500'],
                  ['9th','Chanakya','All Subjects','₹45,000','₹40,500'],
                  ['10th','Arjuna','Math, Science','₹40,000','₹36,000'],
                  ['10th','Chanakya','All Subjects','₹50,000','₹45,000'],
                ].map(([s,b,sub,t,e],i)=>(
                  <tr key={i}><td><strong>{s}th CBSE</strong></td><td>{b}</td><td>{sub}</td><td className="price">{t}</td><td className="early">{e}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 8-10 SSC */}
          <h2 className="section-title">8th–10th SSC Batch</h2>
          <div className="fee-table-wrapper" style={{marginBottom:48}}>
            <table className="fee-table">
              <thead><tr><th>Standard</th><th>Batch</th><th>Subjects</th><th>Total Fees</th><th>Early Bird (by 1st June)</th></tr></thead>
              <tbody>
                {[
                  ['8th','Arjuna','Math, Science, English','₹20,000','₹18,000'],
                  ['8th','Chanakya','All Subjects','₹30,000','₹27,000'],
                  ['9th','Arjuna','Math, Science, English','₹30,000','₹27,000'],
                  ['9th','Chanakya','All Subjects','₹40,000','₹36,000'],
                  ['10th','Arjuna','Math, Science, English','₹35,000','₹31,500'],
                  ['10th','Chanakya','All Subjects','₹45,000','₹40,500'],
                ].map(([s,b,sub,t,e],i)=>(
                  <tr key={i}><td><strong>{s}th SSC</strong></td><td>{b}</td><td>{sub}</td><td className="price">{t}</td><td className="early">{e}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Refund Policy */}
          <div style={{background:'var(--blue-light)',border:'1px solid var(--blue)',borderRadius:14,padding:28,marginBottom:40}}>
            <h3 style={{fontSize:18,fontWeight:800,color:'var(--blue)',marginBottom:12}}>📋 Fee Refund & Exit Policy</h3>
            <p style={{fontSize:14,color:'var(--text-mid)',lineHeight:1.8}}>Students who wish to discontinue may request a fee refund within 30 days of commencement of classes. The refund will be processed after deducting the proportionate fees for classes attended and one-time administration charges. No refund will be applicable after 30 days. For detailed terms, please contact our office at {INSTITUTE.phone}.</p>
          </div>

          <div style={{textAlign:'center'}}>
            <a href={`tel:${INSTITUTE.phone}`} className="btn btn-green btn-lg">📞 Call for Instalment Details</a>
          </div>
        </div>
      </section>
    </>
  );
}
