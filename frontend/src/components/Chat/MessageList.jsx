import React from 'react';
import './MessageList.css';

const MessageList = ({ messages }) => {
  // Функция для форматирования времени
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Функция для определения типа сообщения
  const getMessageType = (message) => {
    if (message.role === 'user') return 'user';
    if (message.role === 'assistant') return 'assistant';
    if (message.role === 'system') return 'system';
    return 'unknown';
  };

  // Функция для форматирования текста с эмодзи и ссылками
  const formatMessageText = (text) => {
    // Замена эмодзи на HTML (опционально)
    const emojiMap = {
      '✨': '✨',
      '🌟': '🌟',
      '💡': '💡',
      '🎯': '🎯',
      '⚡': '⚡',
      '🔥': '🔥',
      '💎': '💎',
      '🏛️': '🏛️',
      '📖': '📖',
      '🤔': '🤔',
      '😊': '😊',
      '🙂': '🙂',
      '🎭': '🎭'
    };

    // Замена переносов строк на <br/>
    let formattedText = text.replace(/\n/g, '<br/>');

    // Выделение жирным текста в кавычках «»
    formattedText = formattedText.replace(
      /«([^»]*)»/g, 
      '<span class="quote">«$1»</span>'
    );

    // Выделение жирным терминов (опционально)
    const terms = [
      'PV', 'MP', 'Бинар', 'КВ', 'ПР', 'Кешбек', 
      'БЗП', 'КПФ', 'Клуб', 'Бриллиант', 'Платинум',
      'Водорослим', '2+1', 'Промо', 'МЦР'
    ];
    
    terms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'g');
      formattedText = formattedText.replace(
        regex, 
        `<span class="term">${term}</span>`
      );
    });

    return formattedText;
  };

  // Отображение сообщения в зависимости от его типа
  const renderMessage = (message, index) => {
    const type = getMessageType(message);
    const isUser = type === 'user';
    const isAssistant = type === 'assistant';
    const isSystem = type === 'system';

    // Системные сообщения (например, начало диалога)
    if (isSystem) {
      return (
        <div key={index} className="message-system">
          <div className="message-system-content">
            <span className="system-icon">🏛️</span>
            <p>{message.content}</p>
          </div>
        </div>
      );
    }

    // Сообщения пользователя
    if (isUser) {
      return (
        <div key={index} className="message-wrapper message-user-wrapper">
          <div className="message-avatar user-avatar">
            <span>👤</span>
          </div>
          <div className="message-content user-message">
            <div className="message-header">
              <span className="message-sender">Вы</span>
              <span className="message-time">
                {message.timestamp ? formatTime(message.timestamp) : ''}
              </span>
            </div>
            <div 
              className="message-text"
              dangerouslySetInnerHTML={{ 
                __html: formatMessageText(message.content) 
              }}
            />
          </div>
        </div>
      );
    }

    // Сообщения ассистента (Сократ)
    if (isAssistant) {
      return (
        <div key={index} className="message-wrapper message-assistant-wrapper">
          <div className="message-avatar assistant-avatar">
            <span>🏛️</span>
          </div>
          <div className="message-content assistant-message">
            <div className="message-header">
              <span className="message-sender">Сократ</span>
              <span className="message-time">
                {message.timestamp ? formatTime(message.timestamp) : ''}
              </span>
            </div>
            <div 
              className="message-text"
              dangerouslySetInnerHTML={{ 
                __html: formatMessageText(message.content) 
              }}
            />
            <div className="message-footer">
              <span className="message-type">🤔 Сократовский вопрос</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // Отображение пустого состояния
  if (messages.length === 0) {
    return (
      <div className="message-list-empty">
        <div className="empty-state">
          <div className="empty-icon">🏛️</div>
          <h3>Начните диалог с Сократом</h3>
          <p>
            Задайте вопрос или опишите ситуацию, 
            и Сократ поможет вам найти ответ через наводящие вопросы.
          </p>
          <div className="empty-examples">
            <div className="example-card">
              <span className="example-icon">💡</span>
              <span>Разобрать личную ситуацию</span>
            </div>
            <div className="example-card">
              <span className="example-icon">📖</span>
              <span>Проанализировать цитату партнёра</span>
            </div>
            <div className="example-card">
              <span className="example-icon">🎯</span>
              <span>Найти путь к цели</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message, index) => renderMessage(message, index))}
    </div>
  );
};

export default MessageList;
