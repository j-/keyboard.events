import { createContext, type RefObject } from 'react';

export type InputRefContextType = {
  inputRef: RefObject<HTMLInputElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

export const InputRefContext = createContext<InputRefContextType | null>(null);
