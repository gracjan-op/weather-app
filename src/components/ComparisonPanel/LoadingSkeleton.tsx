import defaultCities from '../../config/defaultCities';
import type { LoadingSkeletonProps } from './types';

const LoadingSkeleton = ({ selectedCity }: LoadingSkeletonProps) => {
  const selectedCityName = defaultCities.find(c => c.id === selectedCity)?.name;

  return (
    <div className='space-y-6'>
      {/* Summary Skeleton */}
      <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6'>
        <div className='h-6 bg-gray-200 rounded mb-3 animate-pulse'></div>
        <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
      </div>

      <div className='overflow-x-auto'>
        <div className='w-full border-collapse'>
          <div className='bg-gray-50 border-b'>
            <div className='grid grid-cols-4 gap-4 p-4'>
              <div className='h-5 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-5 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-5 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-5 bg-gray-200 rounded animate-pulse'></div>
            </div>
          </div>

          {[1, 2, 3, 4].map(row => (
            <div key={row} className='border-b hover:bg-gray-50'>
              <div className='grid grid-cols-4 gap-4 p-4'>
                <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
                <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='text-center py-4'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2'></div>
        <p className='text-sm text-gray-500'>
          Pobieranie danych pogodowych dla {selectedCityName}...
        </p>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
