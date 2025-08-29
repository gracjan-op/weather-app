import { COMPARISON_MESSAGES } from '../components/ComparisonPanel/config';
import type {
  ComparisonSummary,
  WeatherDifference,
} from '../components/ComparisonPanel/types';
import type { WeatherData } from '../types/weather';

export const calculateDifferences = (
  current: WeatherData,
  selected: WeatherData
): WeatherDifference => {
  return {
    temperature: selected.temperature - current.temperature,
    humidity: selected.humidity - current.humidity,
    windSpeed: selected.windSpeed - current.windSpeed,
    pressure: selected.pressure - current.pressure,
  };
};

export const formatDifference = (value: number, unit: string): string => {
  const absValue = Math.abs(value);
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';

  return `${sign}${absValue}${unit}`;
};

export const getComparisonSummary = (
  current: WeatherData,
  selected: WeatherData
): ComparisonSummary => {
  const diff = calculateDifferences(current, selected);
  const selectedCityName = selected.city;
  const summaries: string[] = [];

  if (diff.temperature !== 0) {
    const tempText =
      diff.temperature > 0
        ? `${selectedCityName}: ${COMPARISON_MESSAGES.TEMPERATURE_WARMER} ${Math.abs(diff.temperature)}°C`
        : `${selectedCityName}: ${COMPARISON_MESSAGES.TEMPERATURE_COLDER} ${Math.abs(diff.temperature)}°C`;
    summaries.push(tempText);
  }

  if (diff.humidity !== 0) {
    const humidityText =
      diff.humidity > 0
        ? `${COMPARISON_MESSAGES.HUMIDITY_HIGHER} ${Math.abs(diff.humidity)}%`
        : `${COMPARISON_MESSAGES.HUMIDITY_LOWER} ${Math.abs(diff.humidity)}%`;
    summaries.push(humidityText);
  }

  if (diff.windSpeed !== 0) {
    const windText =
      diff.windSpeed > 0
        ? `${COMPARISON_MESSAGES.WIND_STRONGER} ${Math.abs(diff.windSpeed)} m/s`
        : `${COMPARISON_MESSAGES.WIND_WEAKER} ${Math.abs(diff.windSpeed)} m/s`;
    summaries.push(windText);
  }

  if (diff.pressure !== 0) {
    const pressureText =
      diff.pressure > 0
        ? `${COMPARISON_MESSAGES.PRESSURE_HIGHER} ${Math.abs(diff.pressure)} hPa`
        : `${COMPARISON_MESSAGES.PRESSURE_LOWER} ${Math.abs(diff.pressure)} hPa`;
    summaries.push(pressureText);
  }

  return {
    summaries,
    hasDifferences: summaries.length > 0,
  };
};
