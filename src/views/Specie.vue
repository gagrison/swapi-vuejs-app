<template>
  <main>
    <Loader v-if="loading"/>
    <ErrorHandler v-else-if="error"
                  :err="error">
    </ErrorHandler>
    <article v-else>
      <section class="heading">{{specie.name | capitalize}}</section>
      <SectionItem title="Classification"
                   :data="specie.classification"/>
      <SectionItem title="Designation"
                   :data="specie.designation"/>
      <SectionItem title="Language"
                   :data="specie.language"/>
      <SectionItem title="Average height"
                   :data="specie.average_height"/>
      <SectionItem title="Skin colors"
                   :data="specie.skin_colors"/>
      <SectionItem title="Hair colors"
                   :data="specie.hair_colors"/>
      <SectionItem title="Eye colors"
                   :data="specie.eye_colors"/>
      <SectionItem title="Average lifespan"
                   :data="specie.average_lifespan"/>
      <PlanetsLinks v-if="specie.homeworld !== null"
                    :planetsUrls="[specie.homeworld]"
                    :isHomeworld="true"/>
      <PeopleLinks :peopleUrls="specie.people"/>
      <FilmsLinks :filmsUrls="specie.films"/>
    </article>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SectionItem from '@/components/SectionItem.vue';
import PlanetsLinks from '@/components/PlanetsLinks.vue';
import PeopleLinks from '@/components/PeopleLinks.vue';
import FilmsLinks from '@/components/FilmsLinks.vue';
import Loader from '@/components/Loader.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default {
  name: 'Specie',
  data () {
    return {
      loading: false,
      error: ''
    };
  },
  props: ['id'],
  components: {
    SectionItem,
    PlanetsLinks,
    PeopleLinks,
    FilmsLinks,
    Loader,
    ErrorHandler
  },
  computed: {
    ...mapGetters(['getSpecie']),
    specie () {
      return this.getSpecie(this.id);
    }
  },
  methods: {
    ...mapActions(['fetchSpecie']),
    fetchData () {
      this.loading = true;
      this.fetchSpecie(this.id).then((error) => {
        this.loading = false;
        this.error = error;
      });
    }
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route.params.id': 'fetchData'
  }
};
</script>
