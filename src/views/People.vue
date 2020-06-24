<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <LinkItem v-for="person in currentPagePeople(page)"
                :key="person.id"
                routeName="person"
                :id="person.id"
                :title="person.name"
                :subtitle="person.birth_year">
      </LinkItem>
    </article>
    <Pagination v-if="!loading"
                name="people"
                :numberOfPages="numberOfPeoplePages"
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
  name: 'People',
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
    ...mapGetters(['currentPagePeople', 'numberOfPeoplePages'])
  },
  methods: {
    ...mapActions(['fetchPeople']),
    fetchData () {
      this.loading = true;
      this.fetchPeople(this.page).then((error) => {
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
