<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <section class="heading">{{film.title}}</section>
      <SectionItem title="Release date"
                   :data="film.release_date"/>
      <SectionItem title="Episode"
                   :data="film.episode_id"/>
      <SectionItem title="Producer"
                   :data="film.producer"/>
      <SectionItem title="Director"
                   :data="film.director"/>
      <SectionItem title="Opening crawl"
                   :data="film.opening_crawl"/>
      <PeopleLinks :peopleUrls="film.characters"
                   title="Characters"/>
      <PlanetsLinks :planetsUrls="film.planets"/>
      <SpeciesLinks :speciesUrls="film.species"/>
      <StarshipsLinks :starshipsUrls="film.starships"/>
      <VehiclesLinks :vehiclesUrls="film.vehicles"/>
    </article>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SectionItem from '@/components/SectionItem.vue';
import PeopleLinks from '@/components/PeopleLinks.vue';
import PlanetsLinks from '@/components/PlanetsLinks.vue';
import SpeciesLinks from '@/components/SpeciesLinks.vue';
import StarshipsLinks from '@/components/StarshipsLinks.vue';
import VehiclesLinks from '@/components/VehiclesLinks.vue';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'Vehicle',
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
    PlanetsLinks,
    SpeciesLinks,
    StarshipsLinks,
    VehiclesLinks,
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getFilm']),
    film () {
      return this.getFilm(this.id);
    }
  },
  methods: {
    ...mapActions(['fetchFilm']),
    fetchData () {
      this.loading = true;
      this.fetchFilm(this.id).then((error) => {
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
