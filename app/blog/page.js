'use client';
import Link from 'next/link';

const POSTS = [
  { slug: 'crack-mh-cet-2026', title: 'How to Crack MH-CET 2026 — A Month-by-Month Strategy', date: 'March 10, 2026', category: 'Exam Tips', emoji: '🎯', excerpt: 'A clear, actionable month-by-month study plan for MH-CET 2026 aspirants. From syllabus breakdown to mock test strategy — everything you need.' },
  { slug: '10th-board-tips', title: '10th Board Exams: Top 10 Tips for SSC & CBSE Students in Pune', date: 'February 20, 2026', category: 'Board Exams', emoji: '📘', excerpt: 'Practical, tested advice for Class 10 students appearing for SSC and CBSE boards. Time management, revision strategies, and exam-day tips.' },
  { slug: 'arjuna-vs-chanakya', title: 'Arjuna vs Chanakya Batch — Which One is Right for Your Child?', date: 'February 5, 2026', category: 'Admissions', emoji: '⚔️', excerpt: 'A detailed comparison of Edukare Academy\'s two batch types to help parents make the right choice for their child\'s learning style and budget.' },
  { slug: 'limited-batch-coaching', title: 'Why Limited Batch Size Coaching Beats Big Coaching Factories', date: 'January 18, 2026', category: 'Education', emoji: '👥', excerpt: 'The science behind personalised attention in education. Why a smaller batch size consistently produces better results than mass classroom coaching.' },
  { slug: 'jee-and-boards-together', title: 'JEE + Boards Together — Is It Possible? Yes, Here\'s How', date: 'January 5, 2026', category: 'JEE', emoji: '🏆', excerpt: 'Many students worry about managing HSC boards and JEE simultaneously. Here is exactly how Edukare\'s integrated programme makes it work.' },
];

const CATS = ['All', 'Exam Tips', 'Board Exams', 'JEE', 'NEET', 'MH-CET', 'Admissions', 'Education'];

export default function BlogPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="tag" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>Knowledge Hub</div>
          <h1>Blog &amp; Exam Tips</h1>
          <p>Expert guidance on exams, study strategies, and making the most of your preparation.</p>
          <div className="breadcrumb"><Link href="/">Home</Link> / <span>Blog</span></div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48 }}>
            {CATS.map(c => (
              <button key={c} className="activity-chip" style={{ cursor: 'pointer', border: 'none', background: c === 'All' ? 'var(--green)' : undefined, color: c === 'All' ? 'white' : undefined }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {POSTS.map(p => (
              <article key={p.slug} className="course-card">
                <div style={{ height: 180, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative' }}>
                  {p.emoji}
                  <span style={{ position: 'absolute', top: 16, left: 16, background: 'var(--green)', color: 'white', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 50 }}>{p.category}</span>
                </div>
                <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 8 }}>{p.date}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', lineHeight: 1.4, marginBottom: 12, flex: 1 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: 20 }}>{p.excerpt}</p>
                  <a href="#" style={{ color: 'var(--green)', fontWeight: 700, fontSize: 14 }}>Read Article →</a>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48, padding: '32px', background: 'var(--green-light)', borderRadius: 16 }}>
            <p style={{ fontSize: 15, color: 'var(--text-mid)', marginBottom: 16 }}>More articles coming soon. Have a topic suggestion?</p>
            <a href="https://wa.me/918530180202?text=Blog+topic+suggestion" target="_blank" rel="noreferrer" className="btn btn-green">Suggest a Topic</a>
          </div>
        </div>
      </section>
    </>
  );
}
