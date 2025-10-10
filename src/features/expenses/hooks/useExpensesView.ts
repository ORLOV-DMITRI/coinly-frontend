'use client';

import { useState } from 'react';

export const useExpensesView = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const toggleExpense = (expenseId: string) => {
    setExpandedIds(prev => {
      const isCurrentlyExpanded = prev.includes(expenseId);

      if (isCurrentlyExpanded) {
        return prev.filter(id => id !== expenseId);
      } else {
        return [...prev, expenseId];
      }
    });
  };

  const isExpanded = (expenseId: string, index: number): boolean => {
    return expandedIds.includes(expenseId);
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  return {
    toggleExpense,
    isExpanded,
    collapseAll,
  };
};
