module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/css/_variables.scss";
        `
      }
    }
  }
};
