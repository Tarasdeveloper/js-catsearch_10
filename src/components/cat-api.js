import axios from 'axios';
import { hideLoader } from '../index';

const url = `https://api.thecatapi.com/v1/breeds`;
const api_key =
  'live_cEiFDfGVM5O2X78frqqUn4cZb8R1822BKdU05PMzTiAmno6tDMapBlUTfB36Dd8J';
let storedBreeds = [];

const breedJson = document.querySelector('.cat-info');

export function fetchBreeds() {
  return axios
    .get(url, {
      headers: {
        'x-api-key': api_key,
      },
    })
    .then(response => {
      let data = response.data;
      // Filter to only include those with an `image` object
      data = data.filter(img => img.image?.url !== null);
      storedBreeds = data;
      return storedBreeds;
    })
    .catch(error => {
      hideLoader();
      breedJson.innerHTML =
        '<p class="error">Oops! Something went wrong! Try reloading the page!</p>';
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const cat = storedBreeds[breedId];

  breedJson.innerHTML = `<div><img src="${cat.image.url}" alt="${cat.name}"></div>
      <div class="description">
        <h2>${cat.name}</h2>
        <p>${cat.description}</p>
        <p><b>Temperament: </b>${cat.temperament}</p>
      </div>`;
}

// Expose the function to the global scope
window.fetchCatByBreed = fetchCatByBreed;
