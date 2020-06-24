<template>
  <section v-if="peopleUrls.length">
    <p class="title">{{title || 'People'}}: </p>
    <Loader v-if="loading"
            isSmall="true"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <div v-else-if="peopleIds.length"
         class="links">
      <router-link v-for="id in peopleIds"
                   :key="id"
                   :to="{name: 'Person', params: { id }}">
        {{getPerson(id).name | capitalize}}
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
  name: 'PeopleLinks',
  data() {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['peopleUrls', 'title'],
  components: {
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getPerson']),
    peopleIds () {
      return this.peopleUrls.map((url) => this.stripIdFromUrl(url));
    }
  },
  methods: {
    ...mapActions(['fetchPerson', 'fetchMultiple']),
    fetchData () {
      this.loading = true;
      axios.all(
        this.peopleIds.map((id) => this.fetchPerson(id))
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
