import {
  createContext,
  type FC,
  type PropsWithChildren,
  useMemo,
  useState,
} from 'react';
import { EventTargetOption, OptionsLevel } from '../types';

const useAppContextState = () => {
  const [capture, setCapture] = useState(false);
  const [stopPropagation, setStopPropagation] = useState(true);
  const [preventDefault, setPreventDefault] = useState(false);

  const [handleKeydown, setHandleKeydown] = useState(true);
  const [handleKeyup, setHandleKeyup] = useState(true);
  const [handleKeypress, setHandleKeypress] = useState(false);

  const [optionsLevel, setOptionsLevel] = useState(OptionsLevel.BASIC);
  const [eventTarget, setEventTarget] = useState(EventTargetOption.WINDOW);

  return useMemo(() => ({
    capture,
    setCapture,
    stopPropagation,
    setStopPropagation,
    preventDefault,
    setPreventDefault,
    handleKeydown,
    setHandleKeydown,
    handleKeyup,
    setHandleKeyup,
    handleKeypress,
    setHandleKeypress,
    optionsLevel,
    setOptionsLevel,
    eventTarget,
    setEventTarget,
  }), [
    capture,
    setCapture,
    stopPropagation,
    setStopPropagation,
    preventDefault,
    setPreventDefault,
    handleKeydown,
    setHandleKeydown,
    handleKeyup,
    setHandleKeyup,
    handleKeypress,
    setHandleKeypress,
    optionsLevel,
    setOptionsLevel,
    eventTarget,
    setEventTarget,
  ]);
};

export type AppContextType = ReturnType<typeof useAppContextState>;

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const appContext = useAppContextState();

  return (
    <AppContext.Provider value={appContext}>
      {children}
    </AppContext.Provider>
  );
};
