import { Effect } from 'effect';

type LockFunction = () => Promise<void>;

interface Keyboard {
  lock?: LockFunction;
}

declare global {
  interface Navigator {
    keyboard?: Keyboard;
  }
}

const navigatorHasKeyboard = (navigator: Navigator): navigator is Navigator & { keyboard: Keyboard } => 'keyboard' in navigator;
const keyboardHasLock = (keyboard: Keyboard): keyboard is Keyboard & { lock: LockFunction } => 'lock' in keyboard;

export const lockKeyboard = ({
  fullScreenElement = document.documentElement,
}: {
  fullScreenElement?: Element | null;
} = {}) => Effect.promise(async () => {
  if (!fullScreenElement) {
    return Effect.fail(new Error('No fullscreen element available'));
  }
  if (!navigatorHasKeyboard(navigator) || !keyboardHasLock(navigator.keyboard)) {
    return Effect.fail(new Error('Keyboard lock is not supported'));
  }
  try {
    await fullScreenElement.requestFullscreen();
  } catch (err) {
    return Effect.fail(new Error('Fullscreen request failed'));
  }
  try {
    await navigator.keyboard.lock();
  } catch (err) {
    return Effect.fail(new Error('Keyboard lock failed'));
  }
});
