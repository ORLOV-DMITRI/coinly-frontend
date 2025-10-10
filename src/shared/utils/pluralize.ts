export function pluralize(count: number, forms: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (count % 100 > 4 && count % 100 < 20)
    ? 2
    : cases[Math.min(count % 10, 5)];

  return `${count} ${forms[index]}`;
}
