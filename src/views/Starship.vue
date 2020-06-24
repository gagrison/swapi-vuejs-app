<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <section class="heading">{{starship.name | capitalize}}</section>
      <SectionItem title="Model"
                   :data="starship.model"/>
      <SectionItem title="Starship class"
                   :data="starship.starship_class"/>
      <SectionItem title="Manufacturer"
                   :data="starship.manufacturer"/>
      <SectionItem title="Max atmosphering speed"
                   :data="starship.max_atmosphering_speed"/>
      <SectionItem title="Cost in credits"
                   :data="starship.cost_in_credits"/>
      <SectionItem title="Crew"
                   :data="starship.crew"/>
      <SectionItem title="Passengers"
                   :data="starship.passengers"/>
      <SectionItem title="Cargo capacity"
                   :data="starship.cargo_capacity"/>
      <SectionItem title="Consumables"
                   :data="starship.consumables"/>
      <SectionItem title="Hyperdrive rating"
                   :data="starship.hyperdrive_rating"/>
      <SectionItem title="MGLT"
                   :data="starship.MGLT"/>
      <SectionItem title="Length"
                   :data="starship.length"/>
      <PeopleLinks :peopleUrls="starship.pilots"
                   title="Pilots"/>
      <FilmsLinks :filmsUrls="starship.films"/>
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
  name: 'Starship',
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
    ...mapGetters(['getStarship']),
    starship () {
      return this.getStarship(this.id);
    }
  },
  methods: {
    ...mapActions(['fetchStarship']),
    fetchData () {
      this.loading = true;
      this.fetchStarship(this.id).then((error) => {
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
