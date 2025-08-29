import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../store/hooks';

export const useReduxHydration = (): boolean => {
  const [isHydrated, setIsHydrated] = useState(false);
  const weatherState = useAppSelector(state => state.weather);

  // Memoize the data check to avoid unnecessary re-renders
  const hasData = useMemo(() => {
    return Object.keys(weatherState.data).length > 0;
  }, [weatherState.data]);

  useEffect(() => {
    // If we have data, immediately mark as hydrated
    if (hasData) {
      setIsHydrated(true);
      return;
    }

    // If no data, wait for hydration to complete
    // This handles the case where server data is being hydrated
    const timer = window.setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => window.clearTimeout(timer);
  }, [hasData]);

  // Return true immediately if we have data, otherwise return hydration status
  return hasData || isHydrated;
};
