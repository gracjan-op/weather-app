import { combineReducers, configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

const rootReducer = combineReducers({
  weather: weatherReducer,
});

// Extend Window interface to include Redux state
declare global {
  interface Window {
    __REDUX_STATE__?: ReturnType<typeof rootReducer>;
  }
}

// Get preloaded state from server if available
const getPreloadedState = () => {
  if (typeof window !== 'undefined' && window.__REDUX_STATE__) {
    return window.__REDUX_STATE__;
  }
  return undefined;
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: getPreloadedState(),
  devTools: process.env.NODE_ENV !== 'production',
});
