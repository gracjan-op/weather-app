import { WeatherData } from '../types/weather';
import {
   HumidityIcon,
   PressureIcon,
   SunriseIcon,
   SunsetIcon,
   TemperatureIcon,
   WindIcon,
} from './icons';

interface WeatherDataCardProps {
  weatherData: WeatherData | undefined;
  isLoading: boolean;
  error: string | null;
  city: string;
}

const WeatherDataCard = ({
  weatherData,
  isLoading,
  error,
  city,
}: WeatherDataCardProps) => {
  return (
    <div className='bg-white rounded-2xl shadow-lg p-8 mb-12'>
      {isLoading ? (
        <div className='text-center py-12'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>
            Ładowanie danych pogodowych...
          </h3>
          <p className='text-gray-600 mb-6'>
            Pobieranie aktualnych informacji dla {city}
          </p>
          <div className='bg-blue-50 rounded-xl p-6 text-left max-w-md mx-auto'>
            <div className='space-y-2 text-sm text-blue-800'>
              <p>
                <strong>Ładowanie o:</strong>{' '}
                <span suppressHydrationWarning>
                  {new Date().toLocaleString()}
                </span>
              </p>
              <p>
                <strong>Parametr miasta:</strong> {city}
              </p>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className='text-center py-12'>
          <div className='bg-red-50 rounded-xl p-6 mb-6'>
            <div className='text-red-600 text-6xl mb-4'>⚠️</div>
            <h3 className='text-xl font-semibold text-red-800 mb-2'>
              Błąd podczas ładowania
            </h3>
            <p className='text-red-700 mb-4'>{error}</p>
            <p className='text-sm text-red-600'>
              Spróbuj odświeżyć stronę lub sprawdź nazwę miasta.
            </p>
          </div>
        </div>
      ) : weatherData ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='text-center lg:text-left'>
            <div className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-6'>
              <div className='text-2xl font-semibold mb-4'>
                {weatherData.city}
              </div>
              <div className='text-6xl font-bold mb-2 flex items-center gap-4'>
                <TemperatureIcon className='w-12 h-12' />
                {weatherData.temperature}°C
              </div>
              <div className='text-xl capitalize mb-2'>
                {weatherData.description}
              </div>
              <div className='text-blue-100 text-sm'>
                <span suppressHydrationWarning>
                  {new Date(weatherData.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-gray-800 mb-4'>
              Szczegóły pogodowe
            </h3>
            <div className='space-y-4'>
              <div className='flex justify-between items-center p-4 bg-gray-50 rounded-xl'>
                <span className='text-gray-600 font-medium flex items-center gap-2'>
                  <HumidityIcon className='w-5 h-5' />
                  Wilgotność:
                </span>
                <span className='font-bold text-gray-800'>
                  {weatherData.humidity}%
                </span>
              </div>
              <div className='flex justify-between items-center p-4 bg-gray-50 rounded-xl'>
                <span className='text-gray-600 font-medium flex items-center gap-2'>
                  <WindIcon className='w-5 h-5' />
                  Prędkość wiatru:
                </span>
                <span className='font-bold text-gray-800'>
                  {weatherData.windSpeed} m/s
                </span>
              </div>
              <div className='flex justify-between items-center p-4 bg-gray-50 rounded-xl'>
                <span className='text-gray-600 font-medium flex items-center gap-2'>
                  <PressureIcon className='w-5 h-5' />
                  Ciśnienie:
                </span>
                <span className='font-bold text-gray-800'>
                  {weatherData.pressure} hPa
                </span>
              </div>
              <div className='flex justify-between items-center p-4 bg-gray-50 rounded-xl'>
                <span className='text-gray-600 font-medium flex items-center gap-2'>
                  <SunriseIcon className='w-5 h-5' />
                  Wschód słońca:
                </span>
                <span className='font-bold text-gray-800'>
                  {new Date(weatherData.sunrise * 1000).toLocaleTimeString(
                    'pl-PL',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </span>
              </div>
              <div className='flex justify-between items-center p-4 bg-gray-50 rounded-xl'>
                <span className='text-gray-600 font-medium flex items-center gap-2'>
                  <SunsetIcon className='w-5 h-5' />
                  Zachód słońca:
                </span>
                <span className='font-bold text-gray-800'>
                  {new Date(weatherData.sunset * 1000).toLocaleTimeString(
                    'pl-PL',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherDataCard;
