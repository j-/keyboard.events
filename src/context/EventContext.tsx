import type { FC, PropsWithChildren } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../hooks/use-app-context';
import { EventTargetOption } from '../types';

const defaultEvent = new KeyboardEvent('keyup', {
  key: 'a',
  code: 'KeyA',
  charCode: 0,
  keyCode: 65,
  which: 65,
});

export const EventContext = createContext<KeyboardEvent>(defaultEvent);

export const EventContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [event, setEvent] = useState<KeyboardEvent>(defaultEvent);

  const {
    capture,
    stopPropagation,
    preventDefault,
    handleKeydown,
    handleKeyup,
    handleKeypress,
    eventTarget: eventTargetOption,
  } = useAppContext();

  const eventTarget = useMemo(() => {
    switch (eventTargetOption) {
      case EventTargetOption.WINDOW:
        return window;
      case EventTargetOption.DOCUMENT:
        return document;
      case EventTargetOption.HTML:
        return document.documentElement;
      case EventTargetOption.BODY:
        return document.body;
      default:
        return null;
    }
  }, [eventTargetOption]);

  useEffect(() => {
    if (!eventTarget || !handleKeydown) return;

    const handler = (e: Event) => {
      if (stopPropagation) e.stopPropagation();
      if (preventDefault) e.preventDefault();
      setEvent(e as KeyboardEvent);
    };

    eventTarget.addEventListener('keydown', handler, { capture });

    return () => {
      eventTarget.removeEventListener('keydown', handler, { capture });
    };
  }, [eventTarget, handleKeydown, stopPropagation, preventDefault, capture]);

  useEffect(() => {
    if (!eventTarget || !handleKeyup) return;

    const handler = (e: Event) => {
      if (stopPropagation) e.stopPropagation();
      if (preventDefault) e.preventDefault();
      setEvent(e as KeyboardEvent);
    };

    eventTarget.addEventListener('keyup', handler, { capture });

    return () => {
      eventTarget.removeEventListener('keyup', handler, { capture });
    };
  }, [eventTarget, handleKeyup, stopPropagation, preventDefault, capture]);

  useEffect(() => {
    if (!eventTarget || !handleKeypress) return;

    const handler = (e: Event) => {
      if (stopPropagation) e.stopPropagation();
      if (preventDefault) e.preventDefault();
      setEvent(e as KeyboardEvent);
    };

    eventTarget.addEventListener('keypress', handler, { capture });

    return () => {
      eventTarget.removeEventListener('keypress', handler, { capture });
    };
  }, [eventTarget, handleKeypress, stopPropagation, preventDefault, capture]);

  return (
    <EventContext.Provider value={event}>
      {children}
    </EventContext.Provider>
  );
};
