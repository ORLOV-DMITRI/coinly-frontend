const STORAGE_KEY = 'coinly_last_seen_update';


export const getLastSeenUpdate = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return null;
  }
};


export const setLastSeenUpdate = (date: string): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, date);
  } catch (error) {
    console.warn('Failed to write to localStorage:', error);
  }
};


export const hasNewUpdates = (latestUpdateDate: string): boolean => {
  const lastSeenDate = getLastSeenUpdate();

  if (!lastSeenDate) return false;

  return latestUpdateDate > lastSeenDate;
};


export const markAllUpdatesAsSeen = (latestUpdateDate: string): void => {
  setLastSeenUpdate(latestUpdateDate);
};