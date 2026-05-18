'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ─── IMPORTANT: Paste your Apps Script Web App URL here after deploying ───────
// Deploy steps: Apps Script → Deploy → New Deployment → Web App
//   Execute as: Me | Access: Anyone → Deploy → copy URL below
const PORTAL_API_URL = "https://script.google.com/macros/s/AKfycbwRFaWsDY7tCjSUWgBRCdKOC2omy6zYmULj_Ic0_drPviUEHtBXzTpORoJmhLgtbIfR/exec";
// ─────────────────────────────────────────────────────────────────────────────

// ─── DEMO MODE — remove this block once real API is live ─────────────────────
const DEMO_ID  = "DEMO";
const DEMO_PIN = "123456";
const DEMO_DATA = {
  ok: true,
  student: { name: "Riya Sharma", studentId: "DEMO", batchId: "B001", batchName: "12th CET — Chanakya", className: "12th", board: "HSC + MH-CET", academicYear: "2025-26" },
  summary: { overallPercent: 61, totalTopics: 420, coveredTopics: 256, totalSessions: 18, todayCount: 2 },
  progress: [
    { subject: "Physics",   totalTopics: 140, coveredTopics: 91,  percent: 65, chaptersTotal: 14, chaptersComplete: 9  },
    { subject: "Chemistry", totalTopics: 140, coveredTopics: 84,  percent: 60, chaptersTotal: 14, chaptersComplete: 8  },
    { subject: "Maths",     totalTopics: 140, coveredTopics: 81,  percent: 58, chaptersTotal: 14, chaptersComplete: 8  },
  ],
  todaySessions: [
    { submissionId: "SESS-TODAY-1", date: new Date().toISOString().split('T')[0], subject: "Physics",   chapter: "Current Electricity", teacher: "Anil Sharma",    type: "Fresh", topics: ["Ohm's Law", "Kirchhoff's Current Law", "Kirchhoff's Voltage Law"] },
    { submissionId: "SESS-TODAY-2", date: new Date().toISOString().split('T')[0], subject: "Chemistry", chapter: "Electrochemistry",     teacher: "Priya Deshmukh", type: "Fresh", topics: ["Electrochemical Cells", "EMF of a Cell"] },
  ],
  recentSessions: [
    { submissionId: "SESS-TODAY-1", date: new Date().toISOString().split('T')[0],              subject: "Physics",   chapter: "Current Electricity",      teacher: "Anil Sharma",    type: "Fresh",    topics: ["Ohm's Law", "Kirchhoff's Current Law", "Kirchhoff's Voltage Law"] },
    { submissionId: "SESS-TODAY-2", date: new Date().toISOString().split('T')[0],              subject: "Chemistry", chapter: "Electrochemistry",          teacher: "Priya Deshmukh", type: "Fresh",    topics: ["Electrochemical Cells", "EMF of a Cell"] },
    { submissionId: "SESS-D1-PHY",  date: new Date(Date.now()-86400000).toISOString().split('T')[0],  subject: "Physics",   chapter: "Magnetic Effects",         teacher: "Anil Sharma",    type: "Fresh",    topics: ["Biot-Savart Law", "Ampere's Law"] },
    { submissionId: "SESS-D1-MAT",  date: new Date(Date.now()-86400000).toISOString().split('T')[0],  subject: "Maths",     chapter: "Continuity",               teacher: "Rahul Joshi",    type: "Fresh",    topics: ["Continuity at a Point", "Continuity on an Interval"] },
    { submissionId: "SESS-D2-CHE",  date: new Date(Date.now()-172800000).toISOString().split('T')[0], subject: "Chemistry", chapter: "Chemical Kinetics",         teacher: "Priya Deshmukh", type: "Fresh",    topics: ["Rate of Reaction", "Rate Law", "Order of Reaction"] },
    { submissionId: "SESS-D2-PHY",  date: new Date(Date.now()-172800000).toISOString().split('T')[0], subject: "Physics",   chapter: "Current Electricity",      teacher: "Anil Sharma",    type: "Revision", topics: ["Full Chapter Revision"] },
    { submissionId: "SESS-D3-MAT",  date: new Date(Date.now()-259200000).toISOString().split('T')[0], subject: "Maths",     chapter: "Differentiation",          teacher: "Rahul Joshi",    type: "Fresh",    topics: ["Chain Rule", "Product Rule", "Quotient Rule"] },
  ],
  attendance: (() => {
    const y = new Date().getFullYear();
    const gen = (yr, mo, present, late, absent, days) => ({
      month: `${yr}-${String(mo).padStart(2,'0')}`,
      present, late, absent, holiday: 0,
      totalDays: present + absent,
      percent: Math.round((present / (present + absent)) * 100),
      days: days
    });
    const makeDays = (yr, mo, pattern) => {
      const result = [];
      pattern.forEach((s, i) => {
        if (!s) return;
        const d = String(i+1).padStart(2,'0');
        result.push({
          date: `${yr}-${String(mo).padStart(2,'0')}-${d}`,
          status: s,
          inTime:  s === 'A' || s === 'H' ? '--' : (s === 'L' ? '08:12 AM' : '07:28 AM'),
          outTime: s === 'A' || s === 'H' ? '--' : '01:15 PM',
          isWorkingDay: s === 'H' ? 'No' : 'Yes'
        });
      });
      return result;
    };
    return [
      gen(y, 1, 24, 1, 2, makeDays(y,1,[0,'P','P','P',0,'P','P','P','P','P',0,0,'P','P','P','P','P',0,0,'L','P','P','P','P',0,0,'P','P','P','P','P'])),
      gen(y, 2, 20, 2, 2, makeDays(y,2,[0,'P','P','A',0,'P','P','P','L','P',0,0,'P','P','P','P','P',0,0,'P','P','A','P','P',0,0,'P','L',0,0,0])),
      gen(y, 3, 22, 0, 4, makeDays(y,3,[0,'P','P','P',0,'A','P','P','P','P',0,0,'P','A','P','P','P',0,0,'P','P','P','P','P',0,0,'A','P','P','A','P'])),
      gen(y, 4, new Date().getDate()-2, 1, 1, makeDays(y,4,[0,'P','P',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null].map((v,i) => i < new Date().getDate() ? (i===0?0:i===3?'A':i===2?'L':'P') : null))),
    ];
  })(),
  kyc: (() => {
    const y = new Date().getFullYear();
    // Each month: 3 subjects — scores show improvement trend
    const months = [
      { month: `${y}-01`, label: 'Jan',
        subjects: [
          { subject:'Physics',   testName:'Unit Test 1', score:58, maxScore:100, percent:58, teacher:'Arvind Tambe',    teacherRemarks:'Shows basic understanding. Needs to focus on numerical problems.',      improvementAreas:'Numerical problems in Mechanics, Kinematics formulas' },
          { subject:'Chemistry', testName:'Unit Test 1', score:62, maxScore:100, percent:62, teacher:'Kanchan Jagtap',  teacherRemarks:'Good theoretical knowledge. Organic reactions need more practice.',    improvementAreas:'Organic reaction mechanisms, IUPAC nomenclature' },
          { subject:'Maths',     testName:'Unit Test 1', score:54, maxScore:100, percent:54, teacher:'Mayur Gaikwad',   teacherRemarks:'Concept clarity is developing. Practice integration more regularly.',   improvementAreas:'Integration by parts, Definite integrals, Limits' },
        ]
      },
      { month: `${y}-02`, label: 'Feb',
        subjects: [
          { subject:'Physics',   testName:'Unit Test 2', score:65, maxScore:100, percent:65, teacher:'Arvind Tambe',    teacherRemarks:'Good improvement in numericals. Optics chapter needs attention.',        improvementAreas:'Optics — refraction, lens formula, wave optics' },
          { subject:'Chemistry', testName:'Unit Test 2', score:70, maxScore:100, percent:70, teacher:'Kanchan Jagtap',  teacherRemarks:'Organic reactions improving. Physical chemistry is strong.',            improvementAreas:'Electrochemistry, Chemical equilibrium' },
          { subject:'Maths',     testName:'Unit Test 2', score:61, maxScore:100, percent:61, teacher:'Mayur Gaikwad',   teacherRemarks:'Integration has improved. Work on coordinate geometry problems.',       improvementAreas:'Coordinate geometry, Conic sections, 3D geometry' },
        ]
      },
      { month: `${y}-03`, label: 'Mar',
        subjects: [
          { subject:'Physics',   testName:'Monthly Test', score:74, maxScore:100, percent:74, teacher:'Arvind Tambe',   teacherRemarks:'Consistent improvement. Strong in Electrostatics. Revise thermodynamics.', improvementAreas:'Thermodynamics, Semiconductors' },
          { subject:'Chemistry', testName:'Monthly Test', score:78, maxScore:100, percent:78, teacher:'Kanchan Jagtap', teacherRemarks:'Very good progress. Inorganic chemistry is excellent.',                   improvementAreas:'Coordination compounds, Biomolecules' },
          { subject:'Maths',     testName:'Monthly Test', score:72, maxScore:100, percent:72, teacher:'Mayur Gaikwad',  teacherRemarks:'Good consistent effort. Probability and statistics need more focus.',     improvementAreas:'Probability, Statistics, Matrices' },
        ]
      },
      { month: `${y}-04`, label: 'Apr',
        subjects: [
          { subject:'Physics',   testName:'Monthly Test', score:81, maxScore:100, percent:81, teacher:'Arvind Tambe',   teacherRemarks:'Excellent growth. Ready for board-level questions in most chapters.',     improvementAreas:'Modern physics — nuclear reactions, photoelectric effect' },
          { subject:'Chemistry', testName:'Monthly Test', score:83, maxScore:100, percent:83, teacher:'Kanchan Jagtap', teacherRemarks:'Outstanding performance. Maintain this level in final preparation.',      improvementAreas:'Revise reaction mechanisms before boards' },
          { subject:'Maths',     testName:'Monthly Test', score:79, maxScore:100, percent:79, teacher:'Mayur Gaikwad',  teacherRemarks:'Strong improvement in all areas. Focus on speed during final revision.',  improvementAreas:'Speed and accuracy in calculus problems' },
        ]
      },
    ];
    return months.reverse(); // most recent first
  })(),
};
// ─────────────────────────────────────────────────────────────────────────────

