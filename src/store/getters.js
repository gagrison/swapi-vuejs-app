export default {
  currentPagePeople: (state) => (page) => state.people[page],
  numberOfPeoplePages: (state) => state.people.numberOfPages,
  currentPagePlanets: (state) => (page) => state.planets[page],
  numberOfPlanetsPages: (state) => state.planets.numberOfPages,
  currentPageSpecies: (state) => (page) => state.species[page],
  numberOfSpeciesPages: (state) => state.species.numberOfPages,
  currentPageStarships: (state) => (page) => state.starships[page],
  numberOfStarshipsPages: (state) => state.starships.numberOfPages,
  currentPageVehicles: (state) => (page) => state.vehicles[page],
  numberOfVehiclesPages: (state) => state.vehicles.numberOfPages,
  getPerson: (state) => (id) => state.person[id],
  getPlanet: (state) => (id) => state.planet[id],
  getSpecie: (state) => (id) => state.specie[id],
  getStarship: (state) => (id) => state.starship[id],
  getVehicle: (state) => (id) => state.vehicle[id],
  getFilm: (state) => (id) => state.film[id]
};
