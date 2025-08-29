import clsx from 'clsx';
import defaultCities from '../../config/defaultCities';
import type { CitySelectorProps } from './types';

const CitySelector = ({
  currentCity,
  selectedCity,
  loading,
  onCitySelect,
}: CitySelectorProps) => {
  const handleCityClick = (cityId: string) => {
    if (!loading) {
      onCitySelect(cityId);
    }
  };

  return (
    <div className='mb-8'>
      <h3 className='text-xl font-semibold text-gray-700 mb-4 text-center'>
        Wybierz miasto do porównania:
      </h3>
      <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
        {defaultCities
          .filter(city => city.id !== currentCity)
          .map(city => (
            <button
              key={city.id}
              onClick={() => handleCityClick(city.id)}
              disabled={loading}
              className={clsx(
                'px-4 py-3 rounded-xl font-medium transition-all duration-200',
                {
                  'bg-blue-600 text-white shadow-lg': selectedCity === city.id,
                  'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md':
                    selectedCity !== city.id,
                  'opacity-50 cursor-not-allowed': loading,
                  'cursor-pointer': !loading,
                }
              )}
              aria-label={`Porównaj z ${city.name}`}
            >
              {city.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CitySelector;
