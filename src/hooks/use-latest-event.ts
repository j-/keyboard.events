import { useContext } from 'react'
import { EventContext } from '../context/EventContext';

export const useLatestEvent = () => {
  return useContext(EventContext);
};
