'use client';

import { useState } from 'react';

export const useExpensesView = () => {
  // Храним ID открытых расходов как массив строк
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  // Переключить расход: если открыт → закрыть, если закрыт → открыть
  const toggleExpense = (expenseId: string) => {
    setExpandedIds(prev => {
      // Ищем ID в массиве
      const isCurrentlyExpanded = prev.includes(expenseId);

      if (isCurrentlyExpanded) {
        // Если уже открыт → убираем из массива (закрываем)
        return prev.filter(id => id !== expenseId);
      } else {
        // Если закрыт → добавляем в массив (открываем)
        return [...prev, expenseId];
      }
    });
  };

  // Проверка: открыт ли расход?
  const isExpanded = (expenseId: string, index: number): boolean => {
    // Просто проверяем есть ли ID в массиве
    return expandedIds.includes(expenseId);
  };

  // Закрыть все расходы
  const collapseAll = () => {
    setExpandedIds([]);
  };

  return {
    toggleExpense,
    isExpanded,
    collapseAll,
  };
};
