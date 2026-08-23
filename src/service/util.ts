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

export function generateRandomNumber(min = 0, max = 0, step = 1) {
  if (max < min || max - min < step) throw Error("wrong arguments");
  const number = Math.random() * (max - min);
  return Math.round(number / step) * step + min;
}

export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function shiftData<T>(
  list: readonly T[],
  pageNumber = 0,
  size = list.length,
) {
  if (list.length === 0 || size <= 0) return [];

  const offset =
    ((Math.trunc(pageNumber) % list.length) + list.length) % list.length;
  const shifted = [...list.slice(offset), ...list.slice(0, offset)];

  return shifted.slice(0, size);
}
