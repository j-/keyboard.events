import { useEvent } from './use-event';

export const useKeyboardEvents = (callback: (e: KeyboardEvent) => void) => {
  const { enabled: listenKeydown, setEnabled: setListenKeydown } = useEvent({
    name: 'keydown',
    defaultValue: true,
    callback,
  });

  const { enabled: listenKeyup, setEnabled: setListenKeyup } = useEvent({
    name: 'keyup',
    defaultValue: true,
    callback,
  });

  const { enabled: listenKeypress, setEnabled: setListenKeypress } = useEvent({
    name: 'keypress',
    defaultValue: false,
    callback,
  });

  return {
    listenKeydown,
    setListenKeydown,
    listenKeyup,
    setListenKeyup,
    listenKeypress,
    setListenKeypress,
  };
};
