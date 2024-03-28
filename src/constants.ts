export const interestingKeys = [
  'key',
  'code',
  'location',
  'ctrlKey',
  'shiftKey',
  'altKey',
  'metaKey',
  'repeat',
  'isComposing',
  'charCode',
  'keyCode',
  'which',
] as const satisfies readonly (keyof KeyboardEvent)[];

export const deprecatedKeys = [
  'which',
  'charCode',
  'keyCode',
  'initEvent',
  'initKeyboardEvent',
  'initUIEvent',
] as const satisfies readonly (keyof KeyboardEvent)[];

export const modifiers = [
  'Alt',
  'AltGraph',
  'CapsLock',
  'Control',
  'Fn',
  // 'FnLock',
  'Hyper',
  'Meta',
  'NumLock',
  'OS',
  'ScrollLock',
  'Shift',
  // 'Super',
  // 'Symbol',
  // 'SymbolLock',
] as const;

export type Modifier = typeof modifiers[number];
