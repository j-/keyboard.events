import { FC, useMemo } from 'react';
import { Modifier, modifiers } from './constants';
import { output } from './output';
import classNames from 'classnames';

type ModifierStates = Record<Modifier, boolean>;

export const Modifiers: FC<{ event: KeyboardEvent }> = ({ event }) => {
  const states = useMemo<ModifierStates>(() => {
    return modifiers.reduce(
      (acc, modifier) =>
        Object.assign(acc, { [modifier]: event.getModifierState(modifier) }),
      {} as ModifierStates
    );
  }, [event]);

  return (
    <div className="py-2 px-4 bg-black/25 rounded-md">
      <ul>
        {modifiers.map((modifier) => (
          <li
            key={modifier}
            className={classNames(
              states[modifier] ? 'font-bold' : 'opacity-80'
            )}
          >
            <code>event.getModifierState(</code>
            <code>{output(modifier)}</code>
            <code>)</code>
            <code className="whitespace-pre [tab-size:38]">&#9;</code>
            <code>{output(states[modifier])}</code>
          </li>
        ))}
      </ul>
    </div>
  );
};
