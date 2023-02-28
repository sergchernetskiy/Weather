import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { refs } from './js/refs';
import { getWeatherByCoords, getWeatherByCity } from './js/weather-api';
import { createMarkup } from './js/markup';

refs.form.addEventListener('submit', onHandleSubmit);

navigator.geolocation?.getCurrentPosition(({ coords }) => {
  const { latitude, longitude } = coords;
  getWeatherByCoords(latitude, longitude).then(onSuccess).catch(onError);
});

function onHandleSubmit(e) {
  e.preventDefault();
  const { query } = e.currentTarget.elements;
  const city = query.value.trim().toLowerCase();
  if (city === '') {
    Notify.failure('Search field can not be empty!', {
      position: 'right-bottom',
    });
  }

  getWeatherByCity(city).then(onSuccess).catch(onError);
}

function onSuccess(data) {
  const markup = createMarkup(data);
  refs.weatherCard.innerHTML = markup;
  refs.form.reset();
}

function onError(error) {
  console.log(error);
  refs.form.innerHTML = '';
}
