import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // object: {
    //   [pageNum]: Array<Object>,
    //   numberOfPages: Number
    // }
    people: {},
    planets: {},
    species: {},
    starships: {},
    vehicles: {},
    // films: Array<Film>
    films: [],
    // object: {
    //   [id]: Object
    // }
    person: {},
    planet: {},
    specie: {},
    starship: {},
    vehicle: {},
    film: {}
  },
  actions,
  mutations,
  getters
});
