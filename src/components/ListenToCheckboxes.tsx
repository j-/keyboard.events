import { FC } from 'react';
import { Checkbox } from './Checkbox';

export type ListenToCheckboxesProps = {
  listenKeydown: boolean;
  setListenKeydown: (listenKeydown: boolean) => void;
  listenKeyup: boolean;
  setListenKeyup: (listenKeyup: boolean) => void;
  listenKeypress: boolean;
  setListenKeypress: (listenKeypress: boolean) => void;
  preventDefault: boolean;
  setPreventDefault: (preventDefault: boolean) => void;
};

export const ListenToCheckboxes: FC<ListenToCheckboxesProps> = ({
  listenKeydown,
  setListenKeydown,
  listenKeyup,
  setListenKeyup,
  listenKeypress,
  setListenKeypress,
  preventDefault,
  setPreventDefault,
}) => (
  <div className="text-sm text-neutral-900 bg-white border border-neutral-200 rounded-lg dark:bg-neutral-700 dark:border-neutral-600 dark:text-white flex flex-col sm:inline-grid sm:grid-cols-[auto_auto_auto] overflow-hidden">
    <Checkbox
      className="font-mono p-3 w-full border-b border-neutral-200 sm:border-r dark:border-neutral-600"
      checked={listenKeydown}
      onChange={(e) => setListenKeydown(e.currentTarget.checked)}
    >
      keydown
    </Checkbox>

    <Checkbox
      className="font-mono p-3 w-full border-b border-neutral-200 sm:border-r dark:border-neutral-600"
      checked={listenKeyup}
      onChange={(e) => setListenKeyup(e.currentTarget.checked)}
    >
      keyup
    </Checkbox>

    <Checkbox
      className="font-mono p-3 w-full border-b border-neutral-200 dark:border-neutral-600"
      checked={listenKeypress}
      onChange={(e) => setListenKeypress(e.currentTarget.checked)}
    >
      keypress
    </Checkbox>

    <Checkbox
      className="p-3 w-full border-neutral-200 border-b-0 dark:border-neutral-600 col-span-3"
      checked={preventDefault}
      onChange={(e) => setPreventDefault(e.currentTarget.checked)}
      onKeyDown={(e) => {
        // Prevent checkbox selection with keyboard which then cannot be undone.
        if (e.code === 'Space') e.preventDefault();
      }}
    >
      Prevent default behavior
    </Checkbox>
  </div>
);
