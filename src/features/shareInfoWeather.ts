import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherData } from "../types/weather";

const initialState: WeatherData = {
  temp: 0,
  humidity: 0,
  pressure: 0,
  windSpeed: 0,
  windDeg: 0,
  description: "",
  icon: "",
  city: "",
};

export const shareWeatherSlice = createSlice({
  name: "shareWeather",
  initialState,
  reducers: {
    addWeather: (state, action: PayloadAction<WeatherData>) => {
      return state = action.payload
    },
  },
});

export const { addWeather } = shareWeatherSlice.actions;
export default shareWeatherSlice.reducer;
