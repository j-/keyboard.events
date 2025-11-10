import { type FC } from 'react';

type KeyboardEventKeysWithDeprecatedKeys = Pick<
  KeyboardEvent,
  | 'DOM_KEY_LOCATION_STANDARD'
  | 'DOM_KEY_LOCATION_LEFT'
  | 'DOM_KEY_LOCATION_RIGHT'
  | 'DOM_KEY_LOCATION_NUMPAD'
> & {
  DOM_KEY_LOCATION_MOBILE?: number;
  DOM_KEY_LOCATION_JOYSTICK?: number;
};

const {
  DOM_KEY_LOCATION_STANDARD = 0,
  DOM_KEY_LOCATION_LEFT = 1,
  DOM_KEY_LOCATION_RIGHT = 2,
  DOM_KEY_LOCATION_NUMPAD = 3,
  DOM_KEY_LOCATION_MOBILE = 4,
  DOM_KEY_LOCATION_JOYSTICK = 5,
} = KeyboardEvent as KeyboardEventKeysWithDeprecatedKeys;

export const metaKeyboardEventLocationFn = (location: KeyboardEvent['location']) => {
  switch (location) {
    case DOM_KEY_LOCATION_STANDARD:
      return "DOM_KEY_LOCATION_STANDARD";
    case DOM_KEY_LOCATION_LEFT:
      return "DOM_KEY_LOCATION_LEFT";
    case DOM_KEY_LOCATION_RIGHT:
      return "DOM_KEY_LOCATION_RIGHT";
    case DOM_KEY_LOCATION_NUMPAD:
      return "DOM_KEY_LOCATION_NUMPAD";
    case DOM_KEY_LOCATION_MOBILE:
      return "DOM_KEY_LOCATION_MOBILE";
    case DOM_KEY_LOCATION_JOYSTICK:
      return "DOM_KEY_LOCATION_JOYSTICK";
    default:
      return null;
  }
};

export const MetaKeyboardEventLocation: FC<{ location: KeyboardEvent['location'] }> = ({
  location,
}) => {
  const str = metaKeyboardEventLocationFn(location);
  return str ? <>{str}</> : <em>unknown</em>;
};
