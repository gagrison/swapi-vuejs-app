import * as types from './mutation-types';

export default {
  [types.ADD_PEOPLE] (state, payload) {
    state.people = {
      ...state.people,
      [payload.page]: payload.people,
      numberOfPages: payload.numberOfPages
    };
  },
  [types.ADD_PLANETS] (state, payload) {
    state.planets = {
      ...state.planets,
      [payload.page]: payload.planets,
      numberOfPages: payload.numberOfPages
    };
  },
  [types.ADD_SPECIES] (state, payload) {
    state.species = {
      ...state.species,
      [payload.page]: payload.species,
      numberOfPages: payload.numberOfPages
    };
  },
  [types.ADD_STARSHIPS] (state, payload) {
    state.starships = {
      ...state.starships,
      [payload.page]: payload.starships,
      numberOfPages: payload.numberOfPages
    };
  },
  [types.ADD_VEHICLES] (state, payload) {
    state.vehicles = {
      ...state.vehicles,
      [payload.page]: payload.vehicles,
      numberOfPages: payload.numberOfPages
    };
  },
  [types.ADD_FILMS] (state, payload) {
    state.films = [...payload.films];
  },
  [types.ADD_PERSON] (state, payload) {
    state.person = { ...state.person, [payload.person.id]: payload.person };
  },
  [types.ADD_PLANET] (state, payload) {
    state.planet = { ...state.planet, [payload.planet.id]: payload.planet };
  },
  [types.ADD_SPECIE] (state, payload) {
    state.specie = { ...state.specie, [payload.specie.id]: payload.specie };
  },
  [types.ADD_STARSHIP] (state, payload) {
    state.starship = { ...state.starship, [payload.starship.id]: payload.starship };
  },
  [types.ADD_VEHICLE] (state, payload) {
    state.vehicle = { ...state.vehicle, [payload.vehicle.id]: payload.vehicle };
  },
  [types.ADD_FILM] (state, payload) {
    state.film = { ...state.film, [payload.film.id]: payload.film };
  }
};
