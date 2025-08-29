import axios from 'axios';
import type { City, WeatherApiResponse, WeatherData } from '../types/weather';

const API_KEY =
  typeof window !== 'undefined'
    ? import.meta.env.VITE_OPENWEATHER_API_KEY
    : process.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      if (!API_KEY) {
        throw new Error('OpenWeather API key is not configured');
      }

      const response = await axios.get(
        `${BASE_URL}${endpoint}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Weather API request failed:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('City not found');
        }
        if (error.response?.status === 401) {
          throw new Error('Invalid API key');
        }
        if (error.response?.status === 429) {
          throw new Error('API rate limit exceeded');
        }
      }

      throw new Error('Failed to fetch weather data');
    }
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    const data: WeatherApiResponse = await this.makeRequest(
      `/weather?q=${city}`
    );
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      pressure: data.main.pressure,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: Date.now(),
    };
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    const data: WeatherApiResponse = await this.makeRequest(
      `/weather?lat=${lat}&lon=${lon}`
    );

    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      pressure: data.main.pressure,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: Date.now(),
    };
  }

  async getPopularCitiesWeather(): Promise<WeatherData[]> {
    const popularCities: City[] = [
      { name: 'Warszawa', country: 'PL', lat: 52.2297, lon: 21.0122 },
      { name: 'Kraków', country: 'PL', lat: 50.0647, lon: 19.945 },
      { name: 'Wrocław', country: 'PL', lat: 51.1079, lon: 17.0385 },
      { name: 'Poznań', country: 'PL', lat: 52.4064, lon: 16.9252 },
      { name: 'Gdańsk', country: 'PL', lat: 54.352, lon: 18.6466 },
      { name: 'Lublin', country: 'PL', lat: 51.2464, lon: 22.5684 },
    ];

    const weatherPromises = popularCities.map(city =>
      this.getWeatherByCoords(city.lat, city.lon)
    );

    return Promise.all(weatherPromises);
  }
}

export const weatherService = new WeatherService();
