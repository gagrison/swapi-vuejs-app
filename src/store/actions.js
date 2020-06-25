/* eslint-disable consistent-return */
import axios from 'axios';
import * as types from './mutation-types';

axios.defaults.baseURL = 'https://swapi.dev/api/';

const addIdsToObjects = (data) => data.map((obj) => {
  // Strip id from url property and add it to object
  const id = Number(obj.url.match(/\d+/)[0]);

  return { ...obj, id };
});

export default {
  fetchPeople (context, page) {
    // If data is already fetched then skip
    if (!context.state.people[page]) {
      return axios.get(`people/?page=${page}`).then((response) => {
        const people = addIdsToObjects(response.data.results);

        context.commit({
          type: types.ADD_PEOPLE,
          numberOfPages: Math.ceil(response.data.count / 10),
          people,
          page
        });

        people.forEach((person) => {
          context.commit({
            type: types.ADD_PERSON,
            person
          });
        });
      }).catch((error) => error);
    }
  },
  fetchPlanets (context, page) {
    // If data is already fetched then skip
    if (!context.state.planets[page]) {
      return axios.get(`planets/?page=${page}`).then((response) => {
        const planets = addIdsToObjects(response.data.results);

        context.commit({
          type: types.ADD_PLANETS,
          numberOfPages: Math.ceil(response.data.count / 10),
          planets,
          page
        });

        planets.forEach((planet) => {
          context.commit({
            type: types.ADD_PLANET,
            planet
          });
        });
      }).catch((error) => error);
    }
  },
  fetchSpecies (context, page) {
    // If data is already fetched then skip
    if (!context.state.species[page]) {
      return axios.get(`species/?page=${page}`).then((response) => {
        const species = addIdsToObjects(response.data.results);

        context.commit({
          type: types.ADD_SPECIES,
          numberOfPages: Math.ceil(response.data.count / 10),
          species,
          page
        });

        species.forEach((specie) => {
          context.commit({
            type: types.ADD_SPECIE,
            specie
          });
        });
      }).catch((error) => error);
    }
  },
  fetchStarships (context, page) {
    // If data is already fetched then skip
    if (!context.state.starships[page]) {
      return axios.get(`starships/?page=${page}`).then((response) => {
        const starships = addIdsToObjects(response.data.results);

        context.commit({
          type: types.ADD_STARSHIPS,
          numberOfPages: Math.ceil(response.data.count / 10),
          starships,
          page
        });

        starships.forEach((starship) => {
          context.commit({
            type: types.ADD_STARSHIP,
            starship
          });
        });
      }).catch((error) => error);
    }
  },
  fetchVehicles (context, page) {
    // If data is already fetched then skip
    if (!context.state.vehicles[page]) {
      return axios.get(`vehicles/?page=${page}`).then((response) => {
        const vehicles = addIdsToObjects(response.data.results);

        context.commit({
          type: types.ADD_VEHICLES,
          numberOfPages: Math.ceil(response.data.count / 10),
          vehicles,
          page
        });

        vehicles.forEach((vehicle) => {
          context.commit({
            type: types.ADD_VEHICLE,
            vehicle
          });
        });
      }).catch((error) => error);
    }
  },
  fetchFilms (context) {
    // If data is already fetched then skip
    if (!context.state.films.length) {
      return axios.get('films/').then((response) => {
        const films = addIdsToObjects(response.data.results);

        context.commit({
          type: types.ADD_FILMS,
          films
        });

        films.forEach((film) => {
          context.commit({
            type: types.ADD_FILM,
            film
          });
        });
      }).catch((error) => error);
    }
  },
  fetchPerson (context, id) {
    // If data is already fetched then skip
    if (!context.state.person[id]) {
      return axios.get(`people/${id}/`).then((response) => {
        // Add id to person object
        const person = { ...response.data, id };

        context.commit({
          type: types.ADD_PERSON,
          person
        });
      }).catch((error) => error);
    }
  },
  fetchPlanet (context, id) {
    // If data is already fetched then skip
    if (!context.state.planet[id]) {
      return axios.get(`planets/${id}/`).then((response) => {
        // Add id to planet object
        const planet = { ...response.data, id };

        context.commit({
          type: types.ADD_PLANET,
          planet
        });
      }).catch((error) => error);
    }
  },
  fetchSpecie (context, id) {
    // If data is already fetched then skip
    if (!context.state.specie[id]) {
      return axios.get(`species/${id}/`).then((response) => {
        // Add id to specie object
        const specie = { ...response.data, id };

        context.commit({
          type: types.ADD_SPECIE,
          specie
        });
      }).catch((error) => error);
    }
  },
  fetchStarship (context, id) {
    // If data is already fetched then skip
    if (!context.state.starship[id]) {
      return axios.get(`starships/${id}/`).then((response) => {
        // Add id to starship object
        const starship = { ...response.data, id };

        context.commit({
          type: types.ADD_STARSHIP,
          starship
        });
      }).catch((error) => error);
    }
  },
  fetchVehicle (context, id) {
    // If data is already fetched then skip
    if (!context.state.vehicle[id]) {
      return axios.get(`vehicles/${id}/`).then((response) => {
        // Add id to vehicle object
        const vehicle = { ...response.data, id };

        context.commit({
          type: types.ADD_VEHICLE,
          vehicle
        });
      }).catch((error) => error);
    }
  },
  fetchFilm (context, id) {
    // If data is already fetched then skip
    if (!context.state.film[id]) {
      return axios.get(`films/${id}/`).then((response) => {
        // Add id to film object
        const film = { ...response.data, id };

        context.commit({
          type: types.ADD_FILM,
          film
        });
      }).catch((error) => error);
    }
  },
  fetchSearchData (context, { name, searchValue, searchPage }) {
    return axios.get(`${name}/?search=${searchValue}&page=${searchPage}`).then((response) => {
      const results = addIdsToObjects(response.data.results);

      return {
        results,
        numberOfPages: Math.ceil((response.data.count / 10) + 0.01) // Added '+ 0.01' for count = 0
      };
    }); // Request is caught inside component
  }
};
