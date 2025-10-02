/**
 * Возвращает слово в правильной форме в зависимости от числа
 * @param count - количество
 * @param forms - массив из 3 форм: ["книга", "книги", "книг"]
 * @returns строка "книги", "книг" и т.д.
 */

type PluralizeFormsType = [string, string, string];

export function pluralize(count: number, forms: PluralizeFormsType): string {
  const absCount = Math.abs(count);

  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return forms[0];
  }

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return forms[1];
  }

  return forms[2];
}

export const pluralizeBooks = (count: number) =>
  pluralize(count, ['книга', 'книги', 'книг']);
