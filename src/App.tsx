// src/App.tsx
import React, { useState, useEffect } from 'react';
import MainMapScreen from './components/MainMapScreen';
import ReactorScene from './components/ReactorScene';
import ReactorMinigame from './components/ReactorMinigame';
import ResultExplanation from './components/ResultExplanation';

const PRODUCT_URLS = {
  savings: "https://www.gazprombank.ru/personal/increase/deposits/detail/7582023/",
  current: "https://www.gazprombank.ru/accounts/save-easy/",
  invest: "https://www.gazprombank.ru/personal/page/increase/investment/"
};
type Screen = 'main' | 'reactor' | 'minigame' | 'result';
type Tab = 'map' | 'inventory' | 'profile' | 'ranking';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [activeTab, setActiveTab] = useState<Tab>('map');
  const [energy, setEnergy] = useState(58);
  const [hasAchievement, setHasAchievement] = useState(false);
  const [resultData, setResultData] = useState<{ reserve: number; today: number; research: number } | null>(null);
  const [showTutorial, setShowTutorial] = useState(() => {
    return !sessionStorage.getItem('helios_tutorial_shown');
  });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!showTutorial) {
      sessionStorage.setItem('helios_tutorial_shown', 'true');
    }
  }, [showTutorial]);

  const navigateTo = (screen: Screen) => {
    if (screen === 'main') {
      // При возврате на главный экран — сброс анимации
      setCurrentScreen(screen);
    } else {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentScreen(screen);
        setIsExiting(false);
      }, 300);
    }
  };

  const handleLocationSelect = (id: string) => {
    if (id === 'reactor') {
      navigateTo('reactor');
    }
  };

  const handleCreateReservoir = () => {
    navigateTo('minigame');
  };

  const handleProductSelect = (reserve: number, today: number, research: number) => {
    setResultData({ reserve, today, research });
    navigateTo('result');
  };

  if (showTutorial) {
    return <TutorialScreen onComplete={() => setShowTutorial(false)} />;
  }

  // Анимация только для НЕ-главных экранов
  const shouldAnimate = currentScreen !== 'main';
  const screenStyle: React.CSSProperties = shouldAnimate
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'translateX(20px)' : 'translateX(0)',
        transition: 'opacity 0.3s, transform 0.3s',
        zIndex: 10,
      }
    : {};

  return (
    <div className="app" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Главный экран — без анимации, с меню */}
      {currentScreen === 'main' && (
        <MainMapScreen
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLocationSelect={handleLocationSelect}
          energy={energy}
          hasAchievement={hasAchievement}
        />
      )}

      {/* Другие экраны — с анимацией */}
      {shouldAnimate && (
        <div style={screenStyle}>
          {currentScreen === 'reactor' && (
            <ReactorScene onCreateReservoir={handleCreateReservoir} />
          )}
          {currentScreen === 'minigame' && (
            <ReactorMinigame onProductSelect={handleProductSelect} />
          )}
          {currentScreen === 'result' && resultData && (
            <ResultExplanation
              reserve={resultData.reserve}
              today={resultData.today}
              research={resultData.research}
              onAccept={() => {
                const productKey = 
                  resultData.reserve > resultData.today && resultData.reserve > resultData.research ? 'savings' :
                  resultData.today > resultData.reserve && resultData.today > resultData.research ? 'current' :
                  'invest';
                window.open(PRODUCT_URLS[productKey], '_blank');
                setEnergy(100);
                setHasAchievement(true);
                navigateTo('main');
              }}
              onDecline={() => {
                navigateTo('main');
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

// TutorialScreen — без изменений (оставь как есть)
const TutorialScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const STORY_LINES = [
    "День 87. Корабль «Гелиос» летит к новой Земле.",
    "Реактор генерирует энергию, но её не хватает на всех.",
    "Вы — инженер по устойчивому развитию. От вас зависит будущее экипажа.",
    "Ваша задача — управлять ресурсами: энергией, водой, стабильностью.",
    "Начните с распределения энергии в Реакторном отсеке."
  ];

  useEffect(() => {
    if (currentLine >= STORY_LINES.length) return;

    const line = STORY_LINES[currentLine];
    let i = 0;
    setIsTyping(true);

    const timer = setInterval(() => {
      if (i < line.length) {
        setDisplayText(line.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentLine]);

  const skipLine = () => {
    if (isTyping) {
      setDisplayText(STORY_LINES[currentLine]);
      setIsTyping(false);
    } else if (currentLine < STORY_LINES.length - 1) {
      setCurrentLine(prev => prev + 1);
      setDisplayText('');
    } else {
      onComplete();
    }
  };

  return (
    <div className="app" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '0 16px',
      height: '100vh'
    }}>
      <div className="card" style={{ 
        width: '100%',
        maxWidth: '400px',
        padding: '24px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <p style={{ 
          fontSize: '18px', 
          lineHeight: 1.6,
          minHeight: '60px',
          color: 'var(--text-primary)'
        }}>
          {displayText}
        </p>
        
        <button
          onClick={skipLine}
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-energy)',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default App;