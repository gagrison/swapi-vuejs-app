<template>
  <label class="search">
    <input type="text"
           :value="value"
           :placeholder="placeholder"
           @input="onInput"/>
    <img src="@/assets/search.png">
  </label>
</template>

<script>
export default {
  name: 'Search',
  props: ['value', 'placeholder'],
  data () {
    return {
      timeout: null
    };
  },
  methods: {
    onInput (event) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$emit('search', event.target.value);
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.search {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 550px;
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  background-color: $star-wars-white;

  input {
    flex: 1;
    color: $star-wars-gray;
    font-size: 16px;

    &::placeholder {
      color: $star-wars-gray;
      opacity: 1;
    }
  }

  img {
    width: 16px;
    height: 16px;
    margin: auto 0 auto 6px;
  }
}
</style>
