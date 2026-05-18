'use client';
import { useState } from 'react';
import Avatar from './Avatar';

export default function FacultyGrid({ team, subjectColors }) {
  const [lightbox, setLightbox] = useState(null); // { name, subject, qual, photoUrl }

  function openLightbox(f) {
    setLightbox(f);
  }
  function closeLightbox() {
    setLightbox(null);
  }

  return (
    <>
      <div className="faculty-grid">
        {team.map(f => {
          const color = subjectColors[f.subject] || subjectColors.default;
          return (
            <div
              key={f.id}
              className="faculty-card"
              style={{ cursor: 'pointer' }}
              onClick={() => openLightbox(f)}
              title={`View ${f.name}`}
            >
              <div className="faculty-avatar" style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', overflow:'visible', position:'relative' }}>
                <Avatar name={f.name} size={96} localOnly faceY={f.faceY} />
                {/* zoom hint overlay */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: 'rgba(0,0,0,0)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s', fontSize: 22,
                  opacity: 0,
                }} className="avatar-zoom-hint">🔍</div>
              </div>
              <div className="faculty-name">{f.name}</div>
              <span className="faculty-subject" style={{ background: color }}>{f.subject}</span>
              <div className="faculty-qual">{f.qual}</div>
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 24, overflow: 'hidden',
              maxWidth: 380, width: '100%',
              boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Full photo — contain so the whole image is visible, no cropping */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/teachers/${lightbox.name}.jpg`}
              alt={lightbox.name}
              style={{
                width: '100%',
                maxHeight: 420,
                objectFit: 'contain',
                background: '#f3f4f6',
                display: 'block',
              }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            {/* Info panel */}
            <div style={{ padding: '20px 24px 24px' }}>
              <h3 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 900, color: '#1a1a1a' }}>
                {lightbox.name}
              </h3>
              <span style={{
                display: 'inline-block', marginBottom: 10,
                background: subjectColors[lightbox.subject] || subjectColors.default,
                color: '#fff', fontSize: 12, fontWeight: 700,
                padding: '3px 12px', borderRadius: 20, letterSpacing: '0.04em',
              }}>{lightbox.subject}</span>
              <p style={{ margin: '0 0 16px', fontSize: 14, color: '#6b7280' }}>{lightbox.qual}</p>
              <button
                onClick={closeLightbox}
                style={{
                  width: '100%', padding: '12px', border: 'none',
                  borderRadius: 12, background: '#f3f4f6',
                  fontSize: 14, fontWeight: 700, color: '#374151',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* hover effect via global style */}
      <style>{`
        .faculty-card:hover .avatar-zoom-hint {
          opacity: 1 !important;
          background: rgba(0,0,0,0.28) !important;
        }
        .faculty-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
      `}</style>
    </>
  );
}
