<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <section class="heading">{{person.name | capitalize}}</section>
      <SectionItem title="Birth year"
                   :data="person.birth_year"/>
      <SectionItem title="Gender"
                   :data="person.gender"/>
      <SectionItem title="Height"
                   :data="person.height"/>
      <SectionItem title="Mass"
                   :data="person.mass"/>
      <SectionItem title="Skin Color"
                   :data="person.skin_color"/>
      <SectionItem title="Hair color"
                   :data="person.hair_color"/>
      <SectionItem title="Eye color"
                   :data="person.eye_color"/>
      <PlanetsLinks :planetsUrls="[person.homeworld]"
                    :isHomeworld="true"/>
      <SpeciesLinks :speciesUrls="person.species"/>
      <StarshipsLinks :starshipsUrls="person.starships"/>
      <VehiclesLinks :vehiclesUrls="person.vehicles"/>
      <FilmsLinks :filmsUrls="person.films"/>
    </article>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SectionItem from '@/components/SectionItem.vue';
import PlanetsLinks from '@/components/PlanetsLinks.vue';
import SpeciesLinks from '@/components/SpeciesLinks.vue';
import StarshipsLinks from '@/components/StarshipsLinks.vue';
import VehiclesLinks from '@/components/VehiclesLinks.vue';
import FilmsLinks from '@/components/FilmsLinks.vue';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'Person',
  data () {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['id'],
  components: {
    SectionItem,
    PlanetsLinks,
    SpeciesLinks,
    StarshipsLinks,
    VehiclesLinks,
    FilmsLinks,
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getPerson']),
    person () {
      return this.getPerson(this.id);
    }
  },
  methods: {
    ...mapActions(['fetchPerson']),
    fetchData () {
      this.loading = true;
      this.fetchPerson(this.id).then((error) => {
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
