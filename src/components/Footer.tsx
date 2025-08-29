import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon } from './icons';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 border-t border-gray-200 py-12 mt-auto'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
          <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300'>
            <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
              <span className='text-blue-600'>🌤️</span>
              Aplikacja Pogodowa
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              Otrzymuj aktualne informacje o pogodzie dla miast na całym
              świecie. Nasza aplikacja została zbudowana z użyciem nowoczesnych
              technologii webowych.
            </p>
          </div>

          <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300'>
            <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
              <span className='text-purple-600'>⚡</span>
              Technologie
            </h3>
            <ul className='space-y-3'>
              {[
                { name: 'React Router v6', icon: '🔄' },
                { name: 'TypeScript', icon: '📘' },
                { name: 'TailwindCSS', icon: '🎨' },
                { name: 'Redux Toolkit', icon: '📦' },
                { name: 'Server-Side Rendering', icon: '🚀' },
              ].map((tech, index) => (
                <li
                  key={index}
                  className='flex items-center gap-3 text-gray-700'
                >
                  <span className='text-lg'>{tech.icon}</span>
                  <span className='font-medium'>{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300'>
            <h3 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
              <span className='text-indigo-600'>🔗</span>
              Szybkie Linki
            </h3>
            <ul className='space-y-3'>
              {[
                { name: 'Strona Główna', path: '/', icon: '🏠' },
                { name: 'Białystok', path: '/bialystok/', icon: '🌆' },
                { name: 'Katowice', path: '/katowice/', icon: '🏙️' },
                { name: 'Łódź', path: '/lodz/', icon: '🌆' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className='flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 group'
                    aria-label={`Przejdź do ${link.name}`}
                  >
                    <span className='text-lg group-hover:scale-110 transition-transform duration-200'>
                      {link.icon}
                    </span>
                    <span className='font-medium'>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-200 pt-8'>
          <div className='bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg text-center'>
            <p className='text-gray-600 font-medium mb-4'>
              © 2024 <span className='text-blue-600 font-bold'>Pogodynka</span>
              . Zbudowana z <span className='text-red-500'>❤️</span> do pogody
            </p>
            <div className='flex justify-center items-center gap-4'>
              <a
                href='https://github.com/gracjan-op'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 hover:text-gray-800 transition-colors duration-200 group'
                aria-label='GitHub profil autora strony'
              >
                <GithubIcon className='w-6 h-6 group-hover:scale-110 transition-transform duration-200' />
              </a>
              <span className='text-gray-400'>•</span>
              <a
                href='https://www.linkedin.com/in/gracjanopiela/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-600 hover:text-blue-600 transition-colors duration-200 group'
                aria-label='LinkedIn profil autora strony'
              >
                <LinkedinIcon className='w-6 h-6 group-hover:scale-110 transition-transform duration-200' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
