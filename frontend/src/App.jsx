import React, { useState } from 'react';
import Header from './components/common/Header';
import ChatContainer from './components/Chat/ChatContainer';
import GlossaryModal from './components/Glossary/GlossaryModal';

function App() {
  const [showGlossary, setShowGlossary] = useState(false);

  return (
    <div className="app">
      <Header onGlossaryClick={() => setShowGlossary(true)} />
      <main className="main-content">
        <ChatContainer />
      </main>
      {showGlossary && (
        <GlossaryModal onClose={() => setShowGlossary(false)} />
      )}
    </div>
  );
}

export default App;
