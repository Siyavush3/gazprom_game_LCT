// src/components/ProfileTab.tsx
export default function ProfileTab() {
  return (
    <div className="card">
      <h3 style={{ color: 'var(--accent-energy)', marginBottom: '16px' }}>👤 Профиль</h3>
      <p><strong>Звание:</strong> Инженер-стажёр</p>
      <p><strong>Миссий выполнено:</strong> 1</p>
      <p><strong>Энергии накоплено:</strong> 100%</p>
      <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
        Продолжайте управлять ресурсами, чтобы повысить звание.
      </p>
    </div>
  );
}
