export function getScrollbarWidth(): number {
    // 1. Создаем временный div
    const outer = document.createElement('div');

    // Скрываем элемент и принудительно добавляем скроллбар
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';

    // 2. Устранение ошибки 'msOverflowStyle' (Использование приведения типа 'as any')
    // Это говорит TypeScript, что вы уверены в существовании этого свойства
    (outer.style as any).msOverflowStyle = 'scrollbar';

    document.body.appendChild(outer);

    // 3. Создаем внутренний div
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // 4. Расчет ширины
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // 5. Устранение ошибки 'parentNode is possibly null' (безопасное удаление)
    // Проверяем, что элемент действительно имеет родителя перед удалением
    if (outer.parentNode) {
        outer.parentNode.removeChild(outer);
    }

    return scrollbarWidth;
}
