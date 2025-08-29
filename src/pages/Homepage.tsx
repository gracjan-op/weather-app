import CityButton from '../components/CityButton';
import defaultCities from '../config/defaultCities';

const Homepage = () => {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
            Najczęściej wyszukiwane miasta
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Szybki dostęp do pogody w popularnych lokalizacjach w Polsce.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto'>
          {defaultCities.map(city => (
            <CityButton key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
