<template>
  <div class="errorHandler">
    {{err}}
  </div>
</template>

<script>
export default {
  name: 'ErrorHandler',
  props: ['err']
};
</script>

<style lang="scss">
.errorHandler {
  color: #f00;
  font-size: 16px;
}
</style>
