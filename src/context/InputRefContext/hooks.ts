import { useContext } from 'react';
import { InputRefContext } from './context';

export const useInputRef = () => {
  const context = useContext(InputRefContext);
  if (!context) {
    throw new Error('useInputRef must be used within an InputRefProvider');
  }
  return context.inputRef;
};

export const useTextareaRef = () => {
  const context = useContext(InputRefContext);
  if (!context) {
    throw new Error('useTextareaRef must be used within an InputRefProvider');
  }
  return context.textareaRef;
};
