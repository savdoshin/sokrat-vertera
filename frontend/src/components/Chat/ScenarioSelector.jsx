import React, { useState } from 'react';
import './ScenarioSelector.css';

const ScenarioSelector = ({ scenario, onScenarioChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scenarios = [
    {
      id: 'personal',
      label: 'Личная ситуация',
      description: 'Разбор твоей ситуации в бизнесе',
      icon: '🧠',
      color: '#667eea'
    },
    {
      id: 'partner',
      label: 'Цитаты партнёров',
      description: 'Анализ фраз и убеждений команды',
      icon: '👥',
      color: '#c8a96e'
    }
  ];

  const currentScenario = scenarios.find(s => s.id === scenario) || scenarios[0];

  const handleSelect = (scenarioId) => {
    onScenarioChange(scenarioId);
    setIsOpen(false);
  };

  return (
    <div className="scenario-selector">
      <button 
        className="scenario-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{ borderColor: currentScenario.color }}
      >
        <span className="scenario-icon">{currentScenario.icon}</span>
        <span className="scenario-label">{currentScenario.label}</span>
        <span className={`scenario-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="scenario-dropdown">
          {scenarios.map((s) => (
            <button
              key={s.id}
              className={`scenario-option ${s.id === scenario ? 'active' : ''}`}
              onClick={() => handleSelect(s.id)}
              style={{ 
                borderLeftColor: s.color,
                background: s.id === scenario ? `rgba(${hexToRgb(s.color)}, 0.1)` : 'transparent'
              }}
            >
              <span className="option-icon">{s.icon}</span>
              <div className="option-content">
                <span className="option-label">{s.label}</span>
                <span className="option-description">{s.description}</span>
              </div>
              {s.id === scenario && (
                <span className="option-check">✓</span>
              )}
            </button>
          ))}
          
          <div className="scenario-info">
            <p className="info-text">
              💡 {scenario === 'personal' 
                ? 'Сократ поможет тебе разобраться в личной ситуации через наводящие вопросы'
                : 'Сократ проанализирует цитаты твоих партнёров и поможет перевести их в идеальную модель'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Вспомогательная функция для конвертации hex в rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
    : '200, 169, 110';
}

export default ScenarioSelector;
