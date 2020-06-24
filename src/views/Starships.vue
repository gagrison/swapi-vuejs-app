<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <LinkItem v-for="starship in currentPageStarships(page)"
                :key="starship.id"
                routeName="starship"
                :id="starship.id"
                :title="starship.name"
                :subtitle="starship.model">
      </LinkItem>
    </article>
    <Pagination v-if="!loading"
                name="starships"
                :numberOfPages="numberOfStarshipsPages"
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
  name: 'Starships',
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
    ...mapGetters(['currentPageStarships', 'numberOfStarshipsPages'])
  },
  methods: {
    ...mapActions(['fetchStarships']),
    fetchData () {
      this.loading = true;
      this.fetchStarships(this.page).then((error) => {
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
