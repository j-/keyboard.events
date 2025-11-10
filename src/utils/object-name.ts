/* eslint-disable @typescript-eslint/no-explicit-any */
export const getObjectName = (value: unknown, defaultName = 'Object') => {
  try { return (value as any).__proto__.constructor.name; } catch {}
  try { return (value as any).constructor.name; } catch {}
  try { return Object.getPrototypeOf(value).name; } catch {}
  try { return (value as any).name; } catch {}
  return defaultName;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export const getArrayName = (value: unknown[]) =>
  `${getObjectName(value, 'Array')}(${value.length})`;

export const getErrorName = (err: unknown) => getObjectName(err, 'Error');
