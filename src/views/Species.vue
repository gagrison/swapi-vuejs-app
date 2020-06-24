<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <LinkItem v-for="specie in currentPageSpecies(page)"
                :key="specie.id"
                routeName="specie"
                :id="specie.id"
                :title="specie.name"
                :subtitle="specie.classification">
      </LinkItem>
    </article>
    <Pagination v-if="!loading"
                name="species"
                :numberOfPages="numberOfSpeciesPages"
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
  name: 'Species',
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
    ...mapGetters(['currentPageSpecies', 'numberOfSpeciesPages'])
  },
  methods: {
    ...mapActions(['fetchSpecies']),
    fetchData () {
      this.loading = true;
      this.fetchSpecies(this.page).then((error) => {
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
