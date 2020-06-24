import Vue from 'vue';

Vue.mixin({
  methods: {
    transformErrorsToString: (errors) => errors.reduce((errorString, error) => {
      if (error) {
        return `${errorString} ${error}`;
      }

      return errorString;
    }, ''),
    stripIdFromUrl: (url) => Number(url.match(/\d+/)[0])
  }
});
