<template>
    <router-link :to="route"
                 class="linkItem">
      <p class="title">{{title | capitalize}}</p>
      <p class="subtitle">{{subtitle | capitalize}}</p>
    </router-link>
</template>

<script>
export default {
  name: 'LinkItem',
  props: [
    'routeName',
    'title',
    'subtitle',
    'id'
  ],
  computed: {
    route () {
      return `/${this.routeName}/${this.id}`;
    }
  }
};
</script>

<style lang="scss">
.linkItem {
  width: 100%;
  padding: 5px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  background-color: $star-wars-gray;
  font-weight: bold;

  .title {
    padding-bottom: 2px;
    font-size: 20px;
    color: $star-wars-yellow;
  }

  .subtitle {
    padding-left: 4px;
    font-size: 16px;
  }

  &:hover {
    background-color: $star-wars-gray-opacity;
  }
}
</style>
