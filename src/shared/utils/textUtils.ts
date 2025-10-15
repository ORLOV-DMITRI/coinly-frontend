export const normalizeItemName = (name: string): string => {
    const trimmed = name.trim();
    if (!trimmed) return trimmed;

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};
