import Vue from 'vue';

Vue.filter('capitalize', (text) => {
  let value = '';

  if (text) {
    value = text.toString();
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }

  return value;
});
