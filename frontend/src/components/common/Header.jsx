import React from 'react';
import './Header.css';

const Header = ({ onGlossaryClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🏛️</span>
          <span className="logo-text">Сократ</span>
          <span className="logo-subtitle">Вертера</span>
        </div>
        <nav className="header-nav">
          <button className="nav-btn" onClick={onGlossaryClick}>
            📖 Глоссарий
          </button>
          <a 
            href="https://github.com/yourusername/sokrat-vertera" 
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn"
          >
            ⭐ GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
