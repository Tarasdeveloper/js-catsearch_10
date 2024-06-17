import axios from 'axios';

const url = `https://api.thecatapi.com/v1/breeds`;
const api_key =
  'live_cEiFDfGVM5O2X78frqqUn4cZb8R1822BKdU05PMzTiAmno6tDMapBlUTfB36Dd8J';
let storedBreeds = [];

// Function to show the breed image and other details
function showBreedImage(index) {
  document.getElementById('breed_image').src = storedBreeds[index].image.url;
  document.getElementById('breed_json').textContent =
    storedBreeds[index].temperament;
  document.getElementById('wiki_link').href = storedBreeds[index].wikipedia_url;
  document.getElementById('wiki_link').innerHTML =
    storedBreeds[index].wikipedia_url;
}

// Expose the function to the global scope
window.showBreedImage = showBreedImage;

// Axios request to fetch the breeds data
axios
  .get(url, {
    headers: {
      'x-api-key': api_key,
    },
  })
  .then(response => {
    let data = response.data;
    // Filter to only include those with an `image` object
    data = data.filter(img => img.image?.url != null);
    storedBreeds = data;

    for (let i = 0; i < storedBreeds.length; i++) {
      const breed = storedBreeds[i];
      let option = document.createElement('option');

      // Skip any breeds that don't have an image
      if (!breed.image) continue;

      // Use the current array index
      option.value = i;
      option.innerHTML = `${breed.name}`;
      document.getElementById('breed_selector').appendChild(option);
    }
    // Show the first breed by default
    showBreedImage(0);
  })
  .catch(error => {
    console.log(error);
  });
