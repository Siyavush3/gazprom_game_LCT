// src/components/ShipMap.tsx
import React from 'react';

const locations = [
  { id: 'reactor', name: 'Реактор', icon: '⚡', active: true },
  { id: 'medical', name: 'Медмодуль', icon: '🛡️', active: false },
  { id: 'comms', name: 'Связь', icon: '📡', active: false },
  { id: 'lab', name: 'Лаборатория', icon: '🌱', active: false },
];

interface ShipMapProps {
  onSelect: (id: string) => void;
}

export default function ShipMap({ onSelect }: ShipMapProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      padding: '16px 0',
      borderTop: '1px solid var(--accent-secondary)',
      marginTop: '16px'
    }}>
      {locations.map(loc => (
        <button
          key={loc.id}
          onClick={() => onSelect(loc.id)}
          disabled={!loc.active}
          style={{
            background: 'transparent',
            border: 'none',
            color: loc.active ? 'var(--accent-energy)' : 'var(--text-secondary)',
            fontSize: '22px',
            cursor: loc.active ? 'pointer' : 'not-allowed',
            opacity: loc.active ? 1 : 0.4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>{loc.icon}</span>
          <span style={{ fontSize: '10px' }}>{loc.name}</span>
        </button>
      ))}
    </div>
  );
}