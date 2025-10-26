import {
  createContext,
  type FC,
  type PropsWithChildren,
  useMemo,
} from 'react';
import useSessionStorageState from 'use-session-storage-state';
import { EventTargetOption, OptionsLevel } from '../types';

const useAppContextState = () => {
  const [capture, setCapture] =
    useSessionStorageState('capture', { defaultValue: false });
  const [stopPropagation, setStopPropagation] =
    useSessionStorageState('stopPropagation', { defaultValue: true });
  const [preventDefault, setPreventDefault] =
    useSessionStorageState('preventDefault', { defaultValue: false });

  const [handleKeydown, setHandleKeydown] =
    useSessionStorageState('handleKeydown', { defaultValue: true });
  const [handleKeyup, setHandleKeyup] =
    useSessionStorageState('handleKeyup', { defaultValue: true });
  const [handleKeypress, setHandleKeypress] =
    useSessionStorageState('handleKeypress', { defaultValue: false });

  const [optionsLevel, setOptionsLevel] =
    useSessionStorageState('optionsLevel', { defaultValue: OptionsLevel.BASIC });
  const [eventTarget, setEventTarget] =
    useSessionStorageState('eventTarget', { defaultValue: EventTargetOption.WINDOW });
  const [persistSidebar, setPersistSidebar] =
    useSessionStorageState('persistSidebar', { defaultValue: false });

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
    persistSidebar,
    setPersistSidebar,
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
    persistSidebar,
    setPersistSidebar,
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
