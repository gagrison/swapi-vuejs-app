<template>
  <main>
    <Search @search="onSearch"
            :value="search"
            placeholder="Search by name"/>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else-if="searchResponseData">
      <LinkItem v-for="person in searchResponseData"
                :key="person.id"
                routeName="person"
                :id="person.id"
                :title="person.name"
                :subtitle="person.birth_year">
      </LinkItem>
      <NoData v-if="!searchResponseData.length"/>
    </article>
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
                :page="page"
                :searchValue="search"
                :numberOfSearchPages="numberOfSearchPages"
                :searchPage="searchPage">
    </Pagination>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LinkItem from '@/components/LinkItem.vue';
import Pagination from '@/components/Pagination.vue';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';
import Search from '@/components/Search.vue';
import NoData from '@/components/NoData.vue';

export default {
  name: 'People',
  data () {
    return {
      loading: false,
      error: '',
      searchResponseData: null,
      numberOfSearchPages: null
    };
  },
  props: [
    'page',
    'search',
    'searchPage'
  ],
  components: {
    LinkItem,
    Pagination,
    Loader,
    ErrorHandler,
    Search,
    NoData
  },
  computed: {
    ...mapGetters(['currentPagePeople', 'numberOfPeoplePages'])
  },
  methods: {
    ...mapActions(['fetchPeople', 'fetchSearchData']),
    fetchData () {
      this.loading = true;
      this.fetchPeople(this.page).then((error) => {
        this.loading = false;
        this.error = error;
      });
    },
    onSearch (value) {
      if (value) {
        this.$router.replace(`people?search=${value}&searchPage=${1}&page=${this.page}`);
      } else {
        this.$router.replace(`people?page=${this.page}`);
      }
    },
    fetchSearch () {
      if (this.search) {
        this.loading = true;
        this.fetchSearchData({
          name: 'people',
          searchValue: this.search,
          searchPage: this.searchPage
        }).then((response) => {
          this.searchResponseData = response.results;
          this.numberOfSearchPages = response.numberOfPages;
        }).catch((error) => {
          this.error = error;
        }).finally(() => {
          this.loading = false;
        });
      } else {
        this.fetchData();
        this.searchResponseData = null;
      }
    }
  },
  created () {
    if (this.search) {
      this.fetchSearch();
    } else {
      this.fetchData();
    }
  },
  watch: {
    '$route.query.page': 'fetchData',
    '$route.query.search': 'fetchSearch',
    '$route.query.searchPage': 'fetchSearch'
  }
};
</script>
