<template>
  <div id="app"
       class="app">
    <Navigation/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
  @import "@/css/_style.scss";
  @import "@/css/_main.scss";
</style>
