// src/components/RankingTab.tsx
export default function RankingTab() {
  return (
    <div className="card">
      <h3 style={{ color: 'var(--accent-energy)', marginBottom: '16px' }}>🏆 Рейтинг кораблей</h3>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>1. Баракуда</span>
          <span>100%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-energy)' }}>
          <span>2. Вы</span>
          <span>87%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>3. Доктор Ливси</span>
          <span>76%</span>
        </div>
      </div>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
        Ваш вклад помогает всему экипажу двигаться к цели.
      </p>
    </div>
  );
}
