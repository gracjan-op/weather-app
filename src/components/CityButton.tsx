import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface CityData {
  name: string;
  id: string;
}

interface CityButtonProps {
  city: CityData;
  className?: string;
}

const CityButton = ({ city, className = '' }: CityButtonProps) => {
  return (
    <Link
      to={`/${city.id}/`}
      className={clsx(
        'group relative bg-gradient-to-br from-gray-50 to-white hover:from-blue-500 hover:to-purple-600 text-gray-800 hover:text-white font-semibold py-6 px-4 rounded-xl transition-all duration-300 block shadow-sm hover:shadow-xl border border-gray-200 hover:border-transparent overflow-hidden',
        className
      )}
      aria-label={`Zobacz pogodę dla ${city.name}`}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

      <div className='relative z-10 text-center'>
        <div className='text-2xl mb-2 group-hover:scale-110 transition-transform duration-300'>
          🌤️
        </div>
        <div className='text-lg font-bold'>{city.name}</div>
      </div>
    </Link>
  );
};

export default CityButton;
