type LockFunction = () => Promise<void>;

interface Keyboard {
  lock?: LockFunction;
}

interface Navigator {
  keyboard?: Keyboard;
}
