import type { FC } from 'react';
import { useLatestEvent } from '../hooks/use-latest-event';

export const AppMainContent: FC = () => {
  const latestEvent = useLatestEvent();

  return (
    <pre>
      {JSON.stringify({
        type: latestEvent.type,
        key: latestEvent.key,
        code: latestEvent.code,
        location: latestEvent.location,
        ctrlKey: latestEvent.ctrlKey,
        shiftKey: latestEvent.shiftKey,
        altKey: latestEvent.altKey,
        metaKey: latestEvent.metaKey,
        repeat: latestEvent.repeat,
        isComposing: latestEvent.isComposing,
        charCode: latestEvent.charCode,
        keyCode: latestEvent.keyCode,
        which: latestEvent.which,
      }, null, 2)}
    </pre>
  );
};
