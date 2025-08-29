import { Link } from 'react-router-dom';

const NotFound = () => {
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
            Strona nie została znaleziona
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Strona, której szukasz, nie istnieje lub została przeniesiona
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-lg p-8 mb-12'>
          <div className='text-center'>
            <div className='mb-8'>
              <h2 className='text-8xl md:text-9xl font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent'>
                404
              </h2>
            </div>

            <div className='mb-8'>
              <h3 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-4'>
                Ups! Coś poszło nie tak
              </h3>
              <p className='text-gray-600 leading-relaxed max-w-md mx-auto'>
                Strona, której szukasz, nie istnieje. Może została przeniesiona,
                usunięta lub wprowadziłeś nieprawidłowy adres URL.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link
                to='/'
                className='inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                aria-label='Wróć do strony głównej'
              >
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  />
                </svg>
                Wróć do Strony Głównej
              </Link>

              <button
                onClick={() => window.history.back()}
                className='inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                aria-label='Wróć do poprzedniej strony'
              >
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  />
                </svg>
                Wróć Wstecz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
