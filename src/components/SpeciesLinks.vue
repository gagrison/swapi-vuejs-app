<template>
  <section v-if="speciesUrls.length">
    <p class="title">Species: </p>
    <Loader v-if="loading"
            isSmall="true"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <div v-else-if="speciesIds.length"
         class="links">
      <router-link v-for="id in speciesIds"
                   :key="id"
                   :to="{name: 'Specie', params: { id }}">
        {{getSpecie(id).name | capitalize}}
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
  name: 'SpeciesLinks',
  data() {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['speciesUrls'],
  components: {
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getSpecie']),
    speciesIds () {
      return this.speciesUrls.map((url) => this.stripIdFromUrl(url));
    }
  },
  methods: {
    ...mapActions(['fetchSpecie', 'fetchMultiple']),
    fetchData () {
      this.loading = true;
      axios.all(
        this.speciesIds.map((id) => this.fetchSpecie(id))
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
