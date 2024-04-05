import { FC } from 'react';

export const HelpfulLinks: FC = () => (
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
);
