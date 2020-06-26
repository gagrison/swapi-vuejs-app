<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <LinkItems v-else
               :items="films"
               routeName="film"
               titleProperty="title"
               subtitleProperty="release_date">
    </LinkItems>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LinkItems from '@/components/LinkItems.vue';
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
    LinkItems,
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
