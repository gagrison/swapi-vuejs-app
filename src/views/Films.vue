<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <LinkItem v-for="film in films"
                :key="film.id"
                routeName="film"
                :id="film.id"
                :title="film.title"
                :subtitle="film.release_date">
      </LinkItem>
    </article>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LinkItem from '@/components/LinkItem.vue';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'Films',
  data () {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['page'],
  components: {
    LinkItem,
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapState(['films'])
  },
  methods: {
    ...mapActions(['fetchFilms']),
    fetchData () {
      this.loading = true;
      this.fetchFilms().then((error) => {
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
