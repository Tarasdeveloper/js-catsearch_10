import { fetchBreeds, fetchCatByBreed } from './components/cat-api';

// Call the function to fetch breeds data when the script loads
fetchBreeds().then(breeds => {
  const breedSelector = document.getElementById('breed_selector');
  breedSelector.innerHTML = ''; // Clear any existing options

  for (let i = 0; i < breeds.length; i++) {
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
