type LockFunction = () => Promise<void>;
type UnlockFunction = () => void;

interface Keyboard {
  lock?: LockFunction;
  unlock?: UnlockFunction;
}

interface Navigator {
  keyboard?: Keyboard;
}
