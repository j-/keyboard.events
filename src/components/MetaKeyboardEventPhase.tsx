import { type FC } from 'react';

type KeyboardEventPhases = {
  NONE?: number;
  CAPTURING_PHASE?: number;
  AT_TARGET?: number;
  BUBBLING_PHASE?: number;
};

const {
  NONE = 0,
  CAPTURING_PHASE = 1,
  AT_TARGET = 2,
  BUBBLING_PHASE = 3,
} = KeyboardEvent as KeyboardEventPhases;

export const metaKeyboardEventPhaseFn = (eventPhase: KeyboardEvent['eventPhase']) => {
  switch (eventPhase) {
    case NONE:
      return "NONE";
    case CAPTURING_PHASE:
      return "CAPTURING_PHASE";
    case AT_TARGET:
      return "AT_TARGET";
    case BUBBLING_PHASE:
      return "BUBBLING_PHASE";
    default:
      return null;
  }
};

export const MetaKeyboardEventPhase: FC<{ eventPhase: KeyboardEvent['eventPhase'] }> = ({
  eventPhase,
}) => {
  const str = metaKeyboardEventPhaseFn(eventPhase);
  return str ? <>{str}</> : <em>unknown</em>;
};
