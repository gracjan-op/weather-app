import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CityButton from '../components/CityButton';
import ComparisonPanel from '../components/ComparisonPanel';
import WeatherDataCard from '../components/WeatherDataCard';
import defaultCities from '../config/defaultCities';
import { useReduxHydration } from '../hooks/useReduxHydration';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchWeatherData } from '../store/weatherSlice';

const WeatherPage = () => {
  const params = useParams();
  const city = params.city || 'Unknown City';
  const dispatch = useAppDispatch();
  const isHydrated = useReduxHydration();
  const { data, loading, error } = useAppSelector(state => state.weather);
  const weatherData = data[city.toLowerCase()];

  useEffect(() => {
    // Fetch weather data if not already cached
    if (!weatherData) {
      dispatch(fetchWeatherData(city));
    }
  }, [city, dispatch, weatherData]);

  // Show loading state if we don't have data and we're loading, or if not hydrated yet
  const isLoading = (!weatherData && loading) || !isHydrated;

  return (
    <div className='w-full py-16 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <div className='flex items-center justify-center mb-6'>
            <Link
              to='/'
              className='text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium flex items-center gap-2'
              aria-label='Wróć do strony głównej'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              Wróć do Strony Głównej
            </Link>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            Pogoda dla wybranego miasta
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Aktualne informacje o pogodzie i szczegółowe dane meteorologiczne
          </p>
        </div>

        <WeatherDataCard
          weatherData={weatherData}
          isLoading={isLoading}
          error={error}
          city={city}
        />

        {weatherData && <ComparisonPanel currentCity={city} />}

        <div className='bg-white rounded-2xl shadow-lg p-8'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Sprawdź pogodę w innych miastach
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Odkryj aktualne warunki pogodowe w największych polskich miastach
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {defaultCities.slice(0, 4).map(cityItem => (
              <CityButton key={cityItem.id} city={cityItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
