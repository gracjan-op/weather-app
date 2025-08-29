import type { WeatherParameter } from './types';

export const WEATHER_PARAMETERS: WeatherParameter[] = [
  {
    key: 'temperature',
    label: 'Temperatura',
    unit: '°C',
    positiveColor: 'text-red-600',
    negativeColor: 'text-blue-600',
  },
  {
    key: 'humidity',
    label: 'Wilgotność',
    unit: '%',
    positiveColor: 'text-blue-600',
    negativeColor: 'text-red-600',
  },
  {
    key: 'windSpeed',
    label: 'Prędkość wiatru',
    unit: ' m/s',
    positiveColor: 'text-orange-600',
    negativeColor: 'text-green-600',
  },
  {
    key: 'pressure',
    label: 'Ciśnienie',
    unit: ' hPa',
    positiveColor: 'text-green-600',
    negativeColor: 'text-orange-600',
  },
];

export const COMPARISON_MESSAGES = {
  TEMPERATURE_WARMER: 'cieplej o',
  TEMPERATURE_COLDER: 'zimniej o',
  HUMIDITY_HIGHER: 'wilgotność większa o',
  HUMIDITY_LOWER: 'wilgotność mniejsza o',
  WIND_STRONGER: 'wiatr silniejszy o',
  WIND_WEAKER: 'wiatr słabszy o',
  PRESSURE_HIGHER: 'ciśnienie wyższe o',
  PRESSURE_LOWER: 'ciśnienie niższe o',
} as const;
