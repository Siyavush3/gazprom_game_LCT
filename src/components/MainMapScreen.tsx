// src/components/MainMapScreen.tsx
import React from 'react';
import ShipMap from './ShipMap';
import ProfileTab from './ProfileTab';
import RankingTab from './RankingTab';

interface MainMapScreenProps {
  activeTab: 'map' | 'inventory' | 'profile' | 'ranking';
  onTabChange: (tab: 'map' | 'inventory' | 'profile' | 'ranking') => void;
  onLocationSelect: (id: string) => void;
  energy: number;
  hasAchievement: boolean;
}

export default function MainMapScreen({
  activeTab,
  onTabChange,
  onLocationSelect,
  energy,
  hasAchievement,
}: MainMapScreenProps) {
  const status = {
    energy,
    stability: 68,
    crew: 1274,
    water: 84,
    day: 87,
    coordinates: "X: 4.2 LY, Y: -1.8 LY"
  };

  return (
    <div className="app" style={{ paddingBottom: '70px' }}>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="status-row">
          <span>Энергия:</span>
          <strong className="status-energy">{status.energy}%</strong>
        </div>
        <div className="status-row">
          <span>Стабильность:</span>
          <span>{status.stability}%</span>
        </div>
        <div className="status-row">
          <span>Экипаж:</span>
          <span>{status.crew}</span>
        </div>
        <div className="status-row">
          <span>Вода:</span>
          <span>{status.water}%</span>
        </div>
        <div className="status-row">
          <span>День:</span>
          <span>{status.day}</span>
        </div>
        <div className="status-row">
          <span>Координаты:</span>
          <span>{status.coordinates}</span>
        </div>
      </div>

      {activeTab === 'map' && (
        <>
          {hasAchievement && (
            <div className="card" style={{ 
              borderLeft: '3px solid var(--accent-energy)',
              backgroundColor: 'rgba(88, 255, 255, 0.08)',
              marginBottom: '16px'
            }}>
            </div>
          )}
          <ShipMap onSelect={onLocationSelect} />
        </>
      )}

      {activeTab === 'inventory' && (
        <div className="card">
          <h3 style={{ color: 'var(--accent-energy)', marginBottom: '16px' }}>🎒 Инвентарь</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Пусто. Предметы появятся позже.</p>
        </div>
      )}

      {activeTab === 'profile' && <ProfileTab />}
      {activeTab === 'ranking' && <RankingTab />}
      
      {/* Меню */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'rgba(6, 6, 10, 0.95)',
          borderTop: '1px solid var(--accent-secondary)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        {(['map', 'inventory', 'profile', 'ranking'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === tab ? 'var(--accent-energy)' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <span>
              {tab === 'map' && '🗺'}
              {tab === 'inventory' && '🎒'}
              {tab === 'profile' && '👤'}
              {tab === 'ranking' && '🏆'}
            </span>
            <span>
              {tab === 'map' && 'Карта'}
              {tab === 'inventory' && 'Инвентарь'}
              {tab === 'profile' && 'Профиль'}
              {tab === 'ranking' && 'Рейтинг'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}