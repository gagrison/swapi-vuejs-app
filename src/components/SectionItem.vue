<template>
  <section>
    <span class="title">{{title}}: </span>
    <span>{{data | capitalize}}</span>
  </section>
</template>

<script>
export default {
  name: 'SectionItem',
  props: ['title', 'data']
};
</script>
