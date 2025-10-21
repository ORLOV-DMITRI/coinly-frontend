'use client';

import styles from './SettingsPage.module.scss';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import { useUpdateSettings } from '@/lib/hooks/useUpdateSettings';

export default function SettingsPage() {
  const { user } = useAuth();
  const updateSettings = useUpdateSettings();

  const [monthlyBudget, setMonthlyBudget] = useState<string>('');
  const [monthStartDay, setMonthStartDay] = useState<string>('');
  const [errors, setErrors] = useState<{ monthlyBudget?: string; monthStartDay?: string }>({});

  useEffect(() => {
    if (user) {
      setMonthlyBudget(user.monthlyBudget?.toString() || '');
      setMonthStartDay(user.monthStartDay?.toString() || '1');
    }
  }, [user]);

  const validate = () => {
    const newErrors: { monthlyBudget?: string; monthStartDay?: string } = {};

    if (monthlyBudget && (isNaN(Number(monthlyBudget)) || Number(monthlyBudget) < 0)) {
      newErrors.monthlyBudget = 'Бюджет должен быть положительным числом';
    }

    if (monthStartDay) {
      const day = Number(monthStartDay);
      if (isNaN(day) || day < 1 || day > 28) {
        newErrors.monthStartDay = 'День должен быть от 1 до 28';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data: { monthlyBudget?: number; monthStartDay?: number } = {};

    if (monthlyBudget) {
      data.monthlyBudget = Number(monthlyBudget);
    }

    if (monthStartDay) {
      data.monthStartDay = Number(monthStartDay);
    }

    if (Object.keys(data).length === 0) {
      return;
    }

    updateSettings.mutate(data);
  };

  return (
    <section className={styles.settingsPage}>
      <PageHeader title="Настройки" actionType="back" />

      <div className="container">
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <h3 className={styles.sectionTitle}>Финансовые параметры</h3>

              <Input
                label="Месячный бюджет (₽)"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                placeholder="50000"
                error={errors.monthlyBudget}
                className={styles.input}
              />

              <Input
                label="День начала финансового месяца (1-28)"
                type="number"
                value={monthStartDay}
                onChange={(e) => setMonthStartDay(e.target.value)}
                placeholder="1"
                min={1}
                max={28}
                error={errors.monthStartDay}
                className={styles.input}
              />

              <div className={styles.hint}>
                <p>
                  <strong>Финансовый месяц</strong> — это период от указанного дня текущего месяца
                  до того же дня следующего месяца.
                </p>
                <p className={styles.example}>
                  Например, если вы получаете зарплату 5-го числа, установите день начала
                  финансового месяца на <strong>5</strong>. Тогда статистика будет
                  считаться с 5 октября по 4 ноября.
                </p>
              </div>
            </div>

            <div className={styles.actions}>
              <Button
                type="submit"
                variant="primary"
                size="default"
                disabled={updateSettings.isPending}
              >
                {updateSettings.isPending ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
