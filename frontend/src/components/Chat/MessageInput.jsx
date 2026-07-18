import React, { useState, useRef, useEffect } from 'react';
import './MessageInput.css';

const MessageInput = ({ onSend, isLoading, disabled }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Автоматическое изменение высоты textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = 
        Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [message]);

  // Обработка отправки
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
      // Сброс высоты textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Обработка клавиш
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Обработка вставки из буфера обмена
  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText) {
      setMessage(prev => prev + pastedText);
      e.preventDefault();
    }
  };

  // Обработка загрузки файлов (опционально)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Можно добавить логику обработки файлов
      console.log('File selected:', file.name);
    }
  };

  // Быстрые ответы (примеры)
  const quickReplies = [
    { text: '🤔 Помоги разобраться', emoji: '💡' },
    { text: '📖 Проанализировать цитату', emoji: '📖' },
    { text: '🎯 Поставить цель', emoji: '🎯' },
    { text: '🔥 Мотивация', emoji: '🔥' },
  ];

  const handleQuickReply = (text) => {
    setMessage(text);
    // Можно сразу отправить после короткой задержки
    setTimeout(() => {
      if (text.trim() && !isLoading && !disabled) {
        onSend(text.trim());
        setMessage('');
      }
    }, 300);
  };

  return (
    <div className="message-input-container">
      {/* Быстрые ответы */}
      <div className="quick-replies">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="quick-reply-btn"
            onClick={() => handleQuickReply(reply.text)}
            disabled={isLoading || disabled}
          >
            <span className="reply-emoji">{reply.emoji}</span>
            <span className="reply-text">{reply.text}</span>
          </button>
        ))}
      </div>

      <form className="message-input-form" onSubmit={handleSubmit}>
        <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
          {/* Кнопка загрузки файла (опционально) */}
          <button
            type="button"
            className="input-action-btn attach-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || disabled}
            title="Прикрепить файл"
          >
            📎
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept=".txt,.pdf,.doc,.docx"
          />

          {/* Текстовое поле */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Напишите Сократу... (Shift+Enter для новой строки)"
            disabled={isLoading || disabled}
            rows={1}
            className="message-textarea"
          />

          {/* Кнопка отправки */}
          <button
            type="submit"
            className={`input-action-btn send-btn ${!message.trim() || isLoading || disabled ? 'disabled' : ''}`}
            disabled={!message.trim() || isLoading || disabled}
            title="Отправить сообщение"
          >
            {isLoading ? (
              <span className="loading-spinner">⟳</span>
            ) : (
              '➤'
            )}
          </button>
        </div>

        {/* Индикатор набора (показывает, что Сократ "думает") */}
        {isLoading && (
          <div className="typing-indicator">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-text">Сократ обдумывает ответ...</span>
          </div>
        )}

        {/* Подсказка */}
        <div className="input-hint">
          <span className="hint-icon">💡</span>
          <span className="hint-text">
            Нажмите Enter для отправки, Shift+Enter для новой строки
          </span>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
