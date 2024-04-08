import { FC } from 'react';
import { KeyboardEventProperties } from './KeyboardEventProperties';
import { KeyboardEventModifiers } from './KeyboardEventModifiers';

export type KeyboardEventDetailsProps = {
  event: KeyboardEvent;
  showUninteresting: boolean;
  selectNonPrimitives: boolean;
};

export const KeyboardEventDetails: FC<KeyboardEventDetailsProps> = ({
  event,
  showUninteresting,
  selectNonPrimitives,
}) => (
  <div className="container">
    <div className="flex flex-col xl:flex-row gap-5">
      <div className="flex-1">
        <h2 className="text-xl my-2">Event details</h2>

        <KeyboardEventProperties
          event={event}
          showUninteresting={showUninteresting}
          selectNonPrimitives={selectNonPrimitives}
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl my-2">Modifier states</h2>

        <KeyboardEventModifiers event={event} />
      </div>
    </div>
  </div>
);
