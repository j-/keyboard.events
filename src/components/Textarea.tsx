import { FC, TextareaHTMLAttributes } from 'react';

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    className="block py-2 px-4 w-full min-h-[3.75rem] text-sm text-white bg-black/25 rounded-lg border border-black/50 focus:ring-blue-500 focus:border-blue-500"
    {...props}
  />
);
