// odniesienia do elementów HTML

const fetchUsersBtn = document.querySelector("#search-box");
const userList = document.querySelector(".country-list");

// zapytanie do API o dane krajów

async function fetchCountries(searchTerm) {
    const baseUrl = "https://restcountries.com/v3.1/all";
    const response = await fetch(baseUrl);
    return response.json();
  }
  // generuje kod HTML na podstawie danych krajów 

function renderUserListItems(users) {
  const markup = users
    .map(
      (user) => `<li class="item">
        <p><b>Name</b>: ${user.name}</p>
        <p><b>Email</b>: ${user.email}</p>
        <p><b>Company</b>: ${user.company.name}</p>
      </li>`
    )
    .join("");
  userList.innerHTML = markup;
}
