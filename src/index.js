
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
// Łapie elememnty document z przeglądarki


const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// Po kazdym wpisaniu litery wykona funkcje debounce(sear...) 

searchInput.addEventListener('input', debounce(onSearchInput, 300));

async function fetchCountries(searchTerm) {
    
    const baseUrl = `"https://restcountries.com/v3.1/all"`;
    const response = await fetch(baseUrl);
    return response.json();
  }

function onSearchInput() {
   // Tworzy stala searchValue, trim usuwa spacje z poczatku i konca  stringa  " test" => "test" 
  const searchValue = searchInput.value.trim();

//  Co jeśli wartosc będzie pusta
  if (searchValue === '') {
     // wyzerowanie
    clearUI();
// kończy funkcję 
    return;
  }

  // wywołanie funkcji fetchCOuntries 
  fetchCountries(searchValue)
    .then((countries) => {
        // Wyczyść widok
      clearUI();
      if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
      } else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (countries.length >= 2 && countries.length <= 10) {
        // Wyrenderuj widok listy
        renderCountryList(countries);
      } else {
        renderCountryInfo(countries[0]);
      }
    })
    .catch((error) => {
       // złap jakikolwiek error
      Notiflix.Notify.failure('An error occurred while fetching data.');
      console.error(error);
    });
}

function clearUI() {
    // wyczyść widok
    // przypisz nic do zlapanego elementu html co spowoduje wyzerowanie widoku
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function renderCountryList(countries) {
    // render listy krajów
  const listItems = countries.map((country) => {

    const listItem = document.createElement('li');
    // stworz element html <LI>
    listItem.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.official}" /> ${country.name.official}`;
    // do srodka list item doddaj obrazek i nazwe kraju
    listItem.addEventListener('click', () => renderCountryInfo(country));
    // podpinam sie pod event klikniecia na elemencie listy => render countery info wykonuje
    return listItem;
  });
 // dodaj do countryLIST elementy li 
  countryList.append(...listItems);
}

function renderCountryInfo(country) {
    // jako argument wchodzi obiekt country
    // tworzymy HTML do detali kraju
    const countryDetails = `
      <div class="country-info">
        <img src="${country.flags.png}" alt="${country.name.common}" />
        <h2>${country.name.common}</h2>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
      </div>
    `;
  
    countryInfo.innerHTML = countryDetails;
}
