<template>
  <main>
    <Search @search="onSearch"
            :value="search"
            placeholder="Search by name or model">
    </Search>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <LinkItems v-else
               :items="searchResponseData || currentPageVehicles(page)"
               routeName="vehicle"
               titleProperty="name"
               subtitleProperty="model">
    </LinkItems>
    <Pagination v-if="!loading"
                name="vehicles"
                :numberOfPages="numberOfVehiclesPages"
                :page="page"
                :searchValue="search"
                :numberOfSearchPages="numberOfSearchPages"
                :searchPage="searchPage">
    </Pagination>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LinkItems from '@/components/LinkItems.vue';
import Pagination from '@/components/Pagination.vue';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';
import Search from '@/components/Search.vue';

export default {
  name: 'Vehicles',
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
    LinkItems,
    Pagination,
    Loader,
    ErrorHandler,
    Search
  },
  computed: {
    ...mapGetters(['currentPageVehicles', 'numberOfVehiclesPages']),
    computedSearch () {
      return this.search + this.searchPage;
    }
  },
  methods: {
    ...mapActions(['fetchVehicles', 'fetchSearchData']),
    fetchData () {
      this.loading = true;
      this.fetchVehicles(this.page).then((error) => {
        this.loading = false;
        this.error = error;
      });
    },
    onSearch (value) {
      if (value) {
        this.$router.replace(`vehicles?search=${value}&searchPage=1&page=${this.page}`);
      } else {
        this.$router.replace(`vehicles?page=${this.page}`);
      }
    },
    fetchSearch () {
      if (this.search) {
        this.error = null;
        this.loading = true;

        this.fetchSearchData({
          name: 'vehicles',
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
    computedSearch: 'fetchSearch'
  }
};
</script>
