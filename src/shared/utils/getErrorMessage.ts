export const getErrorMessage = (error: unknown): string | undefined => {
  if (typeof error === 'object' && error !== null) {
    const e = error as { code?: string; message?: string };
    return e.message ?? `Неизвестная ошибка${e.code ? ` (${e.code})` : ''}`;
  }
};
