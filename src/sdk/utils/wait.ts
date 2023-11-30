/**
 * Ожидание в ms
 */
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
