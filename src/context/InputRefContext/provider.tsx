import type { FC, PropsWithChildren } from 'react';
import { useMemo, useRef } from 'react';
import { InputRefContext, type InputRefContextType } from './context';

export const InputRefProvider: FC<PropsWithChildren> = ({ children }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const value = useMemo<InputRefContextType>(() => ({
    inputRef,
    textareaRef,
  }), []);

  return (
    <InputRefContext value={value}>
      {children}
    </InputRefContext>
  );
};
