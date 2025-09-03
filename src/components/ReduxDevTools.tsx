import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';

const ReduxDevTools = () => {
  const weatherState = useAppSelector(state => state.weather);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render in development and after client hydration
  if (!isClient || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div
      suppressHydrationWarning
      className='fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-xs max-w-sm z-50'
    >
      <h3 className='font-bold mb-2'>Redux State (Dev)</h3>
      <div className='space-y-1'>
        <div>
          <strong>Cached Cities:</strong>{' '}
          {Object.keys(weatherState.data).length}
        </div>
        <div>
          <strong>Loading:</strong> {weatherState.loading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Error:</strong> {weatherState.error || 'None'}
        </div>
      </div>
      <details className='mt-2'>
        <summary className='cursor-pointer'>Full State</summary>
        <pre className='mt-1 text-xs overflow-auto max-h-32'>
          {JSON.stringify(weatherState, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default ReduxDevTools;
