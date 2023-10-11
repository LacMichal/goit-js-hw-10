import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';

// Odniesienia do elementów HTML
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// Zapytanie do API o dane krajów
async function fetchCountries(searchTerm) {
  const baseUrl = `https://restcountries.com/v3.1/name/${searchTerm}`;
  const response = await fetch(baseUrl);
  return response.json();
}

// Generuje kod HTML na podstawie danych krajów
function renderCountryList(countries) {
  const listItems = countries.map((country) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.official}" /> ${country.name.official}`;
    listItem.addEventListener('click', () => renderCountryInfo(country));
    return listItem;
  });
  clearUI();
  countryList.append(...listItems);
}
// generowanie kodu HTML na podstawie danych krajów
function renderCountryInfo(country) {
  const countryDetails = `
    <div class="country-info">
      <img src="${country.flags.png}" alt="${country.name.common}" />
      <h2>${country.name.common}</h2>
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
    </div>
  `;
  clearUI();
  countryInfo.innerHTML = countryDetails;
}

function clearUI() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
  // użycie metody trim , czyli usunięcie pierwszego i ostatniego pustego znaku 
  function onSearchInput() {
  const searchValue = searchInput.value.trim();
  if (searchValue === '') {
    clearUI();
    return;
  }

    // zapytanie do API o dane krajów, przetwarzanie wyników
  fetchCountries(searchValue)
    .then((countries) => {
      clearUI();
      if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
      } else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries);
      } else {
        renderCountryInfo(countries[0]);
      }
    })
    .catch((error) => {
      Notiflix.Notify.failure('An error occurred while fetching data.');
      console.error(error);
    });
}

// Nasłuchuj zmian w polu wyszukiwania
searchInput.addEventListener('input', debounce(onSearchInput, 300));
