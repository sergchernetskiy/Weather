import { createMarkup } from './markup';
import { refs } from './refs';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const searchParams = new URLSearchParams({
  appid: '0ce0045244e26709d7ac07148113ece2',
  units: 'metric',
});

export function getWeatherByCoords(lat, lon) {
  return fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&${searchParams}`).then(
    response => {
      if (!response.ok) {
        throw new Error(console.log(response.status));
      }

      return response.json();
    }
  );
}

export function getWeatherByCity(city) {
  return fetch(`${BASE_URL}?q=${city}&${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(console.log(response.status));
    }

    return response.json();
  });
}
