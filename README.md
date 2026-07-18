# 🏛️ Сократ — Коуч-ассистент для лидеров "Вертера"

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/yourusername/sokrat-vertera)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![DeepSeek](https://img.shields.io/badge/AI-DeepSeek-purple)](https://deepseek.com)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb)](https://reactjs.org)

Веб-приложение на основе философии Сократа для трансформации мышления лидеров сетевой компании "Вертера".

## ✨ Особенности

- **Сократовский метод**: не даёт готовых ответов, а задаёт вопросы
- **Две модели мышления**: Идеальная vs Ужасная модель "Вертера"
- **Два сценария работы**: разбор личной ситуации и работа с цитатами партнёров
- **Интерфейс в стиле античной Греции**

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- API ключ DeepSeek

### Установка
```bash
git clone https://github.com/yourusername/sokrat-vertera.git
cd sokrat-vertera

# Бэкенд
cd backend
npm install
echo "DEEPSEEK_API_KEY=ваш_ключ" > .env
npm start

# Фронтенд (в новом терминале)
cd ../frontend
npm install
npm start
