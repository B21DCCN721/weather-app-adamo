import { configureStore } from '@reduxjs/toolkit';
import shareWeatherReducer from '../features/shareInfoWeather';

export const store = configureStore({
  reducer: {
    shareWeather: shareWeatherReducer,
  },
});

// Type dùng cho toàn app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;