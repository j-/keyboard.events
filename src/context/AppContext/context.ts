import { createContext } from 'react';
import { type useAppContextState } from './hooks';

export type AppContextType = ReturnType<typeof useAppContextState>;

export const AppContext = createContext<AppContextType>({} as AppContextType);