export default function ParentPortalLogin() {
  const router   = useRouter();
  const [studentId, setStudentId] = useState('');
  const [pin,       setPin]       = useState('');
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    if (!studentId.trim() || !pin.trim()) {
      setError('Please enter both Student ID and PIN.');
      return;
    }
    setLoading(true);
    try {
      // ── Demo mode bypass ──────────────────────────────────
      let data;
      if (studentId.trim().toUpperCase() === DEMO_ID && pin.trim() === DEMO_PIN) {
        data = DEMO_DATA;
      } else {
        // ── Real API call ───────────────────────────────────
        const url = `${PORTAL_API_URL}?student_id=${encodeURIComponent(studentId.trim())}&pin=${encodeURIComponent(pin.trim())}`;
        const res = await fetch(url);
        data = await res.json();
      }
      if (!data.ok) {
        setError(data.error || 'Login failed. Please check your credentials.');
        setLoading(false);
        return;
      }
      // Store session data
      sessionStorage.setItem('ea_portal_data',    JSON.stringify(data));
      sessionStorage.setItem('ea_portal_student', JSON.stringify(data.student));
      sessionStorage.setItem('ea_portal_time',    Date.now().toString());
      router.push('/parent-portal/dashboard');
    } catch (err) {
      setError('Unable to connect. Please check your internet and try again.');
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Logo / Header */}
        <div style={styles.header}>
          <div style={styles.logoIcon}>📚</div>
          <h1 style={styles.logoName}>Edukare Academy</h1>
          <p style={styles.logoTag}>Education with Care</p>
        </div>

        {/* Title */}
        <div style={styles.titleBlock}>
          <span style={styles.badge}>Parent Portal</span>
          <h2 style={styles.title}>Track Your Child's Progress</h2>
          <p style={styles.subtitle}>
            Log in with the Student ID and PIN provided at the time of admission.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Student ID</label>
            <input
              style={styles.input}
              type="text"
              placeholder="e.g. STU001"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              autoCapitalize="characters"
              autoComplete="username"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Portal PIN</label>
            <input
              style={styles.input}
              type="password"
              placeholder="6-digit PIN"
              value={pin}
              onChange={e => setPin(e.target.value)}
              maxLength={6}
              inputMode="numeric"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? '⏳ Logging in...' : '🔐 View Progress'}
          </button>
        </form>

        {/* Demo hint */}
        <div style={styles.demoBox}>
          🧪 <strong>Demo:</strong> Student ID <code>DEMO</code> · PIN <code>123456</code>
        </div>

        {/* Help */}
        <p style={styles.help}>
          Forgot your PIN? WhatsApp us at{' '}
          <a href="https://wa.me/918530180202" style={styles.link} target="_blank" rel="noreferrer">
            8530180202
          </a>
          {' '}or visit the branch.
        </p>

        <div style={styles.divider} />

        <Link href="/" style={styles.backLink}>← Back to main website</Link>
      </div>

      {/* Install hint for mobile */}
      <p style={styles.installHint}>
        📲 Tip: Add this page to your home screen for quick access like an app.
      </p>
    </div>
  );
}

