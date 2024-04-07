export function isPrimitive<T>(input: T): boolean {
  return (
    typeof input === 'string' ||
    typeof input === 'boolean' ||
    typeof input === 'number' ||
    input == null
  );
}
