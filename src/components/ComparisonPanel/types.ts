import type { WeatherData } from '../../types/weather';

export interface WeatherDifference {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

export interface ComparisonSummary {
  summaries: string[];
  hasDifferences: boolean;
}

export interface WeatherParameter {
  key: WeatherParameterKey;
  label: string;
  unit: string;
  positiveColor: string;
  negativeColor: string;
}

export interface ComparisonPanelProps {
  currentCity: string;
}

export interface CitySelectorProps {
  currentCity: string;
  selectedCity: string | null;
  loading: boolean;
  onCitySelect: (cityId: string) => void;
}

export interface ComparisonTableProps {
  currentCityData: WeatherData;
  selectedCityData: WeatherData;
}

export interface LoadingSkeletonProps {
  selectedCity: string;
}

export type WeatherParameterKey = keyof Pick<
  WeatherData,
  'temperature' | 'humidity' | 'windSpeed' | 'pressure'
>;
