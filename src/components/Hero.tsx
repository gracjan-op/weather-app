import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/${searchTerm.trim().toLowerCase()}/`);
      setSearchTerm('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        navigate(`/${searchTerm.trim().toLowerCase()}/`);
        setSearchTerm('');
      }
    }
  };

  return (
    <section className='relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4 overflow-hidden'>
      <div className='absolute inset-0 bg-black/10'></div>
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl'></div>
      </div>

      <div className='relative z-10 text-center max-w-4xl mx-auto'>
        <div className='mb-12'>
          <h1 className='text-5xl md:text-6xl font-bold text-white mb-6 leading-tight'>
            Otrzymuj aktualne informacje o pogodzie dla miast na całym świecie
          </h1>
          <p className='text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto'>
            Nasza aplikacja zapewnia dokładne prognozy i piękną wizualizację
            danych pogodowych.
          </p>
        </div>

        <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl'>
          <form onSubmit={handleSearch} className='max-w-2xl mx-auto'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <input
                id='search'
                name='search'
                type='text'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Wprowadź nazwę miasta...'
                className='flex-1 px-6 py-4 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50 text-lg bg-white/20 text-white placeholder-white/70 backdrop-blur-sm h-14'
                aria-label='Wyszukaj miasto'
              />
              <button
                type='submit'
                className='px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20 font-semibold text-lg shadow-lg hover:shadow-xl h-14'
                aria-label='Wyszukaj'
              >
                Wyszukaj
              </button>
            </div>
          </form>

          <div className='mt-6 text-blue-100'>
            <p className='text-sm leading-none'>
              Spróbuj wyszukać miasta takie jak Warszawa lub Białystok
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
