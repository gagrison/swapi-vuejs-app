<template>
  <section v-if="planetsUrls.length">
    <p class="title">{{isHomeworld ? 'Homeworld' : 'Planets'}}: </p>
    <Loader v-if="loading"
            isSmall="true"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <div v-else-if="planetsIds.length"
         class="links">
      <router-link v-for="id in planetsIds"
                   :key="id"
                   :to="{name: 'Planet', params: { id }}">
        {{getPlanet(id).name | capitalize}}
      </router-link>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'PlanetsLinks',
  data() {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['planetsUrls', 'isHomeworld'],
  components: {
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getPlanet']),
    planetsIds () {
      return this.planetsUrls.map((url) => this.stripIdFromUrl(url));
    }
  },
  methods: {
    ...mapActions(['fetchMultiple']),
    fetchData () {
      this.loading = true;
      this.fetchMultiple({
        ids: this.planetsIds,
        functionName: 'Planet'
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
