export const DRAWER_WIDTH = 400;

export const INTERESTING_KEYS = [
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

export const DEPRECATED_KEYS = [
  'which',
  'charCode',
  'keyCode',
  'initEvent',
  'initKeyboardEvent',
  'initUIEvent',
] as const satisfies readonly (keyof KeyboardEvent)[];

export const MODIFIERS = [
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
];

export type Modifier = typeof MODIFIERS[number];

export const COMPLEX_TYPES = [
  Element,
  HTMLElement,
  SVGElement,
  Window,
  Document,
];
