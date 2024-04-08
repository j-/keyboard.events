import { FC } from 'react';
import { Checkbox } from './Checkbox';

export type ListenToCheckboxesProps = {
  listenKeydown: boolean;
  setListenKeydown: (listenKeydown: boolean) => void;
  listenKeyup: boolean;
  setListenKeyup: (listenKeyup: boolean) => void;
  listenKeypress: boolean;
  setListenKeypress: (listenKeypress: boolean) => void;
};

export const ListenToCheckboxes: FC<ListenToCheckboxesProps> = ({
  listenKeydown,
  setListenKeydown,
  listenKeyup,
  setListenKeyup,
  listenKeypress,
  setListenKeypress,
}) => (
  <div className="items-center w-full text-sm font-medium text-neutral-900 bg-white border border-neutral-200 rounded-lg sm:flex dark:bg-neutral-700 dark:border-neutral-600 dark:text-white">
    <Checkbox
      className="font-mono p-3 w-full border-b border-neutral-200 sm:border-b-0 sm:border-r dark:border-neutral-600"
      checked={listenKeydown}
      onChange={(e) => setListenKeydown(e.currentTarget.checked)}
    >
      keydown
    </Checkbox>

    <Checkbox
      className="font-mono p-3 w-full border-b border-neutral-200 sm:border-b-0 sm:border-r dark:border-neutral-600"
      checked={listenKeyup}
      onChange={(e) => setListenKeyup(e.currentTarget.checked)}
    >
      keyup
    </Checkbox>

    <Checkbox
      className="font-mono p-3 w-full border-neutral-200 border-b-0 dark:border-neutral-600"
      checked={listenKeypress}
      onChange={(e) => setListenKeypress(e.currentTarget.checked)}
    >
      keypress
    </Checkbox>
  </div>
);
