import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { weatherService } from '../services/weatherService';
import type { WeatherData } from '../types/weather';

interface WeatherState {
  data: Record<string, WeatherData>;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: {},
  loading: false,
  error: null,
};

// Async thunk for fetching weather data
export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await weatherService.getCurrentWeather(city);
      return { city: city.toLowerCase(), data };
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch weather data';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for initializing with server data
export const initializeWithServerData = createAsyncThunk(
  'weather/initializeWithServerData',
  async (
    { city, data }: { city: string; data: WeatherData },
    { rejectWithValue }
  ) => {
    if (!data) {
      return rejectWithValue('No server data provided');
    }
    return { city: city.toLowerCase(), data };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearWeatherData: state => {
      state.data = {};
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // fetchWeatherData cases
      .addCase(fetchWeatherData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.city] = action.payload.data;
        state.error = null;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // initializeWithServerData cases
      .addCase(initializeWithServerData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeWithServerData.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.city] = action.payload.data;
        state.error = null;
      })
      .addCase(initializeWithServerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
