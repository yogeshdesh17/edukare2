'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SESSION_KEY = 'ea_portal_data';
const TIME_KEY    = 'ea_portal_time';
const SESSION_TTL = 8 * 60 * 60 * 1000; // 8 hours

// Subject colour map — extend as needed
const SUBJECT_COLORS = {
  'Physics':   { bar: '#1A3C8F', light: '#eef2fa' },
  'Chemistry': { bar: '#1A6B3A', light: '#e8f5ee' },
  'Maths':     { bar: '#E87B1A', light: '#fff4e6' },
  'Mathematics':{ bar: '#E87B1A', light: '#fff4e6' },
  'Biology':   { bar: '#0f766e', light: '#e6faf8' },
  'English':   { bar: '#7c3aed', light: '#f3f0ff' },
  'History':   { bar: '#b45309', light: '#fef3c7' },
  'Geography': { bar: '#065f46', light: '#d1fae5' },
  'default':   { bar: '#1A6B3A', light: '#e8f5ee' },
};
function subjColor(name) {
  return SUBJECT_COLORS[name] || SUBJECT_COLORS['default'];
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

function getDaysAgo(dateStr) {
  if (!dateStr) return '';
  try {
    const diff = Math.round((Date.now() - new Date(dateStr)) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  } catch { return ''; }
}

export default function Dashboard() {
  const router = useRouter();
  const [data,        setData]        = useState(null);
  const [activeTab,    setActiveTab]    = useState('progress');
  const [expandedSid,  setExpandedSid]  = useState(null);
  const [viewMonth,    setViewMonth]    = useState(() => new Date().toISOString().substring(0, 7)); // 'YYYY-MM'

  useEffect(() => {
    const raw  = sessionStorage.getItem(SESSION_KEY);
    const time = sessionStorage.getItem(TIME_KEY);
    if (!raw || !time || (Date.now() - Number(time) > SESSION_TTL)) {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(TIME_KEY);
      router.replace('/parent-portal');
      return;
    }
    try { setData(JSON.parse(raw)); }
    catch { router.replace('/parent-portal'); }
  }, [router]);

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TIME_KEY);
    router.push('/parent-portal');
  }

  if (!data) {
    return (
      <div style={S.loadWrap}>
        <div style={S.spinner}>⏳</div>
        <p style={{ color: TEXT_MID, fontSize: 14 }}>Loading your dashboard…</p>
      </div>
    );
  }

  const { student, summary, progress, recentSessions, todaySessions, attendance = [], kyc = [] } = data;

  return (
    <div style={S.page}>

      {/* ── Header ─────────────────────────────────────── */}
      <div style={S.topBar}>
        <div style={S.topBarInner}>
          <div>
            <p style={S.greeting}>👋 Welcome back</p>
            <h2 style={S.studentName}>{student.name}</h2>
            <p style={S.batchTag}>{student.batchName} · {student.className} · {student.board}</p>
          </div>
          <button onClick={logout} style={S.logoutBtn} title="Logout">
            🚪 Logout
          </button>
        </div>
      </div>

      <div style={S.container}>

        {/* ── Overall progress card ───────────────────── */}
        <div style={S.overallCard}>
          <div style={S.overallLeft}>
            <p style={S.overallLabel}>Overall Syllabus</p>
            <p style={S.overallPct}>{summary.overallPercent}%</p>
            <p style={S.overallSub}>
              {summary.coveredTopics} of {summary.totalTopics} topics covered
            </p>
          </div>
          <div style={S.overallRight}>
            <div style={S.statBox}>
              <span style={S.statNum}>{summary.totalSessions}</span>
              <span style={S.statLbl}>Sessions (30d)</span>
            </div>
            <div style={S.statBox}>
              <span style={{ ...S.statNum, color: summary.todayCount > 0 ? GREEN : TEXT_MID }}>
                {summary.todayCount}
              </span>
              <span style={S.statLbl}>Today</span>
            </div>
          </div>
          {/* Overall bar */}
          <div style={S.overallBarWrap}>
            <div style={{ ...S.overallBar, width: summary.overallPercent + '%' }} />
          </div>
        </div>

        {/* ── Today alert ─────────────────────────────── */}
        {todaySessions.length > 0 && (
          <div style={S.todayAlert}>
            <span style={S.todayIcon}>✅</span>
            <div>
              <strong style={{ color: GREEN, fontSize: 14 }}>
                {todaySessions.length} session{todaySessions.length > 1 ? 's' : ''} logged today
              </strong>
              <p style={{ margin: 0, fontSize: 13, color: TEXT_MID }}>
                {todaySessions.map(s => s.subject).join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* ── Tab nav ──────────────────────────────────── */}
        <div style={S.tabBar}>
          {[
            { id: 'progress',    label: '📊 Progress' },
            { id: 'sessions',    label: '📋 Sessions' },
            { id: 'today',       label: `📅 Today${summary.todayCount > 0 ? ` (${summary.todayCount})` : ''}` },
            { id: 'attendance',  label: '🗓 Attendance' },
            { id: 'kyc',         label: '📝 KYC Report' },
          ].map(tab => (
            <button
              key={tab.id}
              style={{ ...S.tabBtn, ...(activeTab === tab.id ? S.tabActive : {}) }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════ */}
        {/* TAB: PROGRESS                                  */}
        {/* ══════════════════════════════════════════════ */}
        {activeTab === 'progress' && (
          <div>
            <p style={S.sectionNote}>
              Syllabus completion per subject · Academic Year {student.academicYear}
            </p>
            {progress.length === 0 ? (
              <EmptyState icon="📚" title="No progress yet" desc="Sessions haven't been logged for your batch yet. Check back soon." />
            ) : (
              progress.map(subj => {
                const col = subjColor(subj.subject);
                return (
                  <div key={subj.subject} style={S.progressCard}>
                    <div style={S.progressHeader}>
                      <div style={{ ...S.subjDot, background: col.bar }} />
                      <span style={S.subjName}>{subj.subject}</span>
                      <span style={{ ...S.subjPct, color: col.bar }}>{subj.percent}%</span>
                    </div>
                    <div style={S.barTrack}>
                      <div style={{
                        ...S.barFill,
                        width: subj.percent + '%',
                        background: col.bar,
                      }} />
                    </div>
                    <div style={S.progressMeta}>
                      <span>{subj.coveredTopics} / {subj.totalTopics} topics</span>
                      {subj.chaptersComplete > 0 && (
                        <span>{subj.chaptersComplete} chapter{subj.chaptersComplete !== 1 ? 's' : ''} covered</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════ */}
        {/* TAB: SESSIONS                                  */}
        {/* ══════════════════════════════════════════════ */}
        {activeTab === 'sessions' && (
          <div>
            <p style={S.sectionNote}>Last 30 days · {recentSessions.length} sessions logged</p>
            {recentSessions.length === 0 ? (
              <EmptyState icon="📋" title="No sessions yet" desc="No sessions have been logged in the last 30 days." />
            ) : (
              recentSessions.map(sess => {
                const col      = subjColor(sess.subject);
                const expanded = expandedSid === sess.submissionId;
                return (
                  <div
                    key={sess.submissionId}
                    style={S.sessionCard}
                    onClick={() => setExpandedSid(expanded ? null : sess.submissionId)}
                  >
                    <div style={S.sessionTop}>
                      <div style={{ ...S.sessSubjPill, background: col.light, color: col.bar }}>
                        {sess.subject}
                      </div>
                      <span style={S.sessDate}>
                        {getDaysAgo(sess.date)} · {formatDate(sess.date)}
                      </span>
                    </div>
                    <div style={S.sessionMid}>
                      <strong style={S.chapterName}>{sess.chapter}</strong>
                      <span style={S.teacherName}>👤 {sess.teacher}</span>
                    </div>
                    {expanded && (
                      <div style={S.topicList}>
                        <p style={S.topicListLabel}>Topics covered:</p>
                        {sess.topics.map(t => (
                          <span key={t} style={S.topicPill}>{t}</span>
                        ))}
                      </div>
                    )}
                    <div style={S.expandHint}>
                      {expanded ? '▲ Hide topics' : `▼ ${sess.topics.length} topic${sess.topics.length !== 1 ? 's' : ''}`}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════ */}
        {/* TAB: TODAY                                     */}
        {/* ══════════════════════════════════════════════ */}
        {activeTab === 'today' && (
          <div>
            <p style={S.sectionNote}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            {todaySessions.length === 0 ? (
              <EmptyState icon="☀️" title="No sessions today" desc="No sessions have been logged yet for today. Check back after class." />
            ) : (
              todaySessions.map(sess => {
                const col = subjColor(sess.subject);
                return (
                  <div key={sess.submissionId} style={{ ...S.sessionCard, border: `2px solid ${col.bar}` }}>
                    <div style={S.sessionTop}>
                      <div style={{ ...S.sessSubjPill, background: col.bar, color: '#fff' }}>
                        {sess.subject}
                      </div>
                      <span style={{ ...S.sessDate, color: GREEN, fontWeight: 600 }}>Today ✅</span>
                    </div>
                    <div style={S.sessionMid}>
                      <strong style={S.chapterName}>{sess.chapter}</strong>
                      <span style={S.teacherName}>👤 {sess.teacher}</span>
                    </div>
                    <div style={S.topicList}>
                      <p style={S.topicListLabel}>Topics covered today:</p>
                      {sess.topics.map(t => (
                        <span key={t} style={{ ...S.topicPill, background: col.light, color: col.bar }}>{t}</span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════ */}
        {/* TAB: ATTENDANCE                               */}
        {/* ══════════════════════════════════════════════ */}
        {activeTab === 'attendance' && (
          <AttendanceCalendar
            attendance={attendance}
            viewMonth={viewMonth}
            setViewMonth={setViewMonth}
          />
        )}

        {/* ══════════════════════════════════════════════ */}
        {/* TAB: KYC REPORT                               */}
        {/* ══════════════════════════════════════════════ */}
        {activeTab === 'kyc' && (
          <KYCReport kyc={kyc} />
        )}

        {/* ── Footer note ─────────────────────────────── */}
        <div style={S.footerNote}>
          <p>Data updated in real-time from Edukare Academy's session tracker.</p>
          <p>For queries: <a href="https://wa.me/918530180202" style={{ color: GREEN, fontWeight: 600 }}>WhatsApp 8530180202</a></p>
        </div>

      </div>{/* /container */}
    </div>
  );
}

function EmptyState({ icon, title, desc }) {
  return (
    <div style={S.emptyState}>
      <span style={{ fontSize: 40 }}>{icon}</span>
      <strong style={{ color: TEXT, fontSize: 16 }}>{title}</strong>
      <p style={{ color: TEXT_MID, fontSize: 14, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ─── KYC Report Component ─────────────────────────────────────
const MONTH_NAMES_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function monthLabel(ym) {
  const [y, m] = ym.split('-').map(Number);
  return MONTH_NAMES_FULL[m - 1] + ' ' + y;
}

function ScoreTrendGraph({ kyc, subject }) {
  const points = [];
  const reversed = [...kyc].reverse();
  reversed.forEach(monthData => {
    const subj = (monthData.subjects || []).find(s => s.subject === subject);
    if (subj) points.push({ month: monthData.month, pct: subj.percent });
  });

  if (points.length < 2) return null;

  const W = 260, H = 72, PAD = 8;
  const minPct = Math.max(0,  Math.min(...points.map(p => p.pct)) - 10);
  const maxPct = Math.min(100, Math.max(...points.map(p => p.pct)) + 10);
  const range  = maxPct - minPct || 1;

  const cx = (i) => PAD + (i / (points.length - 1)) * (W - PAD * 2);
  const cy = (pct) => H - PAD - ((pct - minPct) / range) * (H - PAD * 2);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${cx(i)} ${cy(p.pct)}`).join(' ');
  const fillD = `${pathD} L ${cx(points.length-1)} ${H} L ${cx(0)} ${H} Z`;
  const lineColor = '#1A6B3A';

  return (
    <div style={{ marginTop: 10, overflowX: 'auto' }}>
      <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Score Trend</p>
      <svg width={W} height={H} style={{ display: 'block', overflow: 'visible' }}>
        <path d={fillD} fill={lineColor} fillOpacity={0.08} />
        <path d={pathD} fill="none" stroke={lineColor} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={cx(i)} cy={cy(p.pct)} r={4} fill="#fff" stroke={lineColor} strokeWidth={2} />
            <text x={cx(i)} y={cy(p.pct) - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={lineColor}>{p.pct}%</text>
            <text x={cx(i)} y={H - 1} textAnchor="middle" fontSize={8} fill="#9ca3af">
              {p.month.substring(5, 7) + '/' + p.month.substring(2, 4)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function KYCReport({ kyc }) {
  const [viewIdx, setViewIdx] = useState(0);

  if (!kyc || kyc.length === 0) {
    return <EmptyState icon="📝" title="No KYC reports yet" desc="Monthly reports will appear here once your teacher submits them. Check back after month-end." />;
  }

  const monthData = kyc[viewIdx] || kyc[0];
  const canPrev   = viewIdx < kyc.length - 1;
  const canNext   = viewIdx > 0;

  return (
    <div>
      {/* Month navigator */}
      <div style={KC.navRow}>
        <button style={{ ...KC.navBtn, opacity: canPrev ? 1 : 0.3 }} onClick={() => canPrev && setViewIdx(viewIdx + 1)} disabled={!canPrev}>‹</button>
        <div style={KC.navCenter}>
          <span style={KC.navMonth}>{monthLabel(monthData.month)}</span>
          <span style={KC.navSub}>Know Your Child Report</span>
        </div>
        <button style={{ ...KC.navBtn, opacity: canNext ? 1 : 0.3 }} onClick={() => canNext && setViewIdx(viewIdx - 1)} disabled={!canNext}>›</button>
      </div>

      {/* Subject cards */}
      {(monthData.subjects || []).map(subj => {
        const col      = SUBJECT_COLORS[subj.subject] || SUBJECT_COLORS['default'];
        const pct      = subj.percent;
        const pctColor = pct >= 75 ? '#1A6B3A' : pct >= 50 ? '#d97706' : '#dc2626';
        const pctBg    = pct >= 75 ? '#e8f5ee'  : pct >= 50 ? '#fef3c7'  : '#fee2e2';
        const teacherPhoto = subj.teacher ? `/teachers/${subj.teacher}.jpg` : null;

        return (
          <div key={subj.subject} style={KC.card}>
            <div style={KC.cardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ ...KC.subjDot, background: col.bar }} />
                <span style={KC.subjName}>{subj.subject}</span>
              </div>
              <div style={{ ...KC.scoreBadge, background: pctBg, color: pctColor }}>
                {subj.score}/{subj.maxScore} · {pct}%
              </div>
            </div>

            <div style={KC.barTrack}>
              <div style={{ ...KC.barFill, width: pct + '%', background: col.bar }} />
            </div>
            <p style={KC.testName}>{subj.testName}</p>

            <ScoreTrendGraph kyc={kyc} subject={subj.subject} />

            <div style={KC.teacherRow}>
              {teacherPhoto && (
                <img
                  src={teacherPhoto}
                  alt={subj.teacher}
                  style={KC.teacherPhoto}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={KC.teacherName}>👤 {subj.teacher}</p>
                {subj.teacherRemarks && (
                  <div style={KC.remarksBox}>
                    <p style={KC.remarksLabel}>Teacher's Remarks</p>
                    <p style={KC.remarksText}>"{subj.teacherRemarks}"</p>
                  </div>
                )}
                {subj.improvementAreas && (
                  <div style={KC.improvBox}>
                    <p style={KC.improvLabel}>⚡ Areas to Improve</p>
                    <p style={KC.improvText}>{subj.improvementAreas}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Month dots */}
      {kyc.length > 1 && (
        <div style={KC.dotsRow}>
          {kyc.map((m, i) => (
            <button
              key={m.month}
              style={{ ...KC.dot, background: i === viewIdx ? GREEN : BORDER, transform: i === viewIdx ? 'scale(1.3)' : 'scale(1)' }}
              onClick={() => setViewIdx(i)}
              title={monthLabel(m.month)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── KYC component styles ─────────────────────────────────────
const KC = {
  navRow:      { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, background:'#fff', borderRadius:14, padding:'16px 20px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' },
  navBtn:      { background:'#f3f4f6', border:'none', borderRadius:8, width:40, height:40, fontSize:22, cursor:'pointer', fontFamily:'inherit', color:'#374151' },
  navCenter:   { display:'flex', flexDirection:'column', alignItems:'center', gap:4 },
  navMonth:    { fontSize:18, fontWeight:900, color:'#1a1a1a' },
  navSub:      { fontSize:11, fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.06em' },
  card:        { background:'#fff', borderRadius:16, padding:'20px', marginBottom:14, boxShadow:'0 2px 12px rgba(0,0,0,0.07)' },
  cardHeader:  { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 },
  subjDot:     { width:10, height:10, borderRadius:'50%', flexShrink:0 },
  subjName:    { fontSize:16, fontWeight:800, color:'#1a1a1a' },
  scoreBadge:  { fontSize:14, fontWeight:800, padding:'5px 14px', borderRadius:20, whiteSpace:'nowrap' },
  barTrack:    { background:'#e2e8f0', borderRadius:6, height:8, overflow:'hidden', marginBottom:8 },
  barFill:     { height:'100%', borderRadius:6, transition:'width 0.6s ease' },
  testName:    { margin:'0 0 4px', fontSize:12, fontWeight:600, color:'#6b7280' },
  teacherRow:  { display:'flex', gap:14, marginTop:14, paddingTop:14, borderTop:'1px solid #f0f0f0', alignItems:'flex-start' },
  teacherPhoto:{ width:52, height:52, borderRadius:12, objectFit:'cover', flexShrink:0, border:'2px solid #e2e8f0' },
  teacherName: { margin:'0 0 8px', fontSize:13, fontWeight:700, color:'#1a1a1a' },
  remarksBox:  { background:'#f8faf9', borderRadius:10, padding:'10px 12px', marginBottom:8 },
  remarksLabel:{ margin:'0 0 4px', fontSize:10, fontWeight:700, color:'#1A6B3A', textTransform:'uppercase', letterSpacing:'0.06em' },
  remarksText: { margin:0, fontSize:13, color:'#374151', fontStyle:'italic', lineHeight:1.5 },
  improvBox:   { background:'#fffbeb', borderRadius:10, padding:'10px 12px' },
  improvLabel: { margin:'0 0 4px', fontSize:10, fontWeight:700, color:'#d97706', textTransform:'uppercase', letterSpacing:'0.06em' },
  improvText:  { margin:0, fontSize:12, color:'#92400e', lineHeight:1.5 },
  dotsRow:     { display:'flex', justifyContent:'center', gap:8, padding:'8px 0 4px' },
  dot:         { width:8, height:8, borderRadius:'50%', border:'none', cursor:'pointer', transition:'all 0.2s', padding:0 },
};

// ── Attendance Calendar Component ─────────────────────────────
const MONTHS      = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DAYS_SHORT  = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function attCircle(pct) {
  if (pct === null || pct === undefined) return { icon: '—', color: '#9ca3af', bg: '#f3f4f6', label: 'No data' };
  if (pct >= 85) return { icon: '✓', color: '#1A6B3A', bg: '#e8f5ee', label: pct + '%' };
  if (pct >= 75) return { icon: '!', color: '#d97706', bg: '#fef3c7', label: pct + '%' };
  return           { icon: '!', color: '#dc2626', bg: '#fee2e2', label: pct + '%' };
}

function statusColor(status) {
  if (status === 'P') return { dot: '#1A6B3A', bg: '#e8f5ee', label: 'P' };
  if (status === 'L') return { dot: '#d97706', bg: '#fef3c7', label: 'L' };
  if (status === 'A') return { dot: '#dc2626', bg: '#fee2e2', label: 'A' };
  if (status === 'H') return { dot: '#6b7280', bg: '#f3f4f6', label: 'H' };
  return               { dot: '#d1d5db', bg: '#f9fafb', label: '·' };
}

// ── helpers ───────────────────────────────────────────────────
function prevMonth(ym) {
  const [y, m] = ym.split('-').map(Number);
  return m === 1
    ? `${y - 1}-12`
    : `${y}-${String(m - 1).padStart(2, '0')}`;
}
function nextMonth(ym) {
  const [y, m] = ym.split('-').map(Number);
  return m === 12
    ? `${y + 1}-01`
    : `${y}-${String(m + 1).padStart(2, '0')}`;
}

function AttendanceCalendar({ attendance, viewMonth, setViewMonth }) {
  const [selectedDay, setSelectedDay] = useState(null);

  // Reset selected day when month changes
  const handleSetMonth = (m) => { setViewMonth(m); setSelectedDay(null); };

  // Build lookup map
  const attByMonth = {};
  attendance.forEach(m => { attByMonth[m.month] = m; });

  const nowMonthKey = new Date().toISOString().substring(0, 7);
  const todayStr    = new Date().toISOString().split('T')[0];
  const monthData   = attByMonth[viewMonth] || null;

  const [y, mo]     = viewMonth.split('-').map(Number);
  const monthName   = new Date(y, mo - 1, 1).toLocaleString('en-IN', { month: 'long' });
  const firstDay    = new Date(y, mo - 1, 1).getDay();
  const daysInMonth = new Date(y, mo, 0).getDate();

  // Day map from attendance data
  const dayMap = {};
  if (monthData) {
    monthData.days.forEach(d => {
      const num = parseInt(d.date.split('-')[2]);
      dayMap[num] = d;
    });
  }

  // Summary stats
  const pct         = monthData ? monthData.percent : null;
  const circ        = attCircle(pct);
  const isFutureMo  = viewMonth > nowMonthKey;

  // Calendar grid cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedData = selectedDay ? dayMap[selectedDay] : null;

  return (
    <div>

      {/* ── Month navigator ──────────────────────────────── */}
      <div style={AC.navRow}>
        <button style={AC.navBtn} onClick={() => handleSetMonth(prevMonth(viewMonth))}>‹</button>
        <div style={AC.navCenter}>
          <span style={AC.navMonth}>{monthName} {y}</span>
          {/* Monthly % badge */}
          {pct !== null ? (
            <span style={{ ...AC.pctBadge, background: circ.bg, color: circ.color }}>
              {pct}% attendance
            </span>
          ) : (
            <span style={{ ...AC.pctBadge, background: '#f3f4f6', color: '#9ca3af' }}>
              No data
            </span>
          )}
        </div>
        <button
          style={{ ...AC.navBtn, opacity: viewMonth >= nowMonthKey ? 0.3 : 1 }}
          onClick={() => viewMonth < nowMonthKey && handleSetMonth(nextMonth(viewMonth))}
          disabled={viewMonth >= nowMonthKey}
        >›</button>
      </div>

      {/* ── Summary stats row ────────────────────────────── */}
      {monthData && (
        <div style={AC.statsRow}>
          {[
            { val: monthData.present,  label: 'Present',  color: '#1A6B3A', bg: '#e8f5ee' },
            { val: monthData.absent,   label: 'Absent',   color: '#dc2626', bg: '#fee2e2' },
            { val: monthData.late,     label: 'Late',     color: '#d97706', bg: '#fef3c7' },
            { val: monthData.totalDays,label: 'Total Days',color: '#1A3C8F', bg: '#eef2fa' },
          ].map(s => (
            <div key={s.label} style={{ ...AC.statBox2, background: s.bg }}>
              <span style={{ ...AC.statNum2, color: s.color }}>{s.val}</span>
              <span style={AC.statLbl2}>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Calendar grid ────────────────────────────────── */}
      <div style={AC.calCard}>
        {/* Day-of-week headers */}
        <div style={AC.calGrid}>
          {DAYS_SHORT.map(d => (
            <div key={d} style={AC.dayHeader}>{d}</div>
          ))}

          {cells.map((day, idx) => {
            if (!day) return <div key={`e-${idx}`} />;
            const rec      = dayMap[day];
            const sc       = statusColor(rec ? rec.status : null);
            const dateStr  = `${viewMonth}-${String(day).padStart(2,'0')}`;
            const isToday  = dateStr === todayStr;
            const isSel    = selectedDay === day;
            const isFuture = dateStr > todayStr;

            return (
              <div
                key={day}
                style={{
                  ...AC.dayCell,
                  background: isSel ? sc.dot : (rec ? sc.bg : 'transparent'),
                  border: isToday
                    ? `2px solid ${GREEN}`
                    : isSel
                      ? `2px solid ${sc.dot}`
                      : `1px solid ${rec ? sc.dot + '40' : BORDER}`,
                  cursor: rec ? 'pointer' : 'default',
                  opacity: isFuture ? 0.25 : 1,
                  boxShadow: isSel ? `0 2px 8px ${sc.dot}40` : 'none',
                }}
                onClick={() => rec && !isFuture && setSelectedDay(isSel ? null : day)}
              >
                <span style={{
                  fontSize: 13,
                  fontWeight: isToday ? 900 : 600,
                  color: isSel ? '#fff' : (isToday ? GREEN : TEXT),
                }}>
                  {day}
                </span>
                {rec && !isFuture && (
                  <span style={{
                    fontSize: 9,
                    fontWeight: 800,
                    color: isSel ? 'rgba(255,255,255,0.9)' : sc.dot,
                    letterSpacing: '0.04em',
                    lineHeight: 1,
                  }}>
                    {sc.label}
                  </span>
                )}
                {isToday && !rec && (
                  <span style={{ fontSize: 7, color: GREEN, fontWeight: 800 }}>TODAY</span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Selected day detail ───────────────────────── */}
        {selectedData && (
          <div style={AC.dayDetail}>
            <div style={AC.dayDetailHeader}>
              <span style={AC.ddDate}>
                {new Date(selectedData.date + 'T00:00:00').toLocaleDateString('en-IN', {
                  weekday: 'long', day: 'numeric', month: 'long'
                })}
              </span>
              <span style={{
                ...AC.ddStatusPill,
                background: statusColor(selectedData.status).bg,
                color: statusColor(selectedData.status).dot,
              }}>
                {{ P: '✓ Present', A: '✗ Absent', L: '⚠ Late', H: '⛔ Holiday' }[selectedData.status] || selectedData.status}
              </span>
            </div>
            {(selectedData.inTime !== '--' || selectedData.outTime !== '--') && (
              <div style={AC.ddTimesRow}>
                <div style={AC.ddTimeBox}>
                  <span style={AC.ddTimeLabel}>In Time</span>
                  <span style={AC.ddTimeVal}>{selectedData.inTime !== '--' ? selectedData.inTime : '—'}</span>
                </div>
                <div style={{ width: 1, background: BORDER, alignSelf: 'stretch' }} />
                <div style={AC.ddTimeBox}>
                  <span style={AC.ddTimeLabel}>Out Time</span>
                  <span style={AC.ddTimeVal}>{selectedData.outTime !== '--' ? selectedData.outTime : '—'}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── No data state ─────────────────────────────── */}
        {!monthData && !isFutureMo && (
          <div style={{ textAlign:'center', padding:'32px 16px', color: TEXT_MID }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
            <p style={{ margin: 0, fontSize: 14 }}>Attendance not yet imported for this month.</p>
          </div>
        )}
        {isFutureMo && (
          <div style={{ textAlign:'center', padding:'32px 16px', color: TEXT_MID }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
            <p style={{ margin: 0, fontSize: 14 }}>This month hasn't started yet.</p>
          </div>
        )}

        {/* ── Status key ───────────────────────────────── */}
        <div style={AC.statusKey}>
          {[
            ['P', 'Present',  '#1A6B3A', '#e8f5ee'],
            ['L', 'Late',     '#d97706', '#fef3c7'],
            ['A', 'Absent',   '#dc2626', '#fee2e2'],
            ['H', 'Holiday',  '#6b7280', '#f3f4f6'],
          ].map(([k, lbl, c, bg]) => (
            <div key={k} style={{ display:'flex', alignItems:'center', gap:5 }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6,
                background: bg, border: `1.5px solid ${c}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 9, fontWeight: 900, color: c }}>{k}</span>
              </div>
              <span style={{ fontSize: 12, color: TEXT_MID, fontWeight: 500 }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Attendance component styles ─────────────────────────────
const AC = {
  // Month navigator row
  navRow:    { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16, background:'#fff', borderRadius:14, padding:'16px 20px', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' },
  navBtn:    { background:'#f3f4f6', border:'none', borderRadius:8, width:40, height:40, fontSize:22, cursor:'pointer', fontFamily:'inherit', color:'#374151' },
  navCenter: { display:'flex', flexDirection:'column', alignItems:'center', gap:6 },
  navMonth:  { fontSize:20, fontWeight:900, color:'#1a1a1a' },
  pctBadge:  { fontSize:13, fontWeight:700, padding:'4px 14px', borderRadius:20 },

  // Summary stats
  statsRow:  { display:'flex', gap:8, marginBottom:16 },
  statBox2:  { flex:1, borderRadius:12, padding:'12px 8px', display:'flex', flexDirection:'column', alignItems:'center', gap:2 },
  statNum2:  { fontSize:22, fontWeight:900 },
  statLbl2:  { fontSize:11, fontWeight:600, color:'#6b7280', textAlign:'center' },

  // Calendar card + grid
  calCard:   { background:'#fff', borderRadius:16, padding:'16px', boxShadow:'0 2px 12px rgba(0,0,0,0.07)', marginBottom:16 },
  calGrid:   { display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:6, marginBottom:16 },
  dayHeader: { textAlign:'center', fontSize:11, fontWeight:700, color:'#9ca3af', padding:'4px 0' },
  dayCell:   { borderRadius:10, padding:'8px 2px', display:'flex', flexDirection:'column', alignItems:'center', gap:3, minHeight:48, justifyContent:'center', transition:'all 0.15s', cursor:'pointer' },

  // Selected day detail panel
  dayDetail:       { background:'#f8faf9', borderRadius:12, padding:'16px', marginBottom:16 },
  dayDetailHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  ddDate:          { fontSize:14, fontWeight:700, color:'#1a1a1a' },
  ddStatusPill:    { fontSize:13, fontWeight:700, padding:'5px 14px', borderRadius:20 },
  ddTimesRow:      { display:'flex', background:'#fff', borderRadius:10, border:'1px solid #e2e8f0', overflow:'hidden' },
  ddTimeBox:       { flex:1, padding:'12px', display:'flex', flexDirection:'column', alignItems:'center', gap:4 },
  ddTimeLabel:     { fontSize:11, fontWeight:600, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em' },
  ddTimeVal:       { fontSize:16, fontWeight:800, color:'#1a1a1a' },

  // Status key legend
  statusKey: { display:'flex', flexWrap:'wrap', gap:12, paddingTop:12, borderTop:'1px solid #e5e7eb' },
};

// ─── Colours ─────────────────────────────────────────────────
const GREEN      = '#1A6B3A';
const GREEN_DARK = '#124d2a';
const GREEN_LIGHT= '#e8f5ee';
const ORANGE     = '#E87B1A';
const BORDER     = '#e2e8f0';
const TEXT       = '#1a1a1a';
const TEXT_MID   = '#4a5568';

// ─── Styles ──────────────────────────────────────────────────
const S = {
  page: { background: 'var(--off-white)', minHeight: '80vh', paddingBottom: 80, paddingTop: 72 },
  loadWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: 12 },
  spinner:  { fontSize: 40 },
  container: { maxWidth: 680, margin: '0 auto', padding: '0 16px 40px' },

  // Top bar
  topBar: { background: GREEN, color: '#fff', padding: '24px 16px', marginBottom: 0 },
  topBarInner: { maxWidth: 680, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting:    { margin: '0 0 2px', fontSize: 13, opacity: 0.8 },
  studentName: { margin: '0 0 4px', fontSize: 22, fontWeight: 800 },
  batchTag:    { margin: 0, fontSize: 13, opacity: 0.85, background: 'rgba(255,255,255,0.15)', display: 'inline-block', padding: '3px 10px', borderRadius: 20 },
  logoutBtn:   { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 },

  // Overall card
  overallCard: { background: '#fff', borderRadius: 16, padding: '24px', margin: '20px 0 16px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' },
  overallLeft: { marginBottom: 16 },
  overallLabel:{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: TEXT_MID },
  overallPct:  { margin: '0 0 4px', fontSize: 42, fontWeight: 900, color: GREEN, lineHeight: 1 },
  overallSub:  { margin: 0, fontSize: 13, color: TEXT_MID },
  overallRight:{ display: 'flex', gap: 12, marginBottom: 16 },
  statBox:     { background: GREEN_LIGHT, borderRadius: 10, padding: '12px 16px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 },
  statNum:     { fontSize: 24, fontWeight: 900, color: GREEN },
  statLbl:     { fontSize: 11, color: TEXT_MID, fontWeight: 600, textAlign: 'center' },
  overallBarWrap: { background: BORDER, borderRadius: 8, height: 10, overflow: 'hidden' },
  overallBar:  { height: '100%', background: GREEN, borderRadius: 8, transition: 'width 0.6s ease' },

  // Today alert
  todayAlert: { background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 },
  todayIcon:  { fontSize: 24, flexShrink: 0 },

  // Tabs
  tabBar:   { display: 'flex', gap: 8, marginBottom: 20, background: '#fff', borderRadius: 12, padding: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  tabBtn:   { flex: 1, padding: '10px 8px', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: 'transparent', color: TEXT_MID, fontFamily: 'inherit', transition: 'all 0.2s' },
  tabActive:{ background: GREEN, color: '#fff', boxShadow: '0 2px 8px rgba(26,107,58,0.3)' },

  sectionNote: { fontSize: 13, color: TEXT_MID, marginBottom: 16, marginTop: 0 },

  // Progress cards
  progressCard:  { background: '#fff', borderRadius: 14, padding: '18px 20px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  progressHeader:{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
  subjDot:       { width: 10, height: 10, borderRadius: '50%', flexShrink: 0 },
  subjName:      { fontSize: 15, fontWeight: 700, color: TEXT, flex: 1 },
  subjPct:       { fontSize: 18, fontWeight: 900 },
  barTrack:      { background: BORDER, borderRadius: 6, height: 8, overflow: 'hidden', marginBottom: 8 },
  barFill:       { height: '100%', borderRadius: 6, transition: 'width 0.6s ease' },
  progressMeta:  { display: 'flex', justifyContent: 'space-between', fontSize: 12, color: TEXT_MID },

  // Session cards
  sessionCard: { background: '#fff', borderRadius: 14, padding: '16px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', border: `1.5px solid ${BORDER}`, transition: 'border-color 0.2s' },
  sessionTop:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sessSubjPill:{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em' },
  sessDate:    { fontSize: 12, color: TEXT_MID },
  sessionMid:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  chapterName: { fontSize: 14, color: TEXT, fontWeight: 700 },
  teacherName: { fontSize: 12, color: TEXT_MID },
  topicList:   { marginTop: 12, paddingTop: 12, borderTop: `1px solid ${BORDER}` },
  topicListLabel: { margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: TEXT_MID, textTransform: 'uppercase', letterSpacing: '0.05em' },
  topicPill:   { display: 'inline-block', background: GREEN_LIGHT, color: GREEN, fontSize: 12, padding: '4px 10px', borderRadius: 20, margin: '3px 4px 3px 0', fontWeight: 600 },
  expandHint:  { fontSize: 12, color: TEXT_MID, marginTop: 8, textAlign: 'right' },

  // Empty state
  emptyState: { background: '#fff', borderRadius: 16, padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },


  // Footer
  footerNote: { marginTop: 32, textAlign: 'center', fontSize: 12, color: TEXT_MID, lineHeight: 1.8 },
};
