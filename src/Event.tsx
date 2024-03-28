import { FC, useMemo } from 'react';
import { EventKey } from './EventKey';
import { interestingKeys } from './constants';
import './Event.css';

function allKeys<T>(obj: T): (keyof T)[] {
  const keys: (keyof T)[] = [];
  for (const key in obj) {
    keys.push(key);
  }
  return keys;
}

export const Event: FC<{
  event: KeyboardEvent;
  showUninteresting?: boolean;
  selectNonPrimitives?: boolean;
}> = ({ event, showUninteresting = false, selectNonPrimitives = false }) => {
  const keys = useMemo(
    () =>
      allKeys(event).filter(
        (key) =>
          showUninteresting ||
          interestingKeys.some((interestingKey) => interestingKey === key)
      ),
    [event, showUninteresting]
  );

  return (
    <pre className="Event truncate text-sm sm:text-base py-2 px-4 bg-black/25 rounded-md">
      {'{'}
      <dl className="Event-keys grid sm:grid-cols-[auto_1fr]">
        {keys.map((key, i, arr) => (
          <EventKey
            key={key}
            event={event}
            eventKey={key}
            showUninteresting={showUninteresting}
            selectNonPrimitives={selectNonPrimitives}
            comma={i < arr.length - 1}
          />
        ))}
      </dl>
      {'}'}
    </pre>
  );
};
