export const deepComare = <T extends Record<string, unknown>>(
  a: T,
  b: T,
): boolean => {
  const keys = Object.keys(a);
  const keysB = Object.keys(b);
  if (keys.length !== keysB.length) return false;
  return keys.every((key) => {
    const valueA = a[key];
    const valueB = b[key];
    if (typeof valueA === "object" && typeof valueB === "object") {
      return deepComare(
        valueA as Record<string, unknown>,
        valueB as Record<string, unknown>,
      );
    }
    return valueA === valueB;
  });
};
