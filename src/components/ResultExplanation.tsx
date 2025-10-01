// src/components/ResultExplanation.tsx
import React from 'react';

interface ResultExplanationProps {
  reserve: number;
  today: number;
  research: number;
  onAccept: () => void;
  onDecline: () => void;
}

export default function ResultExplanation({
  reserve,
  today,
  research,
  onAccept,
  onDecline
}: ResultExplanationProps) {
  // Определяем доминирующую стратегию
  let title = "";
  let icon = "";
  let productType = "";
  let explanation = "";
  let benefit = "";
  let analogy = "";

  if (reserve > today && reserve > research) {
    title = "Энергетический резервуар";
    icon = "🔋";
    productType = "вклад";
    analogy = "Ваш выбор — накопление на будущее.";
    explanation = "В игре: вы направили энергию в резервуар, чтобы она росла со временем.\n\nВ реальности: это как открыть Вклад в банке. Ваши деньги работают на вас, принося доход без риска.";
    benefit = "✅ Гарантированный доход\n✅ Деньги растут даже во сне\n✅ Идеально для целей: покупка, обучение, отдых";
  } 
  else if (today > reserve && today > research) {
    title = "Системы жизнеобеспечения";
    icon = "⚡";
    productType = "текущий счёт";
    analogy = "Ваш выбор — стабильность здесь и сейчас.";
    explanation = "В игре: вы направили энергию на поддержание систем сегодня.\n\nВ реальности: это как использовать Накопительный счет. Полный контроль над деньгами, мгновенный доступ, кэшбэк за траты.";
    benefit = "✅ Мгновенный доступ к деньгам\n✅ Кэшбэк до 30%\n✅ Бесплатное обслуживание";
  } 
  else {
    title = "Исследовательский модуль";
    icon = "🔬";
    productType = "инвестиции";
    analogy = "Ваш выбор — рост через инновации.";
    explanation = "В игре: вы вложили энергию в исследования для прорыва.\n\nВ реальности: это как инвестиции. Высокий потенциал роста, но с осознанным риском. Подходит для долгосрочных целей.";
    benefit = "✅ Доход выше, чем по вкладам\n✅ Доступ к фондовому рынку\n✅ Профессиональное сопровождение";
  }

  return (
    <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
          <h2 style={{ color: 'var(--accent-energy)', marginBottom: '8px' }}>
            {title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            {analogy}
          </p>
        </div>

        <div style={{ 
          background: 'rgba(13, 13, 26, 0.5)',
          border: '1px solid var(--accent-secondary)',
          borderRadius: '0',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <p style={{ 
            color: 'var(--text-primary)', 
            lineHeight: 1.6,
            whiteSpace: 'pre-line'
          }}>
            {explanation}
          </p>
        </div>

        <div style={{ 
          background: 'rgba(88, 255, 255, 0.1)',
          border: '1px solid var(--accent-energy)',
          borderRadius: '0',
          padding: '12px',
          marginBottom: '24px'
        }}>
          <h4 style={{ color: 'var(--accent-energy)', marginBottom: '8px' }}>
            Почему это выгодно?
          </h4>
          <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {benefit}
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginTop: '16px'
        }}>
          <button
            className="btn"
            onClick={onAccept}
            style={{ 
              background: 'var(--accent-energy)', 
              color: '#000',
              flex: 1
            }}
          >
            Активировать {productType}
          </button>
          <button
            className="btn"
            onClick={onDecline}
            style={{ 
              background: 'var(--bg-card)', 
              color: 'var(--text-secondary)',
              border: '1px solid var(--accent-secondary)',
              flex: 1
            }}
          >
            Позже
          </button>
        </div>
      </div>
    </div>
  );
}