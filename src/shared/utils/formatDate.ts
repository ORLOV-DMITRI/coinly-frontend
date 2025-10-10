export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
        return `Сегодня, ${date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })}`;
    }
    if (isYesterday) {
        return `Вчера, ${date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
        })}`;
    }
    return date.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'});
};