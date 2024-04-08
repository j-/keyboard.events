import { FC, useMemo } from 'react';
import { Modifier, modifiers } from '../constants';
import { output } from '../utils/output';
import classNames from 'classnames';

type ModifierStates = Record<Modifier, boolean>;

export type KeyboardEventModifiersProps = {
  event: KeyboardEvent;
};

export const KeyboardEventModifiers: FC<KeyboardEventModifiersProps> = ({ event }) => {
  const states = useMemo<ModifierStates>(() => {
    return modifiers.reduce(
      (acc, modifier) =>
        Object.assign(acc, { [modifier]: event.getModifierState(modifier) }),
      {} as ModifierStates
    );
  }, [event]);

  return (
    <div className="truncate text-sm sm:text-base py-2 px-4 bg-black/25 rounded-md">
      <ul>
        {modifiers.map((modifier) => (
          <li
            key={modifier}
            className={classNames(
              states[modifier] ? 'font-bold' : 'opacity-80'
            )}
          >
            <code className="block sm:inline">event.getModifierState({output(modifier)})</code>
            <code className="hidden sm:inline whitespace-pre [tab-size:38]">&#9;</code>
            <code>{output(states[modifier])}</code>
          </li>
        ))}
      </ul>
    </div>
  );
};
