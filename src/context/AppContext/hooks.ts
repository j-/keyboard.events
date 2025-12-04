import { useMemo } from 'react';
import useSessionStorageState from 'use-session-storage-state';
import { EventTargetOption, InputType, OptionsLevel } from '../../types';

export const useAppContextState = () => {
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
  const [inputType, setInputType] =
    useSessionStorageState('inputType', { defaultValue: InputType.HIDE });

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
    inputType,
    setInputType,
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
    inputType,
    setInputType,
  ]);
};
