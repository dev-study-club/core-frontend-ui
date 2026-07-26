export function deepCompare<T extends Record<string, unknown>>(
  first: T,
  second: T,
): boolean {
  return Object.entries(first).every(([key, value]) =>
    value !== null && typeof value === "object"
      ? deepCompare(value as T, second[key] as T)
      : value === second[key],
  );
}

