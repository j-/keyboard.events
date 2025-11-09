import { createContext } from 'react';
import { useAppContextState } from './hooks';

export type AppContextType = ReturnType<typeof useAppContextState>;

export const AppContext = createContext<AppContextType>({} as AppContextType);
