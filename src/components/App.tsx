import classNames from 'classnames';
import { Effect } from 'effect';
import { FC, useCallback, useRef, useState } from 'react';
import { useIsFullscreen } from '../hooks/use-is-fullscreen';
import { useKeyboardEvents } from '../hooks/use-keyboard-events';
import { lockKeyboard } from '../utils/lock-keyboard';
import { Checkbox } from './Checkbox';
import { ExitFullscreenButton } from './ExitFullscreenButton';
import { FullscreenButton } from './FullscreenButton';
import { HelpfulLinks } from './HelpfulLinks';
import { KeyboardEventDetails } from './KeyboardEventDetails';
import { ListenToCheckboxes } from './ListenToCheckboxes';
import { Textarea } from './Textarea';

const defaultEvent = new KeyboardEvent('keypress', {
  key: 'a',
  code: 'KeyA',
  charCode: 0,
  keyCode: 65,
  which: 65,
});

const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

export const App: FC = () => {
  const fullscreenElementRef = useRef<HTMLDivElement>(null);
  const isFullscreen = useIsFullscreen();

  const [preventDefault, setPreventDefault] = useState(false);
  const [showUninteresting, setShowUninteresting] = useState(false);
  const [selectNonPrimitives, setSelectNonPrimitives] = useState(false);
  const [showTextarea, setShowTextarea] = useState(coarsePointer);

  const [latestEvent, setLatestEvent] = useState<KeyboardEvent>(defaultEvent);

  const handleChangeEvent = useCallback(
    (e: KeyboardEvent) => {
      if (preventDefault || isFullscreen) e.preventDefault();
      setLatestEvent(e);
    },
    [preventDefault, isFullscreen]
  );

  const handleClickFullscreen = useCallback(() => {
    const promise = lockKeyboard({
      fullscreenElement: fullscreenElementRef.current,
    });
    Effect.runPromise(promise);
  }, []);

  const handleClickExitFullscreen = useCallback(() => {
    document.exitFullscreen();
  }, []);

  const {
    listenKeydown,
    setListenKeydown,
    listenKeyup,
    setListenKeyup,
    listenKeypress,
    setListenKeypress,
  } = useKeyboardEvents(handleChangeEvent);

  return (
    <div className="container px-4 mx-auto mt-5 mb-20 lg:my-20">
      <div className="my-10 flex flex-col gap-4 md:flex-row items-start justify-between">
        <div>
          <h1 className="text-3xl sm:text-5xl">
            <a href="https://keyboard.events/">keyboard.events</a>
          </h1>
          <p className="sm:text-xl my-2">Inspect JavaScript <code>KeyboardEvent</code>s.</p>
        </div>

        <ListenToCheckboxes
          listenKeydown={listenKeydown}
          setListenKeydown={setListenKeydown}
          listenKeyup={listenKeyup}
          setListenKeyup={setListenKeyup}
          listenKeypress={listenKeypress}
          setListenKeypress={setListenKeypress}
          preventDefault={preventDefault}
          setPreventDefault={setPreventDefault}
        />
      </div>

      <details className="my-5" open>
        <summary className="text-xl cursor-pointer">Settings</summary>

        <div className="my-5">
          <Checkbox
            checked={showUninteresting}
            onChange={(e) => setShowUninteresting(e.currentTarget.checked)}
          >
            Show all event properties
          </Checkbox>

          {showUninteresting && (
            <Checkbox
              className="ms-6"
              checked={selectNonPrimitives}
              onChange={(e) => setSelectNonPrimitives(e.currentTarget.checked)}
            >
              Select non-primitive values
            </Checkbox>
          )}

          <Checkbox
            checked={showTextarea}
            onChange={(e) => setShowTextarea(e.currentTarget.checked)}
          >
            Enable text input field
          </Checkbox>
        </div>
      </details>

      {showTextarea ? (
        <div className="my-5">
          <Textarea autoFocus />
        </div>
      ) : null}

      <div className="my-10">
        <div
          ref={fullscreenElementRef}
          className={classNames(isFullscreen && 'bg-[#242424] grid place-items-center overflow-y-auto px-4 py-8')}
        >
          <div className="container flex flex-col">
            <div className="my-5">
              {isFullscreen ? (
                <ExitFullscreenButton onClick={handleClickExitFullscreen} />
              ) : (
                <FullscreenButton onClick={handleClickFullscreen} />
              )}
            </div>
            
            <KeyboardEventDetails
              event={latestEvent}
              selectNonPrimitives={selectNonPrimitives}
              showUninteresting={showUninteresting}
            />
          </div>
        </div>
      </div>

      <details className="my-5">
        <summary className="text-xl cursor-pointer">Helpful links</summary>

        <div className="my-5">
          <HelpfulLinks />
        </div>
      </details>
    </div>
  );
};
