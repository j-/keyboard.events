import { FC } from 'react';
import { Event } from './Event';
import { Modifiers } from './Modifiers';
import classNames from 'classnames';
import { ExitFullscreenButton } from './ExitFullscreenButton';
import { useIsFullscreen } from './use-is-fullscreen';

export type EventDetailsProps = {
  event: KeyboardEvent;
  showUninteresting: boolean;
  selectNonPrimitives: boolean;
};

export const EventDetails: FC<EventDetailsProps> = ({
  event,
  showUninteresting,
  selectNonPrimitives,
}) => {
  const isFullscreen = useIsFullscreen();

  return (
    <div className="container">
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="flex-1">
          <h2 className="text-xl my-2">Event details</h2>

          <Event
            event={event}
            showUninteresting={showUninteresting}
            selectNonPrimitives={selectNonPrimitives}
          />
        </div>

        <div className="flex-1">
          <h2 className="text-xl my-2">Modifier states</h2>

          <Modifiers event={event} />
        </div>
      </div>

      <div className={classNames('my-10', isFullscreen ? 'block' : 'hidden')}>
        <ExitFullscreenButton onClick={() => document.exitFullscreen()} />
      </div>
    </div>
  );
};
