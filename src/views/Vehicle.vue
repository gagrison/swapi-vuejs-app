<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <section class="heading">{{vehicle.name | capitalize}}</section>
      <SectionItem title="Model"
                   :data="vehicle.model"/>
      <SectionItem title="Vehicle class"
                   :data="vehicle.vehicle_class"/>
      <SectionItem title="Manufacturer"
                   :data="vehicle.manufacturer"/>
      <SectionItem title="Max atmosphering speed"
                   :data="vehicle.max_atmosphering_speed"/>
      <SectionItem title="Cost in credits"
                   :data="vehicle.cost_in_credits"/>
      <SectionItem title="Crew"
                   :data="vehicle.crew"/>
      <SectionItem title="Passengers"
                   :data="vehicle.passengers"/>
      <SectionItem title="Cargo capacity"
                   :data="vehicle.cargo_capacity"/>
      <SectionItem title="Consumables"
                   :data="vehicle.consumables"/>
      <SectionItem title="Length"
                   :data="vehicle.length"/>
      <PeopleLinks :peopleUrls="vehicle.pilots"
                   title="Pilots"/>
      <FilmsLinks :filmsUrls="vehicle.films"/>
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
    FilmsLinks,
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getVehicle']),
    vehicle () {
      return this.getVehicle(this.id);
    }
  },
  methods: {
    ...mapActions(['fetchVehicle']),
    fetchData () {
      this.loading = true;
      this.fetchVehicle(this.id).then((error) => {
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
