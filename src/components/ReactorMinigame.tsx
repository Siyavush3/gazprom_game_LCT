// src/components/ReactorMinigame.tsx
import React, { useState } from 'react';

interface ReactorMinigameProps {
  onProductSelect: (reserve: number, today: number, research: number) => void;
}

export default function ReactorMinigame({ onProductSelect }: ReactorMinigameProps) {
  const [reserve, setReserve] = useState(40);
  const [today, setToday] = useState(40);
  const [research, setResearch] = useState(20);
  const total = reserve + today + research;
  const isBalanced = total === 100;

  const changeValue = (type: 'reserve' | 'today' | 'research', value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    if (type === 'reserve') setReserve(clamped);
    if (type === 'today') setToday(clamped);
    if (type === 'research') setResearch(clamped);
  };

  const handleSubmit = () => {
    if (!isBalanced) return;
    onProductSelect(reserve, today, research);
  };

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 16px' }}>
      <div className="card" style={{ padding: '24px', width: '100%' }}>
        <h2 style={{ color: 'var(--accent-energy)', textAlign: 'center', marginBottom: '8px' }}>
          Распределение энергии
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>
          Реактор выработал <strong>100</strong> единиц энергии. Распределите их.
        </p>

        <AllocationBlock
          label="Резервуар"
          icon="🔋"
          description="Накопление на будущее"
          value={reserve}
          color="var(--accent-energy)"
          onChange={(v) => changeValue('reserve', v)}
          total={total}
        />

        <AllocationBlock
          label="Сегодня"
          icon="⚡"
          description="Жизнеобеспечение сейчас"
          value={today}
          color="var(--accent-primary)"
          onChange={(v) => changeValue('today', v)}
          total={total}
        />

        <AllocationBlock
          label="Исследования"
          icon="🔬"
          description="Рост через инновации"
          value={research}
          color="var(--accent-warning)"
          onChange={(v) => changeValue('research', v)}
          total={total}
        />

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '20px',
          padding: '12px',
          background: total === 100 ? 'rgba(88, 255, 255, 0.1)' : 'rgba(221, 65, 219, 0.1)',
          border: `1px solid ${total === 100 ? 'var(--accent-energy)' : 'var(--accent-warning)'}`,
          borderRadius: '0'
        }}>
          <span>Всего:</span>
          <strong style={{ color: total === 100 ? 'var(--accent-energy)' : 'var(--accent-warning)' }}>
            {total} / 100
          </strong>
        </div>

        <button
          className="btn"
          onClick={handleSubmit}
          disabled={!isBalanced}
          style={{ marginTop: '24px' }}
        >
          {isBalanced ? 'Подтвердить распределение' : 'Сумма должна быть 100'}
        </button>
      </div>
    </div>
  );
}

const AllocationBlock = ({
  label,
  icon,
  description,
  value,
  color,
  onChange,
  total
}: {
  label: string;
  icon: string;
  description: string;
  value: number;
  color: string;
  onChange: (value: number) => void;
  total: number;
}) => {
  const increment = () => {
    if (total < 100) onChange(value + 1);
  };

  const decrement = () => {
    if (value > 0) onChange(value - 1);
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <div>
          <div style={{ fontWeight: 'bold', color }}>{label}</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{description}</div>
        </div>
        <div style={{ marginLeft: 'auto', fontWeight: 'bold', color }}>
          {value}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={decrement}
          disabled={value <= 0}
          style={{
            width: '44px',
            height: '44px',
            background: 'var(--bg-card)',
            border: '1px solid var(--accent-secondary)',
            color: value > 0 ? 'white' : 'var(--text-secondary)',
            borderRadius: '0',
            fontSize: '20px',
            cursor: value > 0 ? 'pointer' : 'not-allowed'
          }}
        >
          −
        </button>

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
          min="0"
          max="100"
          style={{
            width: '80px',
            padding: '10px',
            textAlign: 'center',
            background: 'var(--bg-card)',
            border: '1px solid var(--accent-secondary)',
            color: 'white',
            borderRadius: '0',
            fontSize: '16px'
          }}
        />

        <button
          onClick={increment}
          disabled={total >= 100}
          style={{
            width: '44px',
            height: '44px',
            background: 'var(--bg-card)',
            border: '1px solid var(--accent-secondary)',
            color: total < 100 ? 'white' : 'var(--text-secondary)',
            borderRadius: '0',
            fontSize: '20px',
            cursor: total < 100 ? 'pointer' : 'not-allowed'
          }}
        >
          +
        </button>

        <div style={{ 
          marginLeft: '12px', 
          width: '100%', 
          height: '8px', 
          background: 'var(--bg-card)', 
          border: '1px solid var(--accent-secondary)',
          borderRadius: '0',
          position: 'relative'
        }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${value}%`, 
              background: color,
              transition: 'width 0.2s'
            }} 
          />
        </div>
      </div>
    </div>
  );
};