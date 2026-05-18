'use client';
import { useState } from 'react';

// Known people gender hints (name → gender)
const GENDER_MAP = {
  'Swara Yeola': 'women',
  'Samiksha Autane': 'women',
  'Mugda Dalvi': 'women',
  'Tanisha Manghrani': 'women',
  'Tanisha Botre': 'women',
  'Livia Shusheel': 'women',
  'Sofia Inamdar': 'women',
  'Niharika Malewar': 'women',
  'Kirti Shinde': 'women',
  'Sonali Donolikar': 'women',
  'Meenakshi Waghmare': 'women',
  'Kanchan Jagtap': 'women',
  'Ankansha Garg': 'women',
  'Swati Katke': 'women',
  'Pranjal Ramesh Gladade': 'women',
  'Manasi Mulajkar': 'women',
  'Darshana Shrinivas Hasanpalli': 'women',
  'Tejomayee M. Nikam': 'women',
  'Chandani Tak': 'women',
  'Ankita Gad': 'women',
};

function hashName(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = name.charCodeAt(i) + ((h << 5) - h);
  }
  return Math.abs(h);
}

function getPhotoUrl(name = '') {
  const gender = GENDER_MAP[name] || (hashName(name) % 3 === 0 ? 'women' : 'men');
  // Use indices 1–70 to avoid very young/old extremes
  const index = (hashName(name) % 60) + 5;
  return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
}

// Fallback initials avatar if image fails to load
function InitialsFallback({ name, size }) {
  const COLORS = ['#1A6B3A','#1A3C8F','#E87B1A','#C9960A','#7B2D8F','#2D6B8F'];
  const bg = COLORS[hashName(name) % COLORS.length];
  const parts = name.trim().split(' ');
  const letters = parts.length === 1
    ? parts[0][0]?.toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontWeight: 800,
      fontSize: Math.round(size * 0.38), color: 'white',
      flexShrink: 0, userSelect: 'none',
    }}>{letters}</div>
  );
}

// photoState: 'local' → try /teachers/Name.jpg
//             'random' → fall back to randomuser.me  (skipped when localOnly=true)
//             'initials' → final fallback
//
// localOnly: pass true on the Faculty page so teachers without a real
//            photo get an initials avatar instead of a stock photo
// faceY: optional vertical position for objectPosition (e.g. '15%' for full-body portraits)
export default function Avatar({ name = '', size = 64, localOnly = false, faceY = 'center' }) {
  const [photoState, setPhotoState] = useState('local');

  const localUrl  = `/teachers/${name}.jpg`;
  const randomUrl = getPhotoUrl(name);

  const imgStyle = {
    width: size, height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    objectPosition: `center ${faceY}`,
    display: 'block',
    flexShrink: 0,
  };

  if (photoState === 'initials') return <InitialsFallback name={name} size={size} />;

  function handleError() {
    if (photoState === 'local') {
      // If localOnly, skip randomuser.me and go straight to initials
      setPhotoState(localOnly ? 'initials' : 'random');
    } else {
      setPhotoState('initials');
    }
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoState === 'local' ? localUrl : randomUrl}
      alt={name}
      width={size}
      height={size}
      style={imgStyle}
      onError={handleError}
    />
  );
}
