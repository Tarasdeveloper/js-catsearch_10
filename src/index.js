import { fetchBreeds, fetchCatByBreed } from './components/cat-api';
const loader = document.querySelector('.loader');

function showLoader() {
  loader.style.display = 'block';
}

// Function to hide loader
export function hideLoader() {
  loader.style.display = 'none';
}

// Call the function to fetch breeds data when the script loads
showLoader(); // Show loader before starting to fetch data
fetchBreeds().then(breeds => {
  hideLoader(); // Hide loader after data is fetched
  const breedSelector = document.querySelector('.breed-select');
  breedSelector.innerHTML = ''; // Clear any existing options

  for (let i = 0; i < breeds.length; i += 1) {
    const breed = breeds[i];
    let option = document.createElement('option');

    // Skip any breeds that don't have an image
    if (!breed.image) continue;

    // Use the current array index
    option.value = i;
    option.innerHTML = `${breed.name}`;
    breedSelector.appendChild(option);
  }
  // Show the first breed by default
  fetchCatByBreed(0);
});
