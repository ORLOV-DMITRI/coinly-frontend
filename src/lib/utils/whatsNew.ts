const STORAGE_KEY = 'coinly_last_seen_update';

/**
 * Получить дату последнего просмотренного обновления из localStorage
 */
export const getLastSeenUpdate = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return null;
  }
};

/**
 * Сохранить дату последнего просмотренного обновления в localStorage
 */
export const setLastSeenUpdate = (date: string): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, date);
  } catch (error) {
    console.warn('Failed to write to localStorage:', error);
  }
};

/**
 * Проверить, есть ли новые обновления
 */
export const hasNewUpdates = (latestUpdateDate: string): boolean => {
  const lastSeenDate = getLastSeenUpdate();

  // Если пользователь впервые, показываем обновления
  if (!lastSeenDate) return true;

  // Сравниваем даты (формат: YYYY-MM-DD)
  return latestUpdateDate > lastSeenDate;
};

/**
 * Отметить все обновления как просмотренные
 */
export const markAllUpdatesAsSeen = (latestUpdateDate: string): void => {
  setLastSeenUpdate(latestUpdateDate);
};