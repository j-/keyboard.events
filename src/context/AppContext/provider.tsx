import type { FC, PropsWithChildren } from 'react';
import { AppContext } from './context';
import { useAppContextState } from './hooks';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const appContext = useAppContextState();

  return (
    <AppContext.Provider value={appContext}>
      {children}
    </AppContext.Provider>
  );
};
