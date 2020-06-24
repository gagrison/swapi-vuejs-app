<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <section class="heading">{{planet.name | capitalize}}</section>
      <SectionItem title="Terrain"
                   :data="planet.terrain"/>
      <SectionItem title="Population"
                   :data="planet.population"/>
      <SectionItem title="Climate"
                   :data="planet.climate"/>
      <SectionItem title="Diameter"
                   :data="planet.diameter"/>
      <SectionItem title="Rotation period"
                   :data="planet.rotation_period"/>
      <SectionItem title="Orbital period"
                   :data="planet.orbital_period"/>
      <SectionItem title="Gravity"
                   :data="planet.gravity"/>
      <SectionItem title="Surface water"
                   :data="planet.surface_water"/>
      <PeopleLinks :peopleUrls="planet.residents"
                   title="Residents"/>
      <FilmsLinks :filmsUrls="planet.films"/>
    </article>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SectionItem from '@/components/SectionItem.vue';
import PeopleLinks from '@/components/PeopleLinks.vue';
import FilmsLinks from '@/components/FilmsLinks.vue';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'Planet',
  data () {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['id'],
  components: {
    SectionItem,
    PeopleLinks,
    FilmsLinks,
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getPlanet']),
    planet () {
      return this.getPlanet(this.id);
    }
  },
  methods: {
    ...mapActions(['fetchPlanet']),
    fetchData () {
      this.loading = true;
      this.fetchPlanet(this.id).then((error) => {
        this.loading = false;
        this.error = error;
      });
    }
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route.params.id': 'fetchData'
  }
};
</script>
