import classNames from 'classnames';
import { FC, InputHTMLAttributes, useId } from 'react';

export const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  children,
  id,
  ...props
}) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={classNames('flex items-center', className)}
    >
      <input
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus-visible:ring-blue-500 dark:focus-visible:ring-blue-600 dark:ring-offset-gray-800 focus-visible:ring-2 dark:bg-gray-700 dark:border-gray-600"
        id={checkboxId}
        {...props}
      />
      <span className="ms-2">{children}</span>
    </label>
  );
};
