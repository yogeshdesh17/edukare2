import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 60px' }}>
      <div>
        <div style={{ fontSize: 80, marginBottom: 16 }}>📚</div>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: 'var(--green)', marginBottom: 8 }}>404</h1>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-mid)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
          Looks like this page took a different route. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-green btn-lg">🏠 Back to Home</Link>
          <Link href="/courses" className="btn btn-secondary btn-lg">📚 View Courses</Link>
          <a href="tel:8530180202" className="btn btn-primary btn-lg">📞 Call Us</a>
        </div>
      </div>
    </div>
  );
}
