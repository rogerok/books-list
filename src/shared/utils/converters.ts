export const convertEmptyStringToNull = (
  string: string | null,
): string | null => (string?.length ? string : null);
