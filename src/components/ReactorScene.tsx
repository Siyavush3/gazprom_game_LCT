// src/components/ReactorScene.tsx
import React from 'react';

interface ReactorSceneProps {
  onCreateReservoir: () => void;
}

export default function ReactorScene({ onCreateReservoir }: ReactorSceneProps) {
  return (
    <div className="app">
      <div className="card" style={{ 
        backgroundColor: 'rgba(10, 10, 21, 0.9)',
        border: '1px solid var(--accent-energy)',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--accent-energy)', marginBottom: '16px' }}>
          Реакторный отсек
        </h2>
        <p style={{ 
          color: 'var(--text-primary)', 
          lineHeight: 1.6, 
          fontSize: '16px',
          marginBottom: '24px'
        }}>
          День 87. Энергия тает. Реактор работает на износ.
        </p>
        <p style={{ 
          color: 'var(--text-primary)', 
          lineHeight: 1.6, 
          fontSize: '16px',
          marginBottom: '24px'
        }}>
          Создайте <strong style={{ color: 'var(--accent-energy)' }}>Энергетический резервуар</strong>, чтобы накапливать энергию даже во сне.
        </p>
        <button 
          className="btn" 
          onClick={onCreateReservoir}
          style={{ marginTop: '16px' }}
        >
          Создать резервуар
        </button>
      </div>
    </div>
  );
}