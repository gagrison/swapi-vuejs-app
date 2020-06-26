<template>
  <section v-if="vehiclesUrls.length">
    <p class="title">Vehicles: </p>
    <Loader v-if="loading"
            isSmall="true"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <div v-else-if="vehiclesIds.length"
         class="links">
      <router-link v-for="id in vehiclesIds"
                   :key="id"
                   :to="{name: 'Vehicle', params: { id }}">
        {{getVehicle(id).name  | capitalize}}
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'VehiclesLinks',
  data() {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['vehiclesUrls'],
  components: {
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getVehicle']),
    vehiclesIds () {
      return this.vehiclesUrls.map((url) => this.stripIdFromUrl(url));
    }
  },
  methods: {
    ...mapActions(['fetchMultiple']),
    fetchData () {
      this.loading = true;
      this.fetchMultiple({
        ids: this.vehiclesIds,
        functionName: 'Vehicle'
      }).then((errors) => {
        this.loading = false;
        this.error = this.transformErrorsToString(errors);
      });
    }
  },
  created () {
    this.fetchData();
  }
};
</script>
