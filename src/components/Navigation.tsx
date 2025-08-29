import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WeatherIcon } from './icons';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const NAV_HEIGHT = 60;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > NAV_HEIGHT);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={clsx(
        'bg-white shadow-md p-4 transition-all duration-300 ease-in-out',
        {
          'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm':
            isScrolled,
          relative: !isScrolled,
        }
      )}
      style={{ height: `${NAV_HEIGHT}px` }}
    >
      <div className='max-w-4xl mx-auto flex items-center justify-between'>
        <Link
          to='/'
          className='flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors'
          aria-label='Go to homepage'
        >
          <WeatherIcon className='w-8 h-8 text-blue-600' />
          Pogodynka
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
