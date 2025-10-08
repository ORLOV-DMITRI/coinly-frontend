export type EmojiCategory = {
    label: string;
    emojis: string[];
};

export const EMOJI_CATEGORIES: EmojiCategory[] = [
    {
        label: 'Еда и напитки',
        emojis: ['🍞', '🥖', '🍎', '🍕'],
    },
    {
        label: 'Транспорт',
        emojis: ['🚗', '🚕', '✈️', '🚲'],
    },
    {
        label: 'Дом',
        emojis: ['🏠', '🔌', '🛠️', '🪑'],
    },
];
