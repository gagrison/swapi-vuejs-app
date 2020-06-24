<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <LinkItem v-for="vehicle in currentPageVehicles(page)"
                :key="vehicle.id"
                routeName="vehicle"
                :id="vehicle.id"
                :title="vehicle.name"
                :subtitle="vehicle.model">
      </LinkItem>
    </article>
    <Pagination v-if="!loading"
                name="vehicles"
                :numberOfPages="numberOfVehiclesPages"
                :page="page">
    </Pagination>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LinkItem from '@/components/LinkItem.vue';
import Pagination from '@/components/Pagination.vue';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'Vehicles',
  data () {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['page'],
  components: {
    LinkItem,
    Pagination,
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['currentPageVehicles', 'numberOfVehiclesPages'])
  },
  methods: {
    ...mapActions(['fetchVehicles']),
    fetchData () {
      this.loading = true;
      this.fetchVehicles(this.page).then((error) => {
        this.loading = false;
        this.error = error;
      });
    }
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route.query.page': 'fetchData'
  }
};
</script>
