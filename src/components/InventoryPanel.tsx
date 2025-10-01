// src/components/InventoryPanel.tsx
import React from 'react';

interface InventoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InventoryPanel({ isOpen, onClose }: InventoryPanelProps) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
      }}
      onClick={onClose}
    >
      <div 
        className="card"
        style={{
          width: '90%',
          maxWidth: '400px',
          padding: '24px',
          position: 'relative',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--accent-secondary)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ color: 'var(--accent-energy)', marginBottom: '16px', textAlign: 'center' }}>
          🎒 Инвентарь
        </h3>
        
        <div style={{ 
          textAlign: 'center', 
          padding: '32px 0', 
          color: 'var(--text-secondary)',
          border: '1px dashed var(--accent-secondary)',
          borderRadius: '0'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
          <p>Инвентарь пуст.</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Предметы появятся по мере прохождения миссий.
          </p>
        </div>

        <button 
          className="btn" 
          onClick={onClose}
          style={{ marginTop: '24px' }}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
