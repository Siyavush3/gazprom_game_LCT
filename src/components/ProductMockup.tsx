import React from 'react';

interface ProductMockupProps {
  stability: number;
  onOpenDeposit: () => void;
}

export default function ProductMockup({ stability, onOpenDeposit }: ProductMockupProps) {
  const isSuccess = stability >= 80;
  const rate = isSuccess ? '7.5%' : '5.0%';

  return (
    <div className="app">
      <h1 className="fade-in">Вклад «Энергетический резервуар»</h1>

      <div className="card fade-in delay-1">
        <p style={{ color: 'var(--accent-energy)', fontWeight: 'bold', marginBottom: '12px' }}>
          Стабильность реактора: <strong>{stability}%</strong>
        </p>
        <p>
          {isSuccess
            ? '✅ Отлично! Ваш резервуар будет расти на 7.5% годовых.'
            : '⚠️ Стабильность низкая. Резервуар активирован на 5.0% годовых.'}
        </p>
        <p style={{ marginTop: '16px' }}>• Капитализация ежемесячно</p>
        <p>• Пополнение и частичное снятие</p>
      </div>

      <button className="btn fade-in delay-2" onClick={onOpenDeposit}>
        Открыть вклад
      </button>
    </div>
  );
}
