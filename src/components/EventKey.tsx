import { FC, useMemo } from 'react';
import className from 'classnames';
import { Location } from './Location';
import { deprecatedKeys, interestingKeys } from '../constants';
import { output } from '../utils/output';
import './EventKey.css';

function isInputPrimitive<T>(input: T): boolean {
  return (
    typeof input === 'string' ||
    typeof input === 'boolean' ||
    typeof input === 'number' ||
    input == null
  );
}

export const EventKey: FC<{
  event: KeyboardEvent;
  eventKey: keyof KeyboardEvent;
  showUninteresting?: boolean;
  selectNonPrimitives?: boolean;
  comma?: boolean;
}> = ({
  event,
  eventKey,
  showUninteresting = false,
  selectNonPrimitives = false,
  comma = true,
}) => {
  const value = useMemo(() => event[eventKey], [event, eventKey]);

  const isPrimitive = useMemo(() => isInputPrimitive(value), [value]);

  const isInteresting = useMemo(
    () => interestingKeys.find((interestingKey) => interestingKey === eventKey),
    [eventKey]
  );

  const isDeprecated = useMemo(
    () => deprecatedKeys.find((deprecatedKey) => deprecatedKey === eventKey),
    [eventKey]
  );

  const isEscaped = useMemo(
    () =>
      (eventKey === 'key' || eventKey === 'code') &&
      typeof value === 'string' &&
      /\\|"/.test(value),
    [eventKey, value]
  );

  if (!isInteresting && !showUninteresting) return null;

  return (
    <>
      <dt
        key={`EventKey-key-${eventKey}`}
        className={className(
          'EventKey-key',
          selectNonPrimitives
            ? null
            : isPrimitive
            ? 'EventKey-primitive'
            : 'EventKey-not-primitive',
          isInteresting ? 'EventKey-interesting' : 'EventKey-uninteresting',
          isDeprecated && 'EventKey-deprecated'
        )}
        title={isDeprecated ? 'This key is marked as deprecated' : undefined}
      >
        <span className="EventKey-punc">"</span>
        <span className="EventKey-key-name">{eventKey}</span>
        <span className="EventKey-punc">":</span>
      </dt>

      <dd
        key={`EventKey-value-${eventKey}`}
        className={className(
          'EventKey-value [&:not(:last-child)]:mb-4 sm:!m-0',
          selectNonPrimitives
            ? null
            : isPrimitive
            ? 'EventKey-primitive'
            : 'EventKey-not-primitive'
        )}
      >
        {output(value)}
        {eventKey === 'location' ? (
          <span style={{ userSelect: 'none' }}>
            {' '}
            (<Location location={event.location} />)
          </span>
        ) : null}
        {isEscaped ? (
          <span style={{ userSelect: 'none' }}> ({String(value)})</span>
        ) : null}
        {comma ? <span className="EventKey-punc">,</span> : null}
      </dd>
    </>
  );
};
