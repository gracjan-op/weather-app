import { useWeatherComparison } from '../../hooks/useWeatherComparison';
import { getComparisonSummary } from '../../utils/weatherComparison';
import CitySelector from './CitySelector';
import ComparisonTable from './ComparisonTable';
import LoadingSkeleton from './LoadingSkeleton';
import type { ComparisonPanelProps } from './types';

const ComparisonPanel = ({ currentCity }: ComparisonPanelProps) => {
  const {
    selectedCity,
    loading,
    error,
    currentCityData,
    selectedCityData,
    handleCitySelect,
  } = useWeatherComparison(currentCity);

  const comparisonSummary =
    currentCityData && selectedCityData
      ? getComparisonSummary(currentCityData, selectedCityData)
      : null;

  const renderComparisonContent = () => {
    if (!selectedCity) {
      return (
        <div className='text-center py-8'>
          <p className='text-gray-600 text-lg'>
            Wybierz miasto z listy powyżej, aby zobaczyć porównanie
          </p>
        </div>
      );
    }

    if (loading) {
      return <LoadingSkeleton selectedCity={selectedCity} />;
    }

    if (error) {
      return (
        <div className='text-center py-8'>
          <p className='text-red-600 text-lg mb-4'>
            Błąd podczas pobierania danych: {error}
          </p>
          <button
            onClick={() => handleCitySelect(selectedCity)}
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Spróbuj ponownie
          </button>
        </div>
      );
    }

    if (!currentCityData) {
      return (
        <div className='text-center py-8'>
          <p className='text-gray-600 text-lg'>
            Brak danych dla aktualnego miasta
          </p>
        </div>
      );
    }

    if (!selectedCityData) {
      return (
        <div className='text-center py-8'>
          <p className='text-gray-600 text-lg'>
            Brak danych dla wybranego miasta
          </p>
        </div>
      );
    }

    if (!comparisonSummary) {
      return (
        <div className='text-center py-8'>
          <p className='text-gray-600 text-lg'>
            Nie można wygenerować podsumowania porównania
          </p>
        </div>
      );
    }

    return (
      <div className='space-y-6'>
        <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6'>
          <h4 className='text-lg font-semibold text-gray-800 mb-3'>
            Podsumowanie porównania:
          </h4>
          <p className='text-gray-700 leading-relaxed'>
            {comparisonSummary.hasDifferences
              ? comparisonSummary.summaries.join(', ')
              : 'Brak różnic w pogodzie'}
          </p>
        </div>

        <ComparisonTable
          currentCityData={currentCityData}
          selectedCityData={selectedCityData}
        />
      </div>
    );
  };

  return (
    <section
      className='bg-white rounded-2xl shadow-lg p-8 mb-8'
      aria-labelledby='comparison-title'
      role='region'
    >
      <h2
        id='comparison-title'
        className='text-3xl font-bold text-gray-800 mb-6 text-center'
      >
        Porównanie z innymi miastami
      </h2>

      <CitySelector
        currentCity={currentCity}
        selectedCity={selectedCity}
        loading={loading}
        onCitySelect={handleCitySelect}
      />

      {renderComparisonContent()}
    </section>
  );
};

export default ComparisonPanel;
