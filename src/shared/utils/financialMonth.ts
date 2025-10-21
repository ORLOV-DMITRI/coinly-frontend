/**
 * Утилиты для работы с финансовым месяцем
 */

/**
 * Получить текущий финансовый месяц в формате YYYY-MM
 * @param monthStartDay - день начала финансового месяца (1-28)
 */
export function getCurrentFinancialMonth(monthStartDay: number = 1): string {
  const now = new Date();
  const currentDay = now.getDate();

  let year = now.getFullYear();
  let month = now.getMonth(); // 0-11

  // Если текущий день меньше дня начала финансового месяца,
  // то текущий финансовый месяц начался в прошлом календарном месяце
  if (currentDay < monthStartDay) {
    month -= 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
  }

  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

/**
 * Получить метку для отображения финансового месяца
 * @param month - месяц в формате YYYY-MM
 * @param monthStartDay - день начала финансового месяца (1-28)
 */
export function getFinancialMonthLabel(month: string, monthStartDay: number = 1): string {
  const [yearStr, monthStr] = month.split('-');
  const year = parseInt(yearStr);
  const monthNum = parseInt(monthStr) - 1; // 0-11

  const startDate = new Date(year, monthNum, monthStartDay);

  // Конец финансового месяца: день перед началом следующего
  const endDate = new Date(year, monthNum + 1, monthStartDay - 1);

  // Форматируем даты
  const startLabel = startDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  const endLabel = endDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  // Если monthStartDay === 1, показываем обычный месяц
  if (monthStartDay === 1) {
    return startDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
  }

  // Иначе показываем диапазон
  return `${startLabel} — ${endLabel}`;
}

/**
 * Получить список последних N финансовых месяцев
 * @param count - количество месяцев
 * @param monthStartDay - день начала финансового месяца (1-28)
 */
export function getFinancialMonthOptions(count: number = 12, monthStartDay: number = 1) {
  const options = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, monthStartDay);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = getFinancialMonthLabel(value, monthStartDay);
    options.push({ value, label });
  }

  return options;
}
