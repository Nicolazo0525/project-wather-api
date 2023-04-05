import axios from "axios";
import { ref } from "vue";


const watherAxios = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5'
})


// Request interceptors for API calls
watherAxios.interceptors.request.use(
  config => {
      config.headers['Content-Type'] = 'application/json';
      return config;
  },
  error => {
      return Promise.reject(error);
  }
);

export default watherAxios