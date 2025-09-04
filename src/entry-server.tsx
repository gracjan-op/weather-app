import { configureStore } from '@reduxjs/toolkit';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import weatherReducer, { initializeWithServerData } from './store/weatherSlice';
import type { WeatherData } from './types/weather';
import { extractCityFromUrl, loadWeatherData } from './utils/serverDataLoader';

export async function render(_url: string) {
  // Ignore system requests
  if (
    _url.includes('.well-known') ||
    _url.includes('favicon.ico') ||
    _url.includes('robots.txt')
  ) {
    return { html: '<div>Not Found</div>' };
  }

  // Ensure URL has leading slash for React Router
  const url = _url.startsWith('/') ? _url : `/${_url}`;

  console.log('Server rendering URL:', url);

  try {
    // Create a fresh store for each request
    const store = configureStore({
      reducer: {
        weather: weatherReducer,
      },
      devTools: false, // Disable dev tools on server
    });

    // Extract city from URL and fetch weather data if it's a city page
    const city = extractCityFromUrl(url);
    let weatherData: WeatherData | null = null;

    if (city && city !== '') {
      console.log('Fetching weather data for city:', city);
      weatherData = await loadWeatherData(city);
    }

    // Initialize store with weather data BEFORE rendering
    if (weatherData && city) {
      await store.dispatch(
        initializeWithServerData({ city, data: weatherData })
      );
    }

    const html = renderToString(
      <StrictMode>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </StrictMode>
    );

    // Serialize store state for client hydration
    const preloadedState = store.getState();
    const serializedState = JSON.stringify(preloadedState);

    return {
      html,
      head: `<script>window.__REDUX_STATE__ = ${serializedState};</script>`,
    };
  } catch (error) {
    console.error('Error during SSR:', error);
    return { html: '<div>Error during server-side rendering</div>' };
  }
}
