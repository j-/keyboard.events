import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    className={classNames('bg-neutral-900 hover:bg-neutral-700 text-white text-start py-2 px-4 rounded', className)}
    type="button"
    {...props}
  />
);
