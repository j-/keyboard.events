import { ReactNode } from 'react';

export function output<T>(input: T): ReactNode {
  if (typeof input === 'function') return `[function ${input.name}()]`;

  if (typeof input === 'string')
    return (
      <span style={{ color: 'hsl(200, 80%, 80%)' }}>
        {JSON.stringify(input)}
      </span>
    );

  if (typeof input === 'boolean')
    return <span style={{ color: 'hsl(300, 80%, 80%)' }}>{String(input)}</span>;

  if (typeof input === 'number')
    return <span style={{ color: 'hsl(100, 80%, 80%)' }}>{String(input)}</span>;

  if (input == null)
    return <span style={{ color: 'hsl(0, 0%, 70%)' }}>{String(input)}</span>;

  return String(input);
}
