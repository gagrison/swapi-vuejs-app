module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/css/_variables.scss";
        `
      }
    }
  }
};
