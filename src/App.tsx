import classNames from 'classnames';
import { Effect } from 'effect';
import { FC, useCallback, useRef, useState } from 'react';
import { Checkbox } from './Checkbox';
import { Event } from './Event';
import { FullscreenButton } from './FullscreenButton';
import { Modifiers } from './Modifiers';
import { lockKeyboard } from './lock-keyboard';
import { useIsFullscreen } from './use-is-fullscreen';
import { useKeyboardEvents } from './use-keyboard-events';

const defaultEvent = new KeyboardEvent('keypress', {
  key: 'a',
  code: 'KeyA',
  charCode: 0,
  keyCode: 65,
  which: 65,
});

const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

export const App: FC = () => {
  const fullScreenElementRef = useRef<HTMLDivElement>(null);
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
      <h1 className="text-3xl sm:text-5xl my-10">
        <a href="https://keyboard.events/">keyboard.events</a>
      </h1>

      <div>
        <details className="my-5">
          <summary className="text-xl cursor-pointer">Listen to</summary>

          <div className="my-5 max-w-80">
            <div className="items-center w-full text-sm font-medium text-neutral-900 bg-white border border-neutral-200 rounded-lg sm:flex dark:bg-neutral-700 dark:border-neutral-600 dark:text-white">
              <Checkbox
                className="font-mono p-3 w-full border-b border-neutral-200 sm:border-b-0 sm:border-r dark:border-neutral-600"
                checked={listenKeydown}
                onChange={(e) => setListenKeydown(e.currentTarget.checked)}
              >
                keydown
              </Checkbox>
              <Checkbox
                className="font-mono p-3 w-full border-b border-neutral-200 sm:border-b-0 sm:border-r dark:border-neutral-600"
                checked={listenKeyup}
                onChange={(e) => setListenKeyup(e.currentTarget.checked)}
              >
                keyup
              </Checkbox>
              <Checkbox
                className="font-mono p-3 w-full border-b border-neutral-200 border-b-0 dark:border-neutral-600"
                checked={listenKeypress}
                onChange={(e) => setListenKeypress(e.currentTarget.checked)}
              >
                keypress
              </Checkbox>
            </div>
          </div>
        </details>

        <details className="my-5" open>
          <summary className="text-xl cursor-pointer">Settings</summary>

          <div className="my-5">
            <Checkbox
              checked={preventDefault}
              onChange={(e) => setPreventDefault(e.currentTarget.checked)}
              onKeyDown={(e) => {
                // Prevent checkbox selection with keyboard which then cannot be undone.
                if (e.code === 'Space') e.preventDefault();
              }}
            >
              Prevent default behavior
            </Checkbox>

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
      </div>

      {showTextarea ? (
        <div className="my-5">
          <textarea
            autoFocus
            className="block py-2 px-4 w-full min-h-[3.75rem] text-sm text-white bg-black/25 rounded-lg border border-black/50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ) : null}

      <div className="my-10">
        <div ref={fullScreenElementRef} className={classNames(isFullscreen && 'bg-[#242424] grid place-items-center overflow-y-auto p-5')}>
          <div className="container">
            <div className="flex flex-col xl:flex-row gap-5">
              <div className="flex-1">
                <h2 className="text-xl my-2">Event details</h2>

                <Event
                  event={latestEvent}
                  showUninteresting={showUninteresting}
                  selectNonPrimitives={selectNonPrimitives}
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl my-2">Modifier states</h2>

                <Modifiers event={latestEvent} />
              </div>
            </div>

            <div className={classNames('my-10', isFullscreen ? 'block' : 'hidden')}>
              <button
                className="bg-neutral-900 hover:bg-neutral-700 text-white text-start py-2 px-4 rounded"
                type="button"
                onClick={() => document.exitFullscreen()}
              >
                Exit fullscreen
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10">
        <FullscreenButton
          onClick={() => {
            const promise = lockKeyboard({
              fullScreenElement: fullScreenElementRef.current,
            });
            Effect.runPromise(promise);
          }}
        />
      </div>

      <details className="my-5">
        <summary className="text-xl cursor-pointer">Helpful links</summary>

        <div className="my-5">
          <ul className="list-disc ps-5">
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent">
                "KeyboardEvent" on MDN
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState">
                "getModifierState()" on MDN
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location">
                "location property" on MDN
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/which">
                "which property" on MDN
              </a>
            </li>
            <li>
              <a href="https://w3c.github.io/uievents-code/">
                "UI Events KeyboardEvent code Values" on W3C
              </a>
            </li>
            <li>
              <a href="https://github.com/j-/keyboard.events">
                Source code on GitHub
              </a>
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
};
