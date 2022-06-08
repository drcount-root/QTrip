import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const res = await fetch(config.backendEndpoint + "/cities");    
    const data = await res.json();
    return data;
  } catch(e) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divElement = document.createElement("div");
  divElement.className = "col-6 col-md-4 col-lg-3 mb-4";
  divElement.innerHTML = `
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
      <img class="img-responsive" src="${image}">
      </div>
    </a>
  `;
  document.getElementById("data").appendChild(divElement);
}

export { init, fetchCities, addCityToDOM };
