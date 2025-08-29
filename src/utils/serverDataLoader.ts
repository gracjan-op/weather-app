import { weatherService } from '../services/weatherService';
import type { WeatherData } from '../types/weather';

export async function loadWeatherData(
  city: string
): Promise<WeatherData | null> {
  try {
    console.log(`Server: Loading weather data for city: ${city}`);
    console.log(
      `Server: API Key available: ${!!process.env.VITE_OPENWEATHER_API_KEY}`
    );
    const weatherData = await weatherService.getCurrentWeather(city);
    console.log(
      `Server: Successfully loaded weather data for ${city}:`,
      weatherData
    );
    return weatherData;
  } catch (error) {
    console.error(`Server: Failed to load weather data for ${city}:`, error);
    return null;
  }
}

export function extractCityFromUrl(url: string): string | null {
  // Extract city from URL pattern like /london/ or /new-york/
  const cityMatch = url.match(/^\/([^/]+)\/?$/);
  return cityMatch ? cityMatch[1] : null;
}
