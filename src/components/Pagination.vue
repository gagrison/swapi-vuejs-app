<template>
  <footer>
    <div>
      <router-link tag="button"
                   :to="prevPage"
                   :disabled="page === 1">
        Prev
      </router-link>
      <router-link tag="button"
                   :to="nextPage"
                   :disabled="page === numberOfPages">
        Next
      </router-link>
    </div>
    <p>
      <span>Page {{page}}</span>
      <span v-if="numberOfPages">/{{numberOfPages}}</span>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Pagination',
  props: [
    'name',
    'numberOfPages',
    'page'
  ],
  computed: {
    prevPage () {
      return `/${this.name}?page=${this.page - 1}`;
    },
    nextPage () {
      return `/${this.name}?page=${this.page + 1}`;
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
  margin-top: 20px;

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
        cursor: initial;
      }
    }
  }
}
</style>
