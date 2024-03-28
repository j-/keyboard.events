import { useEffect, useState } from 'react';

export const useEvent = <T, E = Event>({
  target = window,
  name,
  defaultValue,
  callback,
}: {
  target?: EventTarget;
  name: string;
  defaultValue: T;
  callback: (value: E) => void;
}) => {
  const [enabled, setEnabled] = useState<T>(defaultValue);

  useEffect(() => {
    if (!enabled) return;

    target.addEventListener(
      name,
      callback as EventListenerOrEventListenerObject
    );

    return () => {
      target.removeEventListener(
        name,
        callback as EventListenerOrEventListenerObject
      );
    };
  }, [enabled, target, callback]);

  return { enabled, setEnabled };
};
