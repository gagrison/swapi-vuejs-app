<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <LinkItem v-for="planet in currentPagePlanets(page)"
                :key="planet.id"
                routeName="planet"
                :id="planet.id"
                :title="planet.name"
                :subtitle="planet.terrain">
      </LinkItem>
    </article>
    <Pagination v-if="!loading"
                name="planets"
                :numberOfPages="numberOfPlanetsPages"
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
  name: 'Planets',
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
    ...mapGetters(['currentPagePlanets', 'numberOfPlanetsPages'])
  },
  methods: {
    ...mapActions(['fetchPlanets']),
    fetchData () {
      this.loading = true;
      this.fetchPlanets(this.page).then((error) => {
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
