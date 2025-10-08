/**
 * Склонение существительных в русском языке
 * @param count - количество
 * @param forms - массив форм [1 товар, 2 товара, 5 товаров]
 * @returns правильная форма слова
 *
 * @example
 * pluralize(1, ['товар', 'товара', 'товаров']) // "1 товар"
 * pluralize(2, ['товар', 'товара', 'товаров']) // "2 товара"
 * pluralize(5, ['товар', 'товара', 'товаров']) // "5 товаров"
 */
export function pluralize(count: number, forms: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (count % 100 > 4 && count % 100 < 20)
    ? 2
    : cases[Math.min(count % 10, 5)];

  return `${count} ${forms[index]}`;
}
