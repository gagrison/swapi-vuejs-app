import Vue from 'vue';
import VueRouter from 'vue-router';
import People from '@/views/People.vue';
import Planets from '@/views/Planets.vue';
import Species from '@/views/Species.vue';
import Starships from '@/views/Starships.vue';
import Vehicles from '@/views/Vehicles.vue';
import Films from '@/views/Films.vue';
import Person from '@/views/Person.vue';
import Planet from '@/views/Planet.vue';
import Specie from '@/views/Specie.vue';
import Starship from '@/views/Starship.vue';
import Vehicle from '@/views/Vehicle.vue';
import Film from '@/views/Film.vue';

Vue.use(VueRouter);

const props = (route) => ({
  page: Number(route.query.page),
  search: route.query.search,
  searchPage: Number(route.query.searchPage)
});

const routes = [
  {
    path: '/',
    redirect: {
      name: 'People',
      query: {
        page: 1
      }
    }
  },
  {
    path: '/people',
    name: 'People',
    component: People,
    props
  },
  {
    path: '/planets',
    name: 'Planets',
    component: Planets,
    props
  },
  {
    path: '/species',
    name: 'Species',
    component: Species,
    props
  },
  {
    path: '/starships',
    name: 'Starships',
    component: Starships,
    props
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: Vehicles,
    props
  },
  {
    path: '/films',
    name: 'Films',
    component: Films
  },
  {
    path: '/person/:id',
    name: 'Person',
    component: Person,
    props: true
  },
  {
    path: '/planet/:id',
    name: 'Planet',
    component: Planet,
    props: true
  },
  {
    path: '/specie/:id',
    name: 'Specie',
    component: Specie,
    props: true
  },
  {
    path: '/starship/:id',
    name: 'Starship',
    component: Starship,
    props: true
  },
  {
    path: '/vehicle/:id',
    name: 'Vehicle',
    component: Vehicle,
    props: true
  },
  {
    path: '/film/:id',
    name: 'Film',
    component: Film,
    props: true
  }
];

const router = new VueRouter({
  routes,
});

export default router;
