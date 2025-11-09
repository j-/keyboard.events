import { createContext } from 'react';

export const defaultEvent = Object.freeze(
  new KeyboardEvent('keyup', {
    key: 'a',
    code: 'KeyA',
    charCode: 0,
    keyCode: 65,
    which: 65,
  })
);

export const EventContext = createContext<KeyboardEvent>(defaultEvent);
