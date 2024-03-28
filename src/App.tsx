import { FC, useCallback, useState } from 'react';
import { Event } from './Event';
import { useKeyboardEvents } from './use-keyboard-events';
import { Modifiers } from './Modifiers';
import { Checkbox } from './Checkbox';

const defaultEvent = new KeyboardEvent('keypress', {
  key: 'a',
  code: 'KeyA',
  charCode: 0,
  keyCode: 65,
  which: 65,
});

export const App: FC = () => {
  const [preventDefault, setPreventDefault] = useState(false);
  const [showUninteresting, setShowUninteresting] = useState(false);
  const [selectNonPrimitives, setSelectNonPrimitives] = useState(false);

  const [latestEvent, setLatestEvent] = useState<KeyboardEvent>(defaultEvent);

  const handleChangeEvent = useCallback(
    (e: KeyboardEvent) => {
      if (preventDefault) e.preventDefault();
      setLatestEvent(e);
    },
    [preventDefault]
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
    <div className="container px-4 mx-auto my-5 lg:my-20">
      <h1 className="text-5xl my-10">
        <a href="https://keyboard.events/">keyboard.events</a>
      </h1>

      <div className="max-w-60">
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
            </ul>
          </div>
        </details>

        <details className="my-5">
          <summary className="text-xl cursor-pointer">Listen to</summary>

          <div className="my-5">
            <Checkbox
              checked={listenKeydown}
              onChange={(e) => setListenKeydown(e.currentTarget.checked)}
            >
              Listen to <code>keydown</code> events
            </Checkbox>

            <Checkbox
              checked={listenKeyup}
              onChange={(e) => setListenKeyup(e.currentTarget.checked)}
            >
              Listen to <code>keyup</code> events
            </Checkbox>

            <Checkbox
              checked={listenKeypress}
              onChange={(e) => setListenKeypress(e.currentTarget.checked)}
            >
              Listen to <code>keypress</code> events
            </Checkbox>

            <div className="my-5">
              <button
                className="text-sm bg-gray-500 hover:bg-gray-400 text-gray-100 py-1 px-2 rounded-l"
                type="button"
                onClick={() => {
                  setListenKeydown(true);
                  setListenKeyup(true);
                  setListenKeypress(true);
                }}
              >
                All
              </button>
              <button
                className="text-sm bg-gray-500 hover:bg-gray-400 text-gray-100 py-1 px-2"
                type="button"
                onClick={() => {
                  setListenKeydown(false);
                  setListenKeyup(false);
                  setListenKeypress(false);
                }}
              >
                None
              </button>
              <button
                className="text-sm bg-gray-500 hover:bg-gray-400 text-gray-100 py-1 px-2 rounded-r"
                type="button"
                onClick={() => {
                  setListenKeydown(true);
                  setListenKeyup(true);
                  setListenKeypress(false);
                }}
              >
                Default
              </button>
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
                checked={selectNonPrimitives}
                onChange={(e) =>
                  setSelectNonPrimitives(e.currentTarget.checked)
                }
              >
                Select non-primitive values
              </Checkbox>
            )}
          </div>
        </details>
      </div>

      <div className="my-10">
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
      </div>
    </div>
  );
};
