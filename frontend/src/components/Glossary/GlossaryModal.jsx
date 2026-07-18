import React, { useState } from 'react';
import './GlossaryModal.css';

const GlossaryModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const glossaryData = {
    'Основные термины': [
      {
        term: 'PV (Personal Volume)',
        description: 'Личный объём продаж. Вход в бизнес: 20, 40 или 80 PV.',
        icon: '📊'
      },
      {
        term: 'MP (Marketing Plan)',
        description: 'Маркетинговый план, по которому начисляются бонусы.',
        icon: '📋'
      },
      {
        term: 'Бинар',
        description: 'Структура из двух веток (левая и правая нога). Доход зависит от оборота в обеих ветках.',
        icon: '🌳'
      }
    ],
    'Бонусы и вознаграждения': [
      {
        term: 'Бонус за КВ',
        description: 'Квалификационный бонус. Начисляется за выполнение условий по регистрациям (например, 2-2).',
        icon: '🎯'
      },
      {
        term: 'Бонус за ПР',
        description: 'Приглашение-регистрация. Фиксированная сумма (например, 69 у.е.) за нового партнёра.',
        icon: '👤'
      },
      {
        term: 'Кешбек',
        description: 'Возврат части средств с покупок клиентов и партнёров.',
        icon: '💳'
      },
      {
        term: 'БЗП',
        description: 'Бонус за повторные покупки. Доход от регулярных заказов команды.',
        icon:
