const BASE_URL = "https://restcountries.com/v3.1/name";

export function fetchCountries(name) {
    return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Failed to download country data for ${name}`);
            }
        })
        .catch(error => {
            throw new Error(error);
        });
}
