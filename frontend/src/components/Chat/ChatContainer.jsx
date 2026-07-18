import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ScenarioSelector from './ScenarioSelector';
import { useChat } from '../../hooks/useChat';
import './ChatContainer.css';

const ChatContainer = () => {
  const [scenario, setScenario] = useState('personal');
  const { messages, sendMessage, isLoading, isComplete } = useChat(scenario);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>💬 Диалог с Сократом</h2>
        <ScenarioSelector 
          scenario={scenario} 
          onScenarioChange={setScenario} 
        />
      </div>
      
      <div className="chat-messages-wrapper">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      
      {!isComplete && (
        <MessageInput 
          onSend={sendMessage} 
          isLoading={isLoading}
          disabled={isComplete}
        />
      )}
      
      {isComplete && (
        <div className="completion-message">
          <p>✨ Инсайт зафиксирован. Начните новый диалог для продолжения.</p>
          <button onClick={() => window.location.reload()}>
            Начать заново
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
