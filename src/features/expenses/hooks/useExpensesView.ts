'use client';

import { useState, useEffect } from 'react';
import type { AccordionMode } from '../types/expensesView.types';

const STORAGE_KEY = 'expenses-accordion-mode';
const DEFAULT_MODE: AccordionMode = 'first-expanded';

export const useExpensesView = () => {
  const [mode, setMode] = useState<AccordionMode>(DEFAULT_MODE);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'all-collapsed' || saved === 'all-expanded' || saved === 'first-expanded')) {
      setMode(saved as AccordionMode);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const changeMode = (newMode: AccordionMode) => {
    setMode(newMode);
    setExpandedIds(new Set());
  };

  const toggleExpense = (expenseId: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(expenseId)) {
        next.delete(expenseId);
      } else {
        next.add(expenseId);
      }
      return next;
    });
  };

  const isExpanded = (expenseId: string, index: number): boolean => {
    if (expandedIds.size > 0) {
      return expandedIds.has(expenseId);
    }

    switch (mode) {
      case 'all-expanded':
        return true;
      case 'all-collapsed':
        return false;
      case 'first-expanded':
        return index === 0;
      default:
        return false;
    }
  };

  return {
    mode,
    changeMode,
    toggleExpense,
    isExpanded,
  };
};
