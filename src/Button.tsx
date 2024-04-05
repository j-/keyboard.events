import { ButtonHTMLAttributes, FC } from 'react';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    className="bg-neutral-900 hover:bg-neutral-700 text-white text-start py-2 px-4 rounded"
    type="button"
    {...props}
  />
);
