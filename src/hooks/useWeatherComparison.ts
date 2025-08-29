import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchWeatherData } from '../store/weatherSlice';
import type { WeatherData } from '../types/weather';

export const useWeatherComparison = (currentCity: string) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.weather);

  // Reset selectedCity when currentCity changes
  useEffect(() => {
    setSelectedCity(null);
  }, [currentCity]);

  const handleCitySelect = async (cityId: string) => {
    setSelectedCity(cityId);

    // Check if we have data for this city in Redux store
    if (!data[cityId]) {
      // If not, fetch the data
      try {
        await dispatch(fetchWeatherData(cityId));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  const getCurrentCityData = (): WeatherData | null => {
    if (!currentCity) return null;
    return data[currentCity] || null;
  };

  const getSelectedCityData = (): WeatherData | null => {
    if (!selectedCity) return null;
    return data[selectedCity] || null;
  };

  return {
    selectedCity,
    loading,
    error,
    currentCityData: getCurrentCityData(),
    selectedCityData: getSelectedCityData(),
    handleCitySelect,
  };
};
