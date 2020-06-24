<template>
  <div :class="[isSmall ? 'small' : 'large', 'loader']"></div>
</template>

<script>
export default {
  name: 'Loader',
  props: ['isSmall']
};
</script>

<style lang="scss">
.large {
  width: 64px;
  height: 64px;
  border: 8px solid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.small {
  width: 16px;
  height: 16px;
  border: 2px solid;
  margin: 5px;
}

.loader {
  border-top-color: $star-wars-yellow;
  border-right-color: $star-wars-gray-3;
  border-bottom-color: $star-wars-yellow;
  border-left-color: $star-wars-gray-3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