const GREEN       = '#1A6B3A';
const GREEN_LIGHT = '#e8f5ee';
const GREEN_DARK  = '#124d2a';
const ORANGE      = '#E87B1A';
const BORDER      = '#e2e8f0';
const TEXT        = '#1a1a1a';
const TEXT_MID    = '#4a5568';

const styles = {
  page: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 16px',
    background: 'var(--off-white)',
  },
  card: {
    background: '#fff',
    borderRadius: 20,
    boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
    padding: '40px 36px',
    width: '100%',
    maxWidth: 420,
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  logoIcon: {
    fontSize: 40,
    marginBottom: 6,
  },
  logoName: {
    fontSize: 20,
    fontWeight: 800,
    color: GREEN,
    margin: 0,
  },
  logoTag: {
    fontSize: 12,
    color: TEXT_MID,
    margin: '2px 0 0',
  },
  titleBlock: {
    textAlign: 'center',
    marginBottom: 28,
  },
  badge: {
    display: 'inline-block',
    background: GREEN_LIGHT,
    color: GREEN,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: TEXT,
    margin: '0 0 8px',
  },
  subtitle: {
    fontSize: 14,
    color: TEXT_MID,
    lineHeight: 1.6,
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginBottom: 20,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: TEXT,
  },
  input: {
    padding: '12px 14px',
    borderRadius: 10,
    border: `1.5px solid ${BORDER}`,
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  errorBox: {
    background: '#fff5f5',
    border: '1px solid #fed7d7',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 13,
    color: '#c53030',
  },
  btn: {
    background: GREEN,
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '14px',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.15s',
    fontFamily: 'inherit',
  },
  help: {
    textAlign: 'center',
    fontSize: 13,
    color: TEXT_MID,
    margin: 0,
  },
  link: {
    color: GREEN,
    fontWeight: 600,
  },
  divider: {
    borderTop: `1px solid ${BORDER}`,
    margin: '20px 0',
  },
  backLink: {
    display: 'block',
    textAlign: 'center',
    fontSize: 13,
    color: TEXT_MID,
    fontWeight: 600,
  },
  demoBox: {
    background: '#fffbeb',
    border: '1px solid #fcd34d',
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 13,
    color: '#92400e',
    marginBottom: 16,
    textAlign: 'center',
  },
  installHint: {
    marginTop: 16,
    fontSize: 12,
    color: TEXT_MID,
    textAlign: 'center',
    maxWidth: 380,
  },
};
