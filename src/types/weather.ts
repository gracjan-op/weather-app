export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  description: string;
  icon: string;
  timestamp: number;
}

export interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface WeatherApiResponse {
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}
