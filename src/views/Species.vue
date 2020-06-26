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
      <LinkItem v-for="specie in searchResponseData"
                :key="specie.id"
                routeName="specie"
                :id="specie.id"
                :title="specie.name"
                :subtitle="specie.classification">
      </LinkItem>
      <NoResults v-if="!searchResponseData.length"/>
    </article>
    <article v-else>
      <LinkItem v-for="specie in currentPageSpecies(page)"
                :key="specie.id"
                routeName="specie"
                :id="specie.id"
                :title="specie.name"
                :subtitle="specie.classification">
      </LinkItem>
    </article>
    <Pagination v-if="!loading"
                name="species"
                :numberOfPages="numberOfSpeciesPages"
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
import NoResults from '@/components/NoResults.vue';

export default {
  name: 'Species',
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
    NoResults
  },
  computed: {
    ...mapGetters(['currentPageSpecies', 'numberOfSpeciesPages']),
    computedSearch () {
      return this.search + this.searchPage;
    }
  },
  methods: {
    ...mapActions(['fetchSpecies', 'fetchSearchData']),
    fetchData () {
      this.loading = true;
      this.fetchSpecies(this.page).then((error) => {
        this.loading = false;
        this.error = error;
      });
    },
    onSearch (value) {
      if (value) {
        this.$router.replace(`species?search=${value}&searchPage=${1}&page=${this.page}`);
      } else {
        this.$router.replace(`species?page=${this.page}`);
      }
    },
    fetchSearch () {
      if (this.search) {
        this.error = null;
        this.loading = true;

        this.fetchSearchData({
          name: 'species',
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
