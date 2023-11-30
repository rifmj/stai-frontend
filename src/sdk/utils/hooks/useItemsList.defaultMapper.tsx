export function defaultMapper<T, R>(value: T): R {
  return value as unknown as R;
}
