<template>
  <section v-if="filmsUrls.length">
    <p class="title">Films: </p>
    <Loader v-if="loading"
            isSmall="true"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <div v-else-if="filmsIds.length"
         class="links">
      <router-link v-for="id in filmsIds"
                   :key="id"
                   :to="{name: 'Film', params: { id }}">
        {{getFilm(id).title  | capitalize}}
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'FilmsLinks',
  data() {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['filmsUrls'],
  components: {
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getFilm']),
    filmsIds () {
      return this.filmsUrls.map((url) => this.stripIdFromUrl(url));
    }
  },
  methods: {
    ...mapActions(['fetchFilm', 'fetchMultiple']),
    fetchData () {
      this.loading = true;
      axios.all(
        this.filmsIds.map((id) => this.fetchFilm(id))
      ).then((errors) => {
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
