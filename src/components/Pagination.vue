<template>
  <footer>
    <div>
      <router-link tag="button"
                   :to="prevPage"
                   :disabled="prevDisabled">
        Prev
      </router-link>
      <router-link tag="button"
                   :to="nextPage"
                   :disabled="nextDisabled">
        Next
      </router-link>
    </div>
    <p>
      <span>Page {{pagesInfo.page}}</span>
      <span v-if="pagesInfo.numberOfPages">/{{pagesInfo.numberOfPages}}</span>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Pagination',
  props: [
    'name',
    'numberOfPages',
    'page',
    'searchValue',
    'numberOfSearchPages',
    'searchPage'
  ],
  computed: {
    prevPage () {
      let prevPage = `/${this.name}`;

      if (this.searchValue) {
        prevPage += `?search=${this.searchValue}&searchPage=${this.searchPage - 1}&page=${this.page}`;
      } else {
        prevPage += `?page=${this.page - 1}`;
      }

      return prevPage;
    },
    nextPage () {
      let nextPage = `/${this.name}`;

      if (this.searchValue) {
        nextPage += `?search=${this.searchValue}&searchPage=${this.searchPage + 1}&page=${this.page}`;
      } else {
        nextPage += `?page=${this.page + 1}`;
      }

      return nextPage;
    },
    prevDisabled () {
      return this.searchValue ? this.searchPage === 1 : this.page === 1;
    },
    nextDisabled () {
      return this.searchValue
        ? this.searchPage === this.numberOfSearchPages || !this.numberOfSearchPages
        : this.page === this.numberOfPages;
    },
    pagesInfo () {
      if (this.searchValue) {
        return {
          page: this.searchPage,
          numberOfPages: this.numberOfSearchPages
        };
      }

      return {
        page: this.page,
        numberOfPages: this.numberOfPages
      };
    }
  }
};
</script>

<style lang="scss">
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  margin-top: auto;

  div {
    display: flex;
    margin-bottom: 8px;

    button {
      width: 100px;
      height: 35px;
      border-radius: 5px;
      margin: 0 10px;
      background-color: $star-wars-gray;

      &:active, &:hover {
        background-color: $star-wars-gray-opacity;
      }

      &[disabled] {
        opacity: 0.35;
        background-color: $star-wars-gray;
        cursor: initial;
      }
    }
  }
}
</style>
