import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const LANG = "vi";

const useFetchWeather = () => {
  const fetchData = async (params: string) => {
    const unit = localStorage.getItem('unit')??'metric';
    try {
      const res = await axios.get(
        `${BASE_URL}weather?${params}&appid=${API_KEY}&units=${unit}&lang=${LANG}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return {
    fetchData,
  };
};

export default useFetchWeather;
