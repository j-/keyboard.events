import type { FC, PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../hooks/use-app-context';
import { EventTargetOption, InputType } from '../../types';
import { useInputRef, useTextareaRef } from '../InputRefContext';
import { defaultEvent, EventContext } from './context';

export const EventProvider: FC<PropsWithChildren> = ({ children }) => {
  const [event, setEvent] = useState<KeyboardEvent>(defaultEvent);
  const inputRef = useInputRef();
  const textareaRef = useTextareaRef();

  const {
    capture,
    stopPropagation,
    preventDefault,
    handleKeydown,
    handleKeyup,
    handleKeypress,
    eventTarget: eventTargetOption,
    inputType,
  } = useAppContext();

  const passive = !preventDefault && !stopPropagation;

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
      case EventTargetOption.INPUT:
        return inputType === InputType.INPUT ?
          inputRef :
          textareaRef;
      default:
        return null;
    }
  }, [eventTargetOption, inputRef, inputType, textareaRef]);

  useEffect(() => {
    if (!eventTarget || !handleKeydown) return;

    const element = 'current' in eventTarget ? eventTarget.current : eventTarget;
    if (!element) return;

    const handler = (e: Event) => {
      if (stopPropagation) e.stopPropagation();
      if (preventDefault) e.preventDefault();
      setEvent(e as KeyboardEvent);
    };

    element.addEventListener('keydown', handler, { capture, passive });

    return () => {
      element.removeEventListener('keydown', handler, { capture });
    };
  }, [eventTarget, handleKeydown, stopPropagation, preventDefault, capture, passive]);

  useEffect(() => {
    if (!eventTarget || !handleKeyup) return;

    const element = 'current' in eventTarget ? eventTarget.current : eventTarget;
    if (!element) return;

    const handler = (e: Event) => {
      if (stopPropagation) e.stopPropagation();
      if (preventDefault) e.preventDefault();
      setEvent(e as KeyboardEvent);
    };

    element.addEventListener('keyup', handler, { capture, passive });

    return () => {
      element.removeEventListener('keyup', handler, { capture });
    };
  }, [eventTarget, handleKeyup, stopPropagation, preventDefault, capture, passive]);

  useEffect(() => {
    if (!eventTarget || !handleKeypress) return;

    const element = 'current' in eventTarget ? eventTarget.current : eventTarget;
    if (!element) return;

    const handler = (e: Event) => {
      if (stopPropagation) e.stopPropagation();
      if (preventDefault) e.preventDefault();
      setEvent(e as KeyboardEvent);
    };

    element.addEventListener('keypress', handler, { capture, passive });

    return () => {
      element.removeEventListener('keypress', handler, { capture });
    };
  }, [eventTarget, handleKeypress, stopPropagation, preventDefault, capture, passive]);

  return (
    <EventContext value={event}>
      {children}
    </EventContext>
  );
};
